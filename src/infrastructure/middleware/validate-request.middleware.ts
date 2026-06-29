import type { RequestHandler } from 'express';
import type { ZodSchema } from 'zod';

import { ValidationError } from '@/shared/errors';

export const validateRequest =
  (schema: ZodSchema): RequestHandler =>
  (req, _res, next) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      const issues = result.error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      }));

      next(new ValidationError(issues));

      return;
    }

    next();
  };
