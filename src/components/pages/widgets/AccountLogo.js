import React, { Component } from 'react';
import { changeLogo } from '../../../store/actions/account';
import { connect } from 'react-redux';
import Spinner from 'react-bootstrap/Spinner';
import { toast } from 'react-toastify';

class AccountLogo extends Component {

  constructor(props){
    super(props);
    this.state = {
      logo: '',
      loading: false
    }
  }

  componentDidMount() {
    this.setState({
      logo: this.props.logo
    });
  }

  uploadLogo = async (e) => {
    this.setState({
      loading: true
    });
    await this.props.changeLogo({ logo: e.target.files[0] });
    if (this.props.status) {
      toast.success('Logo updated!');
    }
    this.setState({
      loading: false
    });
    this.props.reloadAccount();
  }

  openDialog = () => {
    this.inputElement.click();
  }

  render() {
    return (
      <>
        <div onClick={this.openDialog}>
          {
            this.state.loading && (
              <Spinner animation='grow' variant="primary" />
            )
          }
          {
            this.props.errors.logo && (
            <span className='text-danger'>{this.props.errors.logo}</span>
            )
          }
          <img src={this.state.logo} className='account-logo' alt='' /> <button className='btn btn-primary btn-small btn-edit-logo'><i className='fa fa-edit'> </i></button>
          <input type='file' name='logo' accept="image/jpeg,image/png,image/jpg" onChange={this.uploadLogo} ref={input => this.inputElement = input} className='hidden' />
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.accountReducer.status,
    errors: state.accountReducer.errors
  }
};

export default connect(mapStateToProps, { changeLogo }) (AccountLogo);