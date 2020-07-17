import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import TransactionTypeWidget from "../../widgets/TransactionTypeWidget";

class TransactionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  render() {
    let items = this.props.transaction.line_items && this.props.transaction.line_items.map((value, index) => {
      return (
                  <tr
                    key={index}>
                    <td>{value.code}</td>
                    <td>{value.name}</td>
                    <td>{value.quantity}</td>
                    <td>{value.price}</td>
                  </tr>
      )
    });
    return (
      <>
        <button
          className='btn btn-link text-primary'
          onClick={this.handleShow}
        >
          <i
            className='fa fa-eye'> </i>
        </button>
        <Modal onHide={this.handleClose} show={this.state.show}>
          <Modal.Header>
            Transaction data
          </Modal.Header>
          <Modal.Body>
            <h5>Member details</h5>
            <p><strong>Member:</strong> {this.props.transaction.user.cell_number}</p>
            <p><strong>Name:</strong> {(this.props.transaction.user.first_name ?? '') + ' ' + (this.props.transaction.user.last_name ?? '')}</p>
            <hr/>
            <h5>Transaction details</h5>
            <p><strong>Date:</strong> {this.props.transaction.created_at}</p>
            <p><strong>Type:</strong> <TransactionTypeWidget type={this.props.transaction.transaction_type} /></p>
            <p><strong>Status:</strong> {this.props.transaction.transaction_status}</p>
            <p><strong>Points:</strong> {this.props.transaction.amount} Crowns</p>
            <p><strong>Value:</strong> {this.props.transaction.loyalty_account.currency + ' ' +this.props.transaction.currency_amount}</p>
            <p><strong>Comments:</strong></p>
            <p>{this.props.transaction.comments}</p>

            {
              this.props.transaction.line_items && (
                <>
                  <hr/>
                  <h5>Order details</h5>
                {
                  <table width='100%' className='table table-hover'>
                    <thead>
                      <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      items
                    }
                    </tbody>
                  </table>
                }
                <div className='alert alert-info'>
                  <strong>Order total: {this.props.transaction.loyalty_account.currency + ' ' + this.props.transaction.order_total}</strong>
                </div>
                </>
              )
            }
          </Modal.Body>
          <Modal.Footer>
            <button onClick={this.handleClose} className='btn btn-danger'>
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default TransactionModal;
