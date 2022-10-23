//IMPORTS--------------------------------------------------------

import "./styles.css";
import loadData from "./apiCalls";
import RecipeRepository from "./classes/RecipeRepository";
import Recipe from "./classes/Recipe";
import Ingredient from "./classes/Ingredient-class";
import User from "./classes/User";
import "./images/turing-logo.png";
import "./images/AndrewProfile.png";
import "./images/BrettProfile.png";
import "./images/CourtneyProfile.png";
import "./images/DaniProfile.png";

//VARIABLES-----------------------------------------------------
//Global VARIABLES ---------
let userData;
let ingredientsData;
let recipeData;
let currentUser;
let allRecipes;

//Navbar VARIABLES ---------
//Home Page VARIABLES --------
//All Recipes Page VARIABLES --------
//Saved Recipes Page VARIABLES --------
//Specific Recipe Page VARIABLES --------


//QUERY SELECTORS-----------------------------------------------
//Navbar QUERY SELECTORS ---------
const userName = document.querySelector('#userName');
const homeButton = document.querySelector('#homeButton');
const aboutButton = document.querySelector('#aboutButton')
const allRecipesButton = document.querySelector('#allRecipesButton')
const savedRecipeButton = document.querySelector('#savedRecipesButton')
const searchButton = document.querySelector('#searchButton')
const searchButtonInput = document.querySelector('#searchInput')
const homePage = document.querySelector('#homePage')
const aboutPage = document.querySelector('#aboutPage')
const allRecipesMain = document.querySelector('#recipePages')
const specificRecipePage = document.querySelector('#specificRecipePage')
//Home Page QUERY SELECTORS--------
const recipeDisplay = document.querySelector('#featuredRecipeDisplay')
const featuredRecipeName = document.querySelector('#featuredRecipeName')
const appetizerFilter = document.querySelector('#appetizerFilter')
const mainCourseFilter = document.querySelector('#mainCourseFilter')
const snackFilter = document.querySelector('#snackFilter')
//All Recipes Page QUERY SELECTORS--------
//Saved Recipes Page QUERY SELECTORS--------
//Specific Recipe Page QUERY SELECTORS--------


//FETCH/CALL FUNCTIONS-------------------------------------------

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

  createInstances(recipeData, ingredientsData, userData);

    allRecipes = new RecipeRepository(recipeData);
    console.log(allRecipes)
    console.log(currentUser)
});

function createInstances(dataSet1, dataSet2, dataSet3) {
  makeRecipesList(dataSet1);
  makeIngredientsList(dataSet2);
  currentUser = new User();
  currentUser.generateRandomUser(dataSet3.usersData);
}

function makeRecipesList(dataSet) {
  recipeData = dataSet.recipeData.map((element) => {
    return new Recipe(element);
  });
}

function makeIngredientsList(dataSet) {
  ingredientsData = dataSet.ingredientsData.map((element) => {
    return new Ingredient(element);
  });
}

//EVENT LISTENERS-------------------------------------------------
//Navbar EVENT LISTENERS ---------
homeButton.addEventListener('click', displayHomePage)
aboutButton.addEventListener('click', displayAboutPage)
allRecipesButton.addEventListener('click', displayAllRecipes)
savedRecipeButton.addEventListener('click', displaySavedRecipes)
searchButton.addEventListener('click', displayARecipe)
//Home Page EVENT LISTENERS --------
//All Recipes Page EVENT LISTENERS --------
//Saved Recipes Page EVENT LISTENERS --------
//Specific Recipe Page EVENT LISTENERS --------


//FUNCTIONS------------------------------------------------------
//Global FUNCTIONS -------------
//Navbar FUNCTIONS ---------
function displayAPage(appear, goAway1, goAway2, goAway3) {
  appear.classList.remove('hide')
  goAway1.classList.add('hide')
  goAway2.classList.add('hide')
  goAway3.classList.add('hide')
}
function displayHomePage() {
  displayAPage(homePage, aboutPage, allRecipesMain, specificRecipePage)
}

function displayAboutPage() {
  displayAPage(aboutPage, homePage, allRecipesMain, specificRecipePage)

}

function displayAllRecipes() {
  displayAPage(allRecipesMain, homePage, aboutPage, specificRecipePage)
}

function displaySavedRecipes() {
  displayAPage(allRecipesMain, homePage, aboutPage, specificRecipePage)
}

function displayARecipe() {
  displayAPage(specificRecipePage, allRecipesMain, homePage, aboutPage)
}
//Home Page FUNCTIONS --------


//All Recipes Page FUNCTIONS --------
//Saved Recipes Page FUNCTIONS --------
//Specific Recipe Page FUNCTIONS --------
