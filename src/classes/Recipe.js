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
   return this.ingredients.map(ingredient => {
    return dataSet.find(element => element.id === ingredient.id).name;
   })
  }

  getDirections() {
    return this.instructions.map((item) => item.instruction);
  }

  getCosts(dataSet) {
   return this.ingredients.reduce((allCosts, ingred) => {
    let currentIngredient = dataSet.find(element => element.id === ingred.id);
    let totalCost = currentIngredient.costInCents * ingred.quantity.amount;
    let dollars = totalCost / 100;
    dollars = dollars.toFixed(2)
    allCosts.push(+dollars)
    return allCosts
    }, []);
  }
}

export default Recipe;
