import type { Request, Response } from 'express';

import { getApplicationMetrics } from '@/infrastructure/metrics';

export const getMetrics = (_req: Request, res: Response): void => {
  res.status(200).json({
    metrics: getApplicationMetrics(),
  });
};
