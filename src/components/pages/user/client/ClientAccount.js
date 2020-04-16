import React, { Component } from 'react';
import HeaderBar from '../../../partials/Header/HeaderBar';
import SideBar from '../../../partials/SideBar';
import Spinner from 'react-bootstrap/Spinner';
import { connect } from 'react-redux';
import { getAccount, updateAccount, changeLogo } from '../../../../store/actions/account';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

class ClientAccount extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      registration_points: 0,
      percentage_per_order: 0,
      point_in_rands: 0,
      loading: false,
      logo: ''
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  componentDidMount()
  {
    this.fetchAccount();
  }

  fetchAccount = async() => {
    const {match: {params}} = this.props;
    await this.props.getAccount(params.id);
    this.setState({
      name: this.props.account.name ?? '',
      registration_points: this.props.account.registration_points,
      percentage_per_order: this.props.account.percentage_per_order,
      point_in_rands: this.props.account.point_in_rands,
      logo: this.props.account.logo
    });
  }

  _updateAccount = async() => {
    const { match: {params}} = this.props;
    this.setState({
      loading: true
    });

    let data = {
      name: this.state.name,
      registration_points: this.state.registration_points,
      percentage_per_order: this.state.percentage_per_order,
      point_in_rands: this.state.point_in_rands
    };
    await this.props.updateAccount(data, params.id);
    if (this.props.status) {
      this.setState({
        redirect: true
      });
    } else {
      this.setState({
        loading: false
      });
    }
  }

  uploadLogo = async (e) => {
    const { match: {params}} = this.props;
    this.setState({
      loading: true
    });
    await this.props.changeLogo({ logo: e.target.files[0] }, params.id);
    if (this.props.status) {
      await this.fetchAccount();
      toast.success('Logo updated!');
    }
    this.setState({
      loading: false
    });
    
  }

  openDialog = () => {
    this.inputElement.click();
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to='/client' />
      );
    }
    return (
      <>
        <HeaderBar />
        <SideBar />
        <div className="main-content">
          <div className="container-fluid">
            <div className='row'>
              <div className='col-md-12'>
                <a href='/client' className='btn btn-link'>Back to clients</a>
                <div className='card'>
                  <div className='card-header'>
                    <h3>Edit loyalty account</h3>
                  </div>
                  <div className='card-body'>
                    <div className='form-group col-md-3'>
                      <img src={this.state.logo} alt='' className='account-logo' onClick={this.openDialog} />
                      <input type='file' name='logo' accept="image/jpeg,image/png,image/jpg" onChange={this.uploadLogo} ref={input => this.inputElement = input} className='hidden' />
                    </div>
                    <div className='form-group'>
                      <label>Loyalty name</label>
                      <input type='text' name='name' disabled={this.state.loading} onChange={this.handleChange} className='form-control' value={this.state.name} />
                      {
                        this.props.errors.name && (
                          <span className='text-danger'>{this.props.errors.name}</span>
                        )
                      }
                    </div>
                    <div className='form-group'>
                      <label>Amount of points given on registration</label>
                      <input type='number' step="0.01" name='registration_points' disabled={this.state.loading} onChange={this.handleChange} className='form-control' value={this.state.registration_points} />
                      {
                        this.props.errors.registration_points && (
                          <span className='text-danger'>{this.props.errors.registration_points}</span>
                        )
                      }
                    </div>
                    <div className='form-group'>
                      <label>Order percentage (%)</label>
                      <input type='number' step="0.01" name='percentage_per_order' disabled={this.state.loading} onChange={this.handleChange} className='form-control' value={this.state.percentage_per_order} />
                      {
                        this.props.errors.percentage_per_order && (
                          <span className='text-danger'>{this.props.errors.percentage_per_order}</span>
                        )
                      }
                    </div>
                    <div className='form-group'>
                      <label>Point value in RAND (1 Rand = ? points)</label>
                      <input type='number' step="0.01" name='point_in_rands' disabled={this.state.loading} onChange={this.handleChange} className='form-control' value={this.state.point_in_rands} />
                      {
                        this.props.errors.point_in_rands && (
                          <span className='text-danger'>{this.props.errors.point_in_rands}</span>
                        )
                      }
                    </div>
                    <button className='btn btn-primary' disabled={this.state.loading} onClick={this._updateAccount}>
                      <i className='fa fa-save'> </i>
                      {
                        this.state.loading && (
                          <Spinner animation='grow' size='sm' />
                        )
                      }
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.accountReducer.account,
    errors: state.accountReducer.errors,
    status: state.accountReducer.status
  };
};

export default connect (mapStateToProps, { getAccount, updateAccount, changeLogo }) (ClientAccount);