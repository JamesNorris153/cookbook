import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../ingredient';
import { IngredientService } from '../ingredient.service';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.css']
})
export class IngredientListComponent implements OnInit {
  public ingredients: Ingredient[] = [];

  public constructor(private readonly ingredientService: IngredientService) { }

  public ngOnInit(): void {
    this.ingredientService.getIngredients().subscribe(ingredients => {
      this.ingredients = ingredients;
    });
  }

  public addIngredient(name: string): void {
    this.ingredientService.addIngredient({ name } as Ingredient).subscribe(
      ingredient => this.ingredients.push(ingredient)
    )
  }

  public deleteIngredient(ingredient: Ingredient): void {
    this.ingredients = this.ingredients.filter(i => i._id !== ingredient._id);
  }
}
