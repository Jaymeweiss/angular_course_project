import {Component, OnInit} from '@angular/core';
import {RecipeService} from '../recipe-book/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
  }

  onSaveData(): void {
    this.recipeService.storeRecipes();
  }

  onFetchData(): void {

  }
}
