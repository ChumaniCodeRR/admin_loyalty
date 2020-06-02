import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import { connect } from 'react-redux';
import { getCategories } from '../../../../store/actions/voucherCategory';
import Spinner from 'react-bootstrap/Spinner';
import DeleteVoucherCategory from '../../widgets/vouchers/DeleteVoucherCategory';
import { getProfile } from '../../../../store/actions/user';
import { can } from '../../../../helpers/permission';

class VoucherCategoryTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      loading: false,
      user_id: null,
      canUpdateVoucher: false,
      canAddVoucher: false,
      canDeleteVoucher: false,
      canViewVoucher: false
    };
  }

  fetchCategories = () => {
    this.loading();
    let user_id = this.props.user_id ?? null;
    this.props.getCategories(user_id)
      .then(() => {
        this.setState({
          categories: this.props.categories
        });
        this.props.getProfile()
          .then(() => {
            this.loading();
            this.setState({
              canUpdateVoucher: can('update voucher', this.props.user.permissions),
              canAddVoucher: can('add voucher', this.props.user.permissions),
              canDeleteVoucher: can('delete voucher', this.props.user.permissions),
              canViewVoucher: can('view vouchers', this.props.user.permissions)
            });
          });
      });
  }

  loading () {
    this.setState({
      loading: !this.state.loading
    });
  }

  componentDidMount() {
    this.fetchCategories();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.categories !== this.props.categories) {
      this.setState({
        categories: this.props.categories
      });
    }
  }

  render () {
    let columns = [
      {
        name: 'Name',
        selector: 'name',
        sortable: true
      },
      {
        name: 'Description',
        selector: 'description'
      },
      {
        name: 'Vouchers',
        selector: 'vouchers',
        cell: row =>  <>
                        <a href={'/vouchers/' + row.id}><span className={'badge badge-pill mb-1 badge-info text-center'}>{row.vouchers}</span></a>
                      </>,
        sortable: true
      },
      {
        name: 'Date',
        selector: 'created_at',
        sortable: true
      },
      {
        name: 'Actions',
        cell: row => <>
                        {
                          this.state.canUpdateVoucher && (
                            <a
                              className='btn btn-link text-primary'
                              href={this.state.user_id ? '/voucher/categories/edit/' + row.id + '/' + this.state.user_id : '/voucher/categories/edit/' + row.id}>
                              <i className='fa fa-edit'> </i>
                            </a>
                          )
                        }
                        {
                          this.state.canDeleteVoucher && (
                            <DeleteVoucherCategory category={row} />
                          )
                        }
                    </>
      }
    ];
    return (
      <>
        {
          this.state.loading && (
            <div className='text-center'>
              <Spinner animation='grow' />
            </div>
          )
        }
        <DataTable columns={columns} data={this.state.categories} pagination className='transaction-table' />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.voucherCategoryReducer.categories,
    user: state.userReducer.user
  };
};

export default connect (mapStateToProps, { getCategories, getProfile }) (VoucherCategoryTable);
