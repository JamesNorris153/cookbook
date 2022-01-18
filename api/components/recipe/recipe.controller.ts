import { Request, Response } from "express";
import { ObjectId } from "mongodb";

import { Recipe } from "./recipe.model";

export class RecipeController {
  public async createRecipe(request: Request, response: Response): Promise<void> {
    response.status(200).json(await Recipe.create({
      name: request.body.name,
      ingredients: RecipeController.mapIngredients(request.body.ingredients),
      instructions: request.body.instructions
    }));
  }

  public async deleteRecipe(request: Request, response: Response): Promise<void> {
    response.status(200).json(await Recipe.findByIdAndDelete(request.params.id));
  }

  public async findRecipe(request: Request, response: Response): Promise<void> {
    const recipe = await Recipe.findById(request.params.id);
    await RecipeController.populateRecipe(recipe)
    response.status(200).json(recipe);
  }

  public async findRecipes(_request: Request, response: Response): Promise<void> {
    const recipes = await Recipe.find();
    for (const recipe of recipes) await RecipeController.populateRecipe(recipe);
    response.status(200).json(recipes);
  }

  public async updateRecipe(request: Request, response: Response): Promise<void> {
    response.status(200).json(await Recipe.findByIdAndUpdate(
      request.params.id,
      {
        name: request.body.name,
        ingredients: RecipeController.mapIngredients(request.body.ingredients),
        instructions: request.body.instructions
      }
    ));
  }

  private static mapIngredients(ingredients: any[]): any[] {
    const mappedIngredients = [];
    for (const ingredient of ingredients) {
      mappedIngredients.push({
        ingredient: new ObjectId(ingredient._id),
        quantity: ingredient.quantity,
        unit: ingredient.unit
      });
    }

    return mappedIngredients;
  }

  private static async populateRecipe(recipe: any): Promise<void> {
    await recipe.populate({
      path: 'ingredients',
      populate: {
        path:  'ingredient',
        model: 'ingredient'
      }
    });
  }
}
