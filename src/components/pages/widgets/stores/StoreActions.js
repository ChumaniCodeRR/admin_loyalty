import React, { Component } from 'react';
import DeleteStore from './modals/DeleteStore';

class StoreActions extends Component {
  render() {
    return (
      <>
        <a href={'/stores/edit/' + this.props.store.id} className={'btn btn-link text-info'}><i className='fa fa-edit'></i> </a>
        <DeleteStore store={this.props.store} />
      </>
    );   
  }
}

export default StoreActions;