import { env } from '@/config/env';

export interface HealthCheck {
  name: string;
  status: 'ok' | 'degraded';
}

export interface HealthStatus {
  service: string;
  status: 'ok' | 'degraded';
  environment: string;
  uptime: number;
  timestamp: string;
  checks: HealthCheck[];
}

export const getHealthStatus = (): HealthStatus => {
  const checks: HealthCheck[] = [
    {
      name: 'memory',
      status: 'ok',
    },
    {
      name: 'oauth',
      status: 'ok',
    },
    {
      name: 'payroll-builder',
      status: 'ok',
    },
    {
      name: 'calculation-engine',
      status: 'ok',
    },
  ];

  const hasDegradedCheck = checks.some((check) => check.status === 'degraded');

  return {
    service: env.SERVICE_NAME,
    status: hasDegradedCheck ? 'degraded' : 'ok',
    environment: env.NODE_ENV,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    checks,
  };
};

export const getLivenessStatus = () => {
  return {
    status: 'alive',
    timestamp: new Date().toISOString(),
  };
};

export const getReadinessStatus = () => {
  return {
    status: 'ready',
    timestamp: new Date().toISOString(),
    dependencies: {
      oauth: 'ready',
      payrollBuilder: 'ready',
      calculationEngine: 'ready',
    },
  };
};
