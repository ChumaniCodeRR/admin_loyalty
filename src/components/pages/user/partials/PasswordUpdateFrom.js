import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateProfile } from '../../../../store/actions/user';
import Spinner from 'react-bootstrap/Spinner';
import { toast } from 'react-toastify';

class PasswordUpdateForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      password: '',
      password_confirmation: '',
      loading: false
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  updatePassword = async (e) => {
    this.setState({
      loading: true
    });
    let data = {
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
    };
    await this.props.updateProfile(data);
    if (this.props.status) {
      toast.success('Password updated successfully!');
      this.setState({
        password: '',
        password_confirmation: ''
      });
    }
    this.setState({
      loading: false
    });
  }

  render () {
    return (
      <>
        <div className='card'>
          <div className='card-header'>
            <h3>Update password</h3>
          </div>
          <div className='card-body'>
            <div className='form-group'>
              <label>Password</label>
              <input disabled={this.state.loading} type="password" name="password" className="form-control" onChange={this.handleChange} value={this.state.password} />
              {
                this.props.errors.password && (
                  <span className='text-danger'>{ this.props.errors.password }</span>
                )
              }
            </div>
            <div className='form-group'>
              <label>Password confirmation</label>
              <input disabled={this.state.loading} type="password" name="password_confirmation" className="form-control" onChange={this.handleChange} value={this.state.password_confirmation} />
            </div>

            <button type="button" disabled={this.state.loading} className='btn btn-primary' onClick={this.updatePassword}>
              {
                this.state.loading && (
                  <Spinner animation='grow' size='sm' />
                )
              }
              <i className='fa fa-save'> </i> Save</button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
 return {
  status: state.userReducer.status,
  errors: state.userReducer.errors
 };
};

export default connect (mapStateToProps, { updateProfile }) (PasswordUpdateForm);