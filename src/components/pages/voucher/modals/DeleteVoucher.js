import React, { Component } from 'react';
import { Modal, Spinner, Button } from 'react-bootstrap';
import { deleteVoucher, getVouchers } from '../../../../store/actions/voucher';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

class DeleteVoucher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      loading: false
    }
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

  delete = () => {
    this.loading();
    this.props.deleteVoucher(this.props.voucher.id)
      .then(() => {
        if (this.props.status) {
          toast.success(this.props.message);
        } else {
          toast.error(this.props.message);
        }
        this.props.getVouchers(this.props.voucher.category.id);
        this.loading();
        this.handleClose();
      });
  }

  render () {
    return (
      <>
        <button type='button' onClick={this.handleShow} className='btn btn-link text-danger'><i className='fa fa-times'></i> </button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete voucher</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this voucher? This action cannot be undone!
          </Modal.Body>
          <Modal.Footer>
          <Button disabled={this.state.loading} variant="secondary" onClick={this.handleClose}>
              No
            </Button>
            <Button disabled={this.state.loading} variant="primary" onClick={this.delete}>
              {
                this.state.loading && (
                  <Spinner animation='grow' size='sm' />
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
    status: state.voucherReducer.status,
    message: state.voucherReducer.message
  };
}

export default connect (mapStateToProps, { deleteVoucher, getVouchers }) (DeleteVoucher);