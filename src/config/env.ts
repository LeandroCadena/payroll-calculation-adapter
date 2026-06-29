import 'dotenv/config';
import { z } from 'zod';

// Zod valida variables externas antes de iniciar la app.
// Esto evita que el servicio arranque con configuración inválida.
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().positive().default(3000),
  SERVICE_NAME: z.string().default('payroll-calculation-adapter'),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('Invalid environment variables:', parsedEnv.error.flatten().fieldErrors);
  process.exit(1);
}

// Exportamos un objeto centralizado para no usar process.env directamente en toda la app.
export const env = parsedEnv.data;
