import { Component, OnInit } from "@angular/core";
import { SearchItem } from "../Searchitem.model";
import { SearchService } from "../search-service.service";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";

@Component({
  selector: "app-recipe-details",
  templateUrl: "./recipe-details.component.html",
  styleUrls: ["./recipe-details.component.css"]
})
export class RecipeDetailsComponent implements OnInit {
  recipe$;
  // : Observable<SearchItem[]>;
  recipeId;

  constructor(private service: SearchService, private route: ActivatedRoute) {
    this.recipeId = this.route.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    this.getRecipeId();
  }

  getRecipeId() {
    this.service.getRecipeId(this.recipeId).subscribe(data => {
      return this.recipe$ = data;
    });
  }

  saveRecipe(recipeId:string) {
    const listId = 15;
    debugger;
this.service.addRecipeToList(listId, recipeId).subscribe(data=>{
  console.log(data);
})
debugger;
  }

  
  // getRecipeId(): void
  // {

  //   const recipeId = +this.route.snapshot.paramMap.get('id');
  //   this.service.getRecipeId(recipeId).subscribe(recipes$ => this.recipes$=recipes$);
  //   };

  // this.recipes$ = this.service.getRecipeId(recipeId);
}
