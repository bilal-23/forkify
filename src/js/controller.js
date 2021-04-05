import * as model from './model.js'
//this will provide us model.state and model.loadRecipe
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import ResultView from './views/resultsView.js'
import PaginationView from './views/paginationView.js'

import 'core-js/stable'
import 'regenerator-runtime/runtime'
import paginationView from './views/paginationView.js'

//polyfilling everything else
//pollyfiling async await

// if (module.hot) {
//   module.hot.accept();
// }

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
    // ResultView.render(model.state.search.results);
    ResultView.render(model.getSearchResultPage());

    //4 Render intial Pagination button
    PaginationView.render(model.state.search)

  } catch (err) {
    console.log(err)
  }
}

const controlPagination = function (e) {
  const button = e.target.closest('.btn--inline')
  if (!button) return;

  const goToPage = +button.dataset.goto;
  //Render New Results
  ResultView.render(model.getSearchResultPage(goToPage));
  //Render New Pagination Buttons
  PaginationView.render(model.state.search)

}


const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSeachResults);
  PaginationView.addHandlerClick(controlPagination);
}
init();