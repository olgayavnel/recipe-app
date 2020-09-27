import { initializeEditPage } from './views'
import { updateRecipe, removeRecipe } from './recipes'
import { createIngredients, renderIngredients } from './ingredients'

const titleElement = document.querySelector('#recipe-title')
const bodyElement = document.querySelector('#recipe-body')
const ingredientsForm = document.querySelector('#new-ingredient')
const removeElement = document.querySelector('#remove-recipe')
const recipeId = location.hash.substring(1)

initializeEditPage(recipeId)

titleElement.addEventListener('input', (e) => {
    updateRecipe(recipeId, {
        title: e.target.value
    })
})

bodyElement.addEventListener('input', (e) => {
    updateRecipe(recipeId, {
        body: e.target.value
    })
})

ingredientsForm.addEventListener('submit', (e) => {
    const text = e.target.elements.text.value.trim()
    e.preventDefault()
    if (text.length > 0) {
        createIngredients(recipeId, text)
        renderIngredients(recipeId)
        e.target.elements.text.value = ''
    }
})

removeElement.addEventListener('click', (e) => {
    removeRecipe(recipeId)
    location.assign('/index.html')
})

window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        initializeEditPage(recipeId)
    }
})