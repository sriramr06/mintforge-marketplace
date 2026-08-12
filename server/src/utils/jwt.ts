import jwt, { JwtPayload, type SignOptions } from 'jsonwebtoken';
import crypto from 'crypto';
import { env } from '@/config/env';
import { UserRole } from '@/constants/enums/user';

export interface AccessTokenPayload extends JwtPayload {
  userId: string;
  role: UserRole;
}

export interface RefreshTokenPayload extends JwtPayload {
  userId: string;
  jti: string;
}

// Generate Access Token
export const generateAccessToken = (userId: string, role: UserRole): string => {
  const options = { expiresIn: env.JWT_ACCESS_EXPIRES_IN } as SignOptions;
  return jwt.sign(
    { userId, role },
    env.JWT_SECRET,
    options
  );
};

// Generate Refresh Token 
export const generateRefreshToken = (userId: string): string => {
  const options = { expiresIn: env.JWT_REFRESH_EXPIRES_IN } as SignOptions;
  return jwt.sign(
    { userId, jti: crypto.randomUUID ()},
    env.JWT_REFRESH_SECRET,
    options
  );
};

// Verify access token
export const verifyAccessToken = (token: string): AccessTokenPayload => {
  return jwt.verify(token, env.JWT_SECRET) as AccessTokenPayload;
}

// Verify refresh token
export const verifyRefreshToken = (token: string): RefreshTokenPayload => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as RefreshTokenPayload;
}

// Generate both tokens
export const generateTokens = (
  userId: string,
  role: UserRole
): {
  accessToken: string;
  refreshToken: string;
} => {
  const accessToken = generateAccessToken(userId, role);
  const refreshToken = generateRefreshToken(userId);

  return { accessToken, refreshToken };
};

// Hash tokens
export const hashToken = (token: string) => crypto.createHash('sha256').update(token).digest('hex');

// Get a token's expiry as a Date, derived from its own exp claim
export const getTokenExpiry = (token: string): Date => {
  const decoded = jwt.decode(token) as JwtPayload | null;
  if (!decoded?.exp) {
    throw new Error('Token has no expiry claim');
  }
  return new Date(decoded.exp * 1000);
};
