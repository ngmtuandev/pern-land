import axios from "axios";

const instanceAxios = axios.create({
    baseURL: import.meta.env.VITE_URL_SERVER,
});

// Add a request interceptor
instanceAxios.interceptors.request.use(function (config) {

    let token = window.localStorage.getItem('land_user');
    if (token) token = JSON.parse(token);
    if (token?.state?.token) config.headers = {
        Authorization: `Bearer ${token?.state?.token}`
      }
    

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
instanceAxios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response?.data;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

export default instanceAxios;