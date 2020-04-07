import React, { Component } from 'react';
import ClientTransactions from '../widgets/ClientTransactions';
import ClientAccountForm from '../widgets/ClientAccountForm';

class ClientDashboard extends Component {
  render() {
    return (
      <>
        <div className='row'>
          <div className='col-md-9'>
            <ClientTransactions />
          </div>
          <div className='col-md-3'>
            <ClientAccountForm />
          </div>
        </div>
      </>
    );
  }
}

export default ClientDashboard;