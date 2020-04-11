import React, { Component } from 'react';
import Switch from '@material-ui/core/Switch';
import { connect } from 'react-redux';
import { updateStore } from '../../../../store/actions/stores';
import { Redirect } from 'react-router-dom';

class LoyaltyStatusSelector extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      status: true, 
      column: '',
      store: '',
      loaded: false,
      redirect: false
    }
  }

  async componentDidMount(){
    await this.setState({
      status: this.props.status,
      store: this.props.store,
      column: this.props.column,
      loaded: true,
      redirect: false
    });
  }

  handleChange = async (e) => {
    await this.setState({
      [e.target.name]: e.target.checked
    });
  }

  render () {

    let checked = this.state.status;

    if (this.state.redirect) {
      return <Redirect to='/stores' />
    }
    
    return (
      <>
        { this.state.loaded && (
            <Switch
            id={this.props.store.id}
            onChange={this.handleChange}
            name='status'
            checked={checked} 
            color={this.state.status ? 'primary': 'secondary'} 
            disabled={true}
          />
          )
        }
        
      </>
    );    
  }
}

const mapStateToProps = (state) => {
  return {
    saveStatus: state.storesReducer.status,
    message: state.storesReducer.message
  };
};

export default connect (mapStateToProps, { updateStore }) (LoyaltyStatusSelector);