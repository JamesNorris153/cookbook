import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Recipe } from './recipe/recipe';

@Injectable({ providedIn: 'root' })
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const recipes = [
      {
        id: 11,
        name: 'Lasagne',
        instructions: [
          'make pasta',
          'make sauce',
          'make meat',
          'eat'
        ],
        ingredients: [
          { name: 'meat', quantity: '350 grams' },
          { name: 'milk', quantity: '100 ml' },
          { name: 'pasta', quantity: '1 sheet' }
        ]
      },
      {
        id: 12,
        name: 'Pizza',
        instructions: [
          'make dough',
          'flip',
          'make sauce',
          'cook'
        ],
        ingredients: [
          { name: 'dough', quantity: '100 grams' },
          { name: 'sauce', quantity: '50 ml' },
          { name: 'mozarella', quantity: '20 grams' }
        ]
      }
    ];
    return {recipes};
  }
}
