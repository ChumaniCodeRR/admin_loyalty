import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAccount, updateAccount } from '../../../store/actions/account';
import { getProfile } from '../../../store/actions/user';
import Spinner from 'react-bootstrap/Spinner';
import { toast } from 'react-toastify';
import AccountLogo from '../widgets/AccountLogo';
import Select from 'react-select';
import config from '../../../Config';
import { can } from '../../../helpers/permission';
import { isClient } from '../../../helpers/user';


class ClientAccountForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      registration_points: '',
      percentage_per_order: '',
      point_in_rands: '',
      balance_message: '',
      loading: false,
      currency: '',
      isClient: false,
      canUpdateLoyalty: false,
      expiration_months: null
    }
  }

   componentDidMount() {
    this.fetchAccount();
  }

  handleExpirationMonthChange = (input) => {
    this.setState({
      expiration_months: input.value
    });
  }

  fetchAccount = () => {

    this.setState({
      loading: true
    });

    this.props.getAccount(this.props.user.id)
    .then(() => {
      this.setState({
        name: this.props.account.name ?? '',
        registration_points: this.props.account.registration_points,
        percentage_per_order: this.props.account.percentage_per_order,
        point_in_rands: this.props.account.point_in_rands,
        balance_message: this.props.account.balance_message ?? '',
        currency: this.props.account.currency,
        expiration_months: this.props.account.expiration_months

      });
      this.props.getProfile()
        .then(() => {
          this.setState({
            isClient: isClient(this.props.user.roles) ?? false,
            canUpdateLoyalty: can('update loyalty', this.props.user.permissions) ?? false,
            loading: false
          });
        });
    });

  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  _updateAccount = (e) => {
    e.preventDefault();
    let data = {
      name: this.state.name,
      registration_points: this.state.registration_points,
      percentage_per_order: this.state.percentage_per_order,
      point_in_rands: this.state.point_in_rands,
      balance_message: this.state.balance_message,
      currency: this.state.currency,
      expiration_months: this.state.expiration_months
    };
    this.setState({
      loading: true
    });
    this.props.updateAccount(data, this.props.user.id)
      .then(() => {
        if (this.props.status) {
           this.fetchAccount();
          toast.success(this.props.message);
        } else {
          toast.error(this.props.message);
        }
        this.setState({
          loading: false
        });
      });
  }

  reloadAccount = () => {
    this.fetchAccount();
  }

  handleFieldChange = async(input) => {
    let balance_message = this.state.balance_message;
    balance_message = balance_message + input.value;
    await this.setState({
      balance_message: balance_message
    });
  }

  handleCurrencyChange = (input) => {
    this.setState({
      currency: input.value
    });
  }

  render () {
    let options = [
      {
        value: '[first_name]',
        label: 'First name'
      },
      {
        value: '[cell_number]',
        label: 'Cell number'
      },
      {
        value: '[crown_balance]',
        label: 'Crown balance'
      },
      {
        value: '[currency_balance]',
        label: 'Currency balance'
      }
    ];
    let currencies = config.currencies;
    let expiry_months = config.expiry_months;
    return (
      <div className='card'>
        <div className='card-header'>
          <h3>Loyalty account details</h3>
        </div>
        <div className='card-body'>
          {
            this.state.isClient && (
              (this.props.account) && (
                <AccountLogo logo={this.props.account.logo} reloadAccount={this.reloadAccount} />
              )
            )
          }
          <br/>
          {
            this.state.isClient && (
              <div className='form-group'>
                <label><strong>API token</strong></label>
                <p>{ localStorage.getItem('access_token') }</p>
              </div>
            )
          }

          <div className='form-group'>
            <label><strong>Loyalty currency</strong></label>
            <Select
              options={currencies}
              onChange={this.handleCurrencyChange}
              value={currencies.filter(option => option.value === this.state.currency)}
            />
          </div>
          {
            this.state.expiration_months && (
                <div className='form-group'>
                  <label><strong>Points expires after </strong></label>
                  <Select
                      options={expiry_months}
                      onChange={this.handleExpirationMonthChange}
                      value={expiry_months.filter(option => option.value === this.state.expiration_months)}
                  />
                </div>
            )
          }

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
          <div className='form-group'>
            <label>Select balance message field</label>
            <Select options={options} onChange={this.handleFieldChange} />
          </div>
          <div className='form-group'>
            <label>Balance message</label>
            <textarea className='form-control' name='balance_message' value={this.state.balance_message} onChange={this.handleChange} />
            {
              this.props.errors.balance_message && (
                <span className='text-danger'>{this.props.errors.balance_message}</span>
              )
            }
          </div>
          {
            this.state.canUpdateLoyalty && (
              <button className='btn btn-primary' disabled={this.state.loading} onClick={this._updateAccount}>
                <i className='fa fa-save'> </i>
                {
                  this.state.loading && (
                    <Spinner animation='grow' size='sm' />
                  )
                }
                Update
              </button>
            )
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.accountReducer.account,
    status: state.accountReducer.status,
    errors: state.accountReducer.errors,
    message: state.accountReducer.message,
    user: state.userReducer.user
  }
}

export default connect (mapStateToProps, { getAccount, updateAccount, getProfile }) (ClientAccountForm);
