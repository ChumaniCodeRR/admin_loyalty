import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { connect } from 'react-redux';
import { getAccount } from '../../../store/actions/account';
import { storeCategory } from '../../../store/actions/voucherCategory';
import { Redirect } from 'react-router-dom';
import HeaderBar from '../../partials/Header/HeaderBar';
import SideBar from '../../partials/SideBar';

class AddVoucherCategory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user_id: null,
      account: null,
      loading: false,
      name: '',
      description: '',
      redirect: false
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  loading() {
    this.setState({
      loading: ! this.state.loading
    });
  }

  async componentDidMount () {
    const { match : {params}} = this.props;
    await this.setState({
      user_id: params.user_id ?? null
    });

    if (this.state.user_id) {
      this.fetchAccount();
    }
  }

  fetchAccount = async () => {
    this.loading();
    await this.props.getAccount(this.state.user_id);
    this.setState(
      {
        account: this.props.account,
        user_id: this.props.account.user.id
      }
    );
    this.loading();
  }

  saveCategory = async() => {
    this.loading();
    await this.props.storeCategory(this.state, this.state.user_id);
    this.loading();
    if (this.props.status) {
      this.setState({
        redirect: true
      });
    }
  }

  render () {
    if (this.state.redirect) {
      return <Redirect to={this.state.user_id ? '/admin/voucher/categories/' + this.state.user_id : '/voucher/categories'} />;
    }
    return (
      <>
        <HeaderBar />
        <SideBar />
        <div className="main-content">
          <div className="container-fluid">
            <div className='row'>
              <div className='col-md-12'>
                {
                  this.state.user_id && (
                    <a href={ '/admin/voucher/categories/' + this.state.user_id } className='btn btn-link'>Back</a>
                  )
                }
                <div className='card'>
                  <div className='card-header'>
                    <h3>{this.state.account ? this.state.account.name + "'s voucher categories" : 'My voucher categories'}</h3>
                  </div>
                  <div className='card-body'>
                    <div className='form-group'>
                      <label>Name</label>
                      <input type='text' disabled={this.state.loading} name='name' className='form-control' value={this.state.name} onChange={this.handleChange} />
                      {
                        this.props.errors.name && (
                          <span className='text-danger'>{this.props.errors.name}</span>
                        )
                      }
                    </div>
                    <div className='form-group'>
                      <label>Description</label>
                      <textarea name='description' disabled={this.state.loading} onChange={this.handleChange} className='form-control' value={this.state.description} />
                      {
                        this.props.errors.description && (
                          <span className='text-danger'>{this.props.errors.description}</span>
                        )
                      }
                    </div>
                    <button className='btn btn-primary' onClick={this.saveCategory} disabled={this.state.loading}>
                      {
                        this.state.loading && (
                          <Spinner animation='grow' size='sm' />
                        )
                      }
                      <i className='fa fa-save'> </i>
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
    status: state.voucherCategoryReducer.status,
    errors: state.voucherCategoryReducer.errors,
    message: state.voucherCategoryReducer.message
  }
}

export default connect (mapStateToProps, { getAccount, storeCategory }) (AddVoucherCategory);