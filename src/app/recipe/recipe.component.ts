import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Recipe, Ingredient } from './recipe';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  recipe: Recipe | undefined;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.getRecipe().subscribe(recipe => this.recipe = recipe);
  }
}
