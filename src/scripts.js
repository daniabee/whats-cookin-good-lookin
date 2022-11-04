//IMPORTS--------------------------------------------------------
import "./styles.css";
import loadData from "./apiCalls";
import RecipeRepository from "./classes/RecipeRepository";
import Recipe from "./classes/Recipe";
import Ingredient from "./classes/Ingredient";
import User from "./classes/User";
import "./images/turing-logo.png";
import "./images/Asset0.png";
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
const specificRecipeSavedAlert = document.querySelector(".recipe-saved-text");
const specificRecipeImage = document.querySelector(".specific-recipe-img");
const specificRecipeIngredients = document.querySelector(
  ".specific-recipe-ingredients-list"
);
const specificRecipeInstructions = document.querySelector(
  ".specific-recipe-instructions"
);
const specificRecipeCost = document.querySelector(".specific-recipe-cost");

//User Pantry Page
const userPantryPage = document.querySelector(".user-pantry");
const userPantryButton = document.querySelector("#userPantryButton");
const userPantryTitle = document.querySelector(".user-pantry-title");
const ingredientList = document.querySelector(".ingredient-list");
const ingredientNameInput = document.querySelector("#ingred-name");
const ingredientAmountInput = document.querySelector("#ingred-amount");
const submitIngredientButton = document.querySelector(
  "#submit-ingredient-button"
);
const errorUnfilled = document.querySelector(".error-unfilled");
const errorNotRecognized = document.querySelector(".error-not-recognized");
const errorNotANumber = document.querySelector(".error-not-number");

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

//User Pantry Page
userPantryButton.addEventListener("click", displayUserPantry);
submitIngredientButton.addEventListener("click", addIngredientToPantry);

//FUNCTIONS------------------------------------------------------
//Global FUNCTIONS -------------
//Navbar FUNCTIONS ---------
function displayAPage(appear, goAway1, goAway2, goAway3, goAway4) {
  show(appear);
  hide(goAway1);
  hide(goAway2);
  hide(goAway3);
  hide(goAway4);
}

function displayHomePage() {
  displayAPage(
    homePage,
    aboutPage,
    allRecipesMain,
    specificRecipePage,
    userPantryPage
  );
  currentPage = "home";
  changeButtonColor();
  searchButtonInput.value = "";
  searchButtonInput.placeholder = `Search all recipes`;
}

function displayAboutPage() {
  displayAPage(
    aboutPage,
    homePage,
    allRecipesMain,
    specificRecipePage,
    userPantryPage
  );
  currentPage = "about";
  changeButtonColor();
  searchButtonInput.value = "";
  searchButtonInput.placeholder = `Search all recipes`;
}

function displayAllRecipes() {
  displayAPage(
    allRecipesMain,
    homePage,
    aboutPage,
    specificRecipePage,
    userPantryPage
  );
  currentPage = "all";
  changeButtonColor();
  searchButtonInput.value = "";
  searchButtonInput.placeholder = `Search ${currentPage} recipes`;
}

function displaySavedRecipes() {
  displayAPage(
    allRecipesMain,
    homePage,
    aboutPage,
    specificRecipePage,
    userPantryPage
  );
  currentPage = "saved";
  searchButtonInput.value = "";
  searchButtonInput.placeholder = `Search ${currentPage} recipes`;
  changeButtonColor();
 
}

function displayUserPantry() {
  displayAPage(
    userPantryPage,
    homePage,
    aboutPage,
    specificRecipePage,
    allRecipesMain
  );
  displayUserIngredients();
  currentPage = "userPantry";
  userPantryTitle.innerHTML = `${currentUser.name}'s Pantry`;
  searchButtonInput.value = "";
  searchButtonInput.placeholder = `Search all recipes`;
  changeButtonColor();
}

function displayARecipe() {
  displayAPage(specificRecipePage, allRecipesMain, homePage, aboutPage);
  currentPage = "specific";
  changeButtonColor();
}

function displaySearchRecipes() {
  let userInput = searchButtonInput.value;
  let recipesFilteredName;

  if (currentPage === "saved") {
    recipesFilteredName = currentUser.recipesToCook.filterByName(userInput);
  } else {
    displayAllRecipes();
    recipesFilteredName = allRecipes.filterByName(userInput);
  }

  if (recipesFilteredName.length !== 0) {
    displayRecipeThumbnails(recipesFilteredName, "", "");
  } else {
    allRecipeThumbnailsSection.innerHTML =
      "<h3 class='error-message'> Sorry, no dish with that name or tag can be be found ... order out!</h3>";
  }
  searchButtonInput.value = "";
}
//Home Page FUNCTIONS --------

//All Recipes Page FUNCTIONS --------
function displayAllRecipesPage() {
  createPageTitle("All Recipes");
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
  sortByCookable(currentUser)
  recipesList.forEach((recipe) => {
    console.log('WOWZA',sortByCookable(currentUser).readyToCook)
    if(sortByCookable(currentUser).notReady.includes(recipe) && currentPage === 'saved'){
      return (recipesThumbnailsSection +=
        `<section class="single-recipe-thumbnail" id = "${recipe.id}"> 
          <img class="single-recipe-img transparent" src=${recipe.image} alt=${recipe.name}> 
            <div class="single-recipe-text"> 
              <p class="recipe-title-text">${recipe.name}</p> 
              <p class=${trashbinClass}>${trashbin}</p>
              <p class='meal-ready'> Not enough ingredients </p> 
            </div> 
            </section>`);
    } else if (sortByCookable(currentUser).readyToCook.includes(recipe) && currentPage === 'saved'){
      return (recipesThumbnailsSection +=
        `<section class="single-recipe-thumbnail" id = "${recipe.id}"> 
          <img class="single-recipe-img" src=${recipe.image} alt=${recipe.name}> 
            <div class="single-recipe-text"> 
              <p class="recipe-title-text">${recipe.name}</p> 
              <p class=${trashbinClass}>${trashbin}</p>
              <p class='meal-ready'> Ready to cook! </p>  
            </div> 
        </section>`);
    }else {
    return (recipesThumbnailsSection +=
       `<section class="single-recipe-thumbnail" id = "${recipe.id}"> 
          <img class="single-recipe-img" src=${recipe.image} alt=${recipe.name}> 
            <div class="single-recipe-text"> 
              <p class="recipe-title-text">${recipe.name}</p> 
              <p class=${trashbinClass}>${trashbin}</p> 
            </div> 
        </section>`);
    }
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

function displayRecipesOfSameTag() {
  let recipesToTag;
  if (currentPage === "saved") {
    recipesToTag = currentUser.recipesToCook.filterByTag(inputForTags.value);
    allRecipeFilterTagOptions.selectedIndex = 0;
  } else {
    recipesToTag = allRecipes.filterByTag(inputForTags.value);
    allRecipeFilterTagOptions.selectedIndex = 0;
  }
  displayRecipeThumbnails(recipesToTag, "", "");
}

//Saved Recipes Page FUNCTIONS --------

function displaySavedRecipesPage() {
  hide(specificRecipePage);
  show(allRecipesMain);
  createPageTitle(`${currentUser.name}'s Saved Recipes`);
  displayRecipeThumbnails(
    currentUser.recipesToCook.listOfAllRecipes,
    "🗑",
    "delete-recipe"
  );
  createListOfTags(currentUser.recipesToCook.listOfAllRecipes);
}

function deleteSavedRecipe(event) {
  if (event.target.classList.contains("delete-recipe")) {
    currentUser.removeRecipe(+event.target.parentElement.parentElement.id);
    displayRecipeThumbnails(
      currentUser.recipesToCook.listOfAllRecipes,
      "🗑",
      "delete-recipe"
    );
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
    hide(allRecipesMain);
    show(specificRecipePage);
    changeSpecificRecipeSpecs();
  }
  if (
    currentUser.recipesToCook.listOfAllRecipes.some(
      (recipe) => recipe.id === currentRecipe.id
    )
  ) {
    hide(specificRecipeSaveButton);
  } else if (
    !currentUser.recipesToCook.listOfAllRecipes.some(
      (recipe) => recipe.id === currentRecipe.id
    )
  ) {
    show(specificRecipeSaveButton);
  }
}

function changeSpecificRecipeSpecs() {
  specificRecipeHeading.innerText = "";
  specificRecipeHeading.innerText = currentRecipe.name;

  specificRecipeImage.src = "";
  specificRecipeImage.src = currentRecipe.image;

  generateIngredientList(currentRecipe);
  generateInstructions(currentRecipe);
  generateCost(currentRecipe);

  currentUser.cookRecipe(currentRecipe) // NOTE: to be deleted, only included to verify method
}

function generateIngredientList(recipe) {
  const ingredientsListDisplay = recipe.ingredients.reduce((list, currIng) => {
    let ingredObj = {};
    ingredObj.name = ingredientsData.find((ing) => ing.id === currIng.id).name;
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
}

function addToRecipesToCook() {
  hide(specificRecipeSaveButton);
  if (
    !currentUser.recipesToCook.listOfAllRecipes.some(
      (recipe) => recipe.id === currentRecipe.id
    )
  ) {
    currentUser.addRecipe(currentRecipe.id, allRecipes);
    specificRecipeSavedAlert.innerText = "Recipe Has Been Saved!";
    show(specificRecipeSavedAlert);
    setTimeout(hideAlert, 1500);
  }
}

//User Page FUNCTIONS
function createUserIngredientsList() {
  return currentUser.pantry
    .map((userIngred) => {
      let ingredientName;
      ingredientsData.forEach((ingred) => {
        if (userIngred.ingredient === ingred.id) {
          ingredientName = ingred.name;
        }
      });
      return `${ingredientName} : ${userIngred.amount}`;
    })
    .sort();
}

function displayUserIngredients() {
  const ingredientDisplay = createUserIngredientsList();
  ingredientList.innerHTML = "";
  ingredientDisplay.forEach((item) => {
    ingredientList.innerHTML += `<li>${item}</li>`;
  });
}

function addIngredientToPantry(event) {
  event.preventDefault();
  const ingredientName = ingredientNameInput.value;
  const ingredientAmount = ingredientAmountInput.value;
  const found = ingredientsData.find(
    (ingred) => ingred.name === ingredientName.toLowerCase()
  );
  const isNumber = +ingredientAmount;
  if (isNaN(isNumber) && ingredientName != "") {
    show(errorNotANumber);
    setTimeout(hideNotNumberError, 1500);
  } else if (ingredientName === "" && ingredientAmount === "") {
    show(errorUnfilled);
    setTimeout(hideUnfilledError, 1500);
  } else if (found === undefined) {
    show(errorNotRecognized);
    setTimeout(hideNotRecognizedError, 1500);
  } else {
    const ingredientToUpdate = currentUser.pantry.find(
      (ingred) => ingred.ingredient === found.id
    );
    if (ingredientToUpdate != undefined) {
      ingredientToUpdate.amount = +ingredientAmount;
    } else {
      const newIngredient = new Object();
      newIngredient.ingredient = found.id;
      newIngredient.amount = +ingredientAmount;
      currentUser.pantry.push(newIngredient);
    }
  }
  displayUserIngredients();
  ingredientNameInput.value = "";
  ingredientAmountInput.value = "";
}

//Helper FUNCTIONS

function show(element) {
  element.classList.remove("hide");
}

function hide(element) {
  element.classList.add("hide");
}

function hideUnfilledError() {
  errorUnfilled.classList.add("hide");
}

function hideNotRecognizedError() {
  errorNotRecognized.classList.add("hide");
}

function hideNotNumberError() {
  errorNotANumber.classList.add("hide");
}

function hideAlert() {
  specificRecipeSavedAlert.classList.add("hide");
}

function changeButtonColor() {
  homeButton.classList.remove("current-page-button");
  aboutButton.classList.remove("current-page-button");
  allRecipesButton.classList.remove("current-page-button");
  savedRecipeButton.classList.remove("current-page-button");
  userPantryButton.classList.remove("current-page-button");

  if (currentPage === "home") {
    homeButton.classList.add("current-page-button");
  } else if (currentPage === "about") {
    aboutButton.classList.add("current-page-button");
  } else if (currentPage == "all") {
    allRecipesButton.classList.add("current-page-button");
  } else if (currentPage === "saved") {
    savedRecipeButton.classList.add("current-page-button");
  } else if (currentPage === "userPantry") {
    userPantryButton.classList.add("current-page-button");
  }
}

function sortByCookable(currentUser) {
  let goodIng;
  
  const sortedRecipes = currentUser.recipesToCook.listOfAllRecipes.reduce((acc, recipe) => {
    goodIng = []
    recipe.ingredients.forEach(ing => {
      const matchPantryIng = currentUser.pantry.find(item => item.ingredient === ing.id)
        if (matchPantryIng !== undefined && matchPantryIng.amount - ing.quantity.amount > -1) {
            goodIng.push(ing)
        }
    })
    
    if (goodIng.length === recipe.ingredients.length) {
      acc.readyToCook.push(recipe)
    } else {
      acc.notReady.push(recipe)
    }
    return acc;
  }, { readyToCook: [], notReady: [] })

  return sortedRecipes;
}