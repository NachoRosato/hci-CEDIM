import axiosInstance from "../../../helpers/axiosInstance";
import {
  LOGIN_ERROR,
  LOGIN_LOADING,
  LOGIN_SETUSUARIO,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGIN_AGENDA,
} from "../../ActionTypes";

export const login =
  ({ txtUsuario, txtPassword }) =>
  (dispatch) => {
    dispatch({
      type: LOGIN_LOADING,
    });

    axiosInstance().then((respuesta) => {
      respuesta

        .post("/login", {
          clave: txtPassword,
          usuario: txtUsuario,
        })
        .then((res) => {
          sessionStorage.token = res.data.value.token;
          dispatch({
            type: LOGIN_SUCCESS,
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
            type: LOGIN_ERROR,
            payload:
              err.response !== undefined
                ? err.response.data
                : errorMessageDefault,
          });
        });
    });
  };

export const logoutAuth = () => (dispatch) => {
  dispatch({ type: LOGOUT_USER });
  sessionStorage.token = null;
};

export const setUserByToken = (data) => (dispatch) => {
  dispatch({ type: LOGIN_AGENDA, payload: data });
};
