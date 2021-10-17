import { ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Recipe, Ingredient, Instruction } from '../recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent implements OnDestroy, OnInit {
  public recipe: Recipe | undefined;

  public constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService) { }

  public ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.recipeService.getRecipe(id).subscribe(recipe => this.recipe = recipe);
  }

  public ngOnDestroy(): void {
    if (this.recipe) {
      this.recipeService.updateRecipe(this.recipe).subscribe();
    }
  }

  public addIngredient(): void {
    if (this.recipe) {
      const name = '';
      this.recipe.ingredients.push({ name } as Ingredient);
    }
  }

  public addInstruction(): void {
    if (this.recipe) {
      const method = '';
      this.recipe.instructions.push({ method } as Instruction);
    }
  }
}
