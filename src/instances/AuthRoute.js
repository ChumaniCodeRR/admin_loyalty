import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem("access_token")
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
);

export default AuthRoute;
