import React, { Component } from 'react';
import { Modal, Spinner, Button } from 'react-bootstrap';
import Select from 'react-select';
import { getTypes, getDiscountTypes, getVoucherVolumes } from '../../../../helpers/voucher';
import DatePicker from 'react-date-picker';
import { connect } from 'react-redux';
import { storeBulkVouchers, storeVoucher, getVouchers } from '../../../../store/actions/voucher';
import { toast } from 'react-toastify';
import Switch from '@material-ui/core/Switch';

class AddVoucher extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      loading: false,
      cell_number: '',
      name: '',
      product_code: '',
      discount_amount: 0.00,
      discount_percent: 0.00,
      expires_at: new Date(),
      number_of_vouchers: 1,
      voucher_category_id: '',
      voucher_discount_type_id: '',
      voucher_type_id: '',
      send_sms: false,
      voucher_volume: 'single'
    };
  }

  componentDidMount() {
    this.setState({
      voucher_category_id: this.props.category.id
    });
  }

  loading () {
    this.setState({
      loading: ! this.state.loading
    });
  }

  handleDateChange = (date) => {
    this.setState({
      expires_at: date
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSwitchChange = async(e) => {
    await this.setState({
      send_sms: ! this.state.send_sms
    });
  }

  setVoucherVolume = (option) => {
    this.setState({
      voucher_volume: option.value
    });

    if (option.value === 'bulk') {
      this.setState({
        cell_number: '',
        name: ''
      });
    }
  }

  setVoucherType = (option) => {
    this.setState({
      voucher_type_id: option.value
    });
  }

  setDiscountType = (option) => {
    this.setState({
      voucher_discount_type_id: option.value
    });
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

  saveVoucher = () => {
    
    this.loading();
    if(this.state.voucher_volume === 'single') {
      this.props.storeVoucher(this.state)
      .then(() => {
        this.loading();
        if (this.props.status) {
          toast.success(this.props.message);
          this.props.getVouchers(this.state.voucher_category_id)
            .then(() => {
              this.handleClose();
            });
        } else {
          toast.error(this.props.message);
        }
        
      });
    } else {
      this.props.storeBulkVouchers(this.state)
      .then(() => {
        this.loading();
        if (this.props.status) {
          toast.success(this.props.message);
          this.props.getVouchers(this.state.voucher_category_id)
            .then(() => {
              this.handleClose();
            });
        } else {
          toast.error(this.props.message);
        }
      });
    }
  }

  render () {
    let types = getTypes();
    let discount_types = getDiscountTypes();
    let voucher_volumes = getVoucherVolumes();
    return (
        <>
        <button type='button' onClick={this.handleShow} className='btn btn-primary'><i className='fa fa-plus'></i> </button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Vouchers to {this.props.category.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='form-group'>
              <label>Select Volume</label>
              <Select options={voucher_volumes} disabled={this.state.loading} onChange={this.setVoucherVolume} value={voucher_volumes.filter(option => option.value === this.state.voucher_volume)} />
            </div>
            {
              (this.state.voucher_volume === 'single') && (
                <>
                  <div className='form-group'>
                    <label>Cell number</label>
                    <input type='text' disabled={this.state.loading} className='form-control' name='cell_number' value={this.state.cell_number} onChange={this.handleChange} />
                    {
                      this.props.errors.cell_number && (
                      <span className='text-danger'>{this.props.errors.cell_number}</span>
                      )
                    }
                  </div>
                  <div className='form-group'>
                    <label>Send via SMS</label>
                    <Switch
                      name='send_sms'
                      onChange={this.handleSwitchChange}
                      checked={this.state.send_sms}
                      color={this.state.send_sms ? 'primary' : 'secondary'}
                    />
                  </div>
                  <div className='form-group'>
                    <label>Name</label>
                    <input type='text' disabled={this.state.loading} className='form-control' name='name' value={this.state.name} onChange={this.handleChange} />
                  </div>
                </>
              )
            }
            {
              (this.state.voucher_volume === 'bulk') && (
                <div className='form-group'>
                  <label>Number of vouchers</label>
                  <input type='number' disabled={this.state.loading} className='form-control' name='number_of_vouchers' value={this.state.number_of_vouchers} onChange={this.handleChange} />
                  {
                    this.props.errors.number_of_vouchers && (
                    <span className='text-danger'>{this.props.errors.number_of_vouchers}</span>
                    )
                  }
                </div>
              )
            }
            <div className='form-group'>
              <label>Voucher type</label>
              <Select options={types} disabled={this.state.loading} onChange={this.setVoucherType} value={types.filter(option => option.value === this.state.voucher_type_id)} />
              {
                this.props.errors.voucher_type_id && (
                <span className='text-danger'>{this.props.errors.voucher_type_id}</span>
                )
              }
            </div>
            {
              (this.state.voucher_type_id === 1) && (
                <div className='form-group'>
                  <label>Product code</label>
                  <input type='text' disabled={this.state.loading} className='form-control' name='product_code' value={this.state.product_code} onChange={this.handleChange} />
                  {
                    this.props.errors.product_code && (
                    <span className='text-danger'>{this.props.errors.product_code}</span>
                    )
                  }
                </div>
              )
            }
            <div className='form-group'>
              <label>Voucher discount type</label>
              <Select options={discount_types} disabled={this.state.loading} onChange={this.setDiscountType} value={discount_types.filter(option => option.value === this.state.voucher_discount_type_id)} />
              {
                this.props.errors.voucher_discount_type_id && (
                <span className='text-danger'>{this.props.errors.voucher_discount_type_id}</span>
                )
              }
            </div>

            {
              (this.state.voucher_discount_type_id === 1) && (
                <div className='form-group'>
                  <label>Discount percent</label>
                  <input type='number' disabled={this.state.loading} className='form-control' name='discount_percent' value={this.state.discount_percent} onChange={this.handleChange} />
                  {
                    this.props.errors.discount_percent && (
                    <span className='text-danger'>{this.props.errors.discount_percent}</span>
                    )
                  }
                </div>
              )
            }

            {
              (this.state.voucher_discount_type_id === 2) && (
                <div className='form-group'>
                  <label>Discount amount</label>
                  <input type='number' disabled={this.state.loading} className='form-control' name='discount_amount' value={this.state.discount_amount} onChange={this.handleChange} />
                  {
                    this.props.errors.discount_amount && (
                    <span className='text-danger'>{this.props.errors.discount_amount}</span>
                    )
                  }
                </div>
              )
            }
            
            <div className='form-group'>
              <label>Expiration date</label>
              <br/>
              <DatePicker
                value={this.state.expires_at}
                onChange={this.handleDateChange}
                format='yyyy-MM-dd'
                disabled={this.state.loading}
              />
              {
                this.props.errors.expires_at && (
                <span className='text-danger'>{this.props.errors.expires_at}</span>
                )
              }
            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button disabled={this.state.loading} variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button disabled={this.state.loading} variant="primary" onClick={this.saveVoucher}>
              {
                this.state.loading && (
                  <Spinner animation='grow' />
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
    status: state.voucherReducer.status,
    errors: state.voucherReducer.errors,
    message: state.voucherReducer.message,
    vouchers: state.voucherReducer.vouchers
  }
}

export default connect (mapStateToProps, { storeBulkVouchers, storeVoucher, getVouchers }) (AddVoucher);