import {
    ESTUDIO_LOADING,
    ESTUDIO_ERROR,
    ESTUDIO_SUCCESS,
    ESTUDIO_RESET
  } from "../../ActionTypes";
  
  import axiosInstance from "../../../../global/helpers/axiosInstance";
  
  export const wsGetEstudio = () => (dispatch) => {
    dispatch({
      type: ESTUDIO_LOADING,
    });
  
    axiosInstance().then((respuesta) => {
      respuesta
        .get(`estudio`) // (COMBO DE TIPOS DE ESTUDIOS)
        .then((res) => {
          dispatch({
            type: ESTUDIO_SUCCESS,
            payload: res.data,
          });
        })
        .catch((err) => {
          let error = {
            detail: err.response
              ? err.response.data
              : "Error al contactar el server.",
          };
  
          dispatch({
            type: ESTUDIO_ERROR,
            payload: error,
          });
        });
    });
  };
  
  export const resetEstudio = () => (dispatch) => {
    dispatch({
      type: ESTUDIO_RESET,
    });
  };