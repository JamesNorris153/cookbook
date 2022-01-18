import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IngredientListComponent } from
  './ingredient/ingredient-list/ingredient-list.component';
import { IngredientListItemComponent } from
  './ingredient/ingredient-list/ingredient-list-item/ingredient-list-item.component';
import { RecipeComponent } from './recipe/recipe/recipe.component';
import { RecipeListComponent } from './recipe/recipe-list/recipe-list.component';

@NgModule({
  declarations: [
    AppComponent,
    IngredientListComponent,
    IngredientListItemComponent,
    RecipeComponent,
    RecipeListComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
