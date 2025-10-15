import {
  HCDIGIT_ERROR,
  HCDIGIT_LOADING,
  HCDIGIT_PDFOK,
  HCDIGIT_LISTOK,
} from "../../ActionTypes";

import axiosInstance from "../../../../global/helpers/axiosInstance";

export const wsGetHcDigitalizada = (idpaciente, nextStep) => (dispatch) => {
  dispatch({
    type: HCDIGIT_LOADING,
  });
  axiosInstance().then((respuesta) => {
    respuesta
      .get(`digitalizada/${idpaciente}`) // (son las abreviaciones de los motivos de consulta)
      .then((res) => {
        dispatch({
          type: HCDIGIT_LISTOK,
          payload: res.data,
        });
        if (nextStep) nextStep(true, res.data);
      })
      .catch((err) => {
        let error = {
          detail: err.response
            ? err.response.data
            : "Error al contactar el server.",
        };
        dispatch({
          type: HCDIGIT_ERROR,
          payload: error,
        });
        if (nextStep) nextStep(false, error);
      });
  });
};

export const wsGetPfdHcDigitalizada =
  (idpaciente, zipName, nextStep) => (dispatch) => {
    dispatch({
      type: HCDIGIT_LOADING,
    });
    axiosInstance().then((respuesta) => {
      respuesta
        .get(`paciente/hcDigitalizadaPdf/${idpaciente}/${zipName}`) // (son las abreviaciones de los motivos de consulta)
        .then((res) => {
          dispatch({
            type: HCDIGIT_PDFOK,
            payload: res.data,
          });
          if (nextStep) nextStep(true, res.data);
        })
        .catch((err) => {
          let error = {
            detail: err.response
              ? err.response.data
              : "Error al contactar el server.",
          };
          dispatch({
            type: HCDIGIT_ERROR,
            payload: error,
          });
          if (nextStep) nextStep(false, error);
        });
    });
  };
