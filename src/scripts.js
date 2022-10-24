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
let currentPage;

//Navbar VARIABLES ---------

//Home Page VARIABLES --------

//All Recipes Page VARIABLES --------
//Saved Recipes Page VARIABLES --------
//Specific Recipe Page VARIABLES --------
let currentRecipe;

//QUERY SELECTORS-----------------------------------------------
//Navbar QUERY SELECTORS ---------
const userName = document.querySelector("#userName");
const homeButton = document.querySelector("#homeButton");
const aboutButton = document.querySelector("#aboutButton");
const allRecipesButton = document.querySelector("#allRecipesButton");
const savedRecipeButton = document.querySelector("#savedRecipesButton");
const searchButton = document.querySelector("#searchButton");
const searchButtonInput = document.querySelector("#searchInput");
const homePage = document.querySelector("#homePage");
const aboutPage = document.querySelector("#aboutPage");

//Home Page QUERY SELECTORS--------
const recipeDisplay = document.querySelector("#featuredRecipeDisplay");
const featuredRecipeName = document.querySelector("#featuredRecipeName");
const appetizerFilter = document.querySelector("#appetizerFilter");
const mainCourseFilter = document.querySelector("#mainCourseFilter");
const snackFilter = document.querySelector("#snackFilter");

//All Recipes Page QUERY SELECTORS--------
const allRecipesMain = document.querySelector(".all-recipes-main");
const allRecipesPageTitle = document.querySelector(".page-title");
const allRecipeThumbnailsSection = document.querySelector(
  ".all-recipe-thumbnails"
);
const allRecipeFilterTagOptions = document.querySelector(
  ".list-of-tag-options"
);
const searchFilterButton = document.querySelector(".filter-button");
const inputForTags = document.querySelector(".list-of-tag-options");

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
  allRecipes = new RecipeRepository(recipeData);
  populateTagFilter(allRecipes.listOfAllRecipes);
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
homeButton.addEventListener("click", displayHomePage);
aboutButton.addEventListener("click", displayAboutPage);
allRecipesButton.addEventListener("click", displayAllRecipes);
savedRecipeButton.addEventListener("click", displaySavedRecipes);
searchButton.addEventListener("click", displaySearchRecipes);

//Home Page EVENT LISTENERS --------
//All Recipes Page EVENT LISTENERS --------
allRecipesMain.addEventListener("click", loadSpecificRecipe);
allRecipesButton.addEventListener("click", displayAllRecipesPage);
searchFilterButton.addEventListener("click", displayRecipesOfSameTag);

//Saved Recipes Page EVENT LISTENERS --------
savedRecipeButton.addEventListener("click", displaySavedRecipesPage);
allRecipeThumbnailsSection.addEventListener("click", deleteSavedRecipe);

//Specific Recipe Page EVENT LISTENERS --------
specificRecipeSaveButton.addEventListener("click", addToRecipesToCook);

//FUNCTIONS------------------------------------------------------
//Global FUNCTIONS -------------
//Navbar FUNCTIONS ---------
function displayAPage(appear, goAway1, goAway2, goAway3) {
  appear.classList.remove("hide");
  goAway1.classList.add("hide");
  goAway2.classList.add("hide");
  goAway3.classList.add("hide");
}
function displayHomePage() {
  displayAPage(homePage, aboutPage, allRecipesMain, specificRecipePage);
  currentPage = "home";
}

function displayAboutPage() {
  displayAPage(aboutPage, homePage, allRecipesMain, specificRecipePage);
  currentPage = "about";
}

function displayAllRecipes() {
  displayAPage(allRecipesMain, homePage, aboutPage, specificRecipePage);
  currentPage = "all";
}

function displaySavedRecipes() {
  displayAPage(allRecipesMain, homePage, aboutPage, specificRecipePage);
  currentPage = "saved";
}

function displayARecipe() {
  displayAPage(specificRecipePage, allRecipesMain, homePage, aboutPage);
  currentPage = "specific";
}
function displaySearchRecipes() {
  
  let foodOptions;
  let userInput = searchButtonInput.value.toLowerCase();
  
  if(currentPage === 'saved') {
    foodOptions = currentUser.recipesToCook;
    
  }
  else { 
    displayAllRecipes()
    foodOptions = allRecipes.listOfAllRecipes 
  }
  const recipeFilterName = foodOptions.filter(recipe => recipe.name.toLowerCase() === userInput )
  const recipeFilterByTag = createRecipesOfTag(userInput,foodOptions)
    
  if(recipeFilterName.length === 0 && recipeFilterByTag.length !== 0 ) {
    displayRecipeThumbnails(recipeFilterByTag,'','')
    
  } 
  else if (recipeFilterName.length !== 0 && recipeFilterByTag.length === 0) {
    displayRecipeThumbnails(recipeFilterName,'','')
    
  } else {
    allRecipeThumbnailsSection.innerHTML = "<h3> Sorry your dish can't be found ... order out!</h3>";
  }
  searchButtonInput.innerText = '';
}
//Home Page FUNCTIONS --------
//All Recipes Page FUNCTIONS --------
function displayAllRecipesPage() {
  // specificRecipePage.classList.add('hide');
  // allRecipesMain.classList.remove('hide');
  createPageTitle("ALL RECIPES");
  displayRecipeThumbnails(
    allRecipes.listOfAllRecipes,
    "",
    "all-recipe-thumbnail"
  );
  createListOfTags(allRecipes.listOfAllRecipes);
}

function createPageTitle(title) {
  allRecipesPageTitle.innerText = title;
}

//Both ALL and Saved Recipe Pages
function displayRecipeThumbnails(recipesList, trashbin, trashbinClass) {
  let recipesThumbnailsSection = "";
  recipesList.forEach((recipe) => {
    return (recipesThumbnailsSection += `<section class="single-recipe-thumbnail" id = "${recipe.id}"> <img class="single-recipe-img" src=${recipe.image} alt=${recipe.name}> <div class="single-recipe-text"> <p class="recipe-title-text">${recipe.name}</p> <p class=${trashbinClass}>${trashbin}</p> </div> </section>`);
  });
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

function populateTagFilter(recipeList) {
  let demoCount = 0;
  const tagsList = createListOfTags(recipeList);
  tagsList.forEach((tag) => {
    demoCount++;
    allRecipeFilterTagOptions.innerHTML += `
    <option class="tag-options-text hover" value="${tag}">${tag}</option>
  `;
  });
}

function createRecipesOfTag(tag, recipeList) {
  return recipeList.filter((recipe) => recipe.tags.includes(tag));
}

function displayRecipesOfSameTag() {
  let recipesToTag;
  if (currentPage === "saved") {
    recipesToTag = createRecipesOfTag(
      inputForTags.value,
      currentUser.recipesToCook
    );
  } else {
    recipesToTag = createRecipesOfTag(
      inputForTags.value,
      allRecipes.listOfAllRecipes
    );
  }
  displayRecipeThumbnails(recipesToTag, "", "");
}

//Saved Recipes Page FUNCTIONS --------

function displaySavedRecipesPage() {
  specificRecipePage.classList.add("hide");
  allRecipesMain.classList.remove("hide");
  
  createPageTitle(`${currentUser.name.toUpperCase()}'S SAVED RECIPES`);
  displayRecipeThumbnails(currentUser.recipesToCook, "🗑", "delete-recipe");
  createListOfTags(currentUser.recipesToCook);
}

function deleteSavedRecipe(event) {
  if (event.target.classList.contains('delete-recipe')) {
    currentUser.removeRecipe(+event.target.parentElement.parentElement.id)
    displayRecipeThumbnails(currentUser.recipesToCook, '🗑', 'delete-recipe')
  }
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
    if (currIng["quantity"]["amount"] % 1 === 0) {
      ingredObj.amount = currIng["quantity"]["amount"];
    } else {
      ingredObj.amount = currIng["quantity"]["amount"].toFixed(2);
    }
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
  recipe.getDirections().forEach((step) => {
    specificRecipeInstructions.innerHTML += `
    <li>${step}</li>
    `;
  });
}

function generateCost(recipe) {
  let totalCostDisplay = 0;
  recipe.getCosts(ingredientsData).forEach((cost) => {
    totalCostDisplay += cost;
  });

  specificRecipeCost.innerText = "";
  specificRecipeCost.innerText = `$${totalCostDisplay.toFixed(2)}`;
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
