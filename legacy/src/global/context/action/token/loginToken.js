import {
  TOKEN_ERROR,
  TOKEN_LOADING,
  TOKEN_SUCCESS,
  TOKEN_LOGOUT,
} from "../../ActionTypes";
import axiosInstance from "../../../../global/helpers/axiosInstance";

export const wsPostTokenEncriptado = (token) => (dispatch) => {
  dispatch({
    type: TOKEN_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .post(`login/encriptado`, token)
      .then((res) => {
        let data = {
          ...res.data,
          origen: "tokenURL",
        };
        dispatch({
          type: TOKEN_SUCCESS,
          payload: data,
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
          type: TOKEN_ERROR,
          payload:
            err.response !== undefined
              ? err.response.data
              : errorMessageDefault,
        });
      });
  });
};

export const wsPostTokenEncriptadoNew = (token, nextStep) => (dispatch) => {
  dispatch({
    type: TOKEN_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .post(`login/encriptadoNew`, token)
      .then((res) => {
        let data = {
          ...res.data,
          origen: "tokenURL",
        };
        dispatch({
          type: TOKEN_SUCCESS,
          payload: data,
        });
        //test nextstep
        nextStep(true, data);
      })
      .catch((err) => {
        let errorMessageDefault = {
          isSuccess: false,
          error: {
            errorMessage: "No se pudo establacer conexión con el servidor",
          },
        };
        dispatch({
          type: TOKEN_ERROR,
          payload:
            err.response !== undefined
              ? err.response.data
              : errorMessageDefault,
        });
        //test nextstep
        nextStep(
          false,
          err.response !== undefined ? err.response.data : errorMessageDefault
        );
      });
  });
};

export const loginTokenReset = () => (dispatch) => {
  dispatch({
    type: TOKEN_LOGOUT,
  });
};
