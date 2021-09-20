import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { RecipeCardComponent } from './recipe/recipe-card/recipe-card.component'
import { RecipeListComponent } from './recipe/recipe-list/recipe-list.component'

const routes: Routes = [
  { path: 'recipes/:id', component: RecipeCardComponent },
  { path: 'recipes', component: RecipeListComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
