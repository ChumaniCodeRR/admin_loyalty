import React, { Component } from 'react';
import Switch from '@material-ui/core/Switch';
import { connect } from 'react-redux';
import { updateStore } from '../../../../store/actions/stores';
import { toast } from 'react-toastify';

class LoyaltyStatusSelector extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      status: true, 
      column: '',
      store_id: '',
      loaded: false
    }
  }

  async componentDidMount(){
    await this.setState({
      status: this.props.status,
      store_id: this.props.store.id,
      column: this.props.column,
      loaded: true
    });
  }

  handleChange = async (e) => {
    await this.setState({
      status: e.target.checked
    });

    let data = {
      [this.state.column]: this.state.status
    };

    await this.props.updateStore(this.state.store_id, data);
    if (this.props.saveStatus) {
      toast.success('Updated successfully!');
    } else {
      toast.error(this.props.message);
    }
  }

  render () {
    
    return (
      <>
        <Switch
          onChange={this.handleChange}
          name='status'
          checked={this.state.status} 
          color={this.state.status ? 'primary': 'secondary'} 
        />
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