import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { destroyCategory, getCategories } from '../../../../store/actions/voucherCategory';
import Spinner from 'react-bootstrap/Spinner';

class DeleteVoucherCategory extends Component {
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

  deleteCategory = () => {
    this.props.destroyCategory(this.props.category.id)
      .then(() => {
        this.props.getCategories(this.props.category.user.id)
          .then(() => {
            this.handleClose();
          });
      });
  }

  render () {
    return (
      <>
        <button type='button' onClick={this.handleShow} className={'btn btn-link text-danger'}><i className='fa fa-times'></i> </button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this { this.props.category.name} and all vouchers in it? this action cannot be undone.</Modal.Body>
          <Modal.Footer>
            <Button disabled={this.state.loading} variant="secondary" onClick={this.handleClose}>
              No
            </Button>
            <Button disabled={this.state.loading} variant="primary" onClick={this.deleteCategory}>
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
    status: state.voucherCategoryReducer.status
  };
};

export default connect (mapStateToProps, { destroyCategory, getCategories }) (DeleteVoucherCategory);