import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RecipeBookComponent} from '../recipe-book/recipe-book.component';
import {ShoppingListComponent} from '../shopping-list/shopping-list.component';
import {RecipeDetailComponent} from '../recipe-book/recipe-detail/recipe-detail.component';
import {RecipeStartComponent} from '../recipe-book/recipe-start/recipe-start.component';
import {RecipeEditComponent} from '../recipe-book/recipe-edit/recipe-edit.component';
import {RecipesResolverService} from '../recipe-book/recipes-resolver.service';
import {AuthComponent} from '../auth/auth.component';


const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {
    path: 'recipes', component: RecipeBookComponent, children: [
      {path: '', component: RecipeStartComponent},
      {path: 'new', component: RecipeEditComponent}, // this needs to be on top - or its interpreted as an id
      {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
      {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]}
    ]
  },
  {path: 'shopping-list', component: ShoppingListComponent},
  {path: 'auth', component: AuthComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
