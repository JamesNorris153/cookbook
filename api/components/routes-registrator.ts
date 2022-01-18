import { Router } from 'express';

import { IngredientRoutes } from './ingredient/ingredient.routes';
import { RecipeRoutes } from './recipe/recipe.routes';

export class RoutesRegistrator {
  public constructor(
    private readonly router: Router
  ) { }

  public register(baseUrl: string): void {
    this.router.use(`${baseUrl}/ingredients`, new IngredientRoutes().router);
    this.router.use(`${baseUrl}/recipes`, new RecipeRoutes().router);
  }
}
