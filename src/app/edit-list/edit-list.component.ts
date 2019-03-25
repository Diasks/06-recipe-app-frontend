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
    const target = event.target;
    const title = target.querySelector("#title").value;
    const listId = +this.route.snapshot.paramMap.get("id");
    this.service.updateList(title, listId).subscribe(data => {
      if (data) {
        window.alert(`listan är uppdaterad och heter numera ${title}!`);
      }
    });
  }

}
