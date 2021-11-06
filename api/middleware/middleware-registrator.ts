import { NextFunction, Request, Response, Router } from 'express';

import { handleError } from './error-handler';

export class MiddlewareRegistrator {
  public constructor(private readonly router: Router) { }

  public register(middleware: {
    (request: Request, response: Response, nextFunction: NextFunction): void
  }[]): void {
    for (const mw of middleware) {
      console.log(mw);
      this.router.use(mw);
    }

    this.router.use(errorHandler);
  }
}
