import React, { Component } from 'react';
import HeaderBar from '../../partials/Header/HeaderBar';
import SideBar from '../../partials/SideBar';
import { connect } from 'react-redux';
import { getStores } from '../../../store/actions/stores';
import Spinner from 'react-bootstrap/Spinner';
import DataTable from 'react-data-table-component';
import StoreActions from '../widgets/stores/StoreActions';
import LoyaltyStatusSelector from '../widgets/stores/LoyaltyStatusSelector';

class StoreList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stores: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchStores();
  }

  fetchStores = async() => {
    this.setState({
      loading: true
    });
    await this.props.getStores();
    this.setState({
      stores: this.props.stores,
      loading: false
    });
  }

  searchStore = (e) => {
    let searchText = e.target.value;
    let filteredStores = this.props.stores.filter(store => {
      let row = store.created_at + store.code + store.name + store.address;

      return row.indexOf(searchText.toString()) !== -1;
    });

    this.setState({
      stores: filteredStores
    });
  }

  render () {
    let columns = [
      {
        name: 'Date created',
        selector: 'created_at',
        sortable: true
      },
      {
        name: 'Code',
        selector: 'code',
        sortable: true
      },
      {
        name: 'Name',
        selector: 'name',
        sortable: true
      },
      {
        name: 'Address',
        selector: 'address',
        sortable: true
      },
      {
        name: 'Has voucher',
        selector: 'has_voucher',
        cell: row => <LoyaltyStatusSelector store={row} column='has_voucher' status={row.has_voucher} />,
        width: '170'
      },
      {
        name: 'Has loyalty',
        selector: 'has_loyalty',
        cell: row => <LoyaltyStatusSelector store={row} column='has_loyalty' status={row.has_loyalty} />,
        width: '170'
      },
      {
        name: 'Actions',
        cell: row => <StoreActions store={row} />
      }

    ];
    return (
      <>
        <HeaderBar />
        <SideBar />
        <div className="main-content">
          <div className="container-fluid">
            <div className='row'>
              <div className='col-md-12'>
                <div className='card'>
                  <div className='card-header'>
                    <h3>My Stores</h3>
                  </div>

                  <div className='card-body'>
                    <a href='/stores/create' className='btn btn-primary'><i className='fa fa-plus'> </i></a>
                    <br/>
                    {
                      this.state.loading && (
                        <div className='text-center'>
                          <Spinner animation='grow'/>
                        </div>
                      )
                    }
                    <div className='row'>
                      <div className='form-group col-md-4'>
                        <label>&nbsp;</label>
                        <input type='text' name='search' onChange={this.searchStore} className='form-control' placeholder='Search stores' /> 
                      </div>
                    </div>
                    <DataTable
                      columns={columns}
                      data={this.state.stores}
                      pagination
                      className='transaction-table' 
                    />
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
    stores: state.storesReducer.stores
  };
};

export default connect (mapStateToProps, { getStores }) (StoreList);