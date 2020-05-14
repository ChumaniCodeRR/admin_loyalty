import http from '../../instances/http';

export const getCategories = (client_id = null) => {
  return dispatch => {
    let url = client_id ? 'voucher/category/' + client_id : 'voucher/category';
    return http.get(url + '?api_token=' + localStorage.getItem('access_token'))
      .then(response => {
        dispatch({
          type: "SET_CATEGORIES",
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: "SET_CATEGORIES",
          payload: error.data
        });
      });
  }
}

export const storeCategory = (data, client_id = null) => {
  return dispatch => {
    let url = client_id ? 'voucher/category/' + client_id : 'voucher/category';
    return http.post(url + '?api_token=' + localStorage.getItem('access_token'), {
        name: data.name,
        description: data.description
      })
      .then(response => {
        dispatch({
          type: "STORE_CATEGORY",
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: "STORE_CATEGORY",
          payload: error.data
        });
      });
  };
} ;

export const getCategory = (id) => {
  return dispatch => {
    return http.get('voucher/category/get/' + id + '?api_token=' + localStorage.getItem('access_token'))
      .then(response => {
        dispatch({
          type: "SET_CATEGORY",
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: "SET_CATEGORY",
          payload: error.data
        });
      });
  };
};

export const updateCategory = (id, data) => {
  return dispatch => {
    return http.put('voucher/category/udpdate/' + id + '?api_token=' + localStorage.getItem('access_token'), {
        name: data.name,
        description: data.description
      })
      .then(response => {
        dispatch({
          type: "UPDATE_CATEGORY",
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: "UPDATE_CATEGORY",
          payload: error.data
        });
      });
  };
};

export const destroyCategory = (id) => {
  return dispatch => {
    return http.delete('voucher/category/delete/' + id + '?api_token=' + localStorage.getItem('access_token'))
      .then(response => {
        dispatch({
          type: "DELETE_CATEGORY",
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: "DELETE_CATEGORY",
          payload: error.data
        });
      });
  };
};