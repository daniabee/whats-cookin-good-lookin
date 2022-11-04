import RecipeRepository from "./RecipeRepository";

class User {
  constructor(name, id, pantry) {
    this.name = name;
    this.id = id;
    this.pantry = pantry;
    this.recipesToCook = new RecipeRepository([]);
  }

  generateRandomUser(usersList) {
    const totalUsers = usersList.length;

    function createRandomIndex(totalUsers) {
      return Math.floor(Math.random() * totalUsers);
    }

    let randomIndex = createRandomIndex(totalUsers);

    this.name = usersList[randomIndex]["name"];
    this.id = usersList[randomIndex]["id"];
    this.pantry = usersList[randomIndex]["pantry"];
    return randomIndex;
  }

  addRecipe(recipeID, allRecipes) {
    this.recipesToCook.listOfAllRecipes.push(
      allRecipes.listOfAllRecipes.find((recipe) => recipe["id"] === recipeID)
    );
  }

  removeRecipe(recipeID) {
    const index = this.recipesToCook.listOfAllRecipes.findIndex(
      (recipe) => recipe["id"] === recipeID
    );
    this.recipesToCook.listOfAllRecipes.splice(index, 1);
  }

  cookRecipe(recipe) {
    // 👈 this argument will be the currentRecipe variable

    /* Needs to only run if it has already been satisfied that the currentRecipe 
        CAN be cooked */

    console.log("Pantry before anything: ", this.pantry);
    const updatedPantry = this.pantry.map((item) => {
      const updatedIng = {};
      updatedIng.ingredient = item.ingredient;

      const matchingIngredientObject = recipe.ingredients.find(
        (ing) => ing.id === item.ingredient
      );

      if (matchingIngredientObject !== undefined) {
        updatedIng.amount =
          item.amount - matchingIngredientObject.quantity.amount;
        console.log(
          "BING: ",
          matchingIngredientObject.quantity.amount,
          updatedIng
        );
      } else {
        updatedIng.amount = item.amount;
      }

      return updatedIng;
    });

    this.pantry = updatedPantry;
    console.log("Pantry after value reassigned: ", this.pantry);
  }
}

export default User;
