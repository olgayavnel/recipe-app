import { getFilters } from './filters'
import { getRecipes } from './recipes'
import { renderIngredientsByContent } from "./ingredients";

const generateRecipeDOM = (recipe) => {
    const recipeEl = document.createElement('a')
    const textEl = document.createElement('p')
    const summaryEl = document.createElement('p')

    if (recipe.title.length > 0) {
        textEl.textContent = recipe.title
    } else {
        textEl.textContent = 'Unnamed recipe'
    }
    textEl.classList.add('list-item__title')
    recipeEl.appendChild(textEl)

    // Setup the link
    recipeEl.setAttribute('href', `/edit.html#${recipe.id}`)
    recipeEl.classList.add('list-item')

    // Set up summary message
    // summaryEl.textContent = generateSummary(recipe)
    // summaryEl.classList.add('list-item__subtitle')
    // recipeEl.appendChild(summaryEl)

    return recipeEl
}

const renderRecipe = () => {
    const recipesEl = document.querySelector('#recipes')
    const filters = getFilters()
    const recipes = getRecipes()
    const filteredRecipes = recipes.filter((recipe) => recipe.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    recipesEl.innerHTML = ''

    if (filteredRecipes.length > 0) {
        filteredRecipes.forEach((recipe) => {
            const recipeEl = generateRecipeDOM(recipe)
            recipesEl.appendChild(recipeEl)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No recipes to show'
        emptyMessage.classList.add('empty-message')
        recipesEl.appendChild(emptyMessage)
    }
}

const initializeEditPage = (recipeId) => {
    const titleElement = document.querySelector('#recipe-title')
    const bodyElement = document.querySelector('#recipe-body')

    const recipes = getRecipes()
    const recipe = recipes.find((recipe) => recipe.id === recipeId)

    if (!recipe) {
        location.assign('/index.html')
    }

    titleElement.value = recipe.title
    bodyElement.value = recipe.body
    // Setting ingredients to our element
    renderIngredientsByContent(recipe)
}

// const generateSummary = (recipe) => {
//     let count = 0
//     let numberOfIngredients = recipe.ingredients.length
//     console.log(numberOfIngredients)
//     recipe.ingredients.forEach((ingredient) => {
//         if (ingredient.completed === true){
//             count++
//         }
//     })

//     if (count === 0){
//         return 'You have none of the ingredients'
//     } else if (count === numberOfIngredients){
//         return 'You have all of the ingredients'
//     } else {
//         return 'You have some of the ingredients'
//     }
// }


export { generateRecipeDOM, renderRecipe, initializeEditPage }