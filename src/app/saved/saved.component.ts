import { Component, OnInit } from "@angular/core";
import { SearchService } from "../search-service.service";
import { Saved } from "./saved.model";
import { List } from '../create-list/list.model';

@Component({
  selector: "app-saved",
  templateUrl: "./saved.component.html",
  styleUrls: ["./saved.component.css"]
})
export class SavedComponent implements OnInit {
  saved: Saved[];
list: List[];
  constructor(private savedService: SearchService) {}

  ngOnInit() {
    this.getLists();
  }



  getLists(): void {
    let email = this.savedService.getEmail();
    this.savedService.getList(email).subscribe(data => {
      let arr = [];
      for (let i = 0; i < 100; i++){
        if(data[i] != undefined) arr.push(data[i]);
      }
      this.list = arr;
    })
  }

  deleteLists(id: number)
  {
    this.savedService.deleteList(id).subscribe(result => {
      return this.getLists();
    });
  }

  deleteRecipe(listId: number, recipeId: string)
  {
      this.savedService.deleteRecipeList(listId, recipeId).subscribe(result => {
        return this.getLists();
      });
    }




}
