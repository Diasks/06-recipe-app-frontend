import { SearchItem } from '../Searchitem.model';

export class Saved {
public id: number;
public title; string;
public recipe: SearchItem[];
public user_id: number;

constructor(id: number, title: string, recipe: SearchItem[], user_id: number){
    this.id = id;
    this.title = title;
    this.recipe = recipe;
    this.user_id = user_id;
}

}