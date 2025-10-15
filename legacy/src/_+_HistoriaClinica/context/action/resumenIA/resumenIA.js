import {
  RESUMENIA_LOADING,
  RESUMENIA_ERROR,
  RESUMENIA_SUCCESS,
  RESUMENIA_RESET,
} from "../../ActionTypes";

import axiosInstance from "../../../../global/helpers/axiosInstance";

export const wsGetResumenIA = (idPaciente) => (dispatch) => {
  dispatch({
    type: RESUMENIA_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .get(`evolucion/resumenIA/${idPaciente}`)
      .then((res) => {
        dispatch({
          type: RESUMENIA_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        let errorMessageDefault = {
          isSuccess: false,
          error: {
            errorMessage: "No se pudo establacer conexión con el servidor",
          },
        };
        dispatch({
          type: RESUMENIA_ERROR,
          payload:
            err.response !== undefined
              ? err.response.data
              : errorMessageDefault,
        });
      });
  });
};

export const resetResumenIA = () => (dispatch) => {
  dispatch({
    type: RESUMENIA_RESET,
  });
};
