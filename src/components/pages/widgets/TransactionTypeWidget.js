import React, { Component } from 'react';

class TransactionTypeWidget extends Component {
  render () {
    return (
      <>
        <span className={'badge badge-pill mb-1 badge-' + ((this.props.type === 'earn') ? 'success' : 'warning') }>
          <i className={ 'fa fa-' + ((this.props.type === 'earn') ? 'angle-up' : 'angle-down')}> </i> { this.props.type.toUpperCase()}
        </span>
      </>
    );
  }
}

export default TransactionTypeWidget;