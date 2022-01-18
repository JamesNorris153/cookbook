import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Ingredient } from './ingredient';

@Injectable({ providedIn: 'root' })
export class IngredientService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private ingredientsUrl = 'http://localhost:3000/api/ingredients';

  public constructor(private readonly httpClient: HttpClient) { }

  public addIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.httpClient.post<Ingredient>(
      this.ingredientsUrl,
      ingredient,
      this.httpOptions
    ).pipe(
      tap(_ => console.log('addIngredient')),
      catchError(this.handleError<Ingredient>('addIngredient'))
    );
  }

  public deleteIngredient(id: string): Observable<any> {
    const ingredientUrl = `${this.ingredientsUrl}/${id}`;
    return this.httpClient.delete(ingredientUrl).pipe(
      tap(_ => console.log(`deleteIngredient id=${id}`)),
      catchError(this.handleError<any>('deleteIngredient'))
    );
  }

  public getIngredient(id: string): Observable<Ingredient> {
    const ingredientUrl = `${this.ingredientsUrl}/${id}`;
    return this.httpClient.get<Ingredient>(ingredientUrl).pipe(
      tap(_ => console.log(`getIngredient id=${id}`)),
      catchError(this.handleError<Ingredient>('getIngredient'))
    );
  }

  public getIngredients(): Observable<Ingredient[]> {
    return this.httpClient.get<Ingredient[]>(this.ingredientsUrl).pipe(
      tap(_ => console.log('getIngredients')),
      catchError(this.handleError<Ingredient[]>('getIngredients', []))
    );
  }

  public updateIngredient(ingredient: Ingredient): Observable<any> {
    const ingredientUrl = `${this.ingredientsUrl}/${ingredient._id}`;
    return this.httpClient.put(ingredientUrl, ingredient, this.httpOptions).pipe(
      tap(_ => console.log(`updateIngredient id=${ingredient._id}`)),
      catchError(this.handleError<any>('updateIngredient'))
    );
  }

  private handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation}: ${error}`);
      return of(result as T);
    }
  }
}
