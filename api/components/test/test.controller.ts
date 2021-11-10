import { Request, Response, Router } from 'express';

import { Controller } from '../controller';
import { Test } from './test.model';

export class TestController extends Controller {
  protected override initialiseRoutes(router: Router): void {
    router.get('/', (request, response) => this.getTests(request, response));
    router.post('/', (request, response) => this.postTest(request, response));
  }

  private async getTests(_request: Request, response: Response): Promise<void> {
    try {
      const tests = (await this.collection.find({}).toArray()) as Test[];
      response.status(200).json(tests);
    } catch (error) {
      response.status(500).json(error.message);
    }
  }

  private async postTest(request: Request, response: Response): Promise<void> {
    try {
      const test = request.body as Test;
      const result = await this.collection.insertOne(test);

      result
        ? response.status(200).json(result.insertedId.toJSON())
        : response.status(500).send("bad thing");
    } catch (error) {
      response.status(500).send(error.message);
    }
  }
}
