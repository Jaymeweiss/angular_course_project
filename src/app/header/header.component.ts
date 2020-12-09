import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecipeService} from '../recipe-book/recipe.service';
import {AuthService} from '../auth/services/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  userSubscription: Subscription;
  isAuthenticated = false;

  constructor(private recipeService: RecipeService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user; // a double negative to do a presence check but not assign it to the actual value
    });
  }

  onSaveData(): void {
    this.recipeService.storeRecipes();
  }

  onFetchData(): void {
    this.recipeService.fetchRecipes().subscribe();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
