import {
  AUDITORIA_LOADING,
  AUDITORIA_ERROR,
  AUDITORIA_MANUALES,
  AUDITORIA_SETMANUALES,
} from "../../ActionTypes";

import axiosInstance from "../../../../global/helpers/axiosInstance";

export const wsGetAudDiagManuales = () => (dispatch) => {
  dispatch({
    type: AUDITORIA_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .get(`motivoevolucion/manuales`) // (son las abreviaciones de los motivos de consulta)
      .then((res) => {
        dispatch({
          type: AUDITORIA_MANUALES,
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
          type: AUDITORIA_ERROR,
          payload: error,
        });
      });
  });
};

export const setAudManualesCtx = (payload) => (dispatch) => {
  dispatch({
    type: AUDITORIA_SETMANUALES,
    payload: payload,
  });
};
