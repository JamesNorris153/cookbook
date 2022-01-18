import { Recipe, Ingredient, Instruction } from './recipe';
import { Factory } from '../factory';

export class RecipeFactory extends Factory<Recipe> {
  public create(data: any): Recipe {
    return {
      _id: data._id,
      name: data.name,
      ingredients: data.ingredients.map((ingredientData: any) => {
        return {
          _id: ingredientData.ingredient._id,
          name: ingredientData.ingredient.name,
          quantity: ingredientData.quantity,
          unit: ingredientData.unit,
        } as Ingredient;
      }),
      instructions: data.instructions.map((instructionData: any) => {
        return {
          duration: instructionData.duration,
          method: instructionData.method,
        } as Instruction;
      })
    };
  }
}
