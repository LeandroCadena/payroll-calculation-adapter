import type { RequestHandler } from 'express';

import { logger } from '@/infrastructure/logger';

export const requestLoggerMiddleware: RequestHandler = (req, res, next) => {
  const startTime = Date.now();

  res.on('finish', () => {
    logger.info(
      {
        method: req.method,
        path: req.originalUrl,
        statusCode: res.statusCode,
        durationMs: Date.now() - startTime,
      },
      'HTTP request completed',
    );
  });

  next();
};
