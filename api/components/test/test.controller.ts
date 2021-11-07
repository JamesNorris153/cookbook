import { Collection } from 'mongodb';
import { Request, Response, Router } from 'express';

import { Test } from './test.model';

export class TestController {
  private _router: Router | undefined;

  constructor(
    private readonly tests: Collection
  ) { }

  public get router(): Router {
    if (!this._router) {
      this.initialiseRoutes();
    }

    return this._router as Router;
  }

  private initialiseRoutes(): void {
    this._router = Router();

    this._router.get('/', async (request: Request, response: Response) => {
      try {
        console.log('f');
        const tests = (await this.tests.find({}).toArray()) as Test[];

        console.log('f');

        response.status(200).json(tests);
      } catch (error) {
        response.status(500).json(error.message);
      }
    })
  }
}
