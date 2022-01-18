import { Request, Response } from 'express';

import { Ingredient } from './ingredient.model';

export class IngredientController {
  public async createIngredient(request: Request, response: Response): Promise<void> {
    response.status(200).json(await Ingredient.create(request.body));
  }

  public async deleteIngredient(request: Request, response: Response): Promise<void> {
    response.status(200).json(await Ingredient.findByIdAndDelete(request.params.id));
  }

  public async findIngredient(request: Request, response: Response): Promise<void> {
    response.status(200).json(await Ingredient.findOne({ id: request.params.id }));
  }

  public async findIngredients(_request: Request, response: Response): Promise<void> {
    response.status(200).json(await Ingredient.find());
  }

  public async updateIngredient(request: Request, response: Response): Promise<void> {
    response.status(200).json(await Ingredient.findByIdAndUpdate(
      request.params.id,
      request.body
    ));
  }
}
