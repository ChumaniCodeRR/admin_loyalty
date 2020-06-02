import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import { connect } from 'react-redux';
import { getVouchers } from '../../../../store/actions/voucher';
import { getProfile } from '../../../../store/actions/user';
import { can } from '../../../../helpers/permission';
import Spinner from 'react-bootstrap/Spinner';
import DeleteVoucher from '../../voucher/modals/DeleteVoucher';

class VoucherTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      vouchers: [],
      loading: false,
      category_id: null,
      canUpdateVoucher: false,
      canAddVoucher: false,
      canDeleteVoucher: false,
      canExportVoucher: false
    };
  }

  fetchVouchers = () => {
    this.loading();
    let category_id = this.props.category_id ?? null;
    this.props.getVouchers(category_id)
      .then(() => {
        this.setState({
          vouchers: this.props.vouchers
        });
        this.loading();
      });
  }

  loading () {
    this.setState({
      loading: !this.state.loading
    });
  }

  componentDidMount() {
    this.fetchVouchers();
    this.props.getProfile()
      .then(() => {
        this.setState({
          canAddVoucher: can('add voucher', this.props.user.permissions),
          canUpdateVoucher: can('update voucher', this.props.user.permissions),
          canDeleteVoucher: can('delete voucher', this.props.user.permissions),
          canExportVoucher: can('export voucher', this.props.user.permissions)
        })
      });
  }

  searchVoucher = (e) => {
    let searchText = e.target.value;
    let filteredVouchers = this.props.vouchers.filter(voucher => {
      let row = voucher.created_at + voucher.code + voucher.cell_number + voucher.name;

      return row.indexOf(searchText.toString()) !== -1;
    });

    this.setState({
      vouchers: filteredVouchers
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.vouchers !== this.props.vouchers) {
      this.setState({
        vouchers: this.props.vouchers
      });
    }
  }

  render () {
    let columns = [
      {
        name: 'Code',
        selector: 'code',
        sortable: true
      },
      {
        name: 'Cell',
        selector: 'cell_number'
      },
      {
        name: 'Name',
        selector: 'name'
      },
      {
        name: 'Discount amount',
        selector: 'discount_amount',
        sortable: true
      },
      {
        name: 'Discount Percent',
        selector: 'discount_percent',
        cell: row => <span>{row.discount_percent} %</span>,
        sortable: true
      },
      {
        name: 'Expiration date',
        selector: 'expires_at',
        sortable: true
      },
      {
        name: 'Status',
        selector: row => row.status_id,
        cell: row =>  <>
                        <span
                          className={(row.status_id === 2) ? 'badge badge-pill mb-1 badge-success text-center': 'badge badge-pill mb-1 badge-info text-center'}>
                            {(row.status_id === 1) ? ' Created ' : ' Redeemed '} on {row.created_at}
                        </span>
                      </>,
        sortable: true
      },
      {
        name: 'Actions',
        cell: row => <>
                        {
                          this.state.canUpdateVoucher && (
                            <a
                              className='btn btn-link text-primary'
                              href={'/vouchers/edit/' + row.id}>
                              <i className='fa fa-edit'> </i>
                            </a>
                          )
                        }
                        {
                          this.state.canDeleteVoucher && (
                            <DeleteVoucher voucher={row} />
                          )
                        }
                    </>
      }
    ];
    return (
      <>
        <div className='col-md-4 form-group'>
          <input type='text' className='form-control' onChange={this.searchVoucher} placeholder='Search voucher' />
        </div>
        {
          this.state.loading && (
            <div className='text-center'>
              <Spinner animation='grow' />
            </div>
          )
        }
        <DataTable columns={columns} data={this.state.vouchers} pagination className='transaction-table' />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    vouchers: state.voucherReducer.vouchers,
    user: state.userReducer.user
  };
};

export default connect (mapStateToProps, { getVouchers, getProfile }) (VoucherTable);
