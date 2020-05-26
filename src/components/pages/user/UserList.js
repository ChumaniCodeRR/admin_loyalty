import React, { Component } from 'react';
import HeaderBar from '../../partials/Header/HeaderBar';
import SideBar from '../../partials/SideBar';

class UserList extends Component {
  render () {
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
                    <h4>User list</h4>
                  </div>
                  <div className='card-header'>
                    <a href='/user/add' className='btn btn-primary'><i className='fa fa-plus'> </i></a>
                  </div>
                  <div className='card-body'>

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

export default UserList;
