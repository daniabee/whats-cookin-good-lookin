import RecipeRepository from "./RecipeRepository";

class User {
  constructor(name, id, pantry) {
    this.name = name;
    this.id = id;
    this.pantry = pantry; //passed in via fetch/data - need be a Pantry instance??🚨
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
}

export default User;
