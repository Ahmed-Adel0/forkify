import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    if (numPages === 1) {
      return '';
    }

    const createButton = (page, label, direction) => `
      <button data-goto="${page}" class="btn--inline pagination__btn--${direction}">
        ${label}
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-${direction}"></use>
        </svg>
      </button>
    `;

    const numPagesBtn = numPages => `
      <span class="numPages">
      Pages: ${numPages}
      </span>
  `;

    let markup = numPagesBtn(numPages);

    if (curPage === 1) {
      markup += createButton(curPage + 1, `Page ${curPage + 1}`, 'next');
    } else if (curPage === numPages) {
      markup += createButton(curPage - 1, `Page ${curPage - 1}`, 'prev');
    } else {
      markup += createButton(curPage - 1, `Page ${curPage - 1}`, 'prev');
      markup += createButton(curPage + 1, `Page ${curPage + 1}`, 'next');
    }

    return markup;
  }
}

export default new PaginationView();
