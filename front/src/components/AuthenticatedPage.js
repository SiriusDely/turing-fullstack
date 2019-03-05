import React from 'react';
import queryString from 'query-string';
import { AUTH_TOKEN } from '../constants';

const AuthenticatedPage = (props) => {
  const { history } = props;
  const { token } = queryString.parse(window.location.search);
  localStorage.setItem(AUTH_TOKEN, token)
  history.push('/');
  return <></>;
};

export default AuthenticatedPage;
