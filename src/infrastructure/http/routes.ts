import type { Express } from 'express';
import { healthRoutes } from '@/modules/health';

// Centralizamos el registro de rutas HTTP.
// Esto mantiene app.ts limpio y permite agregar versiones como /api/v1 sin duplicar configuración.
export const registerRoutes = (app: Express): void => {
    app.get('/', (_req, res) => {
        res.status(200).json({
            service: 'payroll-calculation-adapter',
            status: 'running',
        });
    });

    app.use('/', healthRoutes);
};