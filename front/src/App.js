import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './components/Login';
import Navigation from './components/Navigation';
import NotFound from './components/NotFound';
import ProductsList from './components/ProductsList.js';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Navigation />
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
