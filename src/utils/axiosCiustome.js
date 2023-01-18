import axios from "axios";
import NProgress from "nprogress";
NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
});
const instance = axios.create({
  baseURL: "http://localhost:3000",
});
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    NProgress.start();
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    NProgress.done();

    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    NProgress.done();

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
export default instance;
