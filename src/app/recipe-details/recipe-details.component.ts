import { Component, OnInit } from "@angular/core";
import { SearchService } from "../search-service.service";
import { ActivatedRoute } from "@angular/router";
import { Saved } from "../saved/saved.model";
import {Router} from "@angular/router";
import { SearchItem } from '../Searchitem.model';
import { List } from '../create-list/list.model';

@Component({
  selector: "app-recipe-details",
  templateUrl: "./recipe-details.component.html",
  styleUrls: ["./recipe-details.component.css"]
})
export class RecipeDetailsComponent implements OnInit {
  recipe$;
  recipeId;
  recipe: SearchItem;
  list: List[];

  constructor(private service: SearchService, private route: ActivatedRoute, private router: Router) {
    this.recipeId = this.route.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    this.getRecipeId();
  }

  getRecipeId() {
    this.service.getRecipeId(this.recipeId).subscribe(data => {
      return (this.recipe$ = data);
    });
    this.getLists();
  }

  saveRecipe(recipeId: string, listId: number) {

    debugger;
    const recipeAdd = new Saved();
    debugger;
    recipeAdd.recipe = recipeId;
    recipeAdd.listId = listId;
    recipeAdd.email = this.service.getEmail();
    debugger;
  
    this.service.saveRecipe(recipeAdd).subscribe(result => {
      debugger;
      console.log(result);
      this.router.navigateByUrl('/saved');
    });
  }

  getLists(): void {
    let email = this.service.getEmail();
    this.service.getList(email).subscribe(data => {
      let arr = [];
      for (let i = 0; i < 100; i++){
        if(data[i] != undefined) arr.push(data[i]);
      }
      this.list = arr;
    })
  }

  

}
