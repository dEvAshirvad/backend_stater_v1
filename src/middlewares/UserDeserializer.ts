import { VerifyJWT } from '@/lib/tokens';
import { NextFunction, Request, Response } from 'express';
import { JWTPayload } from '@/types/globals';

async function UserDeserializer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { access_token } = req.cookies;

    if (!access_token) {
      return next();
    }

    const payload = VerifyJWT(access_token) as JWTPayload;

    req.user = payload;

    return next();
  } catch (error) {
    res.cookie('access_token', '');
    throw error;
  }
}

export default UserDeserializer;
