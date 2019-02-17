import React from 'react';
import ReactDOM from 'react-dom';
import 'tachyons';
import './index.css';

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

ReactDOM.render((
  <ApolloProvider client={ client }>
    <Router>
      <Switch>
        <Route path='/' exact component={ ProductsList } />
        <Route component={ NotFound } />
      </Switch>
    </Router>
  </ApolloProvider>
  ), document.getElementById('root'));
