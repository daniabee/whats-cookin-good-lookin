## Abstract:
Many people have diverse culinary tastes, WHATS COOKIN' GOOD LOOKIN' offers users unique recipes, as well as cooking instructions to advance the user's palette. In our application, a user has the abilitiy to search a recipe, save a recipe, delete a saved recipe, filter all recipes, filter all saved recipes, search by tags, see specifications of a selected recipe, see their own pantry of ingredients, add/remove ingredients from their pantry, and see what ingredients they are missing from any given recipe they save. 

## Installation Instructions:
What's Cookin' Good Lookin' Repo - 
1. Start at https://github.com/daniabee/whats-cookin-good-lookin
2. Click code
3. Copy SSH 
4. Go to computer terminal type: git clone <'filename'>
5. Cd into directory 
6. Run 'npm install'
7. Run 'npm start
8. Should be given a server page 'http://localhost:8080/'
9. Open server in browser  

Whats-cookin-api Repo - 
1. Start at https://github.com/turingschool-examples/whats-cookin-api
2. Click code
3. Copy SSH 
4. Go to computer terminal type: git clone <'filename'>
5. Cd into directory 
6. Run 'npm install'
7. Run 'npm start
8. Should be given a server page 'http://localhost:3001/'
9. Open server in browser  

10. Both what's cookin' good lookin' and what's-cooking-api should be running in order to properly use this application. You can do command T to have 2 tabs open in your terminal. Control C to stop running the servers. 

## Preview of App:
### Home:

![Screen Shot 2022-11-07 at 5 29 40 PM](https://user-images.githubusercontent.com/104169837/200444644-c5d7f716-7ebe-4d4a-8864-7b646a16e258.png)

### Saved recipe that has enough ingredients in the pantry to cook:

![Screen Shot 2022-11-07 at 5 21 18 PM](https://user-images.githubusercontent.com/104169837/200443732-3ee4af62-a6cf-4bcc-b6c0-1ceb493c6a78.png)

### Saved recipe that does not have enough ingredients in the pantry to cook:

![Screen Shot 2022-11-07 at 5 21 26 PM](https://user-images.githubusercontent.com/104169837/200443793-6cd34baf-7abc-4718-bc8a-1ace18062701.png)
### User's pantry:

![Screen Shot 2022-11-07 at 5 21 43 PM](https://user-images.githubusercontent.com/104169837/200443808-30c76061-5db3-4e90-99a0-34173261d47b.png)

### Save a recipe:

![Brief features gif](https://media.giphy.com/media/I71a8fJZM9u4boPOLB/giphy.gif)

### Filter by a tag (shown by tabbing only):

![Brief features gif](https://media.giphy.com/media/DpBgcAzkTAwh6kHcIJ/giphy.gif)

### Filter by a name (shown by tabbing only):

![Brief features gif](https://media.giphy.com/media/prrvfJzKwIBp730htK/giphy.gif)




## Context:
Each member of our group has been in Turing for 3 months. (Mod2, week 5)

## Where you can find the spec:
https://frontend.turing.edu/projects/whats-cookin-part-one.html
https://frontend.turing.edu/projects/whats-cookin-part-two.html

## Contributors:
Andrew Cerveny : https://github.com/AndrewCerveny
Brett Kuhn: https://github.com/bkuhn2
Courtney Lippman : https://github.com/Courtney-Lippman
Dani Bagley: https://github.com/daniabee

## Learning Goals:
1. Collaboration with others 
2. API fetching (GET and POST)
3. Using array iterators in functions 
4. Creating a wire frame
5. Use TDD testing to build data model
6. WebPack 
7. Practice import and exports
8. Practice git work flow 
9. Practice a uniform project management system
10. Practice implementing ARIA and other accesibility practices within our code.

## Technology Used:
VS Code
JavaScript
Mocha
Chai
Github
Terminal
WebPack
HTML
CSS
WAVE Chrome Extension  
Lighthouse Extension
Dalton Chrome Extension 
Adobe XD 
Adobe Illustrator 
## Wins:
A consistent win would be overcoming the limitation of merge conflicts. Each member created their own test, their own class, and their own webpage section. Using daily standup's our group was able to communicate effectively and minimize possibilities of major merge conflicts. As a group, our second major win was the retrieval of our api data, once data became accessible outside of the fetch call our website gained practical functionality. Another win was being able to successfully GET and POST data to APIs, as well as being able to work on individual tasks and then merge them together at the given points throughout the project. 

## Challenges:
The greatest challenges were...

1. The ability to access api data after the promise was resolved 
2. The ability for functions to be on page load  
3. Group scheduling across time zones
4. Making sure commits seemed balanced 
5. Trusting GitHub automatic merges

## Future Features:
1. More user friendly interface
2. Featured recipe on window page load
3. Welcome user on home page
4. A page introducing our website for entry

## Possible additions:
1. More functionality to the search bar:  type partial words and filter possible recipes 
2. Additional filter options as part of the front page spec 
3. The API used for this project lacked some data that would have been helpful for the overall user experience. On the backend, we recommend adding a 'units' property, in addition to the 'amount' property, that specifies the unit of a given ingredient in a user's pantry. For example, vanilla : 2 *Tbs*.
