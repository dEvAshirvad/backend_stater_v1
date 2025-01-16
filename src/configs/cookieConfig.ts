import { CookieOptions } from 'express';
import { COOKIE_DOMAIN } from '@/constants/server.constants';

export function cookieConfig({
  maxAge,
  sameSite = 'none',
  httpOnly = true,
  domain = COOKIE_DOMAIN,
  secure = true,
}: CookieOptions): CookieOptions {
  return {
    maxAge,
    sameSite,
    httpOnly,
    domain,
    secure,
  };
}
