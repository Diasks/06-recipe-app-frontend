import { HttpClient, HttpClientModule } from "@angular/common/http";
import { SearchItem } from "./Searchitem.model";
import { Injectable } from "@angular/core";

import { environment } from "src/environments/environment";
import { Observable, BehaviorSubject } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Saved } from './saved/saved.model';

const apiRoot = environment.apiRoot;
const apiRootId = environment.apiRootId;
const apiId = environment.apiId;
const apiKey = environment.apiKey;
const API_URL = environment.apiURL;

@Injectable()
export class SearchService {
  private results$ = new BehaviorSubject<Array<any>>([]);
  public matches = this.results$.asObservable()

  constructor(private http: HttpClient) {}

  getAppetizer() {
    return this.http.get<any>(
      `${apiRoot}_app_id=${apiId}&_app_key=${apiKey}&allowedCourse[]=course^course-Appetizers`
    );
  }

  getDinner() {
    return this.http.get<any>(
      `${apiRoot}_app_id=${apiId}&_app_key=${apiKey}&allowedCourse[]=course^course-MainDishes`
    );
  }

  getDessert() {
    return this.http.get<any>(
      `${apiRoot}_app_id=${apiId}&_app_key=${apiKey}&allowedCourse[]=course^course-Desserts`
    );
  }

  // searchRecipe(term: string){
  //   return this.http.get<SearchItem>(`${apiRoot}_app_id=${apiId}&_app_key=${apiKey}&q=${term}`);

  // }

  getRecipeId(recipeId: string): Observable<SearchItem[]> {
    return this.http.get<SearchItem[]>(
      `${apiRootId}${recipeId}?_app_id=${apiId}&_app_key=${apiKey}`
    );
  }

  searchRecipe(term: string) {
    return this.http.get(
      `${apiRoot}_app_id=${apiId}&_app_key=${apiKey}&q=${term}`
    ).pipe(
      map((result: any) => result.matches)
    ).subscribe(results => {
      return this.results$.next([results]);
    });
  }

  //hämta alla listor
public getAll(): Observable<[any]> {
  return this.http.get<any>(`${API_URL}/recipeLists`);
}

public get(listId: number): Observable<any> {
  return this.http.get<any>(`${API_URL}/recipeLists/${listId}`);
}

public delete(listId: number) {
  return this.http.delete(`${API_URL}/recipeLists/${listId}`);
}



getLists() {
   const LISTS = [];
   const promise = new Promise((resolve,reject)=>{
     fetch('http://recipeapp.test/api/recipeLists').then(res=>res.json())
     .then(res=> {
       res.forEach(item => {
         LISTS.push(new Saved(
item.id,
item.title,
item.recipes));
       });
       resolve(LISTS);
     });
   });
   return promise;
  }


addRecipeToList(listId: number, recipeId: string){
  const recipes = this.getList(listId)
  .then((saved: Saved[])=> {
    return saved;
  })
const promise = new Promise((resolve, reject)=> {
  fetch(`http://recipeapp.test/api/recipeLists/${listId}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  method: 'put',
  body: JSON.stringify({
  recipes: [recipeId]
  })
  })
  .then(res=> res.json())
  .then(res=>{

    console.log(res);
  });
});
return promise;

}

getList(listId: number) {
  let list: Saved;
const promise = new Promise((resolve, reject)=>{
  fetch (`http://recipeapp.test/api/recipeLists/${listId}`)
  .then(res => res.json())
  .then (res => {
    list = new Saved(
res.id,
res.title,
res.recipes
);
resolve(list);
  });
});
return promise;

}

registerUser(name, email, password, password_confirmation)
{
  return this.http.post('http://recipeapp.test/api/register',
  {
    name,
    email,
    password,
    password_confirmation
  })
}


getUserDetails(email, password)
{
  return this.http.post('http://recipeapp.test/api/login',
  {
    email,
    password
  })
}




createList(title, user_id) {
  return this.http.post('http://recipeapp.test/api/recipeLists',
  {
title,
user_id
  })
}


removeRecipeList(listId) {
  return this.http.delete(`http://recipeapp.test/api/recipeLists/${listId}`);
}


// logout() {
//   this.http.logout();
// }

}
