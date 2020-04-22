import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTransactions } from '../../../store/actions/transactions';
import Spinner from 'react-bootstrap/Spinner';
import TransactionTable from '../widgets/transaction/TransactionTable';

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

  fetchTransactions = async () => {
    this.setState({ 
      loading: true
    });
    await this.props.getTransactions(this.props.user.id, 500);
    this.setState({
      transactions: this.props.transactions
    });
    this.setState({ 
      loading: false
    });
  }

  render() {
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
          <TransactionTable transactions={this.state.transactions} />
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
