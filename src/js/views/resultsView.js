import View from './view.js'
import icons from 'url:../../img/icons.svg'

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = "No recipes found for your query. Please try again";
  _successMessage = "";

  _generateMarkup() {
    // console.log(this._data)
    return this._data.map(recipe => { return this._generateMarkupPreview(recipe) }).join('');
  }
  _generateMarkupPreview(rec) {
    const id = window.location.hash.slice(1);

    return `
        <li class="preview">
         <a class="preview__link ${rec.id === id ? 'preview__link--active' : ''} " href="#${rec.id} ">
          <figure class="preview__fig">
            <img src="${rec.image}" alt="${rec.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${rec.title}</h4>
            <p class="preview__publisher">${rec.publisher}</p>
            
          </div>
        </a>
      </li>
        `
  }
}

export default new ResultView();