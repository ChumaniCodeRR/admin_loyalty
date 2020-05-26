import React, { Component } from 'react';
import HeaderBar from '../../partials/Header/HeaderBar';
import SideBar from '../../partials/SideBar';
import { connect } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import { getPermissions } from '../../../store/actions/permissions';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class AddUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      permissions: [],
      checkedPermissions: [
      ]
    };
  }

  componentDidMount(){
    this.props.getPermissions()
      .then(() => {
        this.setState({
          permissions: this.props.permissions
        });
      });
  }

  handleChange = (e) => {

  }

  handleCheckChange = async(e) => {
    let checkedPermissions = this.state.checkedPermissions;
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
      checkedPermissions: checkedPermissions
    });
  }

  isChecked = (permission) => {
    return this.state.checkedPermissions.includes(permission);
  }

  storeUser = () => {
    console.log(this.state);
  }

  render () {

    let boxes = this.state.permissions.map((permission, index) => {
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
                      <label>Email address</label>
                      <input type='text' name='email' className='form-control' />
                    </div>
                    <div className='form-group'>
                      <label>Select user permission</label>
                      {
                        this.state.permissions.length && (
                          <>
                            <FormGroup row>
                              {boxes}
                            </FormGroup>
                          </>
                        )
                      }
                    </div>
                    <button onClick={this.storeUser} className='btn btn-primary'><i className='fa fa-save'> </i></button>
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
    status: state.permissionsReducer.status
  }
}

export default connect (mapStateToProps, { getPermissions }) (AddUser);
