import type { NextFunction, Request, RequestHandler, Response } from 'express';

// Express 5 soporta mejor Promises que Express 4,
// pero este wrapper mantiene un patrón explícito y consistente.
// Si una ruta async falla, el error se delega al errorHandler centralizado.
export const asyncHandler = (
  handler: (req: Request, res: Response, next: NextFunction) => Promise<void>,
): RequestHandler => {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
};
