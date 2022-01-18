import { Router } from "express";

export abstract class Routes {
  private _router: Router | undefined;

  public get router(): Router {
    if (!this._router) {
      this._router = Router();
      this.initialiseRoutes(this._router);
    }

    return this._router;
  }

  protected abstract initialiseRoutes(router: Router): void;
}
