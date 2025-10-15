import axiosInstance from "global/helpers/axiosInstance";
import {
  EXAMEN_LOADING,
  EXAMEN_SUCCESS,
  EXAMEN_ERROR,
  EXAMEN_RESET,
  EXAMEN_SETCONTEXT,
} from "../../ActionTypes";

export const wsGetExamen = (especialidad) => (dispatch) => {
  dispatch({
    type: EXAMEN_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .get(`/examen/${especialidad}`)
      .then((res) => {
        dispatch({
          type: EXAMEN_SUCCESS,
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
          type: EXAMEN_ERROR,
          payload:
            err.response !== undefined
              ? err.response.data
              : errorMessageDefault,
        });
      });
  });
};

export const setExamenFisicoCtx = (data) => (dispatch) => {
  dispatch({
    type: EXAMEN_SETCONTEXT,
    payload: data,
  });
};

export const resetExamen = () => (dispatch) => {
  dispatch({
    type: EXAMEN_RESET,
  });
};
