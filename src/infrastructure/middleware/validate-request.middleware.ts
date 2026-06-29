import type { RequestHandler } from 'express';
import type { ZodSchema } from 'zod';

import { ApplicationError } from '@/shared/errors';

export const validateRequest =
  (schema: ZodSchema): RequestHandler =>
  (req, _res, next) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      next(new ApplicationError('Invalid request payload', 400, 'VALIDATION_ERROR'));

      return;
    }

    next();
  };
