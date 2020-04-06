import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import Login from "./components/pages/Login";
import ForgotPassword from "./components/pages/ForgotPassword";
import Profile from "./components/pages/user/Profile";
import WebRoute from "./instances/WebRoute";
import AuthRoute from "./instances/AuthRoute";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <AuthRoute path='/' exact={true} component={Dashboard} />
          <AuthRoute path='/profile' exact={true} component={Profile} />
          <WebRoute path='/login' exact={true} component={Login} />
          <WebRoute path='/forgot-password' exact={true} component={ForgotPassword} />
        </Switch>
        <ToastContainer />
      </BrowserRouter>
    );
  }
}

export default App;
