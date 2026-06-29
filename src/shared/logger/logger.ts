import pino from 'pino';

import { env } from '../../config/env';

// Pino genera logs estructurados en formato JSON.
// Este formato facilita que plataformas como Splunk, Loki o CloudWatch
// puedan indexar y consultar los eventos de la aplicación.
export const logger = pino({
  name: env.SERVICE_NAME,
  level: env.LOG_LEVEL,

  timestamp: pino.stdTimeFunctions.isoTime,

  base: {
    service: env.SERVICE_NAME,
  },
});