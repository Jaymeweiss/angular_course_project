import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {ShoppingListEditorComponent} from './shopping-list/shopping-list-editor/shopping-list-editor.component';
import {RecipeBookComponent} from './recipe-book/recipe-book.component';
import {RecipeListComponent} from './recipe-book/recipe-list/recipe-list.component';
import {RecipeItemComponent} from './recipe-book/recipe-list/recipe-item/recipe-item.component';
import {RecipeDetailComponent} from './recipe-book/recipe-detail/recipe-detail.component';
import {HeaderComponent} from './header/header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DropdownDirective} from './shared/dropdown.directive';
import {ShoppingListService} from './shopping-list/shopping-list.service';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {RecipeStartComponent} from './recipe-book/recipe-start/recipe-start.component';
import {RecipeEditComponent} from './recipe-book/recipe-edit/recipe-edit.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    ShoppingListEditorComponent,
    RecipeBookComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    HeaderComponent,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
