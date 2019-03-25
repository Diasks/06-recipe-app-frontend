import { HttpClient } from "@angular/common/http";
import { SearchItem } from "./Searchitem.model";
import { Injectable } from "@angular/core";

import { environment } from "src/environments/environment";
import { Observable, BehaviorSubject } from "rxjs";
import {  map } from "rxjs/operators";
import { List } from "./create-list/list.model";

const apiRoot = environment.apiRoot;
const apiRootId = environment.apiRootId;
const apiId = environment.apiId;
const apiKey = environment.apiKey;
const API_URL = environment.apiURL;

@Injectable()
export class SearchService {

  private userUrl = "http://api.dianaskshipek.chas.academy/api";
  private iss = {
    login : 'http://api.dianaskshipek.chas.academy/api/login',
    register : 'http://api.dianaskshipek.chas.academy/api/register'
  }

 
  private results$ = new BehaviorSubject<Array<any>>([]);
  public matches = this.results$.asObservable();

  constructor(private http: HttpClient) {}



register(data) {
  return this.http.post(`${this.userUrl}/register`, data)
}

login(data) {
  return this.http.post(`${this.userUrl}/login`, data)
}

//ta token och email från register och login, skicka dessa vidare till funktionerna för set.token och set.email för att kunna lägg dom i localstorage.
handle(token, email) {
  this.set(token);
  this.setEmail(email);
}

// När användaren har loggat in så lägger jag token i localstorage
set(token) {
  localStorage.setItem('token', token);
}

//hämta min token från localstorage
get() {
  return localStorage.getItem('token');
}

//ta min bort token från localstorage
remove() {
  localStorage.removeItem('token');
}

//Kollar om min token är valid 
isValid() {
  const token = this.get();
  if(token) {
    const payload = this.payload(token);
    if(payload) {
      return Object.values(this.iss).indexOf(payload.iss) > -1 ? true: false
    }
  }
  return false;
}

//splittrar min token
payload(token) {
  const payload = token.split('.')[1];
  return this.decode(payload);
}

//Parsar igenom payloaden 
decode(payload) {
  return JSON.parse(atob(payload));
}


loggedIn() {
  return this.isValid();
}

// här hämtar jag ut emailen från localstorage
getEmail() {
  return localStorage.getItem('email');
}

// När användaren har loggat in så lägger jag emailen i localstorage
setEmail(email) {
  localStorage.setItem('email', email);
}

// funktion jag använder när användaren klickar på logga ut eftersom jag vill radera emailen från localstorage 
removeEmail() {
  localStorage.removeItem('email');
}

  getRecipeId(recipeId: string): Observable<SearchItem[]> {
    return this.http.get<SearchItem[]>(
      `${apiRootId}${recipeId}?_app_id=${apiId}&_app_key=${apiKey}`
    );
  }

  searchRecipeDesserts(term: string) {
    return this.http
      .get(
        `${apiRoot}_app_id=${apiId}&_app_key=${apiKey}&q=${term}&&allowedCourse[]=course^course-Desserts&maxResult=20&start=20`
      )
      .pipe(map((result: any) => result.matches))
      .subscribe(results => {
        return this.results$.next([results]);
      });
  }

  searchRecipeAppetizers(term: string) {
    return this.http
      .get(
        `${apiRoot}_app_id=${apiId}&_app_key=${apiKey}&q=${term}&allowedCourse[]=course^course-Appetizers&maxResult=20&start=20`
      )
      .pipe(map((result: any) => result.matches))
      .subscribe(results => {
        return this.results$.next([results]);
      });
  }

  searchRecipeMainDishes(term: string) {
    return this.http
      .get(
        `${apiRoot}_app_id=${apiId}&_app_key=${apiKey}&q=${term}&allowedCourse[]=course^course-MainDishes&maxResult=20&start=20`
      )
      .pipe(map((result: any) => result.matches))
      .subscribe(results => {
        return this.results$.next([results]);
      });
  }

  searchRecipe(term: string) {
    return this.http
      .get(
        `${apiRoot}_app_id=${apiId}&_app_key=${apiKey}&q=${term}&maxResult=20&start=20`
      )
      .pipe(map((result: any) => result.matches))
      .subscribe(results => {
        return this.results$.next([results]);
      });
  }

  searchRecipeVegan(term: string) {
    return this.http
      .get(
        `${apiRoot}_app_id=${apiId}&_app_key=${apiKey}&q=${term}&allowedDiet[]=386^Vegan&maxResult=20&start=20`
      )
      .pipe(map((result: any) => result.matches))
      .subscribe(results => {
        return this.results$.next([results]);
      });
  }

  searchRecipeVegetarian(term: string) {
    return this.http
      .get(
        `${apiRoot}_app_id=${apiId}&_app_key=${apiKey}&q=${term}&allowedDiet[]=388^Lacto vegetarian&maxResult=20&start=20`
      )
      .pipe(map((result: any) => result.matches))
      .subscribe(results => {
        return this.results$.next([results]);
      });
  }
  searchRecipeGluten(term: string) {
    return this.http
      .get(
        `${apiRoot}_app_id=${apiId}&_app_key=${apiKey}&q=${term}&allowedAllergy[]=393^Gluten-Free&maxResult=20&start=20`
      )
      .pipe(map((result: any) => result.matches))
      .subscribe(results => {
        return this.results$.next([results]);
      });
  }

  searchRecipeLactos(term: string) {
    return this.http
      .get(
        `${apiRoot}_app_id=${apiId}&_app_key=${apiKey}&q=${term}&allowedAllergy[]=396^Dairy-Free&maxResult=20&start=20`
      )
      .pipe(map((result: any) => result.matches))
      .subscribe(results => {
        return this.results$.next([results]);
      });
  }

//Uppdatera titeln på min lista
  updateList(title: string, listId): Observable<any> {
    return this.http.patch(`http://api.dianaskshipek.chas.academy/api/lists/${listId}`, {
 

      title: title
    });
  }

//Spara ny lista
  saveList(List: List): any {
    return this.http.post<List>(`http://api.dianaskshipek.chas.academy/api/lists/add`, List);
  }

//Spara recept till lista
  saveRecipe(recipeAdd): Observable<any> {
    let recipeId = recipeAdd.recipe;
    let listId = recipeAdd.listId;
    return this.http.patch(`http://api.dianaskshipek.chas.academy/api/lists/${listId}`, {
     recipeId    
    }) 
  };

//Hämta lista för specifik användare
  getList(email:string) : any {
    return this.http.get<List[]>(`http://api.dianaskshipek.chas.academy/api/lists/${email}`);
  }

//Radera specifik lista
  deleteList(id:number): Observable<{}> {
   return this.http.delete(`http://api.dianaskshipek.chas.academy/api/lists/${id}`);

  }

//Radera specifikt recept från en specifik lista
  deleteRecipeList(listId: number, recipeId: string): Observable<{}> {
   return this.http.delete(`http://api.dianaskshipek.chas.academy/api/lists/${listId}/${recipeId}`);
 

}
}