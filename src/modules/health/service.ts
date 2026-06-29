import { env } from '@/config/env';

export interface HealthStatus {
  service: string;
  status: 'ok';
  environment: string;
  uptime: number;
  timestamp: string;
}

// El Service contiene la lógica del módulo.
// No depende de Express, por lo que puede reutilizarse desde tests, workers o HTTP controllers.
export const getHealthStatus = (): HealthStatus => {
  return {
    service: env.SERVICE_NAME,
    status: 'ok',
    environment: env.NODE_ENV,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  };
};