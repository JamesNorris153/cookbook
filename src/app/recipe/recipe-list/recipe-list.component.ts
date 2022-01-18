import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Recipe } from '../recipe';
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
    private router: Router) {
      console.log('recipes');
    }

  public ngOnInit(): void {
    this.recipeService.getRecipes().subscribe(recipes => this.recipes = recipes);
  }

  public addRecipe(): void {
    this.recipeService.addRecipe({
      _id: undefined,
      name: 'New Recipe',
      ingredients: [],
      instructions: []
    } as Recipe).subscribe((recipe: Recipe) => {
      this.recipes.push(recipe);
      this.router.navigate([`/recipes/${recipe._id}`]);
    });
  }
}
