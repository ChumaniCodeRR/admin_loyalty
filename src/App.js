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
import StoreList from './components/pages/stores/StoreList';
import AddStore from './components/pages/stores/AddStore';
import EditStore from './components/pages/stores/EditStore';
import MemberList from './components/pages/user/member/MemberList';
import AdminList from './components/pages/user/admin/AdminList';
import ClientList from './components/pages/user/client/ClientList';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <AuthRoute path='/' exact={true} component={Dashboard} />
          <AuthRoute path='/profile' exact={true} component={Profile} />
          <AuthRoute path='/stores' exact={true} component={StoreList} />
          <AuthRoute path='/stores/create' exact={true} component={AddStore} />
          <AuthRoute path='/stores/edit/:id' exact={true} component={EditStore} />
          <AuthRoute path='/members' exact={true} component={MemberList} />
          <AuthRoute path='/admin' exact={true} component={AdminList} />
          <AuthRoute path='/client' exact={true} component={ClientList} />
          <WebRoute path='/login' exact={true} component={Login} />
          <WebRoute path='/forgot-password' exact={true} component={ForgotPassword} />
        </Switch>
        <ToastContainer />
      </BrowserRouter>
    );
  }
}

export default App;
