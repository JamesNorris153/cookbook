export interface Recipe {
  id: number;
  name: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
}

export interface Ingredient {
  name: string;
  quantity: string;
}

export interface Instruction {
  duration: number;
  method: string;
}
