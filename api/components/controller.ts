import { Router } from "express";
import { Collection } from "mongodb";

export abstract class Controller {
  private _router: Router | undefined;

  public constructor(protected readonly collection: Collection) { }

  public get router(): Router {
    if (!this._router) {
      this._router = Router();
      this.initialiseRoutes(this._router);
    }

    return this._router;
  }

  protected abstract initialiseRoutes(router: Router): void;
}
