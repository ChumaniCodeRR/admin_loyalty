import http  from '../../instances/http';

export const getTransactions = (client_id = null) => {
  return dispatch => {
    let url = 'loyalty/transaction/all?api_token=';
    if (client_id) {
      url = 'loyalty/transaction/all/' + client_id + '?api_token=';
    }
    return http.get(url + localStorage.getItem('access_token'))
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

export const getMemberTransactions = (cell_number, client_id = null) => {
  return dispatch => {
    let url = 'loyalty/transaction/member/' + cell_number + '?api_token=' + localStorage.getItem('access_token');
    if (client_id) {
      url = url + '&account_id=' + client_id;
    }
    return http.get(url)
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
  };
} ;