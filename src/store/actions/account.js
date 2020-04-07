import http  from '../../instances/http';

export const getAccount = () => {
  return dispatch => {
    return http.get('loyalty?api_token=' + localStorage.getItem('access_token'))
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

export const updateAccount = (data) => {
  return dispatch => {
    return http.put('loyalty?api_token=' + localStorage.getItem('access_token'), data)
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

export const changeLogo = (data) => {
  return dispatch => {
    let formData = new FormData();
    formData.append('logo', data.logo);
    return http.post('loyalty?api_token=' + localStorage.getItem('access_token'), formData, {
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