import * as model from './model.js'
//this will provide us model.state and model.loadRecipe
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import ResultView from './views/resultsView.js'


import 'core-js/stable'
import 'regenerator-runtime/runtime'
//polyfilling everything else
//pollyfiling async await

if (module.hot) {
  module.hot.accept();
}

const recipeContainer = document.querySelector('.recipe');


const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id)
    if (!id) return;

    //Render Spinner
    recipeView.renderSpinner();


    //1LOADING REDCIPE
    await model.loadRecipe(id); //this function is an async and therefore we have to await before moving forward

    //2 RENDERING RECIPE
    recipeView.render(model.state.recipe)


  }
  catch (err) {
    // console.error(err);
    recipeView.renderError()
  }
}


const controlSeachResults = async function () {
  try {
    //1 Get Search Query
    const query = searchView.getQuery();
    if (!query) return;

    ResultView.renderSpinner();
    //2 Load Search Result
    await model.loadSearchResults(`${query}`) //trigger the search results function in model

    //3 Render Result
    // console.log(model.state.search.results)
    ResultView.render(model.state.search.results);

  } catch (err) {
    console.log(err)
  }
}












const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSeachResults)
}
init();