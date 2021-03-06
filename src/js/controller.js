import * as model from './model.js'
//this will provide us model.state and model.loadRecipe
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import ResultView from './views/resultsView.js'
import bookmarksView from './views/bookmarkView.js'
import PaginationView from './views/paginationView.js'
import addRecipeView from './views/addRecipeView.js'
import { MODAL_CLOSE_SEC } from './config.js'

import 'core-js/stable'
import 'regenerator-runtime/runtime'
import paginationView from './views/paginationView.js'
import bookmarkView from './views/bookmarkView.js'

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
    //UPdate bookmark



    //0 Update results viwe to mark selected search result
    ResultView.update(model.getSearchResultPage())

    //1LOADING REDCIPE
    await model.loadRecipe(id); //this function is an async and therefore we have to await before moving forward

    //2 RENDERING RECIPE
    recipeView.render(model.state.recipe)
    //UPdate bookmark
    bookmarksView.update(model.state.bookmarks)



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

const conrtolServings = function (newServings) {

  //Update Recipe Serving (in state)
  model.updateServings(newServings);

  //Update Recipe View
  // recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe)
}

const controlAddBookmark = function () {
  // 1) Add / Remove Bookmark

  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe) //checking if bookmarked value is false or true
  else model.deleteBookmark(model.state.recipe.id)
  // 2) Update Recipe View
  recipeView.update(model.state.recipe);

  // 3) Render Bookmarks
  bookmarksView.render(model.state.bookmarks)
}

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks)
}

const controlAddRecipe = async function (newRecipe) {
  try {
    //render spinner
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe)
    console.log(model.state.recipe)
    //render recipe
    recipeView.render(model.state.recipe);

    //Succes message 
    addRecipeView.renderMessage()

    bookmarkView.render(model.state.bookmarks);

    //change id in the url
    window.history.pushState(null, '', `#${model.state.recipe.id}`)

    //close form window
    setTimeout(() => {
      addRecipeView.toggleWindow()
    }, MODAL_CLOSE_SEC * 1000)
  }
  catch (err) {
    console.log(err, '!!!!!')
    addRecipeView.renderError(err)
  }
}

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSeachResults);
  PaginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerServings(conrtolServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  bookmarksView.addRenderHandler(controlBookmarks)
  addRecipeView._addHandlerUpload(controlAddRecipe)
}
init();