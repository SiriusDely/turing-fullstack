import React from 'react';

const Pagination = ({ page, lastPage, onClick }) => {
  if (page > lastPage) {
    onClick(1);
    return null;
  }

  let paginations;

  if (true) {
    paginations = Array.from({ length: lastPage }, (v, k) => k + 1)
                       .map(p => (
                         p === page ? (<li key={ p }>
                           <a className='pagination-link is-current'
                              aria-current aria-label={ `Goto page ${p}` }>{ p }</a>
                         </li>) :
                         (<li key={ p }>
                           <a className='pagination-link' onClick={ e => onClick(e.target.innerText) }
                              aria-label={ `Goto page ${p}` }>{ p }</a>
                         </li>)
                       ));
  }

  return (
    <nav className="pagination" role="navigation" aria-label="pagination">
      <a className="pagination-previous" onClick={ e => onClick(page - 1) }>Previous</a>
      <a className="pagination-next" onClick={ e => {
          if (page < lastPage) { onClick(page + 1); }
      } }>Next page</a>
      <ul className="pagination-list">
        { paginations }
      </ul>
    </nav>
  );
}

export default Pagination;
