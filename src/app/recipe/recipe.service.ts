import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Recipe } from './recipe'
import { RecipeFactory } from './recipe-factory';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private recipeFactory: RecipeFactory = new RecipeFactory();
  private recipesUrl = 'http://localhost:3000/api/recipes';

  public constructor(private httpClient: HttpClient) { }

  public addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.httpClient.post<Recipe>(this.recipesUrl, recipe, this.httpOptions).pipe(
      tap(_ => console.log('addRecipe')),
      map(data => this.recipeFactory.create(data)),
      catchError(this.handleError<Recipe>('addRecipe'))
    );
  }

  public deleteRecipe(id: string): Observable<Recipe> {
    const recipeUrl = `${this.recipesUrl}/${id}`;
    return this.httpClient.delete(recipeUrl).pipe(
      tap(_ => console.log(`deleteRecipe id=${id}`)),
      map(data => this.recipeFactory.create(data)),
      catchError(this.handleError<any>('deleteRecipe'))
    );
  }

  public getRecipe(id: string): Observable<Recipe> {
    const recipeUrl = `${this.recipesUrl}/${id}`;
    return this.httpClient.get<Recipe>(recipeUrl).pipe(
      tap(_ => console.log(`getRecipe id=${id}`)),
      map(data => this.recipeFactory.create(data)),
      catchError(this.handleError<Recipe>('getRecipe'))
    );
  }

  public getRecipes(): Observable<Recipe[]> {
    return this.httpClient.get<Recipe[]>(this.recipesUrl).pipe(
      tap(_ => console.log('getRecipes')),
      map(data => {
        const recipes = [];
        for (let recipeData of data) {
          recipes.push(this.recipeFactory.create(recipeData));
        }

        return recipes;
      }),
      catchError(this.handleError<Recipe[]>('getRecipes', []))
    );
  }

  public updateRecipe(recipe: Recipe): Observable<Recipe> {
    const recipeUrl = `${this.recipesUrl}/${recipe._id}`;
    return this.httpClient.put(recipeUrl, recipe, this.httpOptions).pipe(
      tap(_ => console.log(`updateRecipe id=${recipe._id}`)),
      map(data => this.recipeFactory.create(data)),
      catchError(this.handleError<any>('updateRecipe'))
    );
  }

  private handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation}: ${error}`);
      return of(result as T);
    }
  }
}
