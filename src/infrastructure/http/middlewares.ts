import type { Express } from 'express';
import express from 'express';

import { requestContextMiddleware } from '@/infrastructure/middleware/request-context.middleware';
import { requestLoggerMiddleware } from '@/infrastructure/middleware/request-logger.middleware';

// Los middlewares globales se registran en un solo lugar.
// Esto evita que app.ts crezca demasiado cuando el proyecto empieza a escalar.
export const registerMiddlewares = (app: Express): void => {
  app.use(express.json());
  app.use(requestContextMiddleware);
  app.use(requestLoggerMiddleware);
};
