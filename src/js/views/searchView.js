class SearchView {
    _parentElement = document.querySelector('.search')

    //this will reutr the search Query
    getQuery() {
        const query = this._parentElement.querySelector('.search__field').value;
        this._clearInput();
        return query;
    }

    _clearInput() {
        this._parentElement.querySelector('.search__field').value = ``;
    }

    addHandlerSearch(handler) {
        this._parentElement.addEventListener('submit', function (e) {
            e.preventDefault(); //cannot call handler directly becauseit is a form.
            handler();

        });
    }
}

export default new SearchView()