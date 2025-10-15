import {
  DIAGNOSTICO_LOADING,
  DIAGNOSTICO_ERROR,
  DIAGNOSTICO_SUCCESS,
  DIAGBYNAME_SUCCESS,
  DIAGBYNAME_SETDATA,
  DIAGNOSTICO_SETDATA,
} from "../../ActionTypes";

import axiosInstance from "../../../../global/helpers/axiosInstance";

export const wsGetDiagnosticos = () => (dispatch) => {
  dispatch({
    type: DIAGNOSTICO_LOADING,
  });
  axiosInstance().then((respuesta) => {
    respuesta
      .get(`diagnostico`) // (COMBOS DE DIAGNOSTICOS LOCALES).
      .then((res) => {
        dispatch({
          type: DIAGNOSTICO_SUCCESS,
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
          type: DIAGNOSTICO_ERROR,
          payload:
            err.response !== undefined
              ? err.response.data
              : errorMessageDefault,
        });
      });
  });
};

export const setDiagnosticosDataCtx = (data) => (dispatch) => {
  dispatch({
    type: DIAGNOSTICO_SETDATA,
    payload: data,
  });
};

export const wsGetDiagByName = (searchTerm) => (dispatch) => {
  dispatch({
    type: DIAGNOSTICO_LOADING,
  });

  axiosInstance()
    .then((axios) => {
      axios
        .get(`diagnostico/search`, { params: { searchTerm } }) // Uso de params en lugar de ruta dinámica
        .then((res) => {
          dispatch({
            type: DIAGBYNAME_SUCCESS,
            payload: res.data,
          });
        })
        .catch((err) => {
          let errorMessageDefault = {
            isSuccess: false,
            error: {
              errorMessage: "No se pudo establecer conexión con el servidor",
            },
          };
          dispatch({
            type: DIAGNOSTICO_ERROR,
            payload: err.response ? err.response.data : errorMessageDefault,
          });
        });
    })
    .catch(() => {
      dispatch({
        type: DIAGNOSTICO_ERROR,
        payload: {
          isSuccess: false,
          error: {
            errorMessage: "Error al inicializar la instancia de Axios",
          },
        },
      });
    });
};

export const setDiagByNameCtx = (data) => (dispatch) => {
  dispatch({
    type: DIAGBYNAME_SETDATA,
    payload: data,
  });
};
