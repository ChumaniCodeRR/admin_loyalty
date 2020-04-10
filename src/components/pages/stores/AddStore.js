import React, { Component } from 'react';
import SideBar from '../../partials/SideBar';
import HeaderBar from '../../partials/Header/HeaderBar';
import { saveStore } from '../../../store/actions/stores';
import { connect } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { Redirect } from 'react-router-dom';

class AddStore extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      code: '',
      address: '',
      loading: false,
      redirect: false
    };
  }

    handleChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
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
        address: this.state.address
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