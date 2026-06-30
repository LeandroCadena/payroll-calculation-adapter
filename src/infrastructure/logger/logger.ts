import pino from 'pino';

import { env } from '@/config/env';
import { getRequestContext } from '@/infrastructure/http';

// Pino genera logs estructurados en formato JSON.
// Además, usamos mixin para adjuntar metadata contextual como traceId.
// Esto permite buscar en Splunk todos los logs de una misma request.
export const logger = pino({
  name: env.SERVICE_NAME,
  level: env.LOG_LEVEL,
  timestamp: pino.stdTimeFunctions.isoTime,
  base: {
    service: env.SERVICE_NAME,
  },
  mixin() {
    const context = getRequestContext();

    return {
      requestId: context?.requestId,
      traceId: context?.traceId,
    };
  },
});
