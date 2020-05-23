import React, { Component } from 'react';
import HeaderBar from '../../partials/Header/HeaderBar';
import SideBar  from '../../partials/SideBar';
import ClientDashboard from './ClientDashboard';
import { getAccount } from '../../../store/actions/account';
import { connect } from 'react-redux';

class ClientAdminDashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    this.fetchUserAccount();
  }

  fetchUserAccount = async() => {
    const { match: {params} } = this.props;
    await this.props.getAccount(params.user_id);
    this.setState({
      user: this.props.account.user
    });
  }

  render () {
    return (
      <>
      <HeaderBar />
        <SideBar />
        <div className="main-content">
          <div className="container-fluid">
            <div className='row'>
              <div className='col-md-2'>
                <a href='/client'>Back to client list</a>
              </div>
            </div>
            {
              this.state.user && (
                <ClientDashboard user={this.state.user} account_form={false} />
              )
            }
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.accountReducer.account
  };
};

export default connect (mapStateToProps, { getAccount }) (ClientAdminDashboard);
