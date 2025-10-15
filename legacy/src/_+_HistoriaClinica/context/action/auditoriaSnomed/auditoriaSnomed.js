import {
  AUDITSNOMED_LOADING,
  AUDITSNOMED_ERROR,
  AUDITSNOMED_TABLELISTOK,
  AUDITSNOMED_SETDATATABLE,
  AUDITSNOMED_REEMPLAZAROK,
  AUDITSNOMED_EVOHTML,
  AUDITSNOMED_RESETAFTEREDIT,
} from "../../ActionTypes";

import axiosInstance from "../../../../global/helpers/axiosInstance";

export const wsGetAuditSnomed = () => (dispatch) => {
  dispatch({
    type: AUDITSNOMED_LOADING,
  });
  axiosInstance().then((respuesta) => {
    respuesta
      .get(`DiagnosEvoSnomed/GetAuditar`) // (COMBOS DE DIAGNOSTICOS a auditar)
      .then((res) => {
        dispatch({
          type: AUDITSNOMED_TABLELISTOK,
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
          type: AUDITSNOMED_ERROR,
          payload:
            err.response !== undefined
              ? err.response.data
              : errorMessageDefault,
        });
      });
  });
};

export const setAudTableListCtx = (payload) => (dispatch) => {
  dispatch({
    type: AUDITSNOMED_SETDATATABLE,
    payload: payload,
  });
};

export const wsGetReemplazarDiagSnomed =
  (idSnomed, endDtoAuditSnomed) => (dispatch) => {
    dispatch({
      type: AUDITSNOMED_LOADING,
    });

    axiosInstance().then((respuesta) => {
      respuesta
        .put(`DiagnosEvoSnomed/${idSnomed}`, endDtoAuditSnomed) // ( Edita un seg por idSeg )
        .then((res) => {
          dispatch({
            type: AUDITSNOMED_REEMPLAZAROK,
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
            type: AUDITSNOMED_ERROR,
            payload:
              err.response !== undefined
                ? err.response.data
                : errorMessageDefault,
          });
        });
    });
  };

export const resetAfterEdit = () => (dispatch) => {
  dispatch({
    type: AUDITSNOMED_RESETAFTEREDIT,
  });
};

export const wsGetAuditSnomedEvoHtml = (id) => (dispatch) => {
  dispatch({
    type: AUDITSNOMED_LOADING,
  });
  axiosInstance().then((respuesta) => {
    respuesta
      .get(`DiagnosEvoSnomed/GetEvoHtml/${id}`) // evohtml
      .then((res) => {
        dispatch({
          type: AUDITSNOMED_EVOHTML,
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
          type: AUDITSNOMED_ERROR,
          payload:
            err.response !== undefined
              ? err.response.data
              : errorMessageDefault,
        });
      });
  });
};
