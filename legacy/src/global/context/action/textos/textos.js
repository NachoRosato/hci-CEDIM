import axiosInstance from "../../../helpers/axiosInstance";
import { TEXTOS_ERROR, TEXTOS_LOADING, TEXTOS_SUCCESS } from "../../ActionTypes";

  
  export const wsGetTextos = () => (dispatch) => {
    dispatch({
      type: TEXTOS_LOADING,
    });
  
    axiosInstance().then((respuesta) => {
      respuesta
        .get("/texto/GetAll")
        .then((res) => {
          dispatch({
            type: TEXTOS_SUCCESS,
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
            type: TEXTOS_ERROR,
            payload: error,
          });
        });
    });
  };