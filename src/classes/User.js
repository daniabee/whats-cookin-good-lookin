class User {
  constructor(name, id, pantry) {
    this.name = name;
    this.id = id;
    this.pantry = pantry;
    this.recipesToCook = [];
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
    this.recipesToCook.push(
      allRecipes.listOfAllRecipes.find((recipe) => recipe["id"] === recipeID)
    );
  }

  removeRecipe(recipeID) {
    const index = this.recipesToCook.findIndex(
      (recipe) => recipe["id"] === recipeID
    );
    this.recipesToCook.splice(index, 1);
  }

  filterByTag(tag) {
    return this.recipesToCook.filter((recipe) => recipe["tags"].includes(tag));
  }

  filterByName(name) {
    let recipeMatch = this.recipesToCook.find(recipe => recipe.name.toLowerCase() === name.toLowerCase());
    
    if (recipeMatch !== undefined) {
      return this.recipesToCook.filter(recipe => recipe.name.toLowerCase() === name.toLowerCase());
    } else {
      const nameComponents = name.toLowerCase().split(' ').filter(element => element !== '');
      const recipesThatMatch = nameComponents.reduce((acc, element) => {
        let matchingRecipes = this.recipesToCook.filter(recipe => recipe.name.toLowerCase().includes(element))
        matchingRecipes.forEach(element => {
         if (!acc.includes(element)) {
          acc.push(element)
         }
       });
        return acc;
      }, []);
      return recipesThatMatch
    }
  }
}

export default User;
