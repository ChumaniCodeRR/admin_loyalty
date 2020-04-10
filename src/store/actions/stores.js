import http from '../../instances/http';

export const getStores = () => {
  return dispatch => {
    return http.get('store?api_token=' + localStorage.getItem('access_token'))
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

export const saveStore = (data) => {
  return dispatch => {
    return http.post('store?api_token=' + localStorage.getItem('access_token'), data)
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

export const updateStore = (id, data) => {
  return dispatch => {
    return http.put('store/' + id +'?api_token=' + localStorage.getItem('access_token'), data)
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

export const importStore = (data) => {
  return dispacth => {
    let formData = new FormData();
    formData.append('file', data.file);
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