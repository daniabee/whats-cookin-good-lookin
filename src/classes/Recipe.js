class Recipe {
  constructor(dataSetObject) {
    this.id = dataSetObject.id;
    this.image = dataSetObject.image;
    this.ingredients = dataSetObject.ingredients;
    this.instructions = dataSetObject.instructions;
    this.name = dataSetObject.name;
    this.tags = dataSetObject.tags;
  }
  getIngredientNames(dataSet) {
    return this.ingredients.map((ingredient) => {
      return dataSet.find((element) => element.id === ingredient.id).name;
    });
  }

  getDirections() {
    return this.instructions.map((item) => item.instruction);
  }

  getCosts(dataSet) {
    return this.ingredients.reduce((allCosts, ingred) => {
      let currentIngredient = dataSet.find(
        (element) => element.id === ingred.id
      );
      let totalCost = currentIngredient.costInCents * ingred.quantity.amount;
      let dollars = totalCost / 100;
      dollars = dollars.toFixed(2);
      allCosts.push(+dollars);
      return allCosts;
    }, []);
  }
}

export default Recipe;

// There are some devs that believe that
//tests should be broken down more.
//For example, the test 'Should be able to filter recipes by
//their name' tests for successful finds and a non-successful find.
//This could be broken down into 'Should be able to filter recipes by their name' and a
//second test such as 'Should not find a recipe by name if it doesn't match' or something
//like that. Discuss as a group and decide if this style fits your coding opinions.

//Continue to deepen your testing. For example, right now the test “should have an image”
//simply tests if the image is not null. This means I could have a
//string that just says “cheese!” and it would pass.
//Is that enough? Consider adding to that test to check if a
//specific image is what you expect.
