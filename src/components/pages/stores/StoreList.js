import React, { Component } from 'react';
import HeaderBar from '../../partials/Header/HeaderBar';
import SideBar from '../../partials/SideBar';
import { connect } from 'react-redux';
import { getStores, importStore } from '../../../store/actions/stores';
import Spinner from 'react-bootstrap/Spinner';
import DataTable from 'react-data-table-component';
import StoreActions from '../widgets/stores/StoreActions';
import LoyaltyStatusSelector from '../widgets/stores/LoyaltyStatusSelector';
import { toast } from 'react-toastify';

class StoreList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stores: [],
      loading: false,
      store_id: null,
      store_id_status: null,
      column: null
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.stores.length !== this.props.stores.length) {
      this.setState({
        stores: this.props.stores
      });
    }
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

  importStores = async (e) => {
    await this.props.importStore({ file: e.target.files[0]});
    if (this.props.status) {
      await this.props.getStores();
      toast.success(this.props.message);
    } else {
      toast.error('An error occurred!');
    }
  }

  openFileDialog = (e) => {
    this.inputElement.click();
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
        cell: row => <LoyaltyStatusSelector store={row} column='has_voucher' status={row.has_voucher}/>,
        width: '170',
        sortable: true
      },
      {
        name: 'Has loyalty',
        selector: 'has_loyalty',
        cell: row => <LoyaltyStatusSelector store={row} column='has_loyalty' status={row.has_loyalty}/>,
        width: '170',
        sortable: true
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
                  <div className='card-header'>
                    <div className='alert alert-info'>
                      <p>Please find below how to format your excel file to import your stores.</p>
                      <p>Please note that invalid format and/or duplicate store code will be ignored</p>
                      <p><img src='/assets/img/import-example.png' alt=''/></p>
                    </div>
                  </div>

                  <div className='card-body'>
                    <a href='/stores/create' className='btn btn-primary'><i className='fa fa-plus'> </i></a>&nbsp;
                    <button className='btn btn-primary' onClick={this.openFileDialog}><i className='fa fa-upload'> </i></button>
                    <input type='file' name='file' accept='application/vnd.ms-excel' onChange={this.importStores} className='hidden' ref={input => this.inputElement = input} />
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
    stores: state.storesReducer.stores,
    status: state.storesReducer.status,
    message: state.storesReducer.message,
    errors: state.storesReducer.errors
  };
};

export default connect (mapStateToProps, { getStores, importStore }) (StoreList);