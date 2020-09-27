import uuidv4 from 'uuid/v4'

let recipes = []

// Get the saved data and return the value found fot the key 'recipes' in localStorage.getItem('recipes')
const loadRecipe = () => {
    const recipesJSON = localStorage.getItem('recipes')

    try {
        return recipesJSON ? JSON.parse(recipesJSON) : []
    } catch (e) {
        return []
    } 
}

// Save the recipes to localStorage
const saveRecipe = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}

const getRecipes = () => recipes

const createRecipe = () => {
    const id = uuidv4()

    recipes.push({
        id: id,
        title: '',
        body: '',
        ingredients: []
    })
    saveRecipe()
    return id
}

const removeRecipe = (id) => {
    const recipeIndex = recipes.findIndex((recipe) => recipe.id === id)

    if (recipeIndex > -1) {
        recipes.splice(recipeIndex, 1)
        saveRecipe()
    }
}

const updateRecipe = (id, updates) => {
    const recipe = recipes.find((recipe) => recipe.id === id)

    if (!recipe) {
        return
    }

    if (typeof updates.title === 'string') {
        recipe.title = updates.title
    }

    if (typeof updates.body === 'string') {
        recipe.body = updates.body
    }

    saveRecipe()
    return recipe
}

recipes = loadRecipe()

export { getRecipes, createRecipe, removeRecipe, updateRecipe, saveRecipe }