import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class RecipesService {

 

  constructor(private http: HttpClient) { }

getRecipes() {
  return this.http.get<any>(`http://api.yummly.com/v1/api/recipes?_app_id=dba541dd&_app_key=48390d4236721de97f3673b31bd4f52c`);
}

}
