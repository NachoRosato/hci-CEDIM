import {
  EVOLUCION_LOADING,
  EVOLUCION_GUARDAREVO,
  EVOLUCION_PREIMPRESION,
  EVOLUCION_DATOS,
  EVOLUCION_HISTORICAS,
  EVOLUCION_FILTROSTL,
  EVOLUCION_SETFILTROSTL,
  EVOLUCION_HCXPDF,
  EVOLUCION_ERROR,
  EVOLUCION_EDITAEVO,
  EVOLUCION_RESETEDITAEVO,
  EVOLUCION_CREARHTML,
  EVOLUCION_RESETEVO,
  EVOLUCION_RESETGUARDAREVO,
  EVOLUCION_RESET,
  EVOLUCION_RESETHISTORICAS,
  EVOLUCION_SETHISTORICAS,
  EVOLUCION_RESET_DATOS,
  EVOLUCION_RESETHCXPDF,
  EVOLUCION_RESETPREIMPRESION,
} from "../../ActionTypes";

import axiosInstance from "../../../../global/helpers/axiosInstance";

export const wsPostGuardarEvolucion = (dtoAtendido) => (dispatch) => {
  dispatch({
    type: EVOLUCION_LOADING,
  });
  axiosInstance().then((respuesta) => {
    respuesta
      .post("/evolucion/guardar", dtoAtendido) // guardar la evolucion
      .then((res) => {
        dispatch({
          type: EVOLUCION_GUARDAREVO,
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
          type: EVOLUCION_ERROR,
          payload:
            err.response !== undefined
              ? err.response.data
              : errorMessageDefault,
        });
      });
  });
};

export const wsPostPreImpresion = (dtoAtendido) => (dispatch) => {
  dispatch({
    type: EVOLUCION_LOADING,
  });
  axiosInstance().then((respuesta) => {
    respuesta
      .post("/evolucion/guardar/true", dtoAtendido) // guardar la evolucion
      .then((res) => {
        dispatch({
          type: EVOLUCION_PREIMPRESION,
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
          type: EVOLUCION_ERROR,
          payload:
            err.response !== undefined
              ? err.response.data
              : errorMessageDefault,
        });
      });
  });
};

export const wsGetEvolucionHistoricas =
  (idPaciente, idUsuario, sinTags, filtroFecha, nextStep) => (dispatch) => {
    dispatch({
      type: EVOLUCION_LOADING,
    });

    axiosInstance().then((respuesta) => {
      respuesta
        .get(
          `evolucion/getLineaDeTiempo/${idPaciente}/${idUsuario}/${sinTags}/${filtroFecha}`
        )

        .then((res) => {
          dispatch({
            type: EVOLUCION_HISTORICAS,
            payload: res.data,
          });
          if (nextStep) nextStep(true);
        })
        .catch((err) => {
          let errorMessageDefault = {
            isSuccess: false,
            error: {
              errorMessage: "No se pudo establacer conexión con el servidor",
            },
          };
          dispatch({
            type: EVOLUCION_ERROR,
            payload:
              err.response !== undefined
                ? err.response.data
                : errorMessageDefault,
          });
        });
    });
  };

export const wsGetFiltrosTimeLine =
  (idPaciente, idUsuario, sinTags, filtroFecha) => (dispatch) => {
    dispatch({
      type: EVOLUCION_LOADING,
    });

    axiosInstance().then((respuesta) => {
      respuesta
        .get(`evolucion/getFiltrosTimeLine/${idPaciente}/${idUsuario}`)

        .then((res) => {
          dispatch({
            type: EVOLUCION_FILTROSTL,
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
            type: EVOLUCION_ERROR,
            payload:
              err.response !== undefined
                ? err.response.data
                : errorMessageDefault,
          });
        });
    });
  };

export const wsGetHcXPdf =
  (
    dni,
    strFechaDesde,
    strFechaHasta,
    idEspecialidad,
    idMedico,
    idCentro,
    checkTalon
  ) =>
  (dispatch) => {
    dispatch({
      type: EVOLUCION_LOADING,
    });

    axiosInstance().then((respuesta) => {
      respuesta
        .get(
          `evolucion/pdf/${dni}/${strFechaDesde}/${strFechaHasta}/${idEspecialidad}/${idMedico}/${idCentro}/${checkTalon}`
        )
        .then((res) => {
          dispatch({
            type: EVOLUCION_HCXPDF,
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
            type: EVOLUCION_ERROR,
            payload:
              err.response !== undefined
                ? err.response.data
                : errorMessageDefault,
          });
        });
    });
  };

export const wsGetDatosEvolucionById = (idEvolucion) => (dispatch) => {
  dispatch({
    type: EVOLUCION_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .get(`evolucion/getDatos/${idEvolucion}`)

      .then((res) => {
        dispatch({
          type: EVOLUCION_DATOS,
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
          type: EVOLUCION_ERROR,
          payload:
            err.response !== undefined
              ? err.response.data
              : errorMessageDefault,
        });
      });
  });
};
export const wsGetAntecedentesByPacId = (idPac) => (dispatch) => {
  dispatch({
    type: EVOLUCION_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .get(`evolucion/getAntecedentes/${idPac}`)

      .then((res) => {
        dispatch({
          type: EVOLUCION_DATOS,
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
          type: EVOLUCION_ERROR,
          payload:
            err.response !== undefined
              ? err.response.data
              : errorMessageDefault,
        });
      });
  });
};

export const setEvolucionActualCtx = (data) => (dispatch) => {
  dispatch({
    type: EVOLUCION_DATOS,
    payload: data,
  });
};

export const setEvolucionHistoricasCtx = (data) => (dispatch) => {
  dispatch({
    type: EVOLUCION_SETHISTORICAS,
    payload: data,
  });
};

export const setFiltrosTLCtx = (data) => (dispatch) => {
  dispatch({
    type: EVOLUCION_SETFILTROSTL,
    payload: data,
  });
};

export const wsGetCreaerEvoHTML = (idTurno) => (dispatch) => {
  dispatch({
    type: EVOLUCION_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .get(`evolucion/crearHtml/${idTurno}`) // (crea un objetoEvo a partir de un idturno)
      .then((res) => {
        dispatch({
          type: EVOLUCION_CREARHTML,
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
          type: EVOLUCION_ERROR,
          payload:
            err.response !== undefined
              ? err.response.data
              : errorMessageDefault,
        });
      });
  });
};

export const editarEvolucion = (evolucioAEditar) => (dispatch) => {
  dispatch({
    type: EVOLUCION_EDITAEVO,
    payload: evolucioAEditar,
  });
};
export const resetEditarEvo = () => (dispatch) => {
  dispatch({
    type: EVOLUCION_RESETEDITAEVO,
  });
};

export const resetEvolucion = () => (dispatch) => {
  dispatch({
    type: EVOLUCION_RESETEVO,
  });
};

export const resetGuardarEvo = () => (dispatch) => {
  dispatch({
    type: EVOLUCION_RESETGUARDAREVO,
  });
};

export const resetHistoricas = () => (dispatch) => {
  dispatch({
    type: EVOLUCION_RESETHISTORICAS,
  });
};

export const resetEvo = () => (dispatch) => {
  dispatch({
    type: EVOLUCION_RESET,
  });
};

export const resetEvoActual = () => (dispatch) => {
  dispatch({
    type: EVOLUCION_RESET_DATOS,
  });
};

export const resetHcXPdf = () => (dispatch) => {
  dispatch({
    type: EVOLUCION_RESETHCXPDF,
  });
};

export const resetPreImpresion = () => (dispatch) => {
  dispatch({
    type: EVOLUCION_RESETPREIMPRESION,
  });
};
