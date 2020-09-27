## Getting started
1. Clone project from the GitHub;
2. Use ```npm install``` in the terminal in oder to install required packages;
3. Use ```npm run dev-server``` in the terminal in order to start the project;

***
Bug fix:
#### User misses ingredients when entering an edit mode.
The issue was in views.js (initializeEditPage function). You were setting a title, and a body, but you forgot about ingredients.
I added a function in ingredients.js for setting ingredients in order to avoid code duplication.

#### Delete ingredients doesn't work
It happens because by using ```*.find()``` you receive an object (e.g. ingredients) and not an index of an element. You can use ```*.findIndex()``` instead (ingredients.js -> removeIngredients, line 38).
