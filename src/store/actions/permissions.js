import http from '../../instances/http';

export const getPermissions = () => {
  return dispatch => {
    return http.get('role/permissions?api_token=' + localStorage.getItem('access_token'))
      .then(response => {
        dispatch({
          type: "SET_PERMISSIONS",
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: "SET_PERMISSIONS",
          payload: error.data
        });
      });
  }
};
