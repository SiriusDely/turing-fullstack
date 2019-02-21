import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import {
  Login, Navigation, NotFound, ProductsList
} from './components';

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
