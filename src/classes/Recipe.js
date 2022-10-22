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
      for (let i = 0; i < dataSet.length; i++) {
        if (ingredient.id === dataSet[i].id) {
          return dataSet[i].name;
        }
      }
    });
  }
  //RETURNS AN ARRAY OF STRINGS OF THE INGREDIENT NAMES

  getDirections() {
    return this.instructions.map((item) => item.instruction);
  }
  //RETURNS INSTRUCTION STEPS IN AN ARRAY OF STRINGS

  getCosts(dataSet) {
    return this.ingredients.map((ingredient) => {
      for (let i = 0; i < dataSet.length; i++) {
        if (ingredient.id === dataSet[i].id) {
          let totalCost =
            dataSet[i].costInCents * ingredient.quantity.amount;
          let dollars = totalCost / 100;
          dollars = dollars.toFixed(2);
          return parseFloat(dollars);
        }
      }
    });
  }
  //RETURNS AN ARRAY OF NUMBERS THAT ARE THE ESTIMATED COST IN CENTS
}

export default Recipe;
