import { NextFunction, Request, Response } from 'express';
import APIError from '@/errors/APIError';
import { errorlogger } from '@/configs/logger';
import Respond from '@/lib/Respond';

export function errorHandler(
  error: Error,
  _: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof APIError) {
    Respond(res, error.serializeError(), error.statusCode);
    next();
  }

  errorlogger.error(error?.message);
  Respond(
    res,
    {
      success: false,
      status: 'error',
      title: 'Internal Server Error',
      message: error?.message,
    },
    500
  );
  next();
}
