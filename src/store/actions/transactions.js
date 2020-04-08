import http  from '../../instances/http';

export const getTransactions = () => {
  return dispatch => {
    return http.get('loyalty/transaction?api_token=' + localStorage.getItem('access_token'))
      .then(response => {
        dispatch({
          type: "SET_TRANSACTIONS",
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: "SET_TRANSACTIONS",
          payload: error.data
        });
      });
  }
};