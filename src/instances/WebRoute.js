import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const WebRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem("access_token")
      ? <Redirect to='/' />
      : <Component {...props} />
  )} />
);

export default WebRoute;
