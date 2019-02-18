import { SearchItem } from '../Searchitem.model';

export class Saved {
public id: number;
public title; string;
public recipes: SearchItem[];

constructor(id: number, title: string, recipes: SearchItem[]){
    this.id = id;
    this.title = title;
    this.recipes = recipes;
}

}