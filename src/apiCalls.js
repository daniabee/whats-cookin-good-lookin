// Your fetch requests will live here!
import RecipeRepository from "../src/classes/RecipeRepository";
import User from "./classes/User";
import Ingredient from "../src/classes/Ingredient-class";
import Recipe from "./classes/Recipe";
const allRecipes = new RecipeRepository();
const ingredientsList = [];
const allRecipesList = [];
const currentUsers = [];

fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users")
  .then((res) => res.json())
  .then((data) => {
    // currentUser.generateRandomUser(data.usersData);
    setUpUser(data.usersData);
  });

function setUpUser(dataSet) {
  const currentUser = new User();
  currentUser.generateRandomUser(dataSet);
  currentUsers.push(currentUser);
}

console.log("I will be a fetch request!");

fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients")
  .then((res) => res.json())
  .then((data) => {
    setUp(data.ingredientsData, ingredientsList, Ingredient);
  });

function setUp(dataSet, listArray, classType) {
  dataSet.forEach((element) => {
    listArray.push(new classType(element));
  });
}

fetch("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes")
  .then((res) => res.json())
  .then((data) => {
    setUp(data.recipeData, allRecipesList, Recipe);
  });

export { allRecipes, ingredientsList, allRecipesList, currentUsers };
