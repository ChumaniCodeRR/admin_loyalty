import React, { Component } from 'react';
import UserWidget from "./Widgets/UserWidget";

class HeaderBar extends Component {
  render() {
    return (
      <header className="header-top" header-theme="dark">
        <div className="container-fluid">
          <div className="d-flex justify-content-between">
            <div className="top-menu d-flex align-items-center">
            </div>
            <div className="top-menu d-flex align-items-center">
              <UserWidget />
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default HeaderBar;
