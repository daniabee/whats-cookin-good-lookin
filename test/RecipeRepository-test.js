import { expect } from 'chai';
import recipeRepositorySampleData from '../sampleSets/recipeRepositorySample';
import RecipeRepository from '../src/classes/RecipeRepository';
import Recipe from "../src/classes/Recipe";

describe('Recipe Repository', () => {
  let allRecipes;

  beforeEach(function() {
    allRecipes = new RecipeRepository(recipeRepositorySampleData);
  });

  it('Should be a function', () => {
    expect(RecipeRepository).to.be.a('function');
  });

  it('Should create an instance of RecipeRepository', () => {
    expect(allRecipes).to.be.an.instanceOf(RecipeRepository);
  });

  it('Should take in and store a parameter of recipe objects', () => {
    expect(allRecipes.listOfAllRecipes).to.deep.equal(recipeRepositorySampleData)
  });

  it('Should have a method that creates a filtered list of recipes based on a tag', () => {
    expect(allRecipes.filterByTag('snack')).to.deep.equal([recipeRepositorySampleData[0]]);
    expect(allRecipes.filterByTag('lunch')).to.deep.equal(recipeRepositorySampleData);

  });

  it('Should have a method that does not create a filtered list of recipes based on a tag that does not exist', () => {
    expect(allRecipes.filterByTag('cat')).to.deep.equal([]);
    expect(allRecipes.filterByTag('Dog')).to.deep.equal([]);
  });

  it('Should have a method that creates a filtered list of recipes based on its name', () => {
    expect(allRecipes.filterByName('Maple Dijon Apple Cider Grilled Pork Chops')).to.deep.equal([recipeRepositorySampleData[1]]);
    expect(allRecipes.filterByName('chip')).to.deep.equal([recipeRepositorySampleData[0]]);
  });

  it('Should have a method that does not create a filtered list of recipes based on a word that does not exist in a recipe name', () => {
    expect(allRecipes.filterByName('Hello')).to.deep.equal([]);
    expect(allRecipes.filterByName('thanks')).to.deep.equal([]);
  });
});

