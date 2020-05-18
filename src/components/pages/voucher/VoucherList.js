import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { getCategory } from '../../../store/actions/voucherCategory';
import { connect } from 'react-redux';
import HeaderBar from '../../partials/Header/HeaderBar';
import SideBar from '../../partials/SideBar';
import VoucherTable from './widgets/VoucherTable';
import { isAdmin } from '../../../helpers/user';
import { getProfile } from '../../../store/actions/user';
import AddVoucher from './modals/AddVoucher';
import { toast } from 'react-toastify';
import { exportVouchers } from '../../../store/actions/voucher';

class VoucherList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      category: null,
      user: null
    };
  }

  loading = () => {
    this.setState({
      loading: ! this.state.loading
    });
  }

  componentDidMount() {
    this.fetchCategory();
    this.fetchProfile();
  }


  fetchCategory = () => {
    this.loading();
    const {match: {params}} = this.props;
    this.props.getCategory(params.category_id)
      .then(() => {
        this.setState({
          category: this.props.category
        });
        this.loading();
      });
  }

  fetchProfile = () => {
    this.props.getProfile()
      .then(() => {
        this.setState({
          user: this.props.user
        });
      });
  }

  export = () => {
    this.loading();
    this.props.exportVouchers(this.state.category.id)
      .then(() => {
        if (this.props.status) {
          toast.success(this.props.message);
        } else {
          toast.error(this.props.message);
        }
        this.loading();
      });
  }

  render () {
    let isUserAdmin = this.state.user ? isAdmin(this.state.user.roles) : false;
    let backUrl = (isUserAdmin && this.state.category) ? '/admin/voucher/categories/' + this.state.category.user.id : '/voucher/categories';
    return (
      <>
        <HeaderBar />
        <SideBar />
        <div className="main-content">
          <div className="container-fluid">
            <div className='row'>
              <div className='col-md-12'>
                <a href={backUrl} className='btn btn-link'>Back</a>
                <div className='card'>
                  <div className='card-header'>
                    {
                      this.state.category && (
                        <h3>{this.state.category.name}'s vouchers</h3>
                    )}
                  </div>
                  <div className='card-header'>
                    {
                      this.state.category && (
                        <>
                          <AddVoucher category={this.state.category} /> &nbsp;
                        </>
                      )
                    }
                    
                    {
                      this.state.category && (
                        <>
                          <button disabled={this.state.loading} onClick={this.export} className='btn btn-primary'>
                            {
                              this.state.loading && (
                                <Spinner animation='border' size='sm' />
                              )
                            }
                            <i className='fa fa-download'> </i> Export
                          </button> &nbsp;
                        </>
                      )
                    }
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
                      (this.state.category) && (
                        <VoucherTable category_id={this.state.category.id} />
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
    category: state.voucherCategoryReducer.category,
    user: state.userReducer.user,
    message: state.voucherReducer.message,
    status: state.voucherReducer.status
  };
};

export default connect(mapStateToProps, { getCategory, getProfile, exportVouchers }) (VoucherList);