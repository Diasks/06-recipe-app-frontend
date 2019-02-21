import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RecipeDetailsComponent } from "./recipe-details/recipe-details.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { SavedComponent } from "./saved/saved.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { SavedDetailsComponent } from "./saved-details/saved-details.component";
import { CreateListComponent } from "./create-list/create-list.component";
// import { PageNotFoundComponent} from './not.found-component';

const routes: Routes = [
  { path: "", component: RecipeListComponent },
  { path: "recipe/:id", component: RecipeDetailsComponent },
  { path: "create-list", component: CreateListComponent },
  { path: "saved", component: SavedComponent },
  { path: "saved/:id", component: SavedDetailsComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
