import React from 'react';
import ReactDOM from 'react-dom';

import ReactGA from 'react-ga';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/js/all.js';
import './index.css';

import App from './App';

import GraphManager from './managers/GraphManager';

ReactGA.initialize('UA-133436720-1');
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render((
  <ApolloProvider client={ GraphManager.client }>
    <Router>
      <App />
    </Router>
  </ApolloProvider>
), document.getElementById('root'));
