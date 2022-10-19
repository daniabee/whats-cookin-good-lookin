import "./styles.css";
import apiCalls from "./apiCalls";
import { ingredientsList, allRecipesList, currentUsers } from "./apiCalls";
import RecipeRepository from "./classes/RecipeRepository";
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "./images/turing-logo.png";

console.log("Hello world");

console.log("YAAHSGKAJSHGAK", ingredientsList);
console.log("JHJJJJJJ", allRecipesList);
console.log("dskljhafkajshdf", currentUsers);

const allRecipes = new RecipeRepository(allRecipesList);

console.log(allRecipes);
