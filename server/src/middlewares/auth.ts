import { Request, Response, NextFunction } from 'express';
import { asyncHandler } from '@/utils/asyncHandler';
import { AppError } from '@/utils/AppError';
import { verifyAccessToken } from '@/utils/jwt';
import { User } from '@/models/User';
import { UserStatus } from '@/constants/enums/user';

const extractToken = (req: Request): string | undefined => {
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }
  return undefined;
}

export const protect = asyncHandler (async (req: Request, _res: Response, next: NextFunction) => {
  const token = extractToken(req);

  if (!token) {
    throw new AppError('Not authorized. Please log in.', 401);
  }

  const payload = verifyAccessToken(token);
  const user = await User.findById(payload.id);

  if (!user) {
    throw new AppError('User no longer exists.', 401);
  }

  if (user.status !== UserStatus.ACTIVE) {
    throw new AppError('Your account is not active. Contact an administrator.', 403);
  }

  req.user = user;
  next();
})