import React, { Component } from 'react';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import ProductsList from './components/ProductsList.js';
import NotFound from './components/NotFound';

const client = new ApolloClient();

fetch('/api').then(resp => {
  console.log(resp.json());
});

client
  .query({
    query: gql`
    {
      allUsers {
        id,
        username
      }
    }
    `
  })
  .then(({ data }) => console.log(data));

class App extends Component {
  render() {
    return (
      <ApolloProvider client={ client }>
        <Router>
          <Switch>
            <Route path='/' exact component={ ProductsList } />
            <Route component={ NotFound } />
          </Switch>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
