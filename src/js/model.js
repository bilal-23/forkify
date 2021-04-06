import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE } from './config.js'
import { getJson } from './helpers.js'

export const state = {
    recipe: {},
    search: {
        query: ``,
        results: [],
        page: 1,
        resultsPerPage: RES_PER_PAGE
    },
};


//this fucntion willnot return anything, itll only change the state object and controller will take the recipe object from state object

export const loadRecipe = async function (id) {
    try {
        const data = await getJson(`${API_URL}/${id}`) //will recieve resolved promise

        const { recipe } = data.data;
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients
        }


    } catch (err) {
        //temp error handling 
        console.error(`${err} error from model.js file`);
        throw err;
    }
}

export const loadSearchResults = async function (query) {
    try {
        state.search.query = query
        const data = await getJson(`${API_URL}?search=${query}`)

        state.search.results = data.data.recipes.map(recipe => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                image: recipe.image_url,
            }

        })

    }
    catch (err) {
        console.error(`${err} error , cannot load search result`);
        throw err;
    }
};

export const getSearchResultPage = function (page = 1) {
    state.search.page = page;
    const start = (page - 1) * state.search.resultsPerPage;
    const end = (page * state.search.resultsPerPage);
    const paginationResult = state.search.results.slice(start, end);
    // console.log(paginationResult)
    return paginationResult;
}

export const updateServings = function (newServings) {


    state.recipe.ingredients.forEach(ing => {
        if (ing.quantity === null) return;

        ing.quantity = ing.quantity / state.recipe.servings * newServings;
    })
    state.recipe.servings = newServings;
}
