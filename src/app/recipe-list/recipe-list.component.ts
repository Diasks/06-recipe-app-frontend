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




















  
  getAppetizer () {
    debugger;
    this.recipes$ = this.appetizerService.matches['Appetizers'](data =>{
      this.recipes$ = data['Appetizers']
      console.log(this.recipes$)
    })
  }
  
  getDesserts () {
    debugger;
    this.recipes$ = this.appetizerService.matches['Course']['Desserts'].subscribe(data =>{
      console.log(data)
    })
  }

  getMainDishes() {
    debugger;
    this.recipes$ = this.appetizerService.matches['Course']['Maindishes'].subscribe(data =>{
      console.log(data)
  })}

}
