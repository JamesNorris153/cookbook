import { NextFunction, Request, Response } from 'express';

export function handleError(
  error: Error,
  request: Request,
  response: Response,
  nextFunction: NextFunction): void | Response {
  console.error(error);

  return response.status(500).json({
    error: error.message || error,
    status: 500
  });
}
