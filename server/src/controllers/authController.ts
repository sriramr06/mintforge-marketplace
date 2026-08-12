import { Request, Response } from 'express';
import crypto from 'crypto';
import { asyncHandler } from '@/utils/asyncHandler';
import { AppError } from '@/utils/AppError';
import { User } from '@/models/User';
import { RefreshToken } from '@/models/RefreshToken';
import { UserRole, UserStatus } from '@/constants/enums/user';
import { generateAccessToken, generateRefreshToken, generateTokens, getTokenExpiry, hashToken, verifyRefreshToken } from '@/utils/jwt';
import { sendPasswordResetEmail, sendVerificationEmail } from '@/utils/sendEmail';

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler ( async (req: Request, res: Response) => {
  const { email, password, role } = req.body;

  const SELF_REGISTERABLE_ROLES = [UserRole.CLIENT, UserRole.FREELANCER];
  const assignedRole = SELF_REGISTERABLE_ROLES.includes(role) ? role : UserRole.CLIENT;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError('User already exists', 409);
  }

  const verificationToken = crypto.randomBytes(32).toString('hex');
  const verficationExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const user = await User.create({
    email,
    password,
    role: assignedRole,
    status: UserStatus.PENDING_VERIFICATION,
    emailVerificationToken: verificationToken,
    emailVerificationExpires: verficationExpiry
  });

  await sendVerificationEmail(email, verificationToken);

  res.status(201).json({
    success: true,
    message: 'Registration successfull. Please verify your email.',
    userId: user._id
  });
});

// @desc    Verify Email
// @route   /api/auth/verify-email
// @access  Public
export const verifyEmail = asyncHandler ( async (req: Request, res: Response) => {
  const { token } = req.params;

  const user = await User.findOne({
    emailVerificationToken: token,
    emailVerificationExpires: { $gt: new Date() }
  }).select('+emailVerificationToken +emailVerificationTokenExpires');

  if (!user) {
    throw new AppError('Invalid or expired verification token', 400);
  }

  user.isVerified = true;
  user.status = UserStatus.ACTIVE;
  user.set('emailVerificationToken', undefined);
  user.set('emailVerificationExpires', undefined);
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Email verified successfully'
  });
});


// @desc    Login user
// @route   POST /api/auth/login
// @access  public
export const login = asyncHandler (async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new AppError('Invalid credentials', 401);
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new AppError('Invalid credentials', 401);
  }

  if (user.status === UserStatus.PENDING_VERIFICATION) {
    throw new AppError('Please verify your email', 401);
  }

  if (user.status !== UserStatus.ACTIVE) {
    throw new AppError('Your account is not active. Contact an administrator', 403);
  }

  user.lastLogin = new Date();
  await user.save();

  const { accessToken, refreshToken} = await generateTokens(user._id.toString(), user.role);

  await RefreshToken.create({
    userId: user._id,
    token: hashToken(refreshToken),
    expiresAt: getTokenExpiry(refreshToken),
    userAgent: req.headers['user-agent'],
    ipAddress: req.ip || req.connection.remoteAddress
  });

  res.status(200).json({
    success: true,
    message: 'Login successful',
    user,
    accessToken,
    refreshToken
  });
});

// @desc    Refresh access token
// @route   POST /api/auth/refresh
// @access  Public
export const refresh = asyncHandler (async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new AppError('Refresh token required', 400);
  }

  const decoded = verifyRefreshToken(refreshToken);

  const tokenDoc = await RefreshToken.findOne({
    token: hashToken(refreshToken),
    isRevoked: false
  });

  if (!tokenDoc) {
    throw new AppError('Invalid or refresh token revoked', 401);
  }

  if (tokenDoc.expiresAt < new Date()) {
    throw new AppError('Refresh token expired', 401);
  }

  const user = await User.findById(decoded.userId);
  if (!user) {
    throw new AppError('User not found or inactive', 401);
  }

  const newAccessToken = generateAccessToken(user._id.toString(), user.role);
  const newRefreshToken = generateRefreshToken(user._id.toString());

  tokenDoc.isRevoked = true;
  await tokenDoc.save();

  await RefreshToken.create({
    userId: user._id,
    token: hashToken(newRefreshToken),
    expiresAt: getTokenExpiry(newRefreshToken),
    userAgent: req.headers['user-agent'],
    ipAddress: req.ip || req.connection.remoteAddress
  });

  res.status(200).json({
    success: true,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken
  });
});


// @desc    Logout user
// route    POST /api/auth/logout
// access   Private
export const logout = asyncHandler (async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (refreshToken) {
    await RefreshToken.findOneAndUpdate(
      { token: hashToken(refreshToken) },
      { isRevoked: true },
      { returnDocument: 'after' }
    );
  }

  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
});


// @desc    Logout from all device
// @route   POST /api/auth/logout-all
// @access  Private
export const logoutAll = asyncHandler (async (req: Request, res: Response) => {
  if (!req.user) {
    throw new AppError('Not authorized. Please log in.', 401);
  }

  await RefreshToken.updateMany(
    { userId: req.user._id },
    { isRevoked: true }
  );

  res.status(200).json({
    success: true,
    message: 'Logged out from all devices successfully'
  });
});


// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler (async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    user: req.user
  })
});


// @desc    Request a password reset link
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = asyncHandler ( async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(200).json({
      success: true,
      message: 'If an account exists, a reset link has been sent'
    });
    return;
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  
  user.passwordResetToken = resetToken;
  user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  await user.save();

  await sendPasswordResetEmail(email, resetToken);

  res.status(200).json({
    success: true,
    message: 'If an account exists, a reset link has been sent'
  });
});

// @desc    Reset password using the emailed token
// @route   POST /api/auth/reset-password/:token
// @access  Public
export const resetPassword = asyncHandler ( async (req: Request, res: Response) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: new Date() },
    }).select('+passwordResetToken +passwordResetExpires');

    if (!user) {
      throw new AppError('Invalid or expired reset token', 400);
    }

    // Update password and clear reset fields
    user.password = newPassword;
    user.set('passwordResetToken', undefined);
    user.set('passwordResetExpires', undefined);
    await user.save();

    res.status(200).json({
    success: true,
    message: 'Password reset successfully'
  });
});


// @desc    Resend the email verification link
// @route   POST /api/auth/resend-verification
// @access  Public
export const resendVerificationEmail = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(200).json({
      success: true,
      message: 'If an account exists, a verification link has been sent'
    });
    return;
  }

  if (user.isVerified) {
    throw new AppError('Email is already verified', 400);
  }

  // Generate new verification token
  const verificationToken = crypto.randomBytes(32).toString('hex');
  user.emailVerificationToken = verificationToken;
  user.emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  await user.save();

  // Resend email
  await sendVerificationEmail(email, verificationToken);

  res.status(200).json({
    success: true,
    message: 'Verification email sent successfully'
  });
});