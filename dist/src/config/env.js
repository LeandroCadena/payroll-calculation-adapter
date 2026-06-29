"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
const zod_1 = require("zod");
// Zod valida variables externas antes de iniciar la app.
// Esto evita que el servicio arranque con configuración inválida.
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'test', 'production']).default('development'),
    PORT: zod_1.z.coerce.number().positive().default(3000),
    SERVICE_NAME: zod_1.z.string().default('payroll-calculation-adapter'),
    LOG_LEVEL: zod_1.z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']).default('info'),
});
const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
    console.error('Invalid environment variables:', parsedEnv.error.flatten().fieldErrors);
    process.exit(1);
}
// Exportamos un objeto centralizado para no usar process.env directamente en toda la app.
exports.env = parsedEnv.data;
