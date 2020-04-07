import React, { Component } from 'react';
import HeaderBar from "../partials/Header/HeaderBar";
import SideBar from "../partials/SideBar";
import DashboardContainer from './dashboard/DashboardContainer';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      roles: [],
      loading: false
    };
  }

  componentWillUnmount() {
    this.setState({
      roles: [],
      loading: false
    })
  }

  render() {
    return (
      <>
        <HeaderBar />
        <SideBar />
        <div className="main-content">
          <div className="container-fluid">
            <div className="row clearfix">
              <DashboardContainer/>
            </div>
          </div>
        </div>
      </>
    );
  }
}


export default Dashboard;
