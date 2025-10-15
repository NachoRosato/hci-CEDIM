import {
  SEGUIMIENTO_LOADING,
  SEGUIMIENTO_ERROR,
  SEGUIMIENTO_IDPAC,
  SEGUIMIENTO_ALL,
  SEGUIMIENTO_SAVE,
  SEGUIMIENTO_EDIT,
  SEGUIMIENTO_EVENTXID,
  SEGUIMIENTO_EVENTSAVE,
  SEGUIMIENTO_UPDATEXID,
  SEGUIMIENTO_SETSEGALL,
  RESET_SEGCTX,
  RESET_EVENTXID,
  RESET_SEGIDPAC,
} from "../../ActionTypes";

import axiosInstance from "../../../../global/helpers/axiosInstance";

export const wsGetSegXIdPac = (idUsuario) => (dispatch) => {
  dispatch({
    type: SEGUIMIENTO_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .get(`seguimiento/${idUsuario}`) // ( se trae los seg por idpac )
      .then((res) => {
        dispatch({
          type: SEGUIMIENTO_IDPAC,
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
          type: SEGUIMIENTO_ERROR,
          payload:
            err.response !== undefined
              ? err.response.data
              : errorMessageDefault,
        });
      });
  });
};

export const wsGetSeguimientosAll = () => (dispatch) => {
  dispatch({
    type: SEGUIMIENTO_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .get(`seguimiento`) // ( getall segumientos )
      .then((res) => {
        dispatch({
          type: SEGUIMIENTO_ALL,
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
          type: SEGUIMIENTO_ERROR,
          payload:
            err.response !== undefined
              ? err.response.data
              : errorMessageDefault,
        });
      });
  });
};

export const setSegAllCtx = (data) => (dispatch) => {
  dispatch({
    type: SEGUIMIENTO_SETSEGALL,
    payload: data,
  });
};

export const wsGetSaveSeguimientos = (entSegPacienteDTO) => (dispatch) => {
  dispatch({
    type: SEGUIMIENTO_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .post(`seguimiento`, entSegPacienteDTO) // ( guarda un seguimiento )
      .then((res) => {
        dispatch({
          type: SEGUIMIENTO_SAVE,
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
          type: SEGUIMIENTO_ERROR,
          payload:
            err.response !== undefined
              ? err.response.data
              : errorMessageDefault,
        });
      });
  });
};

export const wsGetEditSeguimientos = (idSeg, entDtoSegAct) => (dispatch) => {
  dispatch({
    type: SEGUIMIENTO_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .put(`seguimiento/${idSeg}`, entDtoSegAct) // ( Edita un seg por idSeg )
      .then((res) => {
        dispatch({
          type: SEGUIMIENTO_EDIT,
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
          type: SEGUIMIENTO_ERROR,
          payload:
            err.response !== undefined
              ? err.response.data
              : errorMessageDefault,
        });
      });
  });
};

export const wsGetEventXIdSeg = (idSeg) => (dispatch) => {
  dispatch({
    type: SEGUIMIENTO_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .get(`seguimiento/eventos/${idSeg}`) // ( Trae los eventos de un seg x idseg )
      .then((res) => {
        dispatch({
          type: SEGUIMIENTO_EVENTXID,
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
          type: SEGUIMIENTO_ERROR,
          payload:
            err.response !== undefined
              ? err.response.data
              : errorMessageDefault,
        });
      });
  });
};

export const wsGetSaveSegEvent = (entSegPacienteEventoDTO) => (dispatch) => {
  dispatch({
    type: SEGUIMIENTO_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .post(`seguimiento/eventos/`, entSegPacienteEventoDTO) // (  )
      .then((res) => {
        dispatch({
          type: SEGUIMIENTO_EVENTSAVE,
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
          type: SEGUIMIENTO_ERROR,
          payload:
            err.response !== undefined
              ? err.response.data
              : errorMessageDefault,
        });
      });
  });
};

export const wsGetUpdateSegXIdSeg = (idSeg, entEventDtoAct) => (dispatch) => {
  dispatch({
    type: SEGUIMIENTO_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .put(`seguimiento/actualizarEstado/${idSeg}`, entEventDtoAct) // ( luego de tocar 1 item, escribir la obeservacion y tocar guardar y cerrar )
      .then((res) => {
        dispatch({
          type: SEGUIMIENTO_UPDATEXID,
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
          type: SEGUIMIENTO_ERROR,
          payload:
            err.response !== undefined
              ? err.response.data
              : errorMessageDefault,
        });
      });
  });
};

export const resetSegCtx = () => (dispatch) => {
  dispatch({
    type: RESET_SEGCTX,
  });
};

export const resetEventXIdSegCtx = () => (dispatch) => {
  dispatch({
    type: RESET_EVENTXID,
  });
};
export const resetSegXIdPacCtx = () => (dispatch) => {
  dispatch({
    type: RESET_SEGIDPAC,
  });
};
