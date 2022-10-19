// Your fetch requests will live here!
import RecipeRepository from "../src/classes/RecipeRepository";
const allRecipes = new RecipeRepository();
console.log(allRecipes);

fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });

console.log("I will be a fetch request!");

fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });

fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    allRecipes.addRecipes(data.recipeData);
  });

console.log("WHAAAAT", allRecipes);

export { allRecipes };
