import { Router } from 'express';

import { getMetrics } from './metrics.controller';

export const metricsRoutes = Router();

metricsRoutes.get('/internal/metrics', getMetrics);
