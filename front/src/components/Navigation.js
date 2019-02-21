import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

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
          <NavLink className="navbar-item" to="/departments"
                   activeClassName="is-active">Departments</NavLink>
          <NavLink className="navbar-item" to="/categories"
                   activeClassName="is-active">Categories</NavLink>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              { authToken ? (
                  <button className="button is-warning" to="/login" onClick={ () => {
                      localStorage.removeItem(AUTH_TOKEN);
                      props.history.push('/');
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
