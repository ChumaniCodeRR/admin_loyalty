import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMemberTransactions } from '../../../store/actions/transactions';
import Spinner from 'react-bootstrap/Spinner';
import TransactionTable from '../widgets/transaction/TransactionTable';
import HeaderBar from '../../partials/Header/HeaderBar';
import SideBar from '../../partials/SideBar';

class MemberTransactions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
      loading: false,
      cell_number: '',
      account_id: null
    };
  }

  componentDidMount = async () => {
    const { match: {params}} = this.props;
    await this.setState({
      cell_number: params.cell_number,
      account_id: params.account_id ?? null
    });
    this.fetchTransactions();
  }

  fetchTransactions = async (e) => {
    this.setState({ 
      loading: true
    });
    await this.props.getMemberTransactions(this.state.cell_number, this.state.account_id);
    this.setState({
      transactions: this.props.transactions
    });
    this.setState({ 
      loading: false
    });
  }

  render() {
    return (
      <>
        <HeaderBar />
        <SideBar />
        <div className="main-content">
          <div className="container-fluid">
            <div className='row'>
              <div className='col-md-12'>
                <div className='card'>
                    <div className='card-header'>
                      <h4 className='card-title'>{this.state.cell_number}'s transactions</h4>
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
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    transactions: state.transactionsReducer.transactions
  };
};

export default connect(mapStateToProps, { getMemberTransactions }) (MemberTransactions);
