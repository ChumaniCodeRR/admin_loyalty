import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import { connect } from 'react-redux';
import { getVouchers } from '../../../../store/actions/voucher';
import Spinner from 'react-bootstrap/Spinner';

class VoucherTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      vouchers: [],
      loading: false,
      category_id: null
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
  }

  searchVoucher = (e) => {
    let searchText = e.target.value;
    let filteredVouchers = this.props.vouchers.filter(voucher => {
      let row = voucher.created_at + voucher.code + voucher.cell_number + voucher.name + voucher.status.name;

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
        name: 'Status',
        selector: row => row.status.name,
        cell: row =>  <>
                        <span 
                          className={(row.status.name === 'Redeemed') ? 'badge badge-pill mb-1 badge-success text-center': 'badge badge-pill mb-1 badge-info text-center'}>
                            {row.status.name} on {row.created_at}
                        </span>
                      </>,
        sortable: true
      },
      {
        name: 'Actions',
        cell: row => <>
                        <a 
                          className='btn btn-link text-danger' 
                          href='/'>
                          <i className='fa fa-times'> </i>
                        </a>
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
    vouchers: state.voucherReducer.vouchers
  };
};

export default connect (mapStateToProps, { getVouchers }) (VoucherTable);