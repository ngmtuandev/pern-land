import axios from "axios";

const instanceAxios = axios.create({
  baseURL: import.meta.env.VITE_URL_SERVER,
});

interface TokenState {
  state: {
    token: string;
  };
}

instanceAxios.interceptors.request.use(
  function (config) {
    let token = window.localStorage.getItem("land_user");
    if (token) {
      const parsedToken: TokenState = JSON.parse(token);
      if (parsedToken?.state?.token) {
        config.headers.Authorization = `Bearer ${parsedToken.state.token}`;
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instanceAxios.interceptors.response.use(
  function (response) {
    return response?.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instanceAxios;
