import { createApp } from '@/app';
import { env } from '@/config/env';
import { logger } from '@/infrastructure/logger';

const app = createApp();

app.listen(env.PORT, () => {
  logger.info(
    {
      port: env.PORT,
      environment: env.NODE_ENV,
    },
    'Payroll Calculation Adapter started',
  );
});
