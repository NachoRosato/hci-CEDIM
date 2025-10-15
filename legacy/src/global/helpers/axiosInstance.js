import axios from "axios";
let flgBackend = null;
let baseUrl;

const axiosInstance = async (history = null) => {
  //freno multiples llamados al config
  if (flgBackend === null) {
    baseUrl = await fetch(`/config.json?v=${new Date().getTime()}`);
    baseUrl = await baseUrl.json();
    baseUrl = baseUrl.REACT_APP_BACKEND_URL;
    flgBackend = true;
  }

  let headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    Accept: "application/json",
  };

  if (sessionStorage.token) {
    headers.Authorization = `Bearer ${sessionStorage.token}`;
  }

  const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers,
  });

  axiosInstance.interceptors.response.use(
    (response) =>
      new Promise((resolve, _reject) => {
        resolve(response);
      }),
    (error) => {
      if (!error.response) {
        return new Promise((_resolve, reject) => {
          reject(error);
        });
      }

      if (error.response.status === 403 || error.response.status === 401) {
        // let path = window.location.pathname;
        // if (history) {
        //   if (path !== "/") history.push("/");
        // } else {
        //   if (path !== "/") window.location = "/";
        // }
      } else {
        return new Promise((_resolve, reject) => {
          reject(error);
        });
      }
    }
  );
  return axiosInstance;
};

export default axiosInstance;
