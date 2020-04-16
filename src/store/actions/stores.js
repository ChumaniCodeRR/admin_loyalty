import http from '../../instances/http';

export const getStores = (client_id = null) => {
  return dispatch => {
    let url = 'store/all?api_token=';
    if (client_id) {
      url = 'store/all/' + client_id + '?api_token=';
    }
    return http.get(url + localStorage.getItem('access_token'))
      .then(response => {
        dispatch({
          type: "SET_STORES",
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: "SET_STORES",
          payload: error.data
        });
      });
  };
};

export const getStore = (id) => {
  return dispatch => {
    return http.get('store/' + id + '?api_token=' + localStorage.getItem('access_token'))
      .then(response => {
        dispatch({
          type: "SET_STORE",
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: "SET_STORE",
          payload: error.data
        });
      });
  };
};

export const saveStore = (data, client_id = null) => {
  return dispatch => {
    let url = 'store?api_token=';
    if (client_id) {
      url = 'store?user_id=' + client_id + '&api_token=';
    }
    return http.post( url + localStorage.getItem('access_token'), data)
      .then(response => {
        dispatch({
          type: "SAVE_STORE",
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: "SAVE_STORE",
          payload: error.data
        });
      });
  };
};

export const updateStore = (id, data, client_id = null) => {
  return dispatch => {
    let url = 'store/' + id +'?api_token=';
    if (client_id) {
      url = 'store/' + id +'?user_id=' + client_id + '&api_token=';
    }
    return http.put(url + localStorage.getItem('access_token'), data)
      .then(response => {
        dispatch({
          type: "UPDATE_STORE",
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: "UPDATE_STORE",
          payload: error.data
        });
      });
  };
};

export const deleteStore = (id) => {
  return dispatch => {
    return http.delete('store/' + id +'?api_token=' + localStorage.getItem('access_token'))
      .then(response => {
        dispatch({
          type: "DESTROY_STORE",
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: "DESTROY_STORE",
          payload: error.data
        });
      });
  };
};

export const importStore = (data, client_id = null) => {
  return dispacth => {
    let formData = new FormData();
    formData.append('file', data.file);
    if (client_id) {
      formData.append('user_id', client_id);
    }
    return http.post('store/import/upload?api_token=' + localStorage.getItem('access_token'), formData, {
      headers: {
        'Content-Type' : 'multipart/form-data'
      }
    }).then(response => {
      dispacth({
        type: "IMPORT_STORE",
        payload: response.data
      });
    })
    .catch(error => {
      dispacth({
        type: "IMPORT_STORE",
        payload: error.data
      });
    });
  };
};