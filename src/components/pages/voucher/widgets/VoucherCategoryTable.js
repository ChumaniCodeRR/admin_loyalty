import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import { connect } from 'react-redux';
import { getCategories } from '../../../../store/actions/voucherCategory';
import Spinner from 'react-bootstrap/Spinner';

class VoucherCategoryTable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      loading: false,
      user_id: null
    };
  }

  fetchCategories = async() => {
    this.loading();
    await this.setState({
      user_id: this.props.user_id ?? null
    });

    await this.props.getCategories(this.state.user_id);
    this.setState({
      categories: this.props.categories
    });
    this.loading();
  }

  loading () {
    this.setState({
      loading: !this.state.loading
    });
  }

  componentDidMount() {
    this.fetchCategories();
  }

  render () {
    let columns = [
      {
        name: 'Name',
        selector: 'name',
        sortable: true
      },
      {
        name: 'Description',
        selector: 'description'
      },
      {
        name: 'Date',
        selector: 'created_at',
        sortable: true
      }
    ];
    return (
      <>
        {
          this.state.loading && (
            <div className='text-center'>
              <Spinner animation='grow' />
            </div>
          )
        }
        <DataTable columns={columns} data={this.state.categories} pagination className='transaction-table' />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.voucherCategoryReducer.categories
  };
};

export default connect (mapStateToProps, { getCategories }) (VoucherCategoryTable);