import React, { Component } from 'react';
import Switch from '@material-ui/core/Switch';
import DatePicker from 'react-date-picker';
import Select from 'react-select';
import { getTypes, getDiscountTypes } from '../../../helpers/voucher';
import { getVoucher, updateVoucher } from '../../../store/actions/voucher';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import HeaderBar from '../../partials/Header/HeaderBar';
import SideBar from '../../partials/SideBar';
import Spinner from 'react-bootstrap/Spinner';

class EditVoucher extends Component {
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
      voucher_category_id: '',
      voucher_discount_type_id: '',
      voucher_type_id: '',
      send_sms: false,
      voucher_id: '',
      code: '',
      status: ''
    };
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

  update = () => {
    this.loading();
    this.props.updateVoucher(this.state.voucher_id, this.state)
      .then(() => {
        if (this.props.status) {
          toast.success(this.props.message);
        } else {
          toast.error(this.props.message);
        }
        this.loading();
      });
  }

  componentDidMount () {
    const { match: {params}} = this.props;
    this.props.getVoucher(params.voucher_id)
      .then(() => {
        this.setState({
          cell_number: this.props.voucher.cell_number ?? '',
          name: this.props.voucher.name ?? '',
          code: this.props.voucher.code ?? '',
          product_code: this.props.voucher.product_code ?? '',
          discount_amount: this.props.voucher.discount_amount ?? 0.00,
          discount_percent: this.props.voucher.discount_percent ?? 0.00,
          expires_at: this.props.voucher.expires_at ? new Date(this.props.voucher.expires_at + 'T00:00:00Z') : new Date(),
          voucher_category_id: this.props.voucher.category.id ?? '',
          voucher_discount_type_id: this.props.voucher.discount.id ?? '',
          voucher_type_id: this.props.voucher.type.id ?? '',
          send_sms: false,
          voucher_id: this.props.voucher.id ?? '',
          status: this.props.voucher.status.name
        });
      })
  }

  handleSwitchChange = async(e) => {
    await this.setState({
      send_sms: ! this.state.send_sms
    });
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

  render () {
    let backUrl = this.state.voucher_category_id ? '/vouchers/' + this.state.voucher_category_id : '';
    let types = getTypes();
    let discount_types = getDiscountTypes();
    return (
      <>
        <HeaderBar />
        <SideBar />
        <div className="main-content">
          <div className="container-fluid">
            <div className='row'>
              <div className='col-md-12'>
                <a href={ backUrl } className='btn btn-link'>Back to voucher list</a>
                <div className='card'>
                  <div className='card-header'>
                    <h3>Edit voucher </h3>
                  </div>
                  <div className='card-body'>
                    <div className='form-group'>
                      <label>Voucher code</label>
                      <input type='text' disabled={true} className='form-control' name='code' value={this.state.code} />
                    </div>
                    <div className='form-group'>
                      <label>Cell number</label>
                      <input type='text' disabled={this.state.loading} className='form-control' name='cell_number' value={this.state.cell_number} onChange={this.handleChange} />
                      {
                        this.props.errors.cell_number && (
                        <span className='text-danger'>{this.props.errors.cell_number}</span>
                        )
                      }
                    </div>
                    {
                      (this.state.status === 'Created') && (
                        <div className='form-group'>
                          <label>Send via SMS</label>
                          <Switch
                            name='send_sms'
                            onChange={this.handleSwitchChange}
                            checked={this.state.send_sms}
                            color={this.state.send_sms ? 'primary' : 'secondary'}
                          />
                        </div>
                      )
                    }
                    
                    <div className='form-group'>
                      <label>Name</label>
                      <input type='text' disabled={this.state.loading} className='form-control' name='name' value={this.state.name} onChange={this.handleChange} />
                    </div>
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
                    {
                      (this.state.status === 'Created') && (
                        <button className='btn btn-primary' disabled={this.state.loading} onClick={this.update}>
                          {
                            this.state.loading && (
                              <Spinner animation='grow' size='sm' />
                            )
                          }
                          <i className='fa fa-save'></i>
                        </button>
                      )
                    }
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
    voucher: state.voucherReducer.voucher,
    status: state.voucherReducer.status,
    message: state.voucherReducer.message,
    errors: state.voucherReducer.errors
  };
};

export default connect (mapStateToProps, { getVoucher, updateVoucher }) (EditVoucher);
