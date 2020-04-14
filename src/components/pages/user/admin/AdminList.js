import React, { Component } from 'react';
import HeaderBar from '../../../partials/Header/HeaderBar';
import SideBar from '../../../partials/SideBar';
import { getAdmins } from '../../../../store/actions/user';
import { connect } from 'react-redux';
import DataTable from 'react-data-table-component';
import DeleteUser from '../../widgets/user/modals/DeleteUser';
import AddUser from '../../widgets/user/modals/AddUser';


class AdminList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  fetchAdmins = async () => {
    await this.props.getAdmins();
    this.setState({
      users: this.props.users
    });
  }

  componentDidMount() {
    this.fetchAdmins();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.users.length !== this.props.users.length) {
      this.setState({
        users: this.props.users
      });
    }
  }

  searchAdmins = (e) => {
    let searchText = e.target.value;
    let filteredAdmins = this.props.users.filter(admin => {
      let row = admin.created_at + admin.email + admin.name;

      return row.indexOf(searchText.toString()) !== -1;
    });

    this.setState({
      users: filteredAdmins
    });
  }

  render () {
    let columns = [
      { 
        name: 'Date',
        selector: 'created_at',
        sortable: true
      },
      {
        name: 'Name',
        selector: 'name',
        sortable: true
      },
      {
        name: 'Email',
        selector: 'email',
        sortable: true
      },
      {
        name: 'Actions',
        cell: row => <DeleteUser user={row} role='Admin' />
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
                    <h3>System administrators</h3>
                  </div>
                  <div className='card-body'>
                    <AddUser role='Admin' />
                    <div className='row'>
                      <div className='form-group col-md-4'>
                        <label>&nbsp;</label>
                        <input type='text' name='search' onChange={this.searchAdmins} className='form-control' placeholder='Search administrators' /> 
                      </div>
                    </div>
                    <DataTable columns={columns} data={this.state.users} pagination className='transaction-table' />
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
    users: state.userReducer.users
  };
};

export default connect (mapStateToProps, { getAdmins }) (AdminList);