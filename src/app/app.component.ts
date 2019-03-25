import { Component, OnInit } from "@angular/core";
import { SearchService } from "./search-service.service";
import { SearchItem } from "./Searchitem.model";
import { Observable } from "rxjs";

@Component({
  selector: "app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "Recipay!";

  recipes$: Observable<SearchItem[]>;

  constructor(private appetizerService: SearchService) {}

  ngOnInit() {}

  doSearch(term: string) {
    this.appetizerService.searchRecipe(term);
  }

  doSearchAppetizers(term: string) {
    this.appetizerService.searchRecipeAppetizers(term);
  }
  doSearchMainDishes(term: string) {
    this.appetizerService.searchRecipeMainDishes(term);
  }
  doSearchDesserts(term: string) {
    this.appetizerService.searchRecipeDesserts(term);
  }

  doSearchVegan(term: string) {
    this.appetizerService.searchRecipeVegan(term);
  }

  doSearchVegetarian(term: string) {
    this.appetizerService.searchRecipeVegetarian(term);
  }

  doSearchGluten(term: string) {
    this.appetizerService.searchRecipeGluten(term);
  }

  doSearchLactos(term: string) {
    this.appetizerService.searchRecipeLactos(term);
  }


  logout() {
    this.appetizerService.remove();
    this.appetizerService.removeEmail();

  }
}
