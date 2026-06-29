import type { RequestHandler } from 'express';

import { runWithRequestContext } from '@/infrastructure/http/request-context';

export const requestContextMiddleware: RequestHandler = (_req, _res, next) => {
  runWithRequestContext(() => {
    next();
  });
};
