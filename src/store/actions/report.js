import http from '../../instances/http';

export const getClientReport = (user_id) => {
  return dispatch => {
    return http.get('dashboard/client/' + user_id + '?api_token=' + localStorage.getItem('access_token'))
      .then(response => {
        dispatch({
          type: "SET_PAYLOAD",
          payload: response.data
        }); 
      })
      .catch(error => {
        dispatch({
          type: "SET_PAYLOAD",
          payload: error.data
        }); 
      });
  }
}