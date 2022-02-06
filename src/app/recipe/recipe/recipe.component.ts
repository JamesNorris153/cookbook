import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  public recipeForm: FormGroup | undefined;

  public get _id() {
    return this.recipeForm?.get('_id')?.value as string;
  }

  public get recipeIngredients() {
    return this.recipeForm?.get('ingredients') as FormArray;
  }

  public get instructions() {
    return this.recipeForm?.get('instructions') as FormArray;
  }

  public constructor(
    private activatedRoute: ActivatedRoute,
    private ingredientService: IngredientService,
    private formBuilder: FormBuilder,
    private recipeService: RecipeService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.ingredientService.getIngredients().subscribe(
      ingredients => this.ingredients = ingredients
    );

    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.recipeService.getRecipe(id).subscribe(recipe => {
      this.recipeForm = this.formBuilder.group({
        _id: [recipe._id],
        name: [recipe.name, Validators.required],
        ingredients: this.formBuilder.array(
          recipe.ingredients.map(ingredient => {
            return this.formBuilder.group({
              _id: [ingredient._id, Validators.required],
              name: [ingredient.name],
              quantity: [ingredient.quantity, Validators.required],
              unit: [ingredient.unit]
            })
          })
        ),
        instructions: this.formBuilder.array(
          recipe.instructions.map(instruction => {
            return this.formBuilder.group({
              duration: [instruction.duration, Validators.min(0)],
              method: [instruction.method, Validators.required]
            })
          })
        )
      });
    });
  }

  public addIngredient(): void {
    if (this.recipeForm) {
      let ingredients = this.recipeForm.get('ingredients') as FormArray;
      ingredients.push(this.formBuilder.group({
        _id: undefined,
        name: '',
        quantity: '',
        unit: ''
      }));
    }
  }

  public addInstruction(): void {
    if (this.recipeForm) {
      let instructions = this.recipeForm.get('instructions') as FormArray;
      instructions.push(this.formBuilder.group({
        duration: 0,
        method: ''
      }));
    }
  }

  public deleteRecipe(): void {
    if (this.recipeForm) {
      this.recipeService.deleteRecipe(this._id).subscribe(
        _ => this.navigateToRecipes()
      );
    }
  }

  public saveRecipe(): void {
    if (this.recipeForm) {
      this.recipeService.updateRecipe(this.recipeForm.value as Recipe).subscribe(
        _ => this.navigateToRecipes()
      );
    }
  }

  private navigateToRecipes(): void {
    this.router.navigate(['/', 'recipes']);
  }
}
