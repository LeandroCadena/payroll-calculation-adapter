import type { NextFunction, Request, RequestHandler, Response } from 'express';
import type { ParsedQs } from 'qs';
import type { ParamsDictionary } from 'express-serve-static-core';

// Este wrapper es genérico para preservar tipos de params, body y query.
// Así una ruta con :calculationGroupId puede usar un controller tipado sin romper TypeScript.
export const asyncHandler = <
  Params extends ParamsDictionary = ParamsDictionary,
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery extends ParsedQs = ParsedQs,
>(
  handler: (
    req: Request<Params, ResBody, ReqBody, ReqQuery>,
    res: Response<ResBody>,
    next: NextFunction,
  ) => Promise<void>,
): RequestHandler<Params, ResBody, ReqBody, ReqQuery> => {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
};
