import React, { Component } from 'react';

class Notification extends Component {
  render() {
    return (
      <>
        <div className="dropdown">
          <a className="nav-link dropdown-toggle" href="/" id="notiDropdown" role="button" data-toggle="dropdown"
             aria-haspopup="true" aria-expanded="false"><i className="ik ik-bell"> </i><span
            className="badge bg-danger">3</span></a>
          <div className="dropdown-menu dropdown-menu-right notification-dropdown" aria-labelledby="notiDropdown">
            <h4 className="header">Notifications</h4>
            <div className="notifications-wrap">
              <a href="/" className="media">
                                            <span className="d-flex">
                                                <i className="ik ik-check"> </i>
                                            </span>
                <span className="media-body">
                                                <span
                                                  className="heading-font-family media-heading">Invitation accepted</span>
                                                <span className="media-content">Your have been Invited ...</span>
                                            </span>
              </a>
              <a href="/" className="media">
                                            <span className="d-flex">
                                                <img src="/assets/img/users/1.jpg" className="rounded-circle" alt="" />
                                            </span>
                <span className="media-body">
                                                <span className="heading-font-family media-heading">Steve Smith</span>
                                                <span className="media-content">I slowly updated projects</span>
                                            </span>
              </a>
              <a href="/" className="media">
                                            <span className="d-flex">
                                                <i className="ik ik-calendar"> </i>
                                            </span>
                <span className="media-body">
                                                <span className="heading-font-family media-heading">To Do</span>
                                                <span
                                                  className="media-content">Meeting with Nathan on Friday 8 AM ...</span>
                                            </span>
              </a>
            </div>
            <div className="footer"><a href="/">See all activity</a></div>
          </div>
        </div>
      </>
    );
  }
}

export default Notification;
