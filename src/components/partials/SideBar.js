import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfile } from '../../store/actions/user'; 

class SideBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userOpen: true,
      role: null
    };
  }

  componentDidMount() {
    this.fetchRole();
  }

  fetchRole = async () => {
    await this.props.getProfile();
    this.setState({
      role: this.props.user.roles[0]
    });
  }
 
  render() {
    return (
      <>
        {
          this.state.role && (
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
                      (this.state.role === 'Admin') && (
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
                      (this.state.role === 'Client') && (
                        <>
                          <div className="nav-item">
                            <a href="/stores"><i className='ik ik-shopping-cart'> </i>Stores</a>
                          </div>
                          <div className="nav-item">
                            <a href="/members"><i className='ik ik-users'> </i>Members</a>
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
