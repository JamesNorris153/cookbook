import { NextFunction, Request, Response, Router } from 'express';

export class MiddlewareRegistrator {
  public constructor(private readonly router: Router) { }

  public register(
    middleware: {
      (request: Request, response: Response, nextFunction: NextFunction): void
    }[]
  ): void {
    for (const mw of middleware) this.router.use(mw);
  }
}
