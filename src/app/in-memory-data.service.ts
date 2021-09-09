import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Recipe } from './recipe/recipe';

@Injectable({ providedIn: 'root' })
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const recipe = {
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
    };
    return {recipe};
  }
}
