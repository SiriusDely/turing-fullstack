import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const CategoriesQuery = gql`
  query categories($departmentId: Int) {
    categories(departmentId: $departmentId) {
      id,
      name
    }
  }
`;

const CategoriesSelect = ({ departmentId, onSelect }) => (
  <Query query={ CategoriesQuery } variables={ { departmentId } }>
    { ({ data }) => (
      <select onChange={ e => {
        onSelect(e.target.value);
      } }>
        <option value={ 0 }>All Categories</option>
        { data && data.categories && data.categories.map(category => (
          <option key={ category.id } value={ category.id }>
            { category.name }
          </option>
        )) }
      </select>
    ) }
  </Query>
);

export default CategoriesSelect;
