import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { createClient, createAdmin, getAdmins, getClients } from '../../../../../store/actions/user';
import Spinner from 'react-bootstrap/Spinner';

class AddUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      loading: false,
      name: '',
      email: ''
    };
  }

  handleShow = () => {
    this.setState({
      show: true
    });
  }

  handleClose = () => {
    this.setState({
      show: false
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  saveUser = async(e) => {
    let data = {
      email: this.state.email,
      name: this.state.name
    };
    this.setState({
      loading: true
    });

    if (this.props.role === 'Admin') {
      await this.props.createAdmin(data);
    } else {
      await this.props.createClient(data);
    }

    if (this.props.status) {
      if (this.props.role === 'Admin') {
        await this.props.getAdmins();
      } else {
        await this.props.getClients();
      }
      this.setState({
        loading: false
      });
      this.handleClose();
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render () {
    return (
      <>
        <button type='button' onClick={this.handleShow} className={'btn btn-primary'}><i className='fa fa-plus'></i> </button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add {this.props.role}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='form-group'>
              <label>Name</label>
              <input type='text' name='name' disabled={this.state.loading} className='form-control' value={this.state.name} onChange={this.handleChange} />
              {
                this.props.errors.name && (
                  <span className='text-danger'>{this.props.errors.name}</span>
                )
              }
            </div>
            <div className='form-group'>
              <label>Email</label>
              <input type='text' name='email' disabled={this.state.loading} className='form-control' value={this.state.email} onChange={this.handleChange} />
              {
                this.props.errors.email && (
                  <span className='text-danger'>{this.props.errors.email}</span>
                )
              }
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button disabled={this.state.loading} variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button disabled={this.state.loading} variant="primary" onClick={this.saveUser} >
              {
                this.state.loading && (
                  <Spinner animation='grow' size='sm' />
                )
              }
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.userReducer.status,
    errors: state.userReducer.errors
  };
};

export default connect (mapStateToProps, { createAdmin, createClient, getAdmins, getClients }) (AddUser);