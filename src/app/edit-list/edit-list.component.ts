import { Component, OnInit } from '@angular/core';
import { SearchService } from "../search-service.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit {

  constructor(private service: SearchService, private route: ActivatedRoute) { }

  ngOnInit() {
  }



  onSubmit(event) {
    debugger;
    const target = event.target;
    debugger;
    const title = target.querySelector("#title").value;
    const listId = +this.route.snapshot.paramMap.get("id");
    debugger;
    this.service.updateList(title, listId).subscribe(data => {
      debugger;
      if (data) {
        window.alert(`listan är uppdaterad och heter numera ${title}!`);
      }
    });
  }

}
