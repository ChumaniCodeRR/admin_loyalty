import React, { Component } from 'react';
import HeaderBar from '../../../partials/Header/HeaderBar';
import SideBar from '../../../partials/SideBar';
import { getMembers } from '../../../../store/actions/user';
import { connect } from 'react-redux';
import DataTable from 'react-data-table-component';


class MemberList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  fetchMembers = async () => {
    await this.props.getMembers();
    this.setState({
      users: this.props.users
    });
  }

  componentDidMount() {
    this.fetchMembers();
  }

  searchMembers = (e) => {
    let searchText = e.target.value;
    let filteredMembers = this.props.users.filter(member => {
      let row = member.created_at + member.cell_number + member.first_name + member.last_name + member.gender + member.dob;

      return row.indexOf(searchText.toString()) !== -1;
    });

    this.setState({
      users: filteredMembers
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
        name: 'Cell number',
        selector: 'cell_number',
        sortable: true
      },
      {
        name: 'Name',
        selector: row => row.first_name + ' ' + row.last_name,
        cell: row => row.first_name + ' ' + row.last_name,
        sortable: true
      },
      {
        name: 'Gender',
        selector: 'gender',
        sortable: true
      },
      {
        name: 'Date of birth',
        selector: 'dob',
        sortable: true
      },
      {
        name: 'Balance',
        selector: 'balance',
        cell: row => row.balance + ' points',
        sortable: true
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
                    <h3>My Members</h3>
                  </div>
                  <div className='card-body'>
                  <div className='row'>
                      <div className='form-group col-md-4'>
                        <label>&nbsp;</label>
                        <input type='text' name='search' onChange={this.searchMembers} className='form-control' placeholder='Search members' /> 
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

export default connect (mapStateToProps, { getMembers }) (MemberList);