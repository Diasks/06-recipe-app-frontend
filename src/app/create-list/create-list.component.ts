import { Component, OnInit } from "@angular/core";
import { SearchService } from "../search-service.service";
import { Router } from "@angular/router";
import { List } from './list.model';
@Component({
  selector: "app-create-list",
  templateUrl: "./create-list.component.html",
  styleUrls: ["./create-list.component.css"]
})
export class CreateListComponent implements OnInit {
  constructor(private http: SearchService, private router: Router) {}

  ngOnInit() {}

  onSubmit(event) {
 
    const createList = new List();

    createList.title = event.title.value;
    createList.email = this.http.getEmail();


this.http.saveList(createList).subscribe(result => {
  this.router.navigateByUrl('/saved');
});

  }


}
