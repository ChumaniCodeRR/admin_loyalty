import React, { Component } from 'react';
import HeaderBar from '../../partials/Header/HeaderBar';
import SideBar from '../../partials/SideBar';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: ''
    }
  }

  componentDidMount() {
    const { match : {params}} = this.props;
    this.setState({
      user_id: params.user_id
    });
  }

  render () {
    return (
      <>
        <HeaderBar />
        <SideBar />
        <div className="main-content">
          <div className="container-fluid">
            <div className="row">
              <div className='col-md-12'>
                <div className='card'>
                  <div className='card-header'>
                    <h4>User list</h4>
                  </div>
                  <div className='card-header'>
                    {
                      this.state.user_id && (
                        <a href={'/user/add/' + this.state.user_id} className='btn btn-primary'><i className='fa fa-plus'> </i></a>
                      )
                    }
                  </div>
                  <div className='card-body'>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default UserList;
