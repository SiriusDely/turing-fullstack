import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { NavLink } from 'react-router-dom';

const DepartmentsQuery = gql`
  {
    departments {
      id,
      name
    }
  }
`;

const DepartmentsDropdown = ({ data }) => (
  <div className="navbar-item has-dropdown is-hoverable">
    <NavLink className="navbar-link is-arrowless" to="/departments"
             activeClassName="is-active">Departments</NavLink>
    { data && data.departments && (
        <div className="navbar-dropdown">
          { data.departments.map(department => (
            <NavLink className='navbar-item' activeClassName='is-active'
                     key={ department.id } exact to={ `/departments/${department.id}` }>
              { department.name }
            </NavLink>
          )) }
        </div>
    ) }
  </div>
);

export default graphql(DepartmentsQuery)(DepartmentsDropdown);
