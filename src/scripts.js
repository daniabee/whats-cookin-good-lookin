import "./styles.css";
import apiCalls from "./apiCalls";
import { allRecipes } from "./apiCalls";
import RecipeRepository from "./classes/RecipeRepository";
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "./images/turing-logo.png";

console.log("Hello world");

// const allRecipes = new RecipeRepository();
// console.log(allRecipes);

console.log(
  "YAAAAAAAAA",
  allRecipes.filterByName("Loaded Chocolate Chip Pudding Cookie Cups")
);
