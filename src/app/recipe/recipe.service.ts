import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Recipe } from './recipe'

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private recipesUrl = 'api/recipes';

  constructor(private http: HttpClient) { }

  getRecipe(id: number): Observable<Recipe> {
    const recipeUrl = `${this.recipesUrl}/${id}`;
    return this.http.get<Recipe>(recipeUrl).pipe(
      tap(_ => console.log(`getRecipe id=${id}`)),
      catchError(this.handleError<Recipe>('getRecipe'))
    );
  }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipesUrl).pipe(
      tap(_ => console.log('getRecipes')),
      catchError(this.handleError<Recipe[]>('getRecipes', []))
    );
  }

  updateRecipe(recipe: Recipe): Observable<any> {
    return this.http.put(this.recipesUrl, recipe, this.httpOptions).pipe(
      tap(_ => console.log(`updateRecipe id=${recipe.id}`)),
      catchError(this.handleError<any>('updateRecipe'))
    );
  }

  private handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
