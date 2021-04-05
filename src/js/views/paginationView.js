import View from './view.js'
import icons from 'url:../../img/icons.svg'
import { RES_PER_PAGE } from '../config.js'

class PaginationView extends View {
    _parentElement = document.querySelector('.pagination');


    _generateMarkup() {
        const currentPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        // console.log(this._data, numPages);

        //Page 1 and there are other pages
        if (currentPage === 1 && numPages > 1) {
            //next button
            return this._generateMarkupButtonNext(currentPage)
        }

        //Last Page
        if (currentPage === numPages && numPages > 1) {
            // console.log(currentPage - 1)
            //go back button
            return this._generateMarkupButtonPrev(currentPage);
        }

        //Other Page
        if (currentPage < numPages) {
            return this._generateMarkupButtonPrev(currentPage) + this._generateMarkupButtonNext(currentPage);

            ;
        }

        //Page 1 and there are no other pages
        return ``;

    }
    _generateMarkupButtonPrev(currentPage) {
        return `
        <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
      </button>
        `
    }
    _generateMarkupButtonNext(currentPage) {
        return `<button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
        </svg>
  </button> 
    `
    }

    addHandlerClick(handler) {
        this._parentElement.addEventListener('click', handler)
    }
}


export default new PaginationView();