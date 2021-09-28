export interface Recipe {
  id: number;
  name: string;
  instructions: Instruction[];
  ingredients: Ingredient[];
}

export interface Ingredient {
  name: string;
  quantity: string;
}

export interface Instruction {
  duration: number;
  method: string;
}
