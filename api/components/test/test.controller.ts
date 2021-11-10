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

    this._router.get('/', (request, response) => this.getTests(request, response));
    this._router.post('/', (request, response) => this.postTest(request, response));
  }

  private async getTests(_: Request, response: Response): Promise<void> {
    try {
      const tests = (await this.tests.find({}).toArray()) as Test[];
      response.status(200).json(tests);
    } catch (error) {
      response.status(500).json(error.message);
    }
  }

  private async postTest(request: Request, response: Response): Promise<void> {
    try {
      const test = request.body as Test;
      const result = await this.tests.insertOne(test);

      result
        ? response.status(200).json(result.acknowledged)
        : response.status(500).send("bad thing");
    } catch (error) {
      response.status(500).send(error.message);
    }
  }
}
