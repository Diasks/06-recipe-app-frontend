import { Component, OnInit } from "@angular/core";
import { SearchService } from "./search-service.service";
import { SearchItem } from "./Searchitem.model";
import { Observable } from "rxjs";

@Component({
  selector: "app",
  templateUrl: "./app.component.html",
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "frontend recipe app Diasks";
  // appetizers: [];
  // desserts: [];
  // maincourses: [];
  // recipeId: [];
  recipes$: Observable<SearchItem[]>;

  constructor(private appetizerService: SearchService) {}

  ngOnInit() {}

  doSearch(term: string) {
    this.appetizerService.searchRecipe(term);
  }

  doSearchAppetizers(term: string) {
    debugger;
    this.appetizerService.searchRecipeAppetizers(term);
  }
  doSearchMainDishes(term: string) {
    this.appetizerService.searchRecipeMainDishes(term);
  }
  doSearchDesserts(term: string) {
    this.appetizerService.searchRecipeDesserts(term);
  }

  doSearchVegan(term: string) {
    debugger;
    this.appetizerService.searchRecipeVegan(term);
  }

  doSearchVegetarian(term: string) {
    debugger;
    this.appetizerService.searchRecipeVegetarian(term);
  }

  doSearchGluten(term: string) {
    debugger;
    this.appetizerService.searchRecipeGluten(term);
  }

  doSearchLactos(term: string) {
    debugger;
    this.appetizerService.searchRecipeLactos(term);
  }

  

  
  
  
  
  
  
  



  //   doSearch(term:string) {
  //     const searchrecipe = [];

  //     this.appetizerService.searchRecipe(term).subscribe(data=>{
  // console.log(data);
  // console.log(data['matches']);
  // // this.searchrecipe = data[0];
  // searchrecipe.push(data['matches']);
  // console.log(searchrecipe);
  // })
  //     };

  // handleAppetizerClick = () => {
  //  this.appetizerService.getAppetizer().subscribe(data => {
  //   console.log(data)
  //   this.appetizers = data.matches;

  //  });

  // }

  // handleDessertClick = () => {
  //   this.appetizerService.getDessert().subscribe(data => {
  //     console.log(data)
  //     this.desserts = data.matches;
  //   });

  // }

  // handleDinnerClick = () => {
  //   this.appetizerService.getDinner().subscribe(data => {
  //     console.log(data)
  //     this.maincourses = data.matches;
  //   });
}

//   handleRecipeId(recipeId: number) {
//   this.appetizerService.getRecipeId(recipeId).subscribe(data=>{
// console.log(data);
// this.recipeId = data.matches;
//     });
//   }
