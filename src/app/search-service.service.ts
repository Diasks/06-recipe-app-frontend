import { HttpClient } from "@angular/common/http";
import { SearchItem } from "./Searchitem.model";
import { Injectable } from "@angular/core";

import { environment } from "src/environments/environment";
import { Observable, BehaviorSubject } from "rxjs";
import {  map } from "rxjs/operators";
import { Saved } from "./saved/saved.model";

const apiRoot = environment.apiRoot;
const apiRootId = environment.apiRootId;
const apiId = environment.apiId;
const apiKey = environment.apiKey;
const API_URL = environment.apiURL;

@Injectable()
export class SearchService {
  private results$ = new BehaviorSubject<Array<any>>([]);
  public matches = this.results$.asObservable();

  constructor(private http: HttpClient) {}

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

  getLists() {
    const LISTS = [];
    const promise = new Promise((resolve, reject) => {
      fetch("http://api.dianaskshipek.chas.academy/api/recipeLists")
        .then(res => res.json())
        .then(res => {
          res.forEach(item => {
            LISTS.push(
              new Saved(item.id, item.title, item.recipes, item.user_id)
            );
          });
          resolve(LISTS);
        });
    });
    return promise;
  }

  getList(listId: number) {
    let list: Saved;
    const promise = new Promise((resolve, reject) => {
      fetch(`http://api.dianaskshipek.chas.academy/api/recipeLists/${listId}`)
        .then(res => res.json())
        .then(res => {
          list = new Saved(res.id, res.title, res.recipe, res.user_id);
          resolve(list);
        });
    });
    return promise;
  }

  registerUser(
    name: string,
    email: string,
    password: string,
    password_confirmation: string
  ) {
    return this.http.post("http://api.dianaskshipek.chas.academy/api/register", {
      name,
      email,
      password,
      password_confirmation
    });
  }

  getUserDetails(email: string, password: string): Observable<any> {
    return this.http.post("http://api.dianaskshipek.chas.academy/api/login", {
      email,
      password
    });
  }

  updateList(title: string, listId): Observable<any> {

    return this.http.put(`http://api.dianaskshipek.chas.academy/api/recipeLists/${listId}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },

      title: title
    });
  }

  createList(title: string, user_id: number): Observable<any> {
    return this.http.post("http://api.dianaskshipek.chas.academy/api/recipeLists", {
      title,
      user_id
    });
  }

  addRecipeToList(listId: number, recipeId: string): Observable<any> {
    return this.http.put(`http://api.dianaskshipek.chas.academy/api/recipeLists/${listId}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },

      recipe: recipeId
    });
  }

  removeRecipeList(listId: number): Observable<any> {
    return this.http.delete(`${API_URL}api/recipeLists/${listId}`);
  }
}
