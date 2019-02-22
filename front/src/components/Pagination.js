import React from 'react';

const Pagination = ({ page, lastPage }) => {
  let paginations;

  if (true) {
    paginations = Array.from({ length: lastPage }, (v, k) => k + 1)
                       .map(p => (
                         p === page ? (<li key={ p }>
                           <a className='pagination-link is-current'
                              aria-current aria-label={ `Goto page ${p}` }>{ p }</a>
                         </li>) :
                         (<li key={ p }>
                           <a className='pagination-link'
                              aria-label={ `Goto page ${p}` }>{ p }</a>
                         </li>)
                       ));
  }

  return (
    <nav className="pagination" role="navigation" aria-label="pagination">
      <a className="pagination-previous">Previous</a>
      <a className="pagination-next">Next page</a>
      <ul className="pagination-list">
        { paginations }
      </ul>
    </nav>
  );
}

export default Pagination;
