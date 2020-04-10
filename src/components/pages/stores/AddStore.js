import React, { Component } from 'react';
import SideBar from '../../partials/SideBar';
import HeaderBar from '../../partials/Header/HeaderBar';

class AddStore extends Component {
  render() {
    return (
      <>
        <HeaderBar />
        <SideBar />
        <div className="main-content">
          <div className="container-fluid">
            <div className='row'>
              <div className='col-md-12'>
                <div className='pull-right'>
                  <a href='/stores' className='btn btn-link'>Back</a>
                </div>
                <div className='card'>
                  <div className='card-header'>
                    <h3>Add a store</h3>
                  </div>
                  <div className='card-body'>
                    <div className='form-group'>
                      <label>Store code</label>
                      <input type='text' name='code' className='form-control' />
                    </div>

                    <div className='form-group'>
                      <label>Store name</label>
                      <input type='text' name='name' className='form-control' />
                    </div>

                    <div className='form-group'>
                      <label>Store address</label>
                      <input type='text' name='address' className='form-control' />
                    </div>

                    <button type='button' className='btn btn-primary'><i className='fa fa-save'> </i></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default AddStore;