import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { getAccount } from '../../../store/actions/account';
import { connect } from 'react-redux';
import HeaderBar from '../../partials/Header/HeaderBar';
import SideBar from '../../partials/SideBar';
import VoucherCategoryTable from './widgets/VoucherCategoryTable';

class VoucherCategoryList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user_id: null,
      loading: false,
      account: null
    };
  }

  loading = () => {
    this.setState({
      loading: ! this.state.loading
    });
  }

  componentDidMount() {
    this.loadUser();
  }

  loadUser = async () => {
    const { match: { params }} = this.props;
    await this.setState({
      user_id: params.user_id ?? null
    });

    if (params.user_id) {
      this.fetchAccount(params.user_id);
    }
  }

  fetchAccount = async (user_id) => {
    this.loading();
    await this.props.getAccount(user_id);
    this.setState(
      {
        account: this.props.account,
        user_id: this.props.account.user.id
      }
    );
    this.loading();
  }

  render () {
    
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
                    <a href='/client' className='btn btn-link'>Back</a>
                  )
                }
                <div className='card'>
                  <div className='card-header'>
                    <h3>{this.state.account ? this.state.account.name + "'s voucher categories" : 'My voucher categories'}</h3>
                  </div>
                  <div className='card-header'>
                    <a href={this.state.user_id ? '/admin/voucher/categories/add/' + this.state.user_id : '/voucher/categories/add'} className='btn btn-primary'><i className='fa fa-plus'> </i></a>
                  </div>
                  <div className='card-body'>
                    {
                      this.state.loading && (
                        <div className='text-center'>
                          <Spinner animation='grow' />
                        </div>
                      )
                    }
                    {
                      (this.state.account) && (
                        <VoucherCategoryTable user_id={this.state.user_id} />
                      )
                      
                    }
                    {
                      (this.state.account === null) && (
                        <VoucherCategoryTable />
                      )
                    }

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.accountReducer.account
  }
};

export default connect(mapStateToProps, { getAccount }) (VoucherCategoryList);