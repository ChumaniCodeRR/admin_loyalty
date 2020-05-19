import http from '../../instances/http';

export const getVouchers = (category_id) => {
  return dispatch => {
    return http.get('voucher/all/' + category_id + '?api_token=' + localStorage.getItem('access_token'))
      .then(response => {
        dispatch({
          type: "SET_VOUCHERS",
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: "SET_VOUCHERS",
          payload: error.data
        });
      });
  };
};

export const getVoucher = (id) => {
  return dispatch => {
    return http.get('voucher/get/' + id + '?api_token=' + localStorage.getItem('access_token'))
      .then(response => {
        dispatch({
          type: "SET_VOUCHER",
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: "SET_VOUCHER",
          payload: error.data
        });
      });
  };
};

export const storeVoucher = (data) => {
  return dispatch => {
    return http.post('voucher?api_token=' + localStorage.getItem('access_token'), {
        voucher_category_id: data.voucher_category_id,
        voucher_type_id: data.voucher_type_id,
        voucher_discount_type_id: data.voucher_discount_type_id,
        cell_number: data.cell_number ?? null,
        name: data.name ?? null,
        product_code: data.product_code ?? null,
        discount_amount: data.discount_amount ?? 0,
        discount_percent: data.discount_percent ?? 0,
        expires_at: data.expires_at,
        send_sms: data.send_sms
      })
      .then(response => {
        dispatch({
          type: "STORE_VOUCHER",
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: "STORE_VOUCHER",
          payload: error.data
        });
      });
  };
};

export const updateVoucher = (id, data) => {
  return dispatch => {
    return http.put('voucher/' + id + '?api_token=' + localStorage.getItem('access_token'), {
        voucher_category_id: data.voucher_category_id,
        voucher_type_id: data.voucher_type_id,
        voucher_discount_type_id: data.voucher_discount_type_id,
        cell_number: data.cell_number ?? null,
        name: data.name ?? null,
        product_code: data.product_code ?? null,
        discount_amount: data.discount_amount ?? 0,
        discount_percent: data.discount_percent ?? 0,
        expires_at: data.expires_at,
        send_sms: data.send_sms
      })
      .then(response => {
        dispatch({
          type: "UPDATE_VOUCHER",
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: "UPDATE_VOUCHER",
          payload: error.data
        });
      });
  };
};

export const deleteVoucher = (id) => {
  return dispatch => {
    return http.delete('voucher/' + id + '?api_token=' + localStorage.getItem('access_token'))
      .then(response => {
        dispatch({
          type: "DELETE_VOUCHER",
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: "DELETE_VOUCHER",
          payload: error.data
        });
      });
  };
};

export const importVouchers = (data) => {
  return dispatch => {
    let formData = new FormData();
    formData.append('file', data.file);
    formData.append('voucher_category_id', data.voucher_category_id);

    return http.post('voucher/import/store?api_token=' + localStorage.getItem('access_token'), formData, {
        headers: {
          'Content-Type' : 'multipart/form-data'
        }
      })
      .then(response => {
        dispatch({
          type: "STORE_VOUCHER",
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: "STORE_VOUCHER",
          payload: error.data
        });
      });
  };
};

export const storeBulkVouchers = (data) => {
  return dispatch => {
    return http.post('voucher/bulk?api_token=' + localStorage.getItem('access_token'), {
        voucher_category_id: data.voucher_category_id,
        number_of_vouchers: data.number_of_vouchers,
        voucher_discount_type_id: data.voucher_discount_type_id,
        product_code: data.product_code ?? null,
        discount_amount: data.discount_amount ?? 0,
        discount_percent: data.discount_percent ?? 0,
        expires_at: data.expires_at,
        voucher_type_id: data.voucher_type_id
      })
      .then(response => {
        dispatch({
          type: "STORE_VOUCHER",
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: "STORE_VOUCHER",
          payload: error.data
        });
      });
  };
};

export const exportVouchers = (category_id) => {
  return dispatch => {
    return http.post('voucher/export/' + category_id + '?api_token=' + localStorage.getItem('access_token'))
      .then(response => {
        dispatch({
          type: "EXPORT_VOUCHER",
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: "EXPORT_VOUCHER",
          payload: error.data
        });
      });
  };
};