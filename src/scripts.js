import "./styles.css";
// import apiCalls, { users } from "./apiCalls";
// import { ingredientsList, allRecipesList, user } from "./apiCalls";
// import RecipeRepository from "./classes/RecipeRepository";
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import loadData from "./apiCalls";
import "./images/turing-logo.png";
import User from "./classes/User";

console.log("Hello world");

// console.log("INGREDIENTS", ingredientsList);
// console.log("RECIPES", allRecipesList);
// console.log("USERS", users);

let userData;
let ingredientsData;
let recipeData;
let currentUser;

// const allRecipes = new RecipeRepository(allRecipesList);
Promise.all([
  loadData("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/users"),
  loadData(
    "https://what-s-cookin-starter-kit.herokuapp.com/api/v1/ingredients"
  ),
  loadData("https://what-s-cookin-starter-kit.herokuapp.com/api/v1/recipes"),
]).then((data) => {
  userData = data[0];
  ingredientsData = data[1];
  recipeData = data[2];

  generateRandomUser(userData);

  console.log(userData);
  console.log(ingredientsData);
  console.log(recipeData);
  console.log(currentUser);
});

function generateRandomUser(dataSet) {
  const randomIndex = getRandomIndex(dataSet.usersData.length);
  const randomUserData = dataSet.usersData[randomIndex];
  currentUser = new User(randomUserData);
}

function getRandomIndex(totalUsers) {
  return Math.floor(Math.random() * totalUsers);
}
