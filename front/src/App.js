import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import {
  Login, Navigation, NotFound, ProductsPage
} from './components';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Navigation />
        <Switch>
          <Route path='/' exact component={ ProductsPage } />
          <Route path='/login' exact component={ Login } />
          <Route path='/departments/:departmentId?' component={ ProductsPage } />
          <Route path='/categories/:categoryId?' component={ ProductsPage } />
          <Route component={ NotFound } />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
