import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const DepartmentsQuery = gql`
  {
    departments {
      id,
      name
    }
  }
`;

const DepartmentsSelect = ({ data }) => (
  <select>
    <option>Departments</option>
    { data.departments && data.departments.map(department => (
      <option key={ department.id } value={ department.id }>
        { department.name }
      </option>
    )) }
  </select>
);

export default graphql(DepartmentsQuery)(DepartmentsSelect);
