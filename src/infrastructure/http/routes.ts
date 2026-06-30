import type { Express } from 'express';
import swaggerUi from 'swagger-ui-express';

import { calculateAssociateRoutes } from '@/modules/calculate-associate';
import { calculationResultsRoutes, calculationStatusRoutes } from '@/modules/calculations';
import { healthRoutes } from '@/modules/health';
import { oauthTokenRoutes } from '@/modules/oauth';
import { metricsRoutes } from '@/modules/metrics';
import { swaggerSpec } from '@/infrastructure/openapi';

export const registerRoutes = (app: Express): void => {
  app.get('/', (_req, res) => {
    res.status(200).json({
      service: 'payroll-calculation-adapter',
      status: 'running',
    });
  });

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.use('/', healthRoutes);
  app.use('/', oauthTokenRoutes);
  app.use('/', calculateAssociateRoutes);
  app.use('/', calculationStatusRoutes);
  app.use('/', calculationResultsRoutes);
  app.use('/', metricsRoutes);
};
