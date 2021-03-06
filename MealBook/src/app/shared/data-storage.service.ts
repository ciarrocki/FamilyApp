import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from '../recipes/recipe.model';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http
            .put('http://localhost:3000/RecipeBook/newrecipe', recipes)
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchRecipes() {
        this.http
            .get('http://localhost:3000/RecipeBook/getrecipes/user')
            .subscribe((recipes: Recipe[]) => {
                console.log(recipes);
                this.recipeService.setRecipes(recipes);
            })
    }

}
