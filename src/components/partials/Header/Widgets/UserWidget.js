import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class UserWidget extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    this.setState({
      redirect: true
    });
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to={'/login'} />
      );
    }
    return (
      <>
        <div className="dropdown">
          <a className="dropdown-toggle" href="/profile" id="userDropdown" role="button" data-toggle="dropdown"
             aria-haspopup="true" aria-expanded="false"><img className="avatar" src="/assets/img/user.jpg" alt="" /></a>
          <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
            <a className="dropdown-item" href="/profile"><i className="ik ik-user dropdown-icon"> </i> Profile</a>
            <a className="dropdown-item" href="/"><i className="ik ik-settings dropdown-icon"> </i> Settings</a>
            <a className="dropdown-item" href="/"><span className="float-right"><span
              className="badge badge-primary">6</span></span><i
              className="ik ik-mail dropdown-icon"> </i> Inbox</a>
            <a className="dropdown-item" href="/"><i className="ik ik-navigation dropdown-icon"> </i> Message</a>
            <button onClick={this.logout} className="dropdown-item" href="/login"><i
              className="ik ik-power dropdown-icon"> </i> Logout</button>
          </div>
        </div>
      </>
    );
  }
}

export default UserWidget;
