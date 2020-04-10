import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAccount, updateAccount } from '../../../store/actions/account';
import Spinner from 'react-bootstrap/Spinner';
import { toast } from 'react-toastify';
import AccountLogo from '../widgets/AccountLogo';


class ClientAccountForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      registration_points: '',
      percentage_per_order: '',
      point_in_rands: '',
      loading: false
    }
  }

   componentDidMount() {
    this.fetchAccount();
  }

  fetchAccount = () => {

    this.setState({
      loading: true
    });

    this.props.getAccount()
    .then(() => {
      this.setState({
        name: this.props.account.name ?? '',
        registration_points: this.props.account.registration_points,
        percentage_per_order: this.props.account.percentage_per_order,
        point_in_rands: this.props.account.point_in_rands,
        loading: false
      });
    });
    
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  _updateAccount = async (e) => {
    e.preventDefault();
    let data = {
      name: this.state.name,
      registration_points: this.state.registration_points,
      percentage_per_order: this.state.percentage_per_order,
      point_in_rands: this.state.point_in_rands
    };
    this.setState({
      loading: true
    });
    await this.props.updateAccount(data);
    if (this.props.status) {
      await this.fetchAccount();
      toast.success('Saved Successfully!');
    }

    this.setState({
      loading: false
    });
  }

  reloadAccount = () => {
    this.fetchAccount();
  }

  render () {
    return (
      <div className='card'>
        <div className='card-header'>
          <h3>Loyalty account details</h3>
        </div>
        <div className='card-body'>
          {
            (this.props.account) && (
              <AccountLogo logo={this.props.account.logo} reloadAccount={this.reloadAccount} />
            ) 
          }
          <br/>
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
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.accountReducer.account,
    status: state.accountReducer.status,
    errors: state.accountReducer.errors
  }
}

export default connect (mapStateToProps, { getAccount, updateAccount }) (ClientAccountForm);