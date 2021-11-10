import { NextFunction, Request, Response } from 'express';

export function handleError(
  error: Error,
  _request: Request,
  response: Response,
  _nextFunction: NextFunction): void | Response {
  console.error(error);

  return response.status(500).json({
    error: error.message || error,
    status: 500
  });
}
