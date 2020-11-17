import {EventEmitter, Injectable, OnInit} from '@angular/core';
import {Recipe} from './recipe.model';

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('Test Recipe', 'This is simply a test', 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/9/26/0/FNK_Tuscan-Chicken-Skillet_H2_s4x3.jpg.rend.hgtvcom.616.462.suffix/1537973085542.jpeg'),
    new Recipe('Another recipe', 'This is simply another test', 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/9/26/0/FNK_Tuscan-Chicken-Skillet_H2_s4x3.jpg.rend.hgtvcom.616.462.suffix/1537973085542.jpeg')
  ];
  recipeSelected = new EventEmitter<Recipe>();

  constructor() {
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice(); // return a duplicate not the pointer
  }


}
