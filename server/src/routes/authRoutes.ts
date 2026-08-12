import express from 'express';
import {
  register,
  login,
  logout,
  logoutAll,
  getMe,
  verifyEmail,
  refresh,
  forgotPassword,
  resetPassword,
  resendVerificationEmail
} from '@/controllers/authController';
import { authLimiter } from '@/middlewares/rateLimiter';
import { loginSchema, registerSchema } from '@/validators/authValidator';
import { validate } from '@/middlewares/authValidator';
import { protect } from '@/middlewares/auth';

const router = express.Router();

// Public routes
router.post('/register', authLimiter, validate(registerSchema), register);
router.post('/login', authLimiter, validate(loginSchema), login);
router.post('/refresh', authLimiter, refresh);
router.post('/verify-email/:token', authLimiter, verifyEmail);
router.post('/forgot-password', authLimiter, forgotPassword);
router.post('/reset-password/:token', authLimiter, resetPassword);
router.post('/resend-verification', authLimiter, resendVerificationEmail);

// Private routes
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);
router.post('/logout-all', protect, logoutAll);

export default router;