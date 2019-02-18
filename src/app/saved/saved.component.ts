import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search-service.service';
import { Saved } from './saved.model';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.css']
})
export class SavedComponent implements OnInit {
saved: Saved[];
  constructor(private savedService: SearchService) { }

  ngOnInit() {
    const that = this;
   this.savedService.getLists().then((saved: Saved[]) => {
     return that.saved = saved;
   });
  }




  removeList(listId:number) {
    debugger;
this.savedService.removeRecipeList(listId);
debugger;
  }
}
