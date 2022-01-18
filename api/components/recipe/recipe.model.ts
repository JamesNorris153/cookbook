import { model, Schema, Types } from "mongoose";

const recipeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  ingredients: {
    type: [{
      ingredient: {
        type: Types.ObjectId,
        required: true,
        ref: 'Ingredient'
      },
      quantity: {
        type: Number,
        required: true
      },
      unit: {
        type: String,
        required: true
      }
    }],
    required: true
  },
  instructions: {
    type: [{
      duration: {
        type: String,
        required: true
      },
      method: {
        type: String,
        required: true
      }
    }],
    required: true
  }
});

export const Recipe = model("Recipe", recipeSchema);
