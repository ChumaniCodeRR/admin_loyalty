import axios from 'axios';

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});
http.defaults.baseURL = process.env.REACT_APP_API_URL;
http.defaults.headers.common['Accept'] = 'application/json';
http.defaults.headers.common['Content-Type'] = 'application/json';
http.interceptors.response.use(response => {
  return response;
}, error => {
  if ((error.response === undefined) || (error.response.status === 401)) {
    localStorage.removeItem('access_token');
  }
  return Promise.reject(error.response);
});

export default http;
