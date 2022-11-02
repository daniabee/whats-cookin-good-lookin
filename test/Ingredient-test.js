import {expect} from "chai";
import sampleIngredientData from '../sampleSets/Ingredients-sample';
import Ingredient from '../src/classes/Ingredient'


describe("Ingredient",function() {
	
  it('should be a function',function() {
    expect(Ingredient).to.be.a('function')
	})

	it('should instantiate an Ingredient',function(){
    let ingredient1 = new Ingredient(sampleIngredientData[0])
		expect(ingredient1).to.be.an.instanceOf(Ingredient)
	})
			
  it('should accept an id', function() {
  	let ingredient1 = new Ingredient(sampleIngredientData[0])
  	expect(ingredient1.id).to.equal(20081)
  })
    
  it('should have a different id',function(){
  	let ingredient2 = new Ingredient(sampleIngredientData[1])
    expect(ingredient2.id).to.equal(18372)
  })
    
  it('should have a name', function() {
  	let ingredient3 = new Ingredient(sampleIngredientData[2])
    expect(ingredient3.name).to.equal('eggs')
  })

  it('should have different names ', function() {
  	let ingredient2 = new Ingredient(sampleIngredientData[1])
    expect(ingredient2.name).to.equal("bicarbonate of soda")
  })

  it('should have a costInCents', function() {
  	let ingredient1 = new Ingredient(sampleIngredientData[0])
     expect(ingredient1.costInCents).to.equal(142)
  })

  it('should be able to have a different costInCents',function(){
  	let ingredient3 = new Ingredient(sampleIngredientData[2])
    expect(ingredient3.costInCents).to.equal(472)
  })
});

