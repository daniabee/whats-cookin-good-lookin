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
let currentUserIndex;

//Navbar VARIABLES ---------

//Home Page VARIABLES --------

//All Recipes Page VARIABLES --------
//Saved Recipes Page VARIABLES --------
//Specific Recipe Page VARIABLES --------
let currentRecipe;

//QUERY SELECTORS-----------------------------------------------
//Navbar QUERY SELECTORS ---------
const homeButton = document.querySelector("#homeButton");
const aboutButton = document.querySelector("#aboutButton");
const allRecipesButton = document.querySelector("#allRecipesButton");
const savedRecipeButton = document.querySelector("#savedRecipesButton");
const searchButton = document.querySelector("#searchButton");
const searchButtonInput = document.querySelector("#searchInput");
const homePage = document.querySelector("#homePage");
const aboutPage = document.querySelector("#aboutPage");

//Home Page QUERY SELECTORS--------
const errorLoadFailure = document.querySelector(".error-message");

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
const specificRecipeHeading = document.querySelector(".specific-recipe-heading");
const specificRecipeSaveButton = document.querySelector(".save-button");
const specificRecipeSavedAlert = document.querySelector(".recipe-saved-text");
const specificRecipeImage = document.querySelector(".specific-recipe-img");
const specificRecipeIngredients = document.querySelector(".specific-recipe-ingredients-list");
const specificRecipeInstructions = document.querySelector(".specific-recipe-instructions");
const specificRecipeCost = document.querySelector(".specific-recipe-cost");
const specificRecipeCookArea = document.querySelector(".specific-recipe-cook-area") //area containing either cook button or missing ingredients
const cookAreaHeading = document.querySelector(".cook-area-heading");
const cookButton = document.querySelector(".cook-button");
const cookConfirmationText = document.querySelector(".cook-confirmation");
const missingIngredients = document.querySelector(".missing-ingredients"); //subject to change depending on Courtney's work

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
const errorUnableToSave = document.querySelector(".error-unable-to-save");
const errorUnableToRetrieveData = document.querySelector(
  ".error-unable-to-retrieve"
);

//FETCH/CALL FUNCTIONS-------------------------------------------
Promise.all([
  loadData("http://localhost:3001/api/v1/users"),
  loadData("http://localhost:3001/api/v1/ingredients"),
  loadData("http://localhost:3001/api/v1/recipes"),
])
  .then((data) => {
    userData = data[0];
    ingredientsData = data[1];
    recipeData = data[2];

    createInstances(recipeData, ingredientsData, userData);
    allRecipes = new RecipeRepository(recipeData);
    populateTagFilter(allRecipes.listOfAllRecipes);
    hideLoadFailure();
  })
  .catch((error) => {
    console.log(error);
  });

function createInstances(dataSet1, dataSet2, dataSet3) {
  makeRecipesList(dataSet1);
  makeIngredientsList(dataSet2);
  currentUser = new User();
  currentUserIndex = currentUser.generateRandomUser(dataSet3);
}

function makeRecipesList(dataSet) {
  recipeData = dataSet.map((element) => {
    return new Recipe(element);
  });
}

function makeIngredientsList(dataSet) {
  ingredientsData = dataSet.map((element) => {
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
allRecipesMain.addEventListener("keypress",function(event) {
  event.preventDefault();
  if (event.key === "Enter") {
    loadSpecificRecipe(event)
    deleteSavedRecipe(event)
  }
})

//Saved Recipes Page EVENT LISTENERS --------
savedRecipeButton.addEventListener("click", displaySavedRecipesPage);
allRecipeThumbnailsSection.addEventListener("click", deleteSavedRecipe); 

//Specific Recipe Page EVENT LISTENERS --------
specificRecipeSaveButton.addEventListener("click", addToRecipesToCook);
cookButton.addEventListener('click', cookRecipe);

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
  resetSpecificRecipeCookArea()
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
  resetSpecificRecipeCookArea();
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
  resetSpecificRecipeCookArea()
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
  resetSpecificRecipeCookArea();
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
  resetSpecificRecipeCookArea()
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

function displaySearchRecipes(event) {
  event.preventDefault()
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
  resetSpecificRecipeCookArea()
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
    if(sortByCookable(currentUser).notReady.includes(recipe) && currentPage === 'saved'){
      return (recipesThumbnailsSection +=
        `<section class="single-recipe-thumbnail" id = "${recipe.id}"> 
          <img class="single-recipe-img transparent" src=${recipe.image} alt=${recipe.name} tabindex='0'> 
            <div class="single-recipe-text"> 
              <p class="recipe-title-text" >${recipe.name} </p> 
              <p class=${trashbinClass} tabindex='0'>${trashbin}</p>
              <p class='meal-ready'> Not enough ingredients </p> 
            </div> 
            </section>`);
    } else if (sortByCookable(currentUser).readyToCook.includes(recipe) && currentPage === 'saved'){
      return (recipesThumbnailsSection +=
        `<section class="single-recipe-thumbnail" id = "${recipe.id}"> 
          <img class="single-recipe-img" src=${recipe.image} alt=${recipe.name} tabindex='0'> 
            <div class="single-recipe-text"> 
              <p class="recipe-title-text">${recipe.name}</p> 
              <p class=${trashbinClass} tabindex='0'>${trashbin}</p>
              <p class='meal-ready'> Ready to cook! </p>  
            </div> 
        </section>`);
    }else {
    return (recipesThumbnailsSection +=
      `<section class="single-recipe-thumbnail" id = "${recipe.id}"> 
          <img class="single-recipe-img" src=${recipe.image} alt=${recipe.name} tabindex='0'> 
            <div class="single-recipe-text"> 
              <p class="recipe-title-text">${recipe.name}</p> 
              <p class=${trashbinClass} tabindex='0'>${trashbin}</p> 
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
  
  if (event.target.classList.contains( "single-recipe-img")) {
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
    event.target.classList.contains('single-recipe-img') ||
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
   if (sortByCookable(currentUser).notReady.includes(currentRecipe) 
    && currentPage === 'saved') {
    loadNotReadyToCookArea();
    createListOfNeededIngredients(currentRecipe)
  } else if (sortByCookable(currentUser).readyToCook.includes(currentRecipe)
    && currentPage === 'saved') {
    loadReadyToCookArea();
  }
}

function createListOfNeededIngredients(currentRecipe) {
  const toGetIngredientsList = []
  currentRecipe.ingredients.forEach(recipeIngredient => {
    let matchedPantryIngredient = currentUser.pantry.find(pantryIngredient => pantryIngredient.ingredient
    === recipeIngredient.id)
    if (matchedPantryIngredient && recipeIngredient.quantity.amount > matchedPantryIngredient.amount) {
      const amountNeededRecipeObj = {
        ingredient: recipeIngredient,
        name: ingredientsData.find((ing) => ing.id === recipeIngredient.id).name,
        unit: recipeIngredient.quantity.unit,
        amountNeeded: recipeIngredient.quantity.amount - matchedPantryIngredient.amount
      }
      toGetIngredientsList.push(amountNeededRecipeObj)
      } else if (!matchedPantryIngredient) {
        const amountNeededRecipeObj = {
          ingredient: recipeIngredient,
          name: ingredientsData.find((ing) => ing.id === recipeIngredient.id).name,
          unit: recipeIngredient.quantity.unit,
          amountNeeded: recipeIngredient.quantity.amount
        }
        toGetIngredientsList.push(amountNeededRecipeObj)
      }
    })
  displayListOfNeededIngredients(toGetIngredientsList)
}


function displayListOfNeededIngredients(toGetIngredientsList) {
  missingIngredients.innerHTML = "";
  toGetIngredientsList.forEach(ingredient => {
    missingIngredients.innerHTML += `
    <li>${ingredient.amountNeeded} ${ingredient.unit} ${ingredient.name}</li>
    `
  })
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

function resetSpecificRecipeCookArea() {
  hide(cookButton);
  hide(cookConfirmationText);
  hide(missingIngredients);
  hide(specificRecipeCookArea);
}

function loadReadyToCookArea() {
  show (specificRecipeCookArea);
  show(cookButton);
  cookAreaHeading.innerText = 'This Recipe is Ready to Cook'
}

function loadNotReadyToCookArea() {
  show(specificRecipeCookArea);
  show(missingIngredients);
  cookAreaHeading.innerText = 'This Recipe is Missing Some Ingredients...'
}

function cookRecipe() {
  currentUser.cookRecipe(currentRecipe);
  hide(cookButton);
  show(cookConfirmationText);

  currentRecipe.ingredients.forEach(recipeIngredient => {
    postUser(createPostableUserAfterCooking(recipeIngredient))
  })

  updateUserData();
}

function createPostableUserAfterCooking(ingredient) {
  const postUser = {};
  postUser.userID = currentUser.id;
  postUser.ingredientID = ingredient.id;
  postUser.ingredientModification = -ingredient.quantity.amount;
  console.log('postUser after cooking: ', postUser);
  return postUser
}


//User Page FUNCTIONS
function postUser(user) {
  fetch("http://localhost:3001/api/v1/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error("There was an issue saving your data.");
      }
      return resp.json();
    })
    .then((user) => {
      updateUserData();
    })
    .catch((error) => {
      show(errorUnableToSave);
      setTimeout(hideUnableToSaveError, 1500);
    });
}

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

function findIngredient(ingredName) {
  return ingredientsData.find(
    (ingred) => ingred.name === ingredName.toLowerCase()
  );
}

function addIngredientToPantry(event) {
  event.preventDefault();
  const ingredientName = ingredientNameInput.value;
  const ingredientAmount = ingredientAmountInput.value;
  const newIngredient = new Object();
  const ingredFound = findIngredient(ingredientName);
  if (isNaN(+ingredientAmount) && ingredientName != "") {
    show(errorNotANumber);
    setTimeout(hideNotNumberError, 1500);
  } else if (ingredientName === "" && ingredientAmount === "") {
    show(errorUnfilled);
    setTimeout(hideUnfilledError, 1500);
  } else if (ingredFound === undefined) {
    show(errorNotRecognized);
    setTimeout(hideNotRecognizedError, 1500);
  } else {
    const ingredientToUpdate = currentUser.pantry.find(
      (ingred) => ingred.ingredient === ingredFound.id
    );
    if (ingredientToUpdate != undefined) {
      newIngredient.ingredient = ingredientToUpdate.ingredient;
      newIngredient.amount = +ingredientAmount;
    } else {
      newIngredient.ingredient = ingredFound.id;
      newIngredient.amount = +ingredientAmount;
    }
    postUser(createPostableUser(newIngredient));
    updateUserData();
  }
  ingredientNameInput.value = "";
  ingredientAmountInput.value = "";
}

function createPostableUser(ingredient) {
  const postUser = new Object();
  postUser.userID = currentUser.id;
  postUser.ingredientID = ingredient.ingredient;
  postUser.ingredientModification = ingredient.amount;
  return postUser;
}

function updateUserData() {
  loadData("http://localhost:3001/api/v1/users")
    .then((data) => {
      userData = data;
      
      currentUser.pantry = data[currentUserIndex].pantry
  
      displayUserIngredients();
    })
    .catch((error) => {
      show(errorUnableToRetrieveData);
      setTimeout(hideUnableToRetrieveData, 1500);
    });
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

function hideUnableToSaveError() {
  errorUnableToSave.classList.add("hide");
}

function hideUnableToRetrieveData() {
  errorUnableToRetrieveData.classList.add("hide");
}

function hideLoadFailure() {
  errorLoadFailure.classList.add("hide");
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


