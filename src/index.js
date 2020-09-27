import { createRecipe } from './recipes'
import { setFilters } from './filters'
import { renderRecipe } from './views'

renderRecipe()

document.querySelector('#create-recipe').addEventListener('click', (e) => {
    const id = createRecipe()
    location.assign(`/edit.html#${id}`)
})

document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderRecipe()
})

window.addEventListener('storage', (e) => {
    if (e.key === 'recipes') {
        renderRecipe()
    }
})