import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { connect } from 'react-redux';
import { resetPassword } from '../../store/actions/auth';

class ForgotPassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: null,
      loading: false,
      email: '',
      success: false
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    });
  }

  _resetPassword = async (e) => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    await this.props.resetPassword(this.state.email);
    this.setState({
      success: this.props.status,
      message: this.props.message,
      loading: false
    });
  }

  render () {
    return (
      <div className="auth-wrapper">
        <div className="container-fluid h-100">
          <div className="row flex-row h-100 bg-white">
            <div className="col-xl-8 col-lg-6 col-md-5 p-0 d-md-block d-lg-block d-sm-none d-none">
              <div className="lavalite-bg">
                <div className="lavalite-overlay"><img src="/assets/img/vetro-media.png" alt="" /> </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-7 my-auto p-0">
              <div className="authentication-form mx-auto">
                <div className="logo-centered">

                </div>
                <h3>Reset your password</h3>
                {
                  this.state.message && (
                    <div className={this.state.success ? 'alert alert-success' : 'alert alert-danger'}>
                      {
                        this.state.message
                      }
                    </div>
                  )
                }
                <p>Please enter your email address to reset your password</p>
                  <div className="form-group">
                    <input disabled={this.state.loading} type="text" onChange={this.handleChange}  className="form-control" placeholder="Email" name='email' value={this.state.email} />
                      <i className="ik ik-user"> </i>
                    {
                      (this.props.errors && this.props.errors.email) && (
                        <span className='text-danger'>{this.props.errors.email}</span>
                      )
                    }
                  </div>
                  
                  <div className="sign-btn text-center">
                    <button disabled={this.state.loading} className="btn btn-theme" onClick={this._resetPassword}>
                      {
                        this.state.loading && (
                          <Spinner animation='grow' />
                        )
                      }
                      Reset password
                    </button>
                    <br/>
                    <a href="/" className="btn button-transparent">Login</a>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.authReducer.status,
    errors: state.authReducer.errors,
    message: state.authReducer.message
  }
};

export default connect (mapStateToProps, { resetPassword }) (ForgotPassword);