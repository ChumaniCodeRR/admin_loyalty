import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTransactions } from '../../../store/actions/transactions';
import DataTable from 'react-data-table-component';
import TransactionTypeWidget from './TransactionTypeWidget';
import Spinner from 'react-bootstrap/Spinner';

class ClientTransactions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      loading: false
    };
  }

  componentDidMount = () => {
    this.fetchTransactions();
  }

  fetchTransactions = async (e) => {
    this.setState({ 
      loading: true
    });
    await this.props.getTransactions();
    this.setState({
      transactions: this.props.transactions
    });
    this.setState({ 
      loading: false
    });
  }

  render() {
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
        name: 'Total order',
        selector: 'order_total',
        cell: row => 'ZAR ' + (row.order_total ?? 0),
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
        cell: row => <> <button className='btn btn-link'><i className='fa fa-eye'> </i></button> </>
      }
    ];
    return (
      <div className='card'>
        <div className='card-header'>
          <h4 className='card-title'>Latest transactions</h4>
        </div>
        <div className='card-body'>
          {
            this.state.loading && (
              <div className='text-center'>
                <Spinner animation='grow' />
              </div>
            )
          }
          <p> &nbsp;</p>
          <DataTable 
            columns={columns} 
            data={this.state.transactions} 
            className='transaction-table'
            pagination
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    transactions: state.transactionsReducer.transactions
  };
};

export default connect(mapStateToProps, { getTransactions }) (ClientTransactions);
