import React from 'react';
import { Query } from 'react-apollo';
import { NavLink } from 'react-router-dom';

import { CategoriesQuery } from '../managers/GraphManager';

const CategoriesDropdown = ({ departmentId }) => (
  <Query query={ CategoriesQuery } variables={ { departmentId } }>
  { ({ data }) => (
    <div className="navbar-item has-dropdown is-hoverable">
      <NavLink className="navbar-link is-arrowless" to="/categories"
               activeClassName="is-active">Categories</NavLink>
      { data && data.categories && (
          <div className="navbar-dropdown">
            { data.categories.map(category => (
              <NavLink className='navbar-item' activeClassName='is-active'
                       key={ category.id } exact to={ `/categories/${category.id}` }>
                { category.name }
              </NavLink>
            )) }
          </div>
      ) }
    </div>
  ) }
  </Query>
);

export default CategoriesDropdown;
