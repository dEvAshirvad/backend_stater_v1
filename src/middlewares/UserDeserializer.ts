import { SignJwt, VerifyJWT } from '@/lib/tokens';
import { NextFunction, Request, Response } from 'express';
import { JWTPayload } from '@/types/globals';
import { cookieConfig } from '@/configs/cookieConfig';

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
    const newToken = SignJwt(payload);
    res.cookie(
      'access_token',
      newToken,
      cookieConfig({ maxAge: 1000 * 60 * 60 })
    ); // 1 hour

    return next();
  } catch (error) {
    res.cookie('access_token', '');
    throw error;
  }
}

export default UserDeserializer;
