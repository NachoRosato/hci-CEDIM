import {
    ABREVIATURA_LOADING,
    ABREVIATURA_ERROR,
    ABREVIATURA_SUCCESS,
  } from "../../ActionTypes";
  
  import axiosInstance from "../../../../global/helpers/axiosInstance";
  
  export const wsGetAbreviaturas = () => (dispatch) => {
    dispatch({
      type: ABREVIATURA_LOADING,
    });
  
    axiosInstance().then((respuesta) => {
      respuesta
        .get(`abreviatura`) // (son las abreviaciones de los motivos de consulta)
        .then((res) => {
          dispatch({
            type: ABREVIATURA_SUCCESS,
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
            type: ABREVIATURA_ERROR,
            payload: error,
          });
        });
    });
  };