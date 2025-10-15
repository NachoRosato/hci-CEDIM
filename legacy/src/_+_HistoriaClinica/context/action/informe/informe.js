import {
  INFORME_LOADING,
  INFORME_ERROR,
  INFORME_INFORMEPDF,
  INFORME_VISORES,
  INFORME_RESETVISOR,
  INFORME_RESETINFORMEPDF,
  INFORME_RESET,
} from "../../ActionTypes";

import axiosInstance from "../../../../global/helpers/axiosInstance";

export const wsGetPdfInforme =
  (tipo, estudio, codigo, conLogo) => (dispatch) => {
    dispatch({
      type: INFORME_LOADING,
    });

    axiosInstance().then((respuesta) => {
      respuesta
        .get(`Informe/GetPdf/${tipo}/${estudio}/${codigo}/${conLogo}`) // (traigo el informe con el base64)
        .then((res) => {
          dispatch({
            type: INFORME_INFORMEPDF,
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
            type: INFORME_ERROR,
            payload:
              err.response !== undefined
                ? err.response.data
                : errorMessageDefault,
          });
        });
    });
  };

export const wsGetVisorImagen = (tipo, estudio, idTurno) => (dispatch) => {
  dispatch({
    type: INFORME_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .get(`Informe/ImagenPacs/${idTurno}/${tipo}/${estudio}`) // (traigo los visores del pacs)
      .then((res) => {
        dispatch({
          type: INFORME_VISORES,
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
          type: INFORME_ERROR,
          payload:
            err.response !== undefined
              ? err.response.data
              : errorMessageDefault,
        });
      });
  });
};

export const wsResetVisorImagen = () => (dispatch) => {
  dispatch({
    type: INFORME_RESETVISOR,
  });
};

export const wsResetInformePdf = () => (dispatch) => {
  dispatch({
    type: INFORME_RESETINFORMEPDF,
  });
};

export const resetInforme = () => (dispatch) => {
  dispatch({
    type: INFORME_RESET,
  });
};
