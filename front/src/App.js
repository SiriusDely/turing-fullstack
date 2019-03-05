import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import {
  AuthenticatedPage, CartPage,
  Login, Navigation, NotFound,
  ProductDetails, ProductsPage
} from './components';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Navigation />
        <Switch>
          <Route path='/' exact component={ ProductsPage } />
          <Route path='/authenticated' exact component={ AuthenticatedPage } />
          <Route path='/cart' exact component={ CartPage } />
          <Route path='/categories/:categoryId?' component={ ProductsPage } />
          <Route path='/departments/:departmentId?' component={ ProductsPage } />
          <Route path='/login' exact component={ Login } />
          <Route path='/product/:id' component={ ProductDetails } />
          <Route component={ NotFound } />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
