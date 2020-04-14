import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { deleteUser, getAdmins, getClients } from '../../../../../store/actions/user';
import Spinner from 'react-bootstrap/Spinner';

class DeleteUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      loading: false
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

  destroyUser = async() => {
    this.setState({
      loading: true
    });
    await this.props.deleteUser(this.props.user.id);
    if (this.props.role === 'Admin') {
      await this.props.getAdmins();
    } else {
      await this.props.getClients();
    }
    this.setState({
      loading: false
    });
    this.handleClose();
  }

  render () {
    return (
      <>
        <button type='button' onClick={this.handleShow} className={'btn btn-link text-danger'}><i className='fa fa-times'> </i>
          {(this.props.role === 'Client') ? 'Delete' : ''}
        </button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this {this.props.user.name}? this action cannot be undone.</Modal.Body>
          <Modal.Footer>
            <Button disabled={this.state.loading} variant="secondary" onClick={this.handleClose}>
              No
            </Button>
            <Button disabled={this.state.loading} variant="primary" onClick={this.destroyUser}>
              {
                this.state.loading && (
                  <Spinner animation='grow' />
                )
              }
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.userReducer.status
  };
};

export default connect (mapStateToProps, { deleteUser, getAdmins, getClients }) (DeleteUser);