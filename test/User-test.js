import { expect } from 'chai';
import User from '../src/classes/User';
import { allRecipes, testUsersData, recipe3 } from '../sampleSets/User-test-data';
import RecipeRepository from '../src/classes/RecipeRepository';

describe('User', function() {

  let user1, user2, recipe1, recipe2;

  beforeEach('define variables for test suite', function() {
    user1 = new User('Melvin Gordon', 3, [{"ingredient": 20081, "amount": 50}, {"ingredient": 18372, "amount": 20}]);
    user2 = new User();
    recipe1 = allRecipes.listOfAllRecipes[0];
    recipe2 = allRecipes.listOfAllRecipes[1];
    });

  it('Should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('Should be an instance of User', function() {
    expect(user1).to.be.an.instanceOf(User);
  });

  it('Should be able to have a name', function() {
    expect(user1.name).to.equal('Melvin Gordon');
    expect(user1.name).to.be.a('string');
    
    expect(user2.name).to.equal(undefined);
    expect(user2).to.have.any.keys('name');
  });

  it('Should be able to have an ID', function() {
    expect(user1.id).to.equal(3);
    expect(user1.id).to.be.a('number');

    expect(user2.id).to.equal(undefined);
    expect(user2).to.have.any.keys('id');
  });

  it('Should be able to have a pantry', function() {
    expect(user1.pantry).to.deep.equal([{"ingredient": 20081, "amount": 50}, {"ingredient": 18372, "amount": 20}]);
    expect(user1.pantry).to.be.an('array');

    expect(user2).to.have.any.keys('pantry');
    expect(user2.pantry).to.equal(undefined);
  });

  it('Should have a place to keep recipes', function() {
    expect(user1.recipesToCook.listOfAllRecipes).to.deep.equal([]);
    expect(user2.recipesToCook.listOfAllRecipes).to.deep.equal([]);
  });

  it('Should contain an instance of the Recipe Repository', function() {
    expect(user1.recipesToCook).to.be.an.instanceOf(RecipeRepository);
  });

  it('Should be able to generate a random user', function() { 
    expect(user2.name).to.equal(undefined);
    expect(user2.id).to.equal(undefined);
    expect(user2.pantry).to.equal(undefined);

    user2.generateRandomUser(testUsersData);
   
    expect(user2.name).to.be.a('string');
    expect(user2.id).to.be.a('number');
    expect(user2.pantry).to.be.an('array');

    const possibleNames = testUsersData.map(user => user['name']);

    expect(possibleNames.includes(user2.name)).to.equal(true);

    const user3 = new User();
    user3.generateRandomUser(testUsersData);
    const user4 = new User();
    user4.generateRandomUser(testUsersData);
    
    expect(possibleNames.includes(user3.name)).to.equal(true);
    expect(possibleNames.includes(user4.name)).to.equal(true);
  });

  it('Should be able to add recipes', function() {
    expect(user1.recipesToCook.listOfAllRecipes).to.deep.equal([]);
    expect(user1.recipesToCook.listOfAllRecipes.length).to.equal(0);
    
    user1.addRecipe(222, allRecipes);

    expect(user1.recipesToCook.listOfAllRecipes).to.deep.equal([recipe1]);
    expect(user1.recipesToCook.listOfAllRecipes.length).to.equal(1);

    user1.addRecipe(333, allRecipes);

    expect(user1.recipesToCook.listOfAllRecipes).to.deep.equal([recipe1, recipe2]);
    expect(user1.recipesToCook.listOfAllRecipes.length).to.equal(2);
  });

  it('Should be able to remove recipes', function() {
    user1.addRecipe(222, allRecipes);
    user1.addRecipe(333, allRecipes);

    expect(user1.recipesToCook.listOfAllRecipes).to.deep.equal([recipe1, recipe2]);
    expect(user1.recipesToCook.listOfAllRecipes.length).to.equal(2);

    user1.removeRecipe(222);
    
    expect(user1.recipesToCook.listOfAllRecipes).to.deep.equal([recipe2]);
    expect(user1.recipesToCook.listOfAllRecipes.length).to.equal(1);

    user1.removeRecipe(333);

    expect(user1.recipesToCook.listOfAllRecipes).to.deep.equal([]);
    expect(user1.recipesToCook.listOfAllRecipes.length).to.equal(0);
  });

  it('Should be able to cook a recipe', function() {
    user1.addRecipe(222, allRecipes);
    expect(user1.pantry).to.deep.equal([{"ingredient": 20081, "amount": 50}, {"ingredient": 18372, "amount": 20}]);

    user1.cookRecipe(recipe1)
    expect(user1.pantry).to.deep.equal([{"ingredient": 20081, "amount": 48.5}, {"ingredient": 18372, "amount": 19.5}]);
  })

  it('Should not be able to cook a recipe that is not in their queue', function() {
    user1.addRecipe(222, allRecipes);
    expect(user1.pantry).to.deep.equal([{"ingredient": 20081, "amount": 50}, {"ingredient": 18372, "amount": 20}]);

    user1.cookRecipe(recipe1)
    expect(user1.pantry).to.deep.equal([{"ingredient": 20081, "amount": 48.5}, {"ingredient": 18372, "amount": 19.5}]);
    
    user1.cookRecipe(recipe3)
    expect(user1.pantry).to.deep.equal([{"ingredient": 20081, "amount": 48.5}, {"ingredient": 18372, "amount": 19.5}]);
    expect(user1.cookRecipe(recipe3)).to.equal('Please add to your list of recipes to cook and make sure you have enough ingredients.');
  })

  it('Should be able to sort their recipes whether they have enough ingredients to cook or not', function() {
    user1.addRecipe(222, allRecipes);
    user1.addRecipe(333, allRecipes);

    expect(user1.sortByCookable()).to.deep.equal({
      readyToCook: [recipe1],
      notReady: [recipe2]
      }
    );
  })

  it('Should only be able to cook a recipe if there is enough ingredients', function() {
    user1.addRecipe(222, allRecipes);
    user1.addRecipe(333, allRecipes);

    user1.cookRecipe(recipe1)
    expect(user1.pantry).to.deep.equal([{"ingredient": 20081, "amount": 48.5}, {"ingredient": 18372, "amount": 19.5}]);

    user1.cookRecipe(recipe2)
    expect(user1.pantry).to.deep.equal([{"ingredient": 20081, "amount": 48.5}, {"ingredient": 18372, "amount": 19.5}]);
    expect(user1.cookRecipe(recipe2)).to.equal('Please add to your list of recipes to cook and make sure you have enough ingredients.');
  })


});