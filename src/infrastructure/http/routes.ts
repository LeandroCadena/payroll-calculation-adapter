import type { Express } from 'express';

import { calculateAssociateRoutes } from '@/modules/calculate-associate';
import { healthRoutes } from '@/modules/health';
import { oauthTokenRoutes } from '@/modules/oauth';

export const registerRoutes = (app: Express): void => {
  app.get('/', (_req, res) => {
    res.status(200).json({
      service: 'payroll-calculation-adapter',
      status: 'running',
    });
  });

  app.use('/', healthRoutes);
  app.use('/', oauthTokenRoutes);
  app.use('/', calculateAssociateRoutes);
};
