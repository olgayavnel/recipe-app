import uuidv4 from 'uuid/v4'
import { getRecipes, saveRecipe } from './recipes'

// let ingredients = []

// const loadIngredients = () => {
//     const ingredientsJSON = localStorage.getItem('ingredients')

//     try {
//         ingredients = ingredientsJSON ? JSON.parse(ingredientsJSON) : []
//     } catch (e) {
//         ingredients = []
//     }
// }

// const saveIngredients = () => {
//     localStorage.setItem('ingredients', JSON.stringify(ingredients))
// }

// const getIngredients = () => ingredients


const createIngredients = (recipeId, text) => {
    const recipes = getRecipes()
    const recipe = recipes.find((recipe) => recipe.id === recipeId)
    recipe.ingredients.push({
        id: uuidv4(),
        text,
        completed: false
    })
    saveRecipe()
}

const removeIngredients = (id, recipeId) => {
    const recipes = getRecipes()
    const recipe = recipes.find((recipe) => recipe.id === recipeId)
    const ingredients = recipe.ingredients
    const ingredientIndex = ingredients.findIndex((ingredient) => ingredient.id === id)

    if (ingredientIndex > -1) {
        ingredients.splice(ingredientIndex, 1)
    }
}

// Toggle the completed value for a given ingredient
const toggleIngredients = (id, recipeId) => {
    const recipes = getRecipes()
    const recipe = recipes.find((recipe) => recipe.id === recipeId)
    const ingredients = recipe.ingredients
    const ingredient = ingredients.find((ingredient) => ingredient.id === id)

    if (ingredient) {
        ingredient.completed = !ingredient.completed
        saveRecipe()
    }
}

// render the ingredients 
const renderIngredients = (recipeId) => {
    const recipes = getRecipes()
    const recipe = recipes.find((recipe) => recipe.id === recipeId)

    renderIngredientsByContent(recipe)
}

const renderIngredientsByContent = (recipe) => {
    const ingredientEl = document.querySelector('#ingredients')
    const ingredients = recipe.ingredients

    ingredientEl.innerHTML = ''

    if (ingredients.length > 0) {
        ingredients.forEach((ingredient) => {
            ingredientEl.appendChild(generateIngredientDOM(ingredient))
        })
    } else {
        const messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'No ingredients to show'
        ingredientEl.appendChild(messageEl)
    }

    saveRecipe()
}

const generateIngredientDOM = (ingredient) => {
    const ingredientEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const ingredientText = document.createElement('span')
    const checkbox = document.createElement('input')
    const removeButton = document.createElement('button')
    const recipes = getRecipes()
    const recipe = recipes.find((recipe) => recipe.id)

    // Setup ingredient checkbox
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = ingredient.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change', () => {
        toggleIngredients(ingredient.id, recipe.id)
        renderIngredients(recipe.id)
    })

    // Setup the ingredient text
    ingredientText.textContent = ingredient.text
    containerEl.appendChild(ingredientText)

    // Setup container
    ingredientEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    ingredientEl.appendChild(containerEl)

    // Setup the remove button
    removeButton.textContent = 'remove'
    removeButton.classList.add('button', 'button--text')
    ingredientEl.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeIngredients(ingredient.id, recipe.id)
        renderIngredients(recipe.id)
    }) 

    return ingredientEl
}

const generateSummaryDOM = (incompleteIngredients) => {
    const summary = document.createElement('h2')
    const plural_pronoun = incompleteIngredients.length <= 1 ? 'is' : 'are'
    const plural = incompleteIngredients.length <= 1 ? '' : 's'
    summary.classList.add('list-title')
    summary.textContent = `There ${plural_pronoun} ${incompleteIngredients.length} ingredient${plural} missing`
    return summary
}

export { createIngredients, renderIngredients, renderIngredientsByContent, generateSummaryDOM }
