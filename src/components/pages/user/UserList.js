import React, { Component } from 'react';
import HeaderBar from '../../partials/Header/HeaderBar';
import SideBar from '../../partials/SideBar';
import DataTable from 'react-data-table-component';
import { connect } from 'react-redux';
import { getManagers } from '../../../store/actions/user';
import { getAccount } from '../../../store/actions/account';
import DeleteManager from '../widgets/user/modals/DeleteManager';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: '',
      users: [],
      account: null
    }
  }

  componentDidMount() {
    const { match : {params}} = this.props;
    this.setState({
      user_id: params.user_id
    });
    this.props.getManagers(params.user_id)
      .then(() => {
        this.setState({
          users: this.props.users
        });
      });
    this.props.getAccount(params.user_id)
      .then(() => {
        this.setState({
          account: this.props.account
        });
      });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.users.length !== this.props.users.length) {
      this.setState({
        users: this.props.users
      });
    }
  }

  render () {
    let columns = [
      {
        name: 'Date created',
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
        sortable: true,
      },
      {
        name: 'Actions',
        cell: row =>  <>
                        <a className='btn btn-link' href={'/user/edit/' + row.id + '?owner=' + this.state.user_id}><i className='fa fa-edit'> </i></a>
                        <DeleteManager user={row} parent_id={this.state.user_id} />
                      </>
      }
    ];
    return (
      <>
        <HeaderBar />
        <SideBar />
        <div className="main-content">
          <div className="container-fluid">
            <div className="row">
              <div className='col-md-12'>
                <div className='card'>
                  <div className='card-header'>
                    <h4>{this.state.account && (this.state.account.name)}'s user list</h4>
                  </div>
                  <div className='card-header'>
                    {
                      this.state.user_id && (
                        <a href={'/user/add/' + this.state.user_id} className='btn btn-primary'><i className='fa fa-plus'> </i></a>
                      )
                    }
                  </div>
                  <div className='card-body'>
                    <DataTable
                      columns={columns}
                      data={this.state.users}
                      pagination className='transaction-table'
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
    users: state.userReducer.users,
    account: state.accountReducer.account
  };
};

export default connect(mapStateToProps, { getManagers, getAccount }) (UserList);
