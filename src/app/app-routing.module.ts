import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { IngredientListComponent }
  from './ingredient/ingredient-list/ingredient-list.component';
import { RecipeComponent } from './recipe/recipe/recipe.component'
import { RecipeListComponent } from './recipe/recipe-list/recipe-list.component'

const routes: Routes = [
  { path: 'ingredients', component: IngredientListComponent },
  { path: 'recipes/:id', component: RecipeComponent },
  { path: 'recipes', component: RecipeListComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
