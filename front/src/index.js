import React from 'react';
import ReactDOM from 'react-dom';

import ReactGA from 'react-ga';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/js/all.js';
import './index.css';

import App from './App';
import { AUTH_TOKEN } from './constants';

ReactGA.initialize('UA-133436720-1');
ReactGA.pageview(window.location.pathname + window.location.search);

const httpLink = createHttpLink({
  uri: '/graphql'
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.render((
  <ApolloProvider client={ client }>
    <Router>
      <App />
    </Router>
  </ApolloProvider>
), document.getElementById('root'));
