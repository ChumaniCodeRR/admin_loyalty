import React from 'react';
import DashboardTransactions from "../widgets/DashboardTransactions";

function ClientDashboard () {
  return (
    <>
      <div className='col-md-9'>
        <DashboardTransactions />
      </div>
    </>
  );
}

export default ClientDashboard;
