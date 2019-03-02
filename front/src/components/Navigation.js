import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import CategoriesDropdown from './CategoriesDropdown';
import DepartmentsDropdown from './DepartmentsDropdown';
import { AUTH_TOKEN } from '../constants';

const Navigation = (props) => {
  const authToken = localStorage.getItem(AUTH_TOKEN);

  return (
    <nav className="navbar is-danger" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <NavLink className="navbar-item" exact to="/"
                 activeClassName="is-active">TURING</NavLink>
        <a role="button" className="navbar-burger burger" aria-label="menu"
           aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <DepartmentsDropdown />
          <CategoriesDropdown />
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <NavLink className="button is-primary" to="/cart">
                <span className="icon">
                  <i className="fas fa-shopping-cart"></i>
                </span>
                <span>Cart</span>
              </NavLink>
              { authToken ? (
                  <button className="button is-warning" onClick={ () => {
                      const confirm = window.confirm('Logout from Turing?');
                      if (confirm) {
                        localStorage.removeItem(AUTH_TOKEN);
                        props.history.push('/');
                      }
                  } }>Logout</button>
              ) : (
                  <NavLink className="button" to="/login">Login</NavLink>
              ) }
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Navigation);
