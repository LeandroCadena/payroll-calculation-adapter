import express from 'express';

import { registerMiddlewares } from './infrastructure/http/middlewares';

// App centraliza la creación de Express.
// Esto permite testear la aplicación sin levantar el servidor HTTP real.
export const createApp = () => {
  const app = express();

  registerMiddlewares(app);

  return app;
};