import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfile } from '../../../store/actions/user';
import Spinner from 'react-bootstrap/Spinner';
import ClientDashboard from './ClientDashboard';

class DashboardContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
      role: null,
      loading: false,
      user: null
    };
  }

  async componentDidMount() {
    await this.fetchProfile();
  }

  fetchProfile = async () => {
    this.setState({
      loading: true
    });
    await this.props.getProfile();
    if (this.props.user) {
      this.setState({
        role: this.props.user.roles[0],
        user: this.props.user
      });
    }
    this.setState({
      loading: false
    });
  }

  render () {

    let dashboard = null;
    if (this.state.role === 'Admin') {
      dashboard = <p>You are an admin...</p>
    } else if (this.state.role === 'Client') {
      dashboard = <ClientDashboard user={this.state.user} account_form={true} />
    }

    return (
      <>
        {
          this.state.loading && (
            <Spinner animation='grow' />
          )
        }
        {
          dashboard
        }
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user
  };
};

export default connect (mapStateToProps, { getProfile }) (DashboardContainer);