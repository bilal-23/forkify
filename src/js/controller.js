import * as model from './model.js'
//this will provide us model.state and model.loadRecipe
import recipeView from './views/recipeView.js'



import 'core-js/stable'
import 'regenerator-runtime/runtime'

//polyfilling everything else
//pollyfiling async await
const recipeContainer = document.querySelector('.recipe');



const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////



const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id)
    if (!id) return;

    //Render Spinner
    recipeView.renderSpinner();

    //1LOADING REDCIPE
    await model.loadRecipe(id); //this function is an async and therefore we have to await before moving forward

    //2 RENDERING RECIPE
    recipeView.render(model.state.recipe)


  }
  catch (err) {
    alert(err)
  }
}

const events = ['hashchange', 'load'];
events.forEach(ev => window.addEventListener(ev, controlRecipe));
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);