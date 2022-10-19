import Recipe from "../classes/Recipe";

class RecipeRepository {
  constructor(dataSet) {
    this.listOfAllRecipes = dataSet;
  }

  filterByTag(tag) {
    return this.listOfAllRecipes.filter((recipe) =>
      recipe["tags"].includes(tag)
    );
  }

  filterByName(name) {
    return this.listOfAllRecipes.filter((recipe) => recipe.name === name);
  }
}

export default RecipeRepository;
