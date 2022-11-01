import { expect } from 'chai';
import User from '../src/classes/User';
import { allRecipes, testUsersData } from '../sampleSets/User-test-data';

describe('User', function() {

  let user1, user2, recipe1, recipe2;

  beforeEach('define variables for test suite', function() {
    user1 = new User('Melvin Gordon', 3, [{"ingredient": 11297, "amount": 7}]);
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
    expect(user1.pantry).to.deep.equal([{"ingredient": 11297, "amount": 7}]);
    expect(user1.pantry).to.be.an('array');

    expect(user2).to.have.any.keys('pantry');
    expect(user2.pantry).to.equal(undefined);
  });

  it('Should have a place to keep recipes', function() {
    expect(user1.recipesToCook).to.deep.equal([]); //🚨update w/ new changes
    //add something to check instance of recipe repo
    expect(user2.recipesToCook).to.deep.equal([]); //🚨update w/ new changes
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
    expect(user1.recipesToCook).to.deep.equal([]); //👈
    expect(user1.recipesToCook.length).to.equal(0); //👈
    
    user1.addRecipe(222, allRecipes);

    expect(user1.recipesToCook).to.deep.equal([recipe1]); //👈
    expect(user1.recipesToCook.length).to.equal(1); //👈

    user1.addRecipe(333, allRecipes);

    expect(user1.recipesToCook).to.deep.equal([recipe1, recipe2]); //👈
    expect(user1.recipesToCook.length).to.equal(2); //👈
  });

  it('Should be able to remove recipes', function() {
    user1.addRecipe(222, allRecipes);
    user1.addRecipe(333, allRecipes);

    expect(user1.recipesToCook).to.deep.equal([recipe1, recipe2]);//👈
    expect(user1.recipesToCook.length).to.equal(2); //👈

    user1.removeRecipe(222);
    
    expect(user1.recipesToCook).to.deep.equal([recipe2]); //👈
    expect(user1.recipesToCook.length).to.equal(1); //👈

    user1.removeRecipe(333);

    expect(user1.recipesToCook).to.deep.equal([]); //👈
    expect(user1.recipesToCook.length).to.equal(0); //👈
  });

  it('Should be able to filter recipes by tag', function() { //👈 💀
    user1.addRecipe(222, allRecipes);
    user1.addRecipe(333, allRecipes);
    const filteredList1 = user1.filterByTag('antipasti');
    const filteredList2 = user1.filterByTag('sauce');
    const filteredList3 = user1.filterByTag('dessert');
    const filteredList4 = user1.filterByTag('gabagool');

    expect(filteredList1).to.deep.equal([recipe1]);
    expect(filteredList2).to.deep.equal([recipe2]);
    expect(filteredList3).to.deep.equal([recipe1, recipe2]);
    expect(filteredList4).to.deep.equal([]);
  });

  it('Should be able to filter recipes by their name', function() {//👈 💀
    user1.addRecipe(222, allRecipes);
    user1.addRecipe(333, allRecipes);
    const filteredList = user1.filterByName("Loaded Chocolate Chip Pudding Cookie Cups");
    const filteredList2 = user1.filterByName("Dirty Steve's Original Wing Sauce");
    const filteredList3 = user1.filterByName("Microwaved Dinner");

    expect(filteredList).to.deep.equal([recipe1]);
    expect(filteredList2).to.deep.equal([recipe2]);
    expect(filteredList3).to.deep.equal([]);
  });
});