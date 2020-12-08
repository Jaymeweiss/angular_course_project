import {Injectable} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Tasty Pasta',
      'Tasty Pasta with a creamy sauce',
      'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/9/26/0/FNK_Tuscan-Chicken-Skillet_H2_s4x3.jpg.rend.hgtvcom.616.462.suffix/1537973085542.jpeg',
      [
        new Ingredient('pasta', 1),
        new Ingredient('basil', 2)
      ]
    ),
    new Recipe('Burger',
      'A great tasting burger',
      'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/9/26/0/FNK_Tuscan-Chicken-Skillet_H2_s4x3.jpg.rend.hgtvcom.616.462.suffix/1537973085542.jpeg',
      [
        new Ingredient('Bun', 2),
        new Ingredient('Meat', 1)
      ]
    )
  ];

  constructor(private shoppingListService: ShoppingListService, private httpClient: HttpClient) {
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice(); // return a duplicate not the pointer
  }

  getRecipe(index: number): Recipe {
    return this.recipes.slice()[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe): void {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number): void {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  storeRecipes(): void {
    // put to overwrite all values with Firebase
    // put also does not add an id - post does this
    this.httpClient.put('https://ng-complete-guide-c9a62-default-rtdb.firebaseio.com/recipes.json', this.recipes)
      .subscribe(response => {
        console.log(response);
      });
  }
}
