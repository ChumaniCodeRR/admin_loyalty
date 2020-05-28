import React, { Component } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { deleteUser, getManagers } from '../../../../../store/actions/user';

class DeleteManager extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      show: false
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

  loading = () => {
    this.setState({
      loading: ! this.state.loading
    });
  }

  destroyUser = () => {
    this.loading();
    this.props.deleteUser(this.props.user.id)
      .then(() => {
        this.loading();
        if (this.props.status) {
          this.props.getManagers(this.props.parent_id)
            .then(() => {
              this.handleClose();
            });
        }
      })
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
    status: state.userReducer.status,
    message: state.userReducer.message
  };
};

export default connect (mapStateToProps, { deleteUser, getManagers }) (DeleteManager);
