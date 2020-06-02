import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfile } from '../../store/actions/user';
import { isAdmin, isClient, isManager } from '../../helpers/user';
import { can } from '../../helpers/permission';

class SideBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userOpen: true,
      roles: [],
      permissions: [],
      isAdmin: false,
      isClient: false,
      isManager: false
    };
  }

  componentDidMount() {
    this.fetchRole();
  }

  fetchRole = () => {
    this.props.getProfile()
      .then(() => {
        this.setState({
          roles: this.props.user.roles,
          permissions: this.props.user.permissions,
          isAdmin: isAdmin(this.props.user.roles),
          isClient: isClient(this.props.user.roles),
          isManager: isManager(this.props.user.roles)
        });
      });
  }

  render() {
    return (
      <>
        {
          this.state.roles.length && (
            <div className="app-sidebar colored">
              <div className="sidebar-header">
                <a className="header-brand" href="/">
                  <div className="logo-img">
                    <img src="/assets/img/vetro-media.png" className="header-brand-img" alt="Vetro media" />
                  </div>
                </a>
                <button id="sidebarClose" className="nav-close"><i className="ik ik-x"> </i></button>
              </div>

              <div className="sidebar-content">
                <div className="nav-container">
                  <nav id="main-menu-navigation" className="navigation-main">
                    <div className="nav-item active">
                      <a href="/"><i className="ik ik-bar-chart-2"> </i><span>Dashboard</span></a>
                    </div>
                    {
                      (this.state.isAdmin) && (
                        <>
                          <div className="nav-item">
                            <a href="/admin"><i className='ik ik-user'> </i>Admins</a>
                          </div>
                          <div className="nav-item">
                            <a href="/client"><i className='ik ik-user'> </i>Clients</a>
                          </div>
                        </>
                      )
                    }
                    {
                      (this.state.isClient) && (
                        <>
                          <div className="nav-item">
                            <a href="/stores"><i className='ik ik-shopping-cart'> </i>Stores</a>
                          </div>
                          <div className="nav-item">
                            <a href="/members"><i className='ik ik-users'> </i>Members</a>
                          </div>
                          <div className="nav-item">
                            <a href="/voucher/categories"><i className='ik ik-list'> </i>Manage Vouchers</a>
                          </div>
                          <div className='nav-item'>
                            <a href={'/user/list/' + this.props.user.id}>
                              <i className='ik ik-users'> </i>
                              Manage users
                            </a>
                          </div>
                        </>
                      )
                    }

                    {
                      (this.state.isManager) && (
                        <>
                          {
                            (this.state.permissions.length > 0) && (
                              can('view stores', this.state.permissions) && (
                                <div className="nav-item">
                                  <a href="/stores"><i className='ik ik-shopping-cart'> </i>Stores</a>
                                </div>
                              )

                            )
                          }
                          {
                            (this.state.permissions.length > 0) && (
                              can('view members', this.state.permissions) && (
                                <div className="nav-item">
                                  <a href="/members"><i className='ik ik-users'> </i>Members</a>
                                </div>
                              )

                            )
                          }
                          {
                            (this.state.permissions.length > 0) && (
                              can('view vouchers', this.state.permissions) && (
                                <div className="nav-item">
                                  <a href="/voucher/categories"><i className='ik ik-list'> </i>Manage vouchers</a>
                                </div>
                              )

                            )
                          }
                          {
                            (this.state.permissions.length > 0) && (
                              can('view users', this.state.permissions) && (
                                <div className="nav-item">
                                  <a href={'/user/list/' + this.props.user.id}><i className='ik ik-users'> </i>Manage users</a>
                                </div>
                              )

                            )
                          }
                        </>
                      )
                    }
                  </nav>
                </div>
              </div>
            </div>
          )
        }
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user
  };
};

export default connect (mapStateToProps, { getProfile }) (SideBar);
