import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { NavLink } from 'react-router-dom';

const CategoriesQuery = gql`
  query categories($departmentId: ID) {
    categories(departmentId: $departmentId) {
      id,
      name
    }
  }
`;

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
