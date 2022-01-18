export interface Recipe {
  _id: string | undefined;
  name: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
}

export interface Ingredient {
  _id: string | undefined;
  name: string;
  quantity: string;
  unit: string;
}

export interface Instruction {
  duration: number;
  method: string;
}
