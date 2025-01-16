import { NextFunction, Request, Response } from 'express';
import APIError from '../errors/APIError';
import { MIDDLEWARE_ERRORS } from '../errors/MIDDLEWARE_ERRORS';

/**
 * Middleware to ensure the user is authenticated.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The NextFunction callback.
 */
export async function requireUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = req.user;

  if (!user) {
    return next(new APIError(MIDDLEWARE_ERRORS.SESSION_INVALIDATED));
  }

  next();
}
