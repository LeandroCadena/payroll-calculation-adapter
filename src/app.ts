import express from 'express';

import { registerMiddlewares } from '@/infrastructure/http/middlewares';
import { registerRoutes } from '@/infrastructure/http/routes';
import { errorHandler } from '@/infrastructure/middleware/error-handler';

// App centraliza la creación de Express.
// Esto permite testear la aplicación sin levantar el servidor HTTP real.
export const createApp = () => {
  const app = express();

  registerMiddlewares(app);
  registerRoutes(app);

  // El error handler debe registrarse después de las rutas.
  // Express solo enviará aquí errores ocurridos durante el procesamiento HTTP.
  app.use(errorHandler);

  return app;
};
