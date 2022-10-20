import "./styles.css";
import apiCalls, { users } from "./apiCalls";
import { ingredientsList, allRecipesList, user } from "./apiCalls";
import RecipeRepository from "./classes/RecipeRepository";
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "./images/turing-logo.png";
import User from "./classes/User";

console.log("Hello world");

console.log("INGREDIENTS", ingredientsList);
console.log("RECIPES", allRecipesList);
console.log("USERS", users);

const allRecipes = new RecipeRepository(allRecipesList);
