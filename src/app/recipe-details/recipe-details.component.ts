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

  saveRecipe(recipeId:string, list_id) {
  this.service.addRecipeToList(list_id, recipeId).subscribe(data=>{
    window.alert(`${recipeId} är nu sparad i vald lista!`)
  return data;
})

  }

  
}
