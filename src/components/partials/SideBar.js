import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfile } from '../../store/actions/user';
import { isAdmin } from '../../helpers/user';

class SideBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userOpen: true,
      roles: []
    };
  }

  componentDidMount() {
    this.fetchRole();
  }

  fetchRole = () => {
    this.props.getProfile()
      .then(() => {
        this.setState({
          roles: this.props.user.roles
        });
      });
  }

  render() {
    let isUserAdmin = isAdmin(this.state.roles);
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
                      (isUserAdmin) && (
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
                      (! isUserAdmin) && (
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
                        </>
                      )
                    }

                    {
                      (! isUserAdmin) && (
                        <>
                          <div className='nav-item'>
                            <a href={'/user/list/' + this.props.user.id}>
                              <i className='ik ik-users'> </i>
                              Manage users
                            </a>
                          </div>
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
