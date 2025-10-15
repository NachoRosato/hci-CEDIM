import axiosInstance from "../../../helpers/axiosInstance";
import {
  VERSION_PUBLICADA_ERROR,
  VERSION_PUBLICADA_LOADING,
  VERSION_PUBLICADA_RESET,
  VERSION_PUBLICADA_SUCCESS,
} from "../../ActionTypes";

export const wsGetVersionPublicadaHc = () => (dispatch) => {
  dispatch({
    type: VERSION_PUBLICADA_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .get("login/versionPublicada/HC")
      .then((res) => {
        dispatch({
          type: VERSION_PUBLICADA_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        let error = {
          detail: err.response
            ? err.response.data
            : "Error al contactar el server.",
          origen: "portal",
        };

        dispatch({
          type: VERSION_PUBLICADA_ERROR,

          payload: error,
        });
      });
  });
};

export const resetVersion = () => (dispatch) => {
  dispatch({ type: VERSION_PUBLICADA_RESET });
};
