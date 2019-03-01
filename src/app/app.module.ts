import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { SearchService } from "./search-service.service";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { FormsModule } from "@angular/forms";
import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";
import { ClarityModule } from "@clr/angular";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { SavedComponent } from './saved/saved.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SavedDetailsComponent } from './saved-details/saved-details.component';
import { CreateListComponent } from './create-list/create-list.component';


@NgModule({
  declarations: [AppComponent, RecipeDetailsComponent, RecipeListComponent, SavedComponent, LoginComponent, RegisterComponent, SavedDetailsComponent, CreateListComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ClarityModule,
    BrowserAnimationsModule,
    AppRoutingModule

  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule {}


