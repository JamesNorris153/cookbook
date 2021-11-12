import { ObjectId } from "mongodb";

export class Recipe {
  constructor(
    public readonly name: string,
    public readonly ingredients: string[],
    public readonly instructions: string[],
    public readonly id?: ObjectId
  ) {}
}
