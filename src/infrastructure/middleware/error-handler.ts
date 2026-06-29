import type { ErrorRequestHandler } from 'express';

import { logger } from '@/infrastructure/logger';
import { ApplicationError, ValidationError } from '@/shared/errors';

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof ValidationError) {
    logger.warn(
      {
        errorCode: error.code,
        statusCode: error.statusCode,
        issues: error.issues,
      },
      'Request validation failed',
    );

    res.status(error.statusCode).json({
      error: {
        code: error.code,
        message: error.message,
        issues: error.issues,
      },
    });

    return;
  }

  if (error instanceof ApplicationError) {
    logger.warn(
      {
        errorCode: error.code,
        statusCode: error.statusCode,
        message: error.message,
      },
      'Handled application error',
    );

    res.status(error.statusCode).json({
      error: {
        code: error.code,
        message: error.message,
      },
    });

    return;
  }

  logger.error({ error }, 'Unhandled application error');

  res.status(500).json({
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred',
    },
  });
};
