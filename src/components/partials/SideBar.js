import React, { Component } from 'react';

class SideBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userOpen: true
    }
  }

  render() {
    return (
      <>
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
                  <div className="nav-item">
                    <a href="/"><i className='ik ik-user'> </i>Admins</a>
                  </div>
                  <div className="nav-item">
                    <a href="/"><i className='ik ik-user'> </i>Clients</a>
                  </div>
                  <div className="nav-item">
                    <a href="/"><i className='ik ik-shopping-cart'> </i>Stores</a>
                  </div>
                  <div className="nav-item">
                    <a href="/"><i className='ik ik-users'> </i>Members</a>
                  </div>
                </nav>
              </div>
            </div>
          </div>
      </>
    );
  }
}

export default SideBar;
