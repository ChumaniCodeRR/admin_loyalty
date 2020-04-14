import React, { Component } from 'react';
import SideBar from '../../partials/SideBar';
import HeaderBar from '../../partials/Header/HeaderBar';
import { saveStore } from '../../../store/actions/stores';
import { connect } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { Redirect } from 'react-router-dom';
import Switch from '@material-ui/core/Switch';

class AddStore extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      code: '',
      address: '',
      has_loyalty: false,
      has_voucher: false,
      loading: false,
      redirect: false
    };
  }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      });
    }

    handleCheckChange = async(e) => {
      await this.setState({
        [e.target.name] : e.target.checked
      });
    }

    _saveStore = async (e) => {
      e.preventDefault();
      this.setState({
        loading: true
      });
      let data = {
        name: this.state.name,
        code: this.state.code,
        address: this.state.address,
        has_loyalty: this.state.has_loyalty,
        has_voucher: this.state.has_voucher
      };
      await this.props.saveStore(data);
      if (this.props.status) {
        this.setState({
          redirect: true
        });
      } else {
        this.setState({
          loading: false
        });
      }
    }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/stores' />
    }
    return (
      <>
        <HeaderBar />
        <SideBar />
        <div className="main-content">
          <div className="container-fluid">
            <div className='row'>
              <div className='col-md-12'>
                <div className='pull-right'>
                  <a href='/stores' className='btn btn-link'>Back</a>
                </div>
                <div className='card'>
                  <div className='card-header'>
                    <h3>Add a store</h3>
                  </div>
                  <div className='card-body'>
                    <div className='form-group'>
                      <label>Store code</label>
                      <input type='text' name='code' disabled={this.state.loading} className='form-control' onChange={this.handleChange} value={this.state.code} />
                      {
                        this.props.errors.code && (
                          <span className='text-danger'>{this.props.errors.code}</span>
                        )
                      }
                    </div>

                    <div className='form-group'>
                      <label>Store name</label>
                      <input type='text' name='name' disabled={this.state.loading} className='form-control' onChange={this.handleChange} value={this.state.name}  />
                      {
                        this.props.errors.name && (
                          <span className='text-danger'>{this.props.errors.name}</span>
                        )
                      }
                    </div>

                    <div className='form-group'>
                      <label>Store address</label>
                      <input type='text' name='address' disabled={this.state.loading} className='form-control'  onChange={this.handleChange} value={this.state.address} />
                      {
                        this.props.errors.address && (
                          <span className='text-danger'>{this.props.errors.address}</span>
                        )
                      }
                    </div>

                    <div className='form-group'>
                      <label>Has voucher</label>
                      <Switch
                        name='has_voucher'
                        checked={this.state.has_voucher}
                        onChange={this.handleCheckChange}
                        color={this.state.has_voucher ? 'primary': 'secondary'} 
                      />
                    </div>

                    <div className='form-group'>
                      <label>Has loyalty</label>
                      <Switch
                        name='has_loyalty'
                        checked={this.state.has_loyalty}
                        onChange={this.handleCheckChange}
                        color={this.state.has_loyalty ? 'primary': 'secondary'} 
                      />
                    </div>

                    <button type='button' disabled={this.state.loading} onClick={this._saveStore} className='btn btn-primary'>
                      {
                        this.state.loading && (
                          <Spinner animation='grow' />
                        )
                      }
                      <i className='fa fa-save'> </i>
                    </button>
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
    status: state.storesReducer.status,
    errors: state.storesReducer.errors
  };
};

export default connect (mapStateToProps, { saveStore} ) (AddStore);