import {
  VADEMECUM_LOADING,
  VADEMECUM_SUCCESS,
  VADEMECUM_ERROR,
  VADEMECUM_TIPO,
  VADEMECUMBYID_LOADING,
  VADEMECUMBYID_SUCCESS,
  VADEMECUMBYID_ERROR,
  VADEMECUMBYID_RESET,
  VADEMECUM_RESET,
} from "../../ActionTypes";

import axiosInstance from "../../../../global/helpers/axiosInstance";

export const wsGetVademecum = () => (dispatch) => {
  dispatch({
    type: VADEMECUM_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .get(`Vademecum/`)
      .then((res) => {
        dispatch({
          type: VADEMECUM_SUCCESS,
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
          type: VADEMECUM_ERROR,
          payload:
            err.response !== undefined
              ? err.response.data
              : errorMessageDefault,
        });
      });
  });
};

export const setVademecumCtx = (data) => (dispatch) => {
  dispatch({
    type: VADEMECUM_SUCCESS,
    payload: data,
  });
};

export const wsGetVademecumByIdKairos = (id) => (dispatch) => {
  dispatch({
    type: VADEMECUMBYID_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .get(`Vademecum/${id}`)
      .then((res) => {
        dispatch({
          type: VADEMECUMBYID_SUCCESS,
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
          type: VADEMECUMBYID_ERROR,
          payload:
            err.response !== undefined
              ? err.response.data
              : errorMessageDefault,
        });
      });
  });
};
export const wsGetVademecumByIdAlfa = (id) => (dispatch) => {
  dispatch({
    type: VADEMECUMBYID_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .get(`Vademecum/alfa/${id}`)
      .then((res) => {
        dispatch({
          type: VADEMECUMBYID_SUCCESS,
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
          type: VADEMECUMBYID_ERROR,
          payload:
            err.response !== undefined
              ? err.response.data
              : errorMessageDefault,
        });
      });
  });
};

export const setTipoVademecumCtx = (data) => (dispatch) => {
  dispatch({
    type: VADEMECUM_TIPO,
    payload: data,
  });
};

export const resetMedicamentoSelected = () => (dispatch) => {
  dispatch({
    type: VADEMECUMBYID_RESET,
  });
};
export const resetVademecum = () => (dispatch) => {
  dispatch({
    type: VADEMECUM_RESET,
  });
};
