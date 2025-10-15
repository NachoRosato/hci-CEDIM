import {
    TIPOS_LOADING,
    TIPOS_ERROR,
    TIPOS_SUCCESS,
  } from "../../ActionTypes";
  
  import axiosInstance from "../../../../global/helpers/axiosInstance";
  
  export const wsGetTiposRoll = () => (dispatch) => {
    dispatch({
      type: TIPOS_LOADING,
    });
  
    axiosInstance().then((respuesta) => {
      respuesta
        .get(`tipos`) // (TIPOS DE ROLL? En caso de gaspi salio administrativo y medico)
        .then((res) => {
          dispatch({
            type: TIPOS_SUCCESS,
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
            type: TIPOS_ERROR,
            payload: error,
          });
        });
    });
  };