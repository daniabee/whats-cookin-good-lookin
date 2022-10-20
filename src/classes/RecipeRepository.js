import Recipe from "../classes/Recipe";

class RecipeRepository {
  constructor() {
    this.listOfAllRecipes = [];
  }

  filterByTag(tag) {
    return this.listOfAllRecipes.filter((recipe) =>
      recipe["tags"].includes(tag)
    );
  }

  filterByName(name) {
    return this.listOfAllRecipes.filter((recipe) => recipe.name === name);
  }

  addRecipes(recipeData) {
    this.listOfAllRecipes = recipeData.map((recipe) => {
      return new Recipe(recipe);
    });
  }
}

export default RecipeRepository;
