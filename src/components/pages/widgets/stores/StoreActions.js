import React, { Component } from 'react';

class StoreActions extends Component {
  render() {
    return (
      <>
        <a href='/' className={'btn btn-link text-info'}><i className='fa fa-edit'></i> </a>
        <button type='button' className={'btn btn-link text-danger'}><i className='fa fa-times'></i> </button>
      </>
    );   
  }
}

export default StoreActions;