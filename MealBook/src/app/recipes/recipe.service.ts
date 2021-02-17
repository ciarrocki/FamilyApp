import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            'A Test Dinner', 
            'This is simply a test', 
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwfGF7L9LnQ3kKpeUC07OZS80GDrK16vVLEg&usqp=CAU',
            [
            ]),
        new Recipe(
            'Chicken Tikka Lunch', 
            'Test prepared meal', 
            'https://images.freshop.com/00825120004017/2e158c61d5160edab1b50ef31e8246fa_large.png', 
            [
                new Ingredient('Cafe Spice Chicken Tikka Masala', 1),
            ]),
        new Recipe('Beef Stew', 
            'Marisa\'s Famous Beef Stew', 
            'https://amyinthekitchen.com/wp-content/uploads/2019/10/Instant-Pot-Beef-Stew-Recipe-7.jpg', 
            [
                new Ingredient('Meat', 1), 
                new Ingredient('Potatoes', 5), 
                new Ingredient('Beef Stock', 1),
                new Ingredient('French Bread', 1),
            ]),
    ];

    constructor(private shoppingListService: ShoppingListService) {}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
    }

    getRecipes() {
        return this.recipes.slice();
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, updatedRecipe: Recipe) {
        this.recipes[index] = updatedRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}