import React, { Component } from 'react';
import HeaderBar from '../../../partials/Header/HeaderBar';
import SideBar from '../../../partials/SideBar';
import { getClients } from '../../../../store/actions/user';
import { connect } from 'react-redux';
import DataTable from 'react-data-table-component';
import DeleteUser from '../../widgets/user/modals/DeleteUser';
import AddUser from '../../widgets/user/modals/AddUser';
import Dropdown from 'react-bootstrap/Dropdown';


class ClientList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  fetchClients = async () => {
    await this.props.getClients();
    this.setState({
      users: this.props.users
    });
  }

  componentDidMount() {
    this.fetchClients();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.users.length !== this.props.users.length) {
      this.setState({
        users: this.props.users
      });
    }
  }

  searchClients = (e) => {
    let searchText = e.target.value;
    let filteredClients = this.props.users.filter(client => {
      let row = client.user.created_at + client.user.email + client.user.name + client.name;

      return row.indexOf(searchText.toString()) !== -1;
    });

    this.setState({
      users: filteredClients
    });
  }

  render () {
    let columns = [
      { 
        name: 'Date',
        selector: row => row.user.created_at,
        cell: row => row.user.created_at,
        sortable: true
      },
      {
        name: 'Loyalty',
        selector: row => row.name,
        cell: row => <div className='text-center alert alert-info'><img src={row.logo} className="table-user-thumb" alt={row.name} />
                      <p>{row.name}</p>
                    </div>,
        sortable: true
      },
      {
        name: 'Name',
        selector: row => row.user.name,
        cell: row => row.user.name,
        sortable: true
      },
      {
        name: 'Email',
        selector: row => row.user.email,
        sortable: true
      },
      {
        name: 'Registration points',
        selector: row => row.registration_points,
        cell: row => row.registration_points + ' points',
        sortable: true
      },
      {
        name: 'Actions',
        cell: row => <Dropdown>
                      <Dropdown.Toggle variant="default" id={'dropdown-basic' + row.id}>
                        <i className='fa fa-angle-down'> </i>
                      </Dropdown.Toggle>
                    
                      <Dropdown.Menu>
                        <Dropdown.Item><DeleteUser user={row.user} role='Client' /></Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
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
                    <h3>Clients</h3>
                  </div>
                  <div className='card-body'>
                    <AddUser role='Client' />
                    <div className='row'>
                      <div className='form-group col-md-4'>
                        <label>&nbsp;</label>
                        <input type='text' name='search' onChange={this.searchClients} className='form-control' placeholder='Search clients' /> 
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

export default connect (mapStateToProps, { getClients }) (ClientList);