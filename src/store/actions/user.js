import http from '../../instances/http';


export const getProfile = () => {
  return dispatch => {
    return http.get('user/me?api_token=' + localStorage.getItem('access_token'))
      .then(response => {
        dispatch({
          type: "SET_USER",
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: "SET_USER",
          payload: error.data
        });
      });
  };
};

export const updateProfile = (data) => {
  return dispatch => {
    return http.put('user/me?api_token=' + localStorage.getItem('access_token'), data)
      .then(response => {
        dispatch({
          type: "UPDATE_USER",
          payload: response.data
        });    
      })
      .catch(error => {
        dispatch({
          type: "UPDATE_USER",
          payload: error.data
        });
      });
  };
};