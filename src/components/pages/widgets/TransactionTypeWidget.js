import React, { Component } from 'react';

class TransactionTypeWidget extends Component {
  render () {
    return (
      <>
        <div className={'holder alert-' + ((this.props.type === 'earn') ? 'success' : 'warning') }>
          <i className={ 'fa fa-' + ((this.props.type === 'earn') ? 'angle-up' : 'angle-down')}> </i> { this.props.type.toUpperCase()}
        </div>
      </>
    );
  }
}

export default TransactionTypeWidget;