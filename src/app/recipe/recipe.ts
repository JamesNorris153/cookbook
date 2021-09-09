export interface Recipe {
  name: string;
  instructions: string[];
  ingredients: Ingredient[];
}

export interface Ingredient {
  name: string;
  quantity: string;
}
