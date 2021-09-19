export interface Recipe {
  id: number;
  name: string;
  instructions: string[];
  ingredients: Ingredient[];
}

export interface Ingredient {
  name: string;
  quantity: string;
}
