import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Ingredient } from '../../ingredient/ingredient';
import { IngredientService } from '../../ingredient/ingredient.service';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  public ingredients: Ingredient[] = [];
  public recipe: Recipe | undefined;

  public constructor(
    private activatedRoute: ActivatedRoute,
    private ingredientService: IngredientService,
    private recipeService: RecipeService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.ingredientService.getIngredients().subscribe(
      ingredients => this.ingredients = ingredients
    );

    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.recipeService.getRecipe(id).subscribe(recipe => this.recipe = recipe);
  }

  public addIngredient(): void {
    if (this.recipe) {
      this.recipe.ingredients.push({
        _id: undefined,
        name: '',
        quantity: '',
        unit: ''
      });
    }
  }

  public addInstruction(): void {
    if (this.recipe) {
      this.recipe.instructions.push({
        duration: 0,
        method: ''
      });
    }
  }

  public deleteRecipe(): void {
    if (this.recipe) {
      this.recipeService.deleteRecipe(this.recipe._id as string).subscribe(
        _ => this.navigateToRecipes()
      );
    }
  }

  public saveRecipe(): void {
    if (this.recipe) {
      this.recipeService.updateRecipe(this.recipe).subscribe(
        _ => this.navigateToRecipes()
      );
    }
  }

  private navigateToRecipes(): void {
    this.router.navigate(['/', 'recipes']);
  }
}
