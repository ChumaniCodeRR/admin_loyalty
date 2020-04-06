import React, { Component } from 'react';
import HeaderBar from '../../partials/Header/HeaderBar';
import SideBar from '../../partials/SideBar';
import ProfileForm from './partials/ProfileForm';
import PasswordUpdateFrom from './partials/PasswordUpdateFrom';

class Profile extends Component {
  render () {
    return (
      <>
        <HeaderBar />
        <SideBar />
        <div className="main-content">
          <div className="container-fluid">
            <div className="row clearfix">
              <div className='col-md-6'>
                <ProfileForm />
              </div>
              <div className='col-md-6'>
                <PasswordUpdateFrom />
              </div>
            </div>
          </div>
        </div>
      </>
    )    
  }
}

export default Profile;