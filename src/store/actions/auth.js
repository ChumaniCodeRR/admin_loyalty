import http from "../../instances/http";

export const login = (data) => {
  return dispatch => {
    return http.post('auth/login', data)
      .then(response => {
        dispatch({
          type: "SET_LOGGED_IN_USER",
          payload: response.data
        });
        if(response.data.success === true) {
          localStorage.setItem('access_token', response.data.data.token);
        }
      })
      .catch(error => {
        console.log(error.data);
        dispatch({
          type: "SET_LOGGED_IN_USER",
          payload: error.data
        });
      });
  };
};

export const resetPassword = (email) => {
  return dispatch => {
    return http.post('auth/password/reset', { email: email })
      .then(response => {
        dispatch({
          type: "RESET_PASSWORD",
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: "RESET_PASSWORD",
          payload: error.data
        });
      });
  };
};