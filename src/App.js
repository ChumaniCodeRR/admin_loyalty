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
import ClientAccount from './components/pages/user/client/ClientAccount';
import MemberTransaction from './components/pages/transaction/MemberTransactions';
import ClientAdminDashboard from './components/pages/dashboard/ClientAdminDashboard';
import VoucherCategoryList from './components/pages/voucher/VoucherCategoryList';
import AddVoucherCategory from './components/pages/voucher/AddVoucherCategory';
import EditVoucherCategory from './components/pages/voucher/EditVoucherCategory';
import voucherList from './components/pages/voucher/VoucherList';
import EditVoucher from './components/pages/voucher/EditVoucher';
import UserList from './components/pages/user/UserList';
import AddUser from './components/pages/user/AddUser';
import EditUser from './components/pages/user/EditUser';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <AuthRoute path='/' exact={true} component={Dashboard} />
          <AuthRoute path='/profile' exact={true} component={Profile} />
          <AuthRoute path='/stores' exact={true} component={StoreList} />
          <AuthRoute path='/stores/create' exact={true} component={AddStore} />
          <AuthRoute path='/stores/create/:client_id' exact={true} component={AddStore} />
          <AuthRoute path='/stores/edit/:id' exact={true} component={EditStore} />
          <AuthRoute path='/stores/edit/:id/:client_id' exact={true} component={EditStore} />
          <AuthRoute path='/members/:account_id?' exact={true} component={MemberList} />
          <AuthRoute path='/transactions/:cell_number' exact={true} component={MemberTransaction} />
          <AuthRoute path='/admin/transactions/:cell_number/:account_id' exact={true} component={MemberTransaction} />
          <AuthRoute path='/admin' exact={true} component={AdminList} />
          <AuthRoute path='/client' exact={true} component={ClientList} />
          <AuthRoute path='/client/account/:id' exact={true} component={ClientAccount} />
          <AuthRoute path='/client/store/:client_id' exact={true} component={StoreList} />
          <AuthRoute path='/client/dashboard/:user_id' exact={true} component={ClientAdminDashboard} />
          <AuthRoute path='/admin/voucher/categories/:user_id' exact={true} component={VoucherCategoryList} />
          <AuthRoute path='/admin/voucher/categories/add/:user_id' exact={true} component={AddVoucherCategory} />
          <AuthRoute path='/voucher/categories/edit/:category_id/:user_id' exact={true} component={EditVoucherCategory} />
          <AuthRoute path='/voucher/categories' exact={true} component={VoucherCategoryList} />
          <AuthRoute path='/voucher/categories/add' exact={true} component={AddVoucherCategory} />
          <AuthRoute path='/voucher/categories/edit/:category_id' exact={true} component={EditVoucherCategory} />
          <AuthRoute path='/vouchers/:category_id' exact={true} component={voucherList} />
          <AuthRoute path='/vouchers/edit/:voucher_id' exact={true} component={EditVoucher} />
          <AuthRoute path='/user/list/:user_id' exact={true} component={UserList} />
          <AuthRoute path='/user/add/:user_id' exact={true} component={AddUser} />
          <AuthRoute path='/user/edit/:user_id' exact={true} component={EditUser} />
          <WebRoute path='/login' exact={true} component={Login} />
          <WebRoute path='/forgot-password' exact={true} component={ForgotPassword} />
        </Switch>
        <ToastContainer />
      </BrowserRouter>
    );
  }
}

export default App;
