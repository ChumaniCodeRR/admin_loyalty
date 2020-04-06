import React, { Component } from 'react';
import HeaderBar from "../partials/Header/HeaderBar";
import SideBar from "../partials/SideBar";
import ClientDashboard from "./dashboard/ClientDashboard";

class Dashboard extends Component {
  render() {
    return (
      <>
        <HeaderBar />
        <SideBar />
        <div className="main-content">
          <div className="container-fluid">
            <div className="row clearfix">
              <ClientDashboard/>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Dashboard;
