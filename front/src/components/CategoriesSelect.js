import React from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router';

import { CategoriesQuery } from '../managers/GraphManager';

const CategoriesSelect = ({ departmentId, categoryId, history }) => (
  <Query query={ CategoriesQuery } variables={ { departmentId } }>
    { ({ data }) => (
      <select defaultValue={ categoryId } onChange={ e => {
        const _categoryId = parseInt(e.target.value);
        const categoryId = _categoryId && _categoryId > 0 ? _categoryId : '';
        history.push(`/categories/${categoryId}`);
      } }>
        <option value={ 0 }>All Categories</option>
        { data && data.categories && data.categories.map(category => (
          <option key={ category.id } value={ category.id }
          selected={ category.id === categoryId }>
            { category.name }
          </option>
        )) }
      </select>
    ) }
  </Query>
);

export default withRouter(CategoriesSelect);
