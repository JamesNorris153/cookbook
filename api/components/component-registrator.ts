import { Db } from 'mongodb';
import { Router } from 'express';

import { TestController } from './test/test.controller';

export class ComponentRegistrator {
  public constructor(
    private readonly database: Db,
    private readonly router: Router
  ) { }

  public register(prefix: string) {
    this.router.use(
      `${prefix}/recipes`,
      new TestController(this.database.collection('test')).router
    );
  }
}
