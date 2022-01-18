import { model, Schema } from "mongoose";

const ingredientSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

export const Ingredient = model('ingredient', ingredientSchema);
