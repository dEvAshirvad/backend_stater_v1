import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';
import { JWT_EXPIRATION, JWT_SECRET } from '@/constants/server.constants';
import { MIDDLEWARE_ERRORS } from '@/errors/MIDDLEWARE_ERRORS';
import APIError from '@/errors/APIError';

export function SignJwt(payload: JwtPayload, options?: jwt.SignOptions) {
  return jwt.sign(payload, JWT_SECRET, {
    ...options,
    expiresIn: JWT_EXPIRATION,
  });
}

export function VerifyJWT(token: string) {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;

    delete payload.iat;
    delete payload.exp;
    return payload;
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      if (error.name === 'JwtTokenExpired') {
        throw new APIError(MIDDLEWARE_ERRORS.SESSION_INVALIDATED);
      }
    }

    throw error;
  }
}
