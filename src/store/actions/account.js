import http  from '../../instances/http';

export const getAccount = (client_id = null) => {
  return dispatch => {
    let url = 'loyalty?api_token=';
    if (client_id) {
      url = 'loyalty/' + client_id + '?api_token=';
    }
    return http.get(url + localStorage.getItem('access_token'))
      .then(response => {
        dispatch ({
          type: "SET_ACCOUNT",
          payload: response.data
        });
      })
      .catch(error => {
        dispatch ({
          type: "SET_ACCOUNT",
          payload: error.data
        });
      });
  };
};

export const updateAccount = (data, client_id = null) => {
  return dispatch => {
    let url = 'loyalty?api_token=';
    if (client_id) {
      url = 'loyalty/' + client_id + '?api_token=';
    }
    return http.put( url + localStorage.getItem('access_token'), data)
      .then(response => {
        dispatch ({
          type: "UPDATE_ACCOUNT",
          payload: response.data
        });
      })
      .catch(error => {
        dispatch ({
          type: "UPDATE_ACCOUNT",
          payload: error.data
        });
      });
  };
};

export const changeLogo = (data, client_id = null) => {
  return dispatch => {
    let url = 'loyalty?api_token=';
    if (client_id) {
      url = 'loyalty/' + client_id + '?api_token=';
    }
    let formData = new FormData();
    formData.append('logo', data.logo);
    return http.post(url + localStorage.getItem('access_token'), formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      dispatch ({
        type: "UPDATE_ACCOUNT",
        payload: response.data
      });
    })
    .catch(error => {
      dispatch ({
        type: "UPDATE_ACCOUNT",
        payload: error.data
      });
    });
  };
};

export const getAccountById = (account_id) => {
  return dispatch => {
    return http.get('client/get/' + account_id + '?api_token=' + localStorage.getItem('access_token'))
      .then(response => {
        dispatch({
          type: "SET_ACCOUNT",
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: "SET_ACCOUNT",
          payload: error.data
        });
      })
  }
};