import { Router } from 'express';

import { IngredientController } from './ingredient.controller';
import { Routes } from '../routes';

export class IngredientRoutes extends Routes {
  private readonly ingredientController = new IngredientController();

  protected initialiseRoutes(router: Router): void {
    router.route('/')
      .get(this.ingredientController.findIngredients)
      .post(this.ingredientController.createIngredient);
    router.route('/:id')
      .delete(this.ingredientController.deleteIngredient)
      .get(this.ingredientController.findIngredient)
      .put(this.ingredientController.updateIngredient);
  }
}
