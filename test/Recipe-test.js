import { expect } from "chai";
import ingredientsData from "../sampleSets/Sample-ingredients-for-Recipe-tests";
import recipeSampleData from "../sampleSets/recipeSample";
import Recipe from "../src/classes/Recipe";

describe("Recipe", function () {
  let recipe1, recipe2, recipe3;

  beforeEach(function () {
    recipe1 = new Recipe(recipeSampleData[0]);
    recipe2 = new Recipe(recipeSampleData[1]);
    recipe3 = new Recipe(recipeSampleData[2]);
  });

  it("Should be a function", function () {
    expect(Recipe).to.be.a("function");
  });
  it("Should have an id", function () {
    expect(recipe1.id).to.equal(12345);
    expect(recipe2.id).to.equal(23456);
  });
  it("Should have an image", function () {
    expect(recipe1.image).to.equal(
      "https://spoonacular.com/recipeImages/595736-556x370.jpg"
    );
    expect(recipe3.image).to.equal(
      "https://spoonacular.com/recipeImages/595736-556x370.jpg"
    );
  });
  it("Should have an array for ingredients that holds objects", function () {
    expect(recipe1.ingredients).to.be.an.instanceOf(Array);
    expect(recipe1.ingredients[0]).to.deep.equal({
      id: 20081,
      quantity: {
        amount: 1.5,
        unit: "c",
      },
    });
    expect(recipe2.ingredients[1]).to.deep.equal({
      id: 1123,
      quantity: {
        amount: 1,
        unit: "large",
      },
    });
  });
  it("Should have an instructions array that holds objects", function () {
    expect(recipe1.instructions).to.be.an.instanceOf(Array);
    expect(recipe1.instructions[2]).to.deep.equal({
      instruction: "Step 3",
      number: 3,
    });
    expect(recipe2.instructions[0]).to.deep.equal({
      instruction: "Step 1",
      number: 1,
    });
  });
  it("Should have a name", function () {
    expect(recipe1.name).to.equal("Chocolate Chip Cookies");
    expect(recipe3.name).to.equal("Chocolate Cake");
  });
  it("Should have an array of tags", function () {
    expect(recipe1.tags).to.be.an.instanceOf(Array);
    expect(recipe1.tags).to.deep.equal([
      "antipasti",
      "starter",
      "snack",
      "appetizer",
    ]);
    expect(recipe3.tags).to.deep.equal(["antipasti", "appetizer"]);
  });
  it("Should give the names of the ingredients needed", function () {
    expect(recipe1.getIngredientNames(ingredientsData)).to.deep.equal([
      "wheat flour",
      "bicarbonate of soda",
      "eggs",
      "salt",
      "fine sea salt",
    ]);
    expect(recipe2.getIngredientNames(ingredientsData)).to.deep.equal([
      "wheat flour",
      "eggs",
      "instant vanilla pudding",
    ]);
  });
  it("Should give the directions/instructions needed", function () {
    expect(recipe1.getDirections()).to.deep.equal([
      "Step 1",
      "Step 2",
      "Step 3",
      "Step 4",
    ]);
  });
  it("Should get the cost of the ingredients", function () {
    expect(recipe1.getCosts(ingredientsData)).to.deep.equal([
      2.13, 2.91, 4.72, 1.4, 126.72,
    ]);
  });
});
