import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RecipeCardComponent } from './recipe/recipe-card/recipe-card.component'

const routes: Routes = [
  { path: 'recipe', component: RecipeCardComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
