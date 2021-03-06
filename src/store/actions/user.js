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

export const createAdmin = (data) => {
  return dispatch => {
    return http.post('auth/register/admin?api_token=' + localStorage.getItem('access_token'), data)
      .then(response => {
        dispatch({
          type: "CREATE_USER",
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: "CREATE_USER",
          payload: error.data
        });
      });
  };
};

export const createClient = (data) => {
  return dispatch => {
    return http.post('auth/register/client?api_token=' + localStorage.getItem('access_token'), data)
      .then(response => {
        dispatch({
          type: "CREATE_USER",
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: "CREATE_USER",
          payload: error.data
        });
      });
  };
};

export const getClients = () => {
  return dispatch => {
    return http.get('client?api_token=' + localStorage.getItem('access_token'))
      .then(response => {
        dispatch({
          type: "SET_USERS",
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: "SET_USERS",
          payload: error.data
        });
      });
  };
};

export const getAdmins = () => {
  return dispatch => {
    return http.get('user/admin/all?api_token=' + localStorage.getItem('access_token'))
    .then(response => {
      dispatch({
        type: "SET_USERS",
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
        type: "SET_USERS",
        payload: error.data
      });
    });
  };
};

export const deleteUser = (id) => {
  return dispatch => {
    return http.delete('user/delete/' + id + '?api_token=' + localStorage.getItem('access_token'))
      .then(response => {
        dispatch({
          type: "DELETE_USER",
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: "DELETE_USER",
          payload: error.data
        });
      });
  };
};

export const getMembers = (account_id = null) => {
  return dispatch => {
    let url = account_id ? 'loyalty/member/all/' + account_id : 'loyalty/member/all';
    return http.get(url + '?api_token=' + localStorage.getItem('access_token'))
      .then(response => {
        dispatch({
          type: "SET_USERS",
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: "SET_USERS",
          payload: error.data
        });
      });
  };
};

export const createManager = (data) => {
  return dispatch => {
    return http.post('auth/register/manager?api_token=' + localStorage.getItem('access_token'), data)
      .then(response => {
        dispatch({
          type: "CREATE_USER",
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: "CREATE_USER",
          payload: error.data
        });
      });
  }
};

export const getManagers = (user_id) => {
  return dispatch => {
    return http.get('manager/all/' + user_id + '?api_token=' + localStorage.getItem('access_token'))
      .then(response => {
        dispatch({
          type: "SET_USERS",
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: "SET_USERS",
          payload: error.data
        });
      });
  };
};

export const getManager = (id) => {
  return dispatch => {
    return http.get('user/get/' + id + '?api_token=' + localStorage.getItem('access_token'))
      .then(response => {
        dispatch({
          type: "SET_MANAGER",
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: "SET_MANAGER",
          payload: error.data
        });
      });
  };
};

export const updateManager = (id, data) => {
  return dispatch => {
    return http.put('manager/update/' + id + '?api_token=' + localStorage.getItem('access_token'), data)
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
}
