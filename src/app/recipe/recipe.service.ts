import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Recipe } from './recipe'

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private recipeUrl = 'api/recipe';

  constructor(private http: HttpClient) { }

  getRecipe(): Observable<Recipe> {
    return this.http.get<Recipe>(this.recipeUrl).pipe(
      tap(_ => console.log('getRecipe')),
      catchError(this.handleError<Recipe>('getRecipe', ))
    );
  }

  private handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
