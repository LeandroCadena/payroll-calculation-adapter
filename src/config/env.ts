import 'dotenv/config';
import { z } from 'zod';

// Zod valida configuración externa al iniciar la aplicación.
// Esto evita que el servicio arranque con variables inválidas o incompletas.
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().positive().default(3000),
  SERVICE_NAME: z.string().default('payroll-calculation-adapter'),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),

  OAUTH_TOKEN_TTL_SECONDS: z.coerce.number().positive().default(300),
  OAUTH_REFRESH_THRESHOLD_MS: z.coerce.number().positive().default(30000),

  RETRY_ATTEMPTS: z.coerce.number().positive().default(3),
  RETRY_DELAY_MS: z.coerce.number().positive().default(500),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('Invalid environment variables:', parsedEnv.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsedEnv.data;
