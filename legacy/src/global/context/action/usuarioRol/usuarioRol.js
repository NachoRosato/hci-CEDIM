import axiosInstance from "../../../helpers/axiosInstance";
import {
  USUARIOROL_ERROR,
  USUARIOROL_LOADING,
  USUARIOROL_SUCCESS,
  USUARIOROL_ITEMEDITADO,
} from "../../ActionTypes";

export const wsGetRolUsuario = (usuario) => (dispatch) => {
  dispatch({
    type: USUARIOROL_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .get(`/rolderecho/${usuario}`)
      .then((res) => {
        dispatch({
          type: USUARIOROL_SUCCESS,
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
          type: USUARIOROL_ERROR,
          payload:
            err.response !== undefined
              ? err.response.data
              : errorMessageDefault,
        });
      });
  });
};

export const editaRoll = (data) => (dispatch) => {
  dispatch({
    type: USUARIOROL_ITEMEDITADO,
    payload: data,
  });
};
