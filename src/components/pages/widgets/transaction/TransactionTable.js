import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import TransactionTypeWidget from '../TransactionTypeWidget';
import TransactionModal from "../../transaction/modals/TransactionModal";

class TransactionTable extends Component {
  render () {
    let columns = [
      {
        name: 'Date',
        selector: 'created_at',
        sortable: true
      },
      {
        name: 'Loyalty account',
        selector: row => row.loyalty_account.name,
        cell: row =>  <div className='text-center alert alert-info'><img src={row.loyalty_account.logo} className="table-user-thumb" alt={row.loyalty_account.name} />
                        <p>{row.loyalty_account.name}</p>
                      </div>,
        center: true,
        sortable: true
      },
      {
        name: 'Member',
        selector: row => row.user.cell_number,
        cell: row => <><i className='fa fa-phone-square'> </i> &nbsp;{row.user.cell_number}</>,
        sortable: true
      },
      {
        name: 'Points',
        selector: 'amount',
        cell: row => row.amount,
        sortable: true
      },
      {
        name: 'Amount',
        selector: 'currency_amount',
        cell: row => row.loyalty_account.currency + ' ' + row.currency_amount,
        sortable: true
      },
      {
        name: 'Total order',
        selector: 'order_total',
        cell: row => row.loyalty_account.currency + ' ' + (row.order_total ?? 0),
        sortable: true
      },
      {
        name: 'Status',
        selector: 'transaction_status',
        sortable: true
      },

      {
        name: 'Type',
        selector: 'transaction_type',
        cell: row => <TransactionTypeWidget type={row.transaction_type} />,
        sortable: true
      },
      {
        name: '',
        cell: row => <> <TransactionModal transaction={row} /> </>
      }
    ];
    return (
      <>
        <DataTable
            columns={columns}
            data={this.props.transactions}
            className='transaction-table'
            pagination
          />
      </>
    );
  }
}

export default TransactionTable;
