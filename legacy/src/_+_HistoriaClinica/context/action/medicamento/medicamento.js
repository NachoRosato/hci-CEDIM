import {
  MEDICAMENTO_LOADING,
  MEDICAMENTO_ERROR,
  MEDICAMENTO_SUCCESS,
  MEDICAMENTO_RESET,
} from "../../ActionTypes";

import axiosInstance from "../../../../global/helpers/axiosInstance";

export const wsGetMedicamentos = (idUsuario) => (dispatch) => {
  dispatch({
    type: MEDICAMENTO_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .get(`medicamento/${idUsuario}`) // (MEDICAMENTOS QUE TOMARIA)
      .then((res) => {
        dispatch({
          type: MEDICAMENTO_SUCCESS,
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
          type: MEDICAMENTO_ERROR,
          payload:
            err.response !== undefined
              ? err.response.data
              : errorMessageDefault,
        });
      });
  });
};

export const setMedicamentosCtx = (data) => (dispatch) => {
  dispatch({
    type: MEDICAMENTO_SUCCESS,
    payload: data,
  });
};

export const resetMedicamentos = () => (dispatch) => {
  dispatch({
    type: MEDICAMENTO_RESET,
  });
};
