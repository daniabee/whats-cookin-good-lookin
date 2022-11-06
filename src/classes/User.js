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
    if (this.recipesToCook.listOfAllRecipes.find(savedRecipe => savedRecipe.id === recipe.id)) {
      const updatedPantry = this.pantry.map((item) => {
        const updatedIng = {};
        updatedIng.ingredient = item.ingredient;
        const matchingIngredientObject = recipe.ingredients.find(
          (ing) => ing.id === item.ingredient
        );

        if (matchingIngredientObject !== undefined) {
          updatedIng.amount =
            item.amount - matchingIngredientObject.quantity.amount;
        } else {
          updatedIng.amount = item.amount;
        }

        return updatedIng;
      });
      this.pantry = updatedPantry;
    } else {
      return 'Please add to your list of recipes to cook before cooking.'
    }
  }

  sortByCookable() {
    let goodIng;
    
    const sortedRecipes = this.recipesToCook.listOfAllRecipes.reduce((acc, recipe) => {
      goodIng = []
      recipe.ingredients.forEach(ing => {
        const matchPantryIng = this.pantry.find(item => item.ingredient === ing.id)
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

}

export default User;
