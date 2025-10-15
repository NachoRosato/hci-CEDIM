import axios from "axios";

let flgBackend = null;
let baseUrl;

const axiosSnomed = async (history = null) => {
  //freno multiples llamados al config
  if (flgBackend === null) {
    baseUrl = await fetch(`/config.json?v=${new Date().getTime()}`);
    baseUrl = await baseUrl.json();
    baseUrl = baseUrl.REACT_APP_SNOMED_URL;
    flgBackend = true;
  }

  // Detectar el idioma preferido del usuario o usar uno por defecto
  let userLanguage = navigator.language || "en"; // Idioma del navegador
  let supportedLanguages = [
    "en", // Inglés
    "es", // Español
    "en-X-900000000000509007",
    "en-X-900000000000508004",
  ];

  // Si el idioma no está soportado, usa inglés por defecto
  if (!supportedLanguages.includes(userLanguage)) {
    userLanguage = "en";
  }

  let headers = {
    "Accept-Language": userLanguage,
    Accept: "application/json",
    Cookie:
      "_gcl_au=1.1.631070686.1699048012; _ga=GA1.1.1513533915.1699048012; licenseCookie=true; _iub_cs-46600952=%7B%22timestamp%22%3A%222023-11-17T19%3A18%3A50.084Z%22%2C%22version%22%3A%221.44.8%22%2C%22purposes%22%3A%7B%221%22%3Atrue%2C%224%22%3Atrue%7D%2C%22id%22%3A46600952%2C%22cons%22%3A%7B%22rand%22%3A%22ddf99c%22%7D%7D; _ga_MFCMKEHSYB=GS1.1.1700256496.3.0.1700256496.0.0.0",
  };

  if (sessionStorage.token) {
    // headers.Authorization = `Bearer ${sessionStorage.token}`;
  }

  const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: headers,
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

export default axiosSnomed;
