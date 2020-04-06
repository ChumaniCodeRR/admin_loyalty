import React, { Component } from "react";
import { login } from "../../store/actions/auth";
import { connect } from 'react-redux';
import Spinner from "react-bootstrap/Spinner";
import { Redirect } from 'react-router-dom';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      message: '',
      redirect: false
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  signIn = async(e) => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    let data = {
      email: this.state.email,
      password: this.state.password
    };
    await this.props.login(data);
    if(this.props.user) {
      this.setState({
        redirect: true
      });
    } else {
      if (this.props.message) {
        this.setState({
          message: this.props.message,
          loading: false
        });
      }
    }
  }

  render() {

    if (this.state.redirect) {
      return (
        <Redirect to='/' />
      );
    }

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
                <h3>Sign In to Vetro loyalty</h3>
                {
                  this.state.message && (
                    <div className='alert alert-danger'>
                      {
                        this.state.message
                      }
                    </div>
                  )
                }
                <p>Happy to see you again!</p>
                  <div className="form-group">
                    <input disabled={this.state.loading} type="text" onChange={this.handleChange}  className="form-control" placeholder="Email" name='email' value={this.state.email} />
                      <i className="ik ik-user"> </i>
                    {
                      (this.props.errors && this.props.errors.email) && (
                        <span className='text-danger'>{this.props.errors.email}</span>
                      )
                    }
                  </div>
                  <div className="form-group">
                    <input disabled={this.state.loading} type="password" name='password' onChange={this.handleChange} className="form-control" placeholder="Password" value={this.state.password} />
                      <i className="ik ik-lock"> </i>
                    {
                      (this.props.errors && this.props.errors.password) && (
                        <span className='text-danger'>{this.props.errors.password}</span>
                      )
                    }
                  </div>
                  <div className="row">
                    <div className="col text-left">
                      <label className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="item_checkbox" name="item_checkbox"
                               value="option1" />
                          <span className="custom-control-label">&nbsp;Remember Me</span>
                      </label>
                    </div>
                    <div className="col text-right">
                      <a href="/forgot-password">Forgot Password ?</a>
                    </div>
                  </div>
                  <div className="sign-btn text-center">
                    <button disabled={this.state.loading} className="btn btn-theme" onClick={this.signIn}>
                      {
                        this.state.loading && (
                          <Spinner animation='grow' size="sm" />
                        )
                      }
                      Sign In
                    </button>
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
    errors: state.authReducer.errors,
    user: state.authReducer.user,
    message: state.authReducer.message
  }
};

export default connect (mapStateToProps, { login }) (Login);
