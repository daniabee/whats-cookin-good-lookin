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
let currentPage = "allRecipes";

//Navbar VARIABLES ---------
//Home Page VARIABLES --------
//All Recipes Page VARIABLES --------
//Saved Recipes Page VARIABLES --------
//Specific Recipe Page VARIABLES --------
let currentRecipe;

//QUERY SELECTORS-----------------------------------------------
//Navbar QUERY SELECTORS ---------
const allReipesPageButton = document.querySelector(".all-recipes-button");
const savedReipesPageButton = document.querySelector(".saved-recipes-button");
//Home Page QUERY SELECTORS--------
//All Recipes Page QUERY SELECTORS--------
const allRecipesMain = document.querySelector(".all-recipes-main");
const allRecipesPageTitle = document.querySelector(".page-title");
const allRecipeThumbnailsSection = document.querySelector(
  ".all-recipe-thumbnails"
);
const allRecipeFilterTagOptions = document.querySelector(
  ".list-of-tag-options"
);
const dropDownSearchButton = document.querySelector(".drop-down-search");
//Saved Recipes Page QUERY SELECTORS--------
//Specific Recipe Page QUERY SELECTORS--------
const specificRecipePage = document.querySelector(".specific-recipe-page");
const specificRecipeHeading = document.querySelector(
  ".specific-recipe-heading"
);
const specificRecipeSaveButton = document.querySelector(".save-button");
const specificRecipeImage = document.querySelector(".specific-recipe-img");
const specificRecipeIngredients = document.querySelector(
  ".specific-recipe-ingredients-list"
);
const specificRecipeInstructions = document.querySelector(
  ".specific-recipe-instructions"
);
const specificRecipeCost = document.querySelector(".specific-recipe-cost");

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
  populateTagFilter(recipeData);

  allRecipes = new RecipeRepository(recipeData);

  console.log(allRecipes);
  console.log(currentUser);
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
//Home Page EVENT LISTENERS --------
//All Recipes Page EVENT LISTENERS --------
allRecipesMain.addEventListener("click", loadSpecificRecipe); //BRETT ADDITION, KEEP ✅
allReipesPageButton.addEventListener("click", displayAllRecipesPage);
dropDownSearchButton.addEventListener(".click", selectFilter);
//Saved Recipes Page EVENT LISTENERS --------
savedReipesPageButton.addEventListener("click", displaySavedRecipesPage);
//Specific Recipe Page EVENT LISTENERS --------
specificRecipeSaveButton.addEventListener("click", addToRecipesToCook);

//FUNCTIONS------------------------------------------------------
//Global FUNCTIONS -------------
//Navbar FUNCTIONS ---------
//Home Page FUNCTIONS --------
//All Recipes Page FUNCTIONS --------
function displayAllRecipesPage() {
  specificRecipePage.classList.add("hide");
  allRecipesMain.classList.remove("hide");
  console.log("I am listening!");
  createPageTitle("ALL RECIPES");
  displayRecipeThumbnails(allRecipes.listOfAllRecipes, "");
  createListOfTags(allRecipes.listOfAllRecipes);
}

function createPageTitle(title) {
  allRecipesPageTitle.innerText = title;
}

//Both ALL and Saved Recipe Pages
function displayRecipeThumbnails(recipesList, trashbin) {
  let recipesThumbnailsSection = "";
  recipesList.forEach((recipe) => {
    return (recipesThumbnailsSection += `<section    class="single-recipe-thumbnail" id = "${recipe.id}"> <img class="single-recipe-img" src=${recipe.image} alt=${recipe.name}> <div class="single-recipe-text"> <p class="recipe-title-text">${recipe.name}</p> <p>${trashbin}</p> </div> </section>`);
  });
  /* recipe.id is a number and we need to convert it to a string, I think what I have above should work....*/
  /* Potentially, i can put trashbin text in as an an argument and if it is saved page then when displayRecipeThumbnails is invoke, we pass in a trashbin icon as the argument and if not then we pass in an empty string- we will need to make sure that the css still works with this approach*/
  allRecipeThumbnailsSection.innerHTML = recipesThumbnailsSection;
}

function createListOfTags(recipesList) {
  let allTags = recipesList.reduce((prev, current) => {
    return prev.concat(current.tags);
  }, []);
  return allTags
    .filter((recipe, index) => allTags.indexOf(recipe) === index)
    .sort();
}

function createRecipesOfTag(tag, recipeList) {
  return recipeList.filter((recipe) => recipe.tags.includes(tag));
}

function populateTagFilter(recipeList) {
  let demoCount = 0;
  const tagsList = createListOfTags(recipeList);
  tagsList.forEach((tag) => {
    demoCount++;
    allRecipeFilterTagOptions.innerHTML += `
    <option class="tag-options-text" value="${demoCount}">${tag}</option>
  `;
  });
}

function selectFilter() {
  let tag = allRecipeFilterTagOptions.value;
  console.log(allRecipeFilterTagOptions.value);
  displayRecipesOfSameTag(tag, recipeData);
}

function displayRecipesOfSameTag(tag, recipeList) {
  const recipesWithTag = createRecipesOfTag(tag, recipeList);
  displayRecipeThumbnails(recipeList, "");
}

//Saved Recipes Page FUNCTIONS --------
function displaySavedRecipesPage() {
  specificRecipePage.classList.add("hide");
  allRecipesMain.classList.remove("hide");
  console.log("Save page listening");
  createPageTitle("SAVED RECIPES");
  displayRecipeThumbnails(currentUser.recipesToCook, "🗑");
  createListOfTags(currentUser.recipesToCook);
}

//Specific Recipe Page FUNCTIONS --------

function loadSpecificRecipe(event) {
  if (event.target.className === "single-recipe-img") {
    currentRecipe = allRecipes.listOfAllRecipes.find(
      (recipe) => recipe.id === +event.target.parentElement.id
    );
  }
  if (event.target.className === "recipe-title-text") {
    currentRecipe = allRecipes.listOfAllRecipes.find(
      (recipe) => recipe.id === +event.target.parentElement.parentElement.id
    );
  }
  if (
    event.target.className === "single-recipe-img" ||
    event.target.className === "recipe-title-text"
  ) {
    allRecipesMain.classList.add("hide");
    specificRecipePage.classList.remove("hide");

    (specificRecipeHeading.innerText = ""),
      (specificRecipeHeading.innerText = currentRecipe.name);

    specificRecipeImage.src = "";
    specificRecipeImage.src = currentRecipe.image;

    generateIngredientList(currentRecipe);
    generateInstructions(currentRecipe);
    generateCost(currentRecipe);
  }
}

function generateIngredientList(recipe) {
  const ingredientsListDisplay = recipe.ingredients.reduce((list, currIng) => {
    let ingredObj = {};
    ingredObj.name = ingredientsData.find((ing) => ing.id === currIng.id).name; //iterates over all ingredients to find name
    ingredObj.unit = currIng["quantity"]["unit"];
    ingredObj.amount = currIng["quantity"]["amount"];
    list.push(ingredObj);
    return list;
  }, []);

  specificRecipeIngredients.innerHTML = "";
  ingredientsListDisplay.forEach((ingredient) => {
    specificRecipeIngredients.innerHTML += `
    <li>${ingredient.amount} ${ingredient.unit} ${ingredient.name}</li>
    `;
  });
}

function generateInstructions(recipe) {
  specificRecipeInstructions.innerHTML = "";
  recipe.instructions.forEach((step) => {
    specificRecipeInstructions.innerHTML += `
    <li>${step["instruction"]}</li>
    `;
  });
}

function generateCost(recipe) {
  let totalCostDisplay = 0;
  recipe.getCosts(ingredientsData).forEach((cost) => {
    totalCostDisplay += cost;
  });

  specificRecipeCost.innerText = "";
  specificRecipeCost.innerText = `$${totalCostDisplay}`;
  console.log("total cost display: ", totalCostDisplay);
}

function addToRecipesToCook() {
  if (
    !currentUser.recipesToCook.some((recipe) => recipe.id === currentRecipe.id)
  ) {
    currentUser.addRecipe(currentRecipe.id, allRecipes);
    console.log("current user: ", currentUser);
  } else {
    console.log("NO");
  }
}
