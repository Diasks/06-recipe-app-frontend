import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Saved } from "../saved/saved.model";
import { SearchService } from "../search-service.service";

@Component({
  selector: "app-saved-details",
  templateUrl: "./saved-details.component.html",
  styleUrls: ["./saved-details.component.css"]
})
export class SavedDetailsComponent implements OnInit {
  list: Saved;
  constructor(private service: SearchService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getSaved();
  }

  getSaved(): void {
    const listId = +this.route.snapshot.paramMap.get("id");
    const that = this;
    this.service.getList(listId).then((list: Saved) => {    
      return (that.list = list);
    });
  }
}
