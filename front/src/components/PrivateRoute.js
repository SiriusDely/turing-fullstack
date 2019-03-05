import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AUTH_TOKEN } from './constants';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    { ...rest }
    render={
      props => {
        return localStorage.getItem(AUTH_TOKEN) ? (
          <Component { ...props } />
        ) : (
          <Redirect to={ {
              pathname: "/login",
              state: { from: props.location }
          } } />
        );
      }
    }
  />
);

export default PrivateRoute;
