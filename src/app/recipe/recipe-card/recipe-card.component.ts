import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Recipe, Ingredient } from '../recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent implements OnInit {
  public editMode = false;
  public recipe: Recipe | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService) { }

  public ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.editMode = params.editMode == "true" ? true : false;
    });
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.recipeService.getRecipe(id).subscribe(recipe => this.recipe = recipe);
  }

  public save(): void {
    if (this.recipe) {
      this.recipeService.updateRecipe(this.recipe).subscribe();
    }
  }
}
