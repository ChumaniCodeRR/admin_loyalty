import React, { Component } from 'react';
import HeaderBar from '../../partials/Header/HeaderBar';
import SideBar from '../../partials/SideBar';
import { connect } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import { getPermissions } from '../../../store/actions/permissions';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { createManager } from '../../../store/actions/user';
import { toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';
import { Redirect } from 'react-router-dom';


class AddUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      system_permissions: [],
      permissions: [],
      parent_id: '',
      name: '',
      email: '',
      loading: false,
      redirect: false
    };
  }

  loading = () => {
    this.setState({
      loading: ! this.state.loading
    })
  }

  componentDidMount(){
    const {match: {params}} = this.props;
    this.props.getPermissions()
      .then(() => {
        this.setState({
          system_permissions: this.props.permissions,
          parent_id: params.user_id
        });
      });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleCheckChange = async(e) => {
    let checkedPermissions = this.state.permissions;
    let name = e.target.name;
    let checked = e.target.checked ?? false;
    if (checked === true) {
      if (!this.isChecked(name)) {
        await checkedPermissions.push(e.target.name);
      }
    } else {
      const filteredItems = checkedPermissions.filter((item) => item !== name);
      checkedPermissions = filteredItems;
    }

    await this.setState({
      permissions: checkedPermissions
    });
  }

  isChecked = (permission) => {
    return this.state.permissions.includes(permission);
  }

  storeUser = () => {
    this.loading();
    this.props.createManager(this.state)
      .then(() => {
        if (this.props.storeStatus) {
          this.setState({
            redirect: true
          });
        } else {
          toast.error(this.props.message);
        }
        this.loading();
      })
  }

  render () {

    if (this.state.redirect) {
      return (
        <Redirect to={'/user/list/' + this.state.user_id} />
      );
    }

    let boxes = this.state.system_permissions.map((permission, index) => {
      return <FormControlLabel
        control={<Checkbox
        onChange={this.handleCheckChange} name={permission} />}
        label={permission.toUpperCase()}
        key={index}
      />
    });
    return (
      <>
        <HeaderBar />
        <SideBar />
        <div className="main-content">
          <div className="container-fluid">
            <div className="row">
              <div className='col-md-12'>
                <div className='card'>
                  <div className='card-header'>
                    <h4 className='card-title'>Add user</h4>
                  </div>
                  <div className='card-body'>
                  <div className='form-group'>
                    <label>Name*</label>
                    <input type='text' name='name' className='form-control' disabled={this.state.loading} onChange={this.handleChange} value={this.state.name} />
                    {
                      this.props.errors && (
                        <span className='text-danger'>{this.props.errors.name}</span>
                      )
                    }
                  </div>
                    <div className='form-group'>
                      <label>Email address *</label>
                      <input type='text' name='email' className='form-control' onChange={this.handleChange} disabled={this.state.loading} value={this.state.email} />
                      {
                        this.props.errors && (
                          <span className='text-danger'>{this.props.errors.email}</span>
                        )
                      }
                    </div>
                    <div className='form-group'>
                      <label>Select user permission *</label>
                      {
                        this.props.errors && (
                          <span className='text-danger'>{this.props.errors.permissions}</span>
                        )
                      }
                      {
                        this.state.system_permissions.length && (
                          <>
                            <FormGroup row>
                              {boxes}
                            </FormGroup>
                          </>
                        )
                      }
                    </div>
                    <button disabled={this.state.loading} onClick={this.storeUser} className='btn btn-primary'>
                      {
                        this.state.loading && (
                          <Spinner animation='grow' size='sm' />
                        )
                      }
                      <i className='fa fa-save'> </i>
                    </button>
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
    permissions: state.permissionsReducer.permissions,
    status: state.permissionsReducer.status,
    storeStatus: state.userReducer.status,
    errors: state.userReducer.errors,
    message: state.userReducer.message
  }
}

export default connect (mapStateToProps, { getPermissions, createManager }) (AddUser);
