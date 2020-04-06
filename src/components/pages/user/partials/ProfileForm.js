import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProfile, updateProfile } from '../../../../store/actions/user';
import Spinner from 'react-bootstrap/Spinner';
import { toast } from 'react-toastify';

class ProfileForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      name: '',
      company: '',
      email: '',
      errors: []
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser = async() => {
    await this.props.getProfile();
    this.setState({
      name: this.props.user.name ? this.props.user.name: '' ,
      email: this.props.user.email ? this.props.user.email: '',
      company: this.props.user.company ? this.props.user.company: ''
    });
  }

  updateProfile = async(e) => {
    e.preventDefault();
    this.setState({
      loading: true
    });

    let data = {
      name: this.state.name,
      email: this.state.email,
      company: this.state.company
    };

    await this.props.updateProfile(data);
    if (this.props.status) {
      toast.success('Profile updated !');
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
            <h3>My profile</h3>
          </div>
          <div className='card-body'>
            <div className='form-group'>
              <label>Name</label>
              <input type='text' name='name' onChange={this.handleChange} disabled={this.state.loading} placeholder='John Doe' className='form-control' value={this.state.name} />
              {
                this.props.errors.name && (
                  <span className='text-danger'>{ this.props.errors.name }</span>
                )
              }
            </div>
            <div className='form-group'>
              <label>Email</label>
              <input type='text' name='email' onChange={this.handleChange} disabled={this.state.loading} className='form-control' value={this.state.email} />
              {
                this.props.errors.email && (
                  <span className='text-danger'>{ this.props.errors.email }</span>
                )
              }
            </div>
            <div className='form-group'>
              <label>Company</label>
              <input type='text' name='company' onChange={this.handleChange} disabled={this.state.loading} className='form-control' value={this.state.company} />
              {
                this.props.errors.company && (
                  <span className='text-danger'>{ this.props.errors.company }</span>
                )
              }
            </div>
            <button disabled={this.state.loading} type="button" className='btn btn-primary' onClick={this.updateProfile}>
              {
                this.state.loading && (
                  <Spinner animation='grow' size="sm" />
                )
              }
              <i className='fa fa-save'> </i> Save</button>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    status: state.userReducer.status,
    errors: state.userReducer.errors
  }
};

export default connect (mapStateToProps, { getProfile, updateProfile }) (ProfileForm);