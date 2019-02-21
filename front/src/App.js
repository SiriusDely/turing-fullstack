import React, { Component, Fragment } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';

import Login from './components/Login';
import NotFound from './components/NotFound';
import ProductsList from './components/ProductsList.js';

class App extends Component {
  render() {
    return (
      <Fragment>
        <nav className="navbar is-danger" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <NavLink className="navbar-item" exact to="/" activeClassName="is-active">TURING</NavLink>
            <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div className="navbar-menu">
            <div className="navbar-start">
              <NavLink className="navbar-item" to="/departments" activeClassName="is-active">Departments</NavLink>
              <NavLink className="navbar-item" to="/categories" activeClassName="is-active">Categories</NavLink>
            </div>
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <NavLink className="button is-warning" to="/login">Login</NavLink>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <Switch>
          <Route path='/' exact component={ ProductsList } />
          <Route path='/login' exact component={ Login } />
          <Route path='/departments' exact component={ ProductsList } />
          <Route path='/categories' exact component={ ProductsList } />
          <Route component={ NotFound } />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
