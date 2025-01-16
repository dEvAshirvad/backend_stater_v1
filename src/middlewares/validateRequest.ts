import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import APIError from '@/errors/APIError';
import { MIDDLEWARE_ERRORS } from '@/errors/MIDDLEWARE_ERRORS';

export const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, _: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        throw new APIError({
          ...MIDDLEWARE_ERRORS.VALIDATION_ERROR,
          ERRORS: error.errors,
        });
      }
      throw error;
    }
  };
};
