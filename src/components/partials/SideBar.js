import React, { Component } from 'react';
import {Accordion, Button} from "react-bootstrap";

class SideBar extends Component {
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
                  <div className="nav-item has-sub">
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                      <i className="ik ik-lock"> </i><span>Authentication</span>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <div className="submenu-content">
                        <a href="/" className="menu-item">Login</a>
                        <a href="/" className="menu-item">Register</a>
                        <a href="/" className="menu-item">Forgot Password</a>
                      </div>
                    </Accordion.Collapse>
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
