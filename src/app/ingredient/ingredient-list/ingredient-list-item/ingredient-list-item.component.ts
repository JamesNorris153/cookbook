import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Ingredient } from '../../ingredient';
import { IngredientService } from '../../ingredient.service';

@Component({
  selector: 'ingredient-list-item',
  templateUrl: './ingredient-list-item.component.html',
  styleUrls: ['./ingredient-list-item.component.css']
})
export class IngredientListItemComponent {
  @Input() public ingredient?: Ingredient;
  @Output() public onDeleteIngredient = new EventEmitter<Ingredient>();

  public constructor(private readonly ingredientService: IngredientService) { }

  public deleteIngredient(): void {
    if (this.ingredient) {
      this.ingredientService.deleteIngredient(this.ingredient._id as string).subscribe(
        ingredient => this.onDeleteIngredient.emit(ingredient)
      );
    }
  }

  public saveIngredient(): void {
    if (this.ingredient) {
      this.ingredientService.updateIngredient(this.ingredient).subscribe();
    }
  }
}
