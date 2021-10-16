import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Recipe, Ingredient, Instruction } from '../recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  public recipes: Recipe[] = [];

  public constructor(
    private recipeService: RecipeService,
    private router: Router) { }

  public ngOnInit(): void {
    this.recipeService.getRecipes().subscribe(recipes => this.recipes = recipes);
  }

  public addRecipe(): void {
    let name = '';
    let ingredients: Ingredient[] = [];
    let instructions: Instruction[] = [];

    this.recipeService.addRecipe({
      name,
      ingredients,
      instructions
    } as Recipe).subscribe(recipe => {
      this.recipes.push(recipe);
      this.router.navigate([`/recipes/${recipe.id}`]);
    });
  }
}
