import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search-service.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes$;

  constructor(private appetizerService: SearchService) {
  }

  ngOnInit() {
    this.recipes$ = this.appetizerService.matches
  }
}
