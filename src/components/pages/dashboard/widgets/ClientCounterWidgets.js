import React, { Component } from 'react';
import CounterWigdet from './CounterWidget';

class ClientCounterWidgets extends Component {

  componentDidMount() {
    
  }

  render () {
    return (
      <>
        <div className='row'>
          {
            this.props.report.stores && (
              <div className='col-md-4'>
                <CounterWigdet
                  icon='store' 
                  title='Total Stores' 
                  color='blue'
                  top_value={this.props.report.stores.total}
                  bottom_value={this.props.report.stores.active}
                  label=' Active stores'
                  />
              </div>
            )
          }
          {
            this.props.report.balances && (
              <div className='col-md-4'>
                <CounterWigdet
                  icon='wallet' 
                  title='Balance' 
                  color='green'
                  top_value={this.props.report.balances.points_balance.toFixed(2) + ' Crowns'}
                  bottom_value={'R ' + this.props.report.balances.points_currency.toFixed(2)}
                  label=' Available balances'
                  />
              </div>
            )
          }
          {
            this.props.report.members && (
              <div className='col-md-4'>
                <CounterWigdet
                  icon='users' 
                  title='Members' 
                  color=''
                  top_value={this.props.report.members.total}
                  bottom_value={this.props.report.members.active}
                  label=' Active members'
                  />
              </div>
            )
          }
          {
            this.props.report.orders && (
              <div className='col-md-4'>
                <CounterWigdet
                  icon='shopping-cart' 
                  title='Orders' 
                  color='red'
                  top_value={this.props.report.orders.total}
                  bottom_value={'Total Order value R ' + this.props.report.orders.total_value}
                  label={'Average R ' + this.props.report.orders.average_value}
                  />
              </div>
            )
          }
          {
            this.props.report.transactions.earn && (
              <div className='col-md-4'>
                <CounterWigdet
                  icon='arrow-up' 
                  title='Total Earned' 
                  color='green'
                  top_value={this.props.report.transactions.earn.points.toFixed(2) + ' Crowns'}
                  bottom_value={'R ' + this.props.report.transactions.earn.currency.toFixed(2)}
                  label={'Total value earned'}
                  />
              </div>
            )
          }
          {
            this.props.report.transactions.redeem && (
              <div className='col-md-4'>
                <CounterWigdet
                  icon='arrow-down' 
                  title='Total Redeemed' 
                  color='blue'
                  top_value={this.props.report.transactions.redeem.points.toFixed(2) + ' Crowns'}
                  bottom_value={'R ' + this.props.report.transactions.redeem.currency.toFixed(2)}
                  label={'Total value redeemed'}
                  />
              </div>
            )
          }
        </div>
      </>
    );
  }

}

export default ClientCounterWidgets;