import { Component, OnInit } from "@angular/core";
import { SearchService } from "../search-service.service";
import { Saved } from "./saved.model";

@Component({
  selector: "app-saved",
  templateUrl: "./saved.component.html",
  styleUrls: ["./saved.component.css"]
})
export class SavedComponent implements OnInit {
  saved: Saved[];
  constructor(private savedService: SearchService) {}

  ngOnInit() {
    const that = this;
    this.savedService.getLists().then((saved: Saved[]) => {
      return (that.saved = saved);
    });
  }

  removeList(listId: number) {
    this.savedService.removeRecipeList(listId).subscribe(data => {
      window.alert(`${listId} är nu raderad!`)
     return data;
    
    });
  }

  onSubmit(event) {
    const target = event.target;
    const title = target.querySelector("#title").value;
    const list_id = target.querySelector("#list_id").value;
    this.savedService.updateList(title, list_id).subscribe(data => {
      if (data) {
        window.alert(`listan är uppdaterad och heter numera ${title}!`);
      }
    });
  }
}
