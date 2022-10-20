class User {
  constructor(dataSet) {
    // May need to refactor parameter to be object, will be determined by DOM needs (TBD)
    this.name = name;
    this.id = id;
    this.pantry = pantry;
    this.recipesToCook = [];
  }

  // generateRandomUser(usersList) {
  //   // Takes argument of the array of users data from either users.js or the fetch() request
  //   const totalUsers = usersList.length;

  //   function createRandomIndex(totalUsers) {
  //     return Math.floor(Math.random() * totalUsers);
  //   }

  //   let randomIndex = createRandomIndex(totalUsers);

  //   this.name = usersList[randomIndex].name;
  //   this.id = usersList[randomIndex].id;
  //   this.pantry = usersList[randomIndex].pantry;
  // }

  addRecipe(recipeID, allRecipes) {
    // 🚨 Important to set up dom/HTML/CSS to have IDs so we can use that data to match here below
    this.recipesToCook.push(
      allRecipes.listOfRecipes.find((recipe) => recipe["id"] === recipeID)
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
    return this.recipesToCook.filter((recipe) => recipe["name"] === name);
  }
}

export default User;

// ❓Do we need something that can create or manipulate the pantry
//   property? Should this be based on the recipesToCook in some way?
