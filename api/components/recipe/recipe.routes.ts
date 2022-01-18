import { Router } from "express";

import { RecipeController } from "./recipe.controller";
import { Routes } from "../routes";

export class RecipeRoutes extends Routes {
  private readonly recipeController = new RecipeController();

  protected initialiseRoutes(router: Router): void {
    router.route('/')
      .get(this.recipeController.findRecipes)
      .post(this.recipeController.createRecipe);
    router.route('/:id')
      .delete(this.recipeController.deleteRecipe)
      .get(this.recipeController.findRecipe)
      .put(this.recipeController.updateRecipe);
  }
}
