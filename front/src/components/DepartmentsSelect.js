import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const DepartmentsQuery = gql`
  {
    departments {
      id,
      name
    }
  }
`;

// const DepartmentsSelect = ({ data, onSelect }) => (
const DepartmentsSelect = ({ onSelect }) => (
  <Query query={ DepartmentsQuery }>
    { ({ data }) => (
      <select onChange={ e => {
          onSelect(e.target.value);
      } }>
        <option value={ 0 }>All Departments</option>
        { data && data.departments && data.departments.map(department => (
          <option key={ department.id } value={ department.id }>
            { department.name }
          </option>
        )) }
      </select>
    )}
  </Query>
);

export default DepartmentsSelect;
