import React, { Component } from 'react';
import ClientTransactions from '../widgets/ClientTransactions';
import ClientAccountForm from '../widgets/ClientAccountForm';
import ClientCounterWidgets from './widgets/ClientCounterWidgets';
import { getClientReport } from '../../../store/actions/report';
import { connect } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';

class ClientDashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      payload: null,
      loading: false
    };
  }

  async componentDidMount() {
    this.setState({
      loading: true
    });
    await this.fetchReportData();

    this.setState({
      loading: false
    });
  }

  fetchReportData = async() => {
    await this.props.getClientReport(this.props.user.id);
    this.setState({
      payload: this.props.payload
    });
  }

  render() {
    return (
      <>
        {
          this.state.loading && (
            <div className='text-center'>
              <Spinner animation='border' size='sm' />
            </div>
          )
        }
        {
          this.state.payload && (
            <ClientCounterWidgets report={this.state.payload} />
          )
        }
        <div className='row'>
          <div className={this.props.account_form ? 'col-md-9' : 'col-md-12'}>
            <ClientTransactions user={this.props.user} />
          </div>
          {
            this.props.account_form && (
              <div className='col-md-3'>
                <ClientAccountForm user={this.props.user} />
              </div>
            )
          }
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    payload: state.reportReducer.payload
  };
};

export default connect (mapStateToProps, { getClientReport }) (ClientDashboard);