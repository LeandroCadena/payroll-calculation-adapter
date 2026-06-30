import swaggerJsdoc from 'swagger-jsdoc';

import { env } from '@/config/env';

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Payroll Calculation Adapter API',
      version: '1.0.0',
      description:
        'Enterprise-style payroll integration adapter for asynchronous associate calculations.',
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}`,
      },
    ],
  },
  apis: ['src/modules/**/*.ts'],
});
