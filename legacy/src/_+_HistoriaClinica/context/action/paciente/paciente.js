import {
  PACIENTE_LOADING,
  PACIENTE_ERROR,
  PACIENTE_BUSCARPAC,
  PACIENTE_ESTUDIOS,
  PACIENTE_INFORMES,
  PACIENTE_DATOCONFIDENCIAL,
  PACIENTE_INFHISTORICO,
  PACIENTE_RESET,
  PACIENTE_RESETESTUDIOS,
  PACIENTE_RESETINFORMES,
  PACIENTE_SETPACIENTEBUSQ,
  PACIENTE_RESET_INFHISTORICO,
  PACIENTE_SETESTUDIOS,
  PACIENTE_SETINFHISTORICO,
  PACIENTE_SETINFORMES,
  PACIENTE_SETDATOCONFIDENCIAL,
} from "../../ActionTypes";

import axiosInstance from "../../../../global/helpers/axiosInstance";

export const wsGetBuscarPacienteNombre = (nombre) => (dispatch) => {
  dispatch({
    type: PACIENTE_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .get(`paciente/nombre/${nombre}`)
      .then((res) => {
        dispatch({
          type: PACIENTE_BUSCARPAC,
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
          type: PACIENTE_ERROR,
          payload:
            err.response !== undefined
              ? err.response.data
              : errorMessageDefault,
        });
      });
  });
};

export const setPacienteSeleccionado = (pacSeleccionado) => (dispatch) => {
  dispatch({
    type: PACIENTE_SETPACIENTEBUSQ,
    payload: pacSeleccionado,
  });
};

export const wsGetBuscarPacienteDni = (dni) => (dispatch) => {
  dispatch({
    type: PACIENTE_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .get(`paciente/documento/${dni}`)
      .then((res) => {
        dispatch({
          type: PACIENTE_BUSCARPAC,
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
          type: PACIENTE_ERROR,
          payload:
            err.response !== undefined
              ? err.response.data
              : errorMessageDefault,
        });
      });
  });
};

export const setDatosPac = (datosPac) => (dispatch) => {
  dispatch({
    type: PACIENTE_BUSCARPAC,
    payload: datosPac,
  });
};

export const wsGetEstudiosPaciente = (dni) => (dispatch) => {
  dispatch({
    type: PACIENTE_LOADING,
  });
  axiosInstance().then((respuesta) => {
    respuesta
      .get(`paciente/estudiosPaciente/${dni}`) // historico de estudios. Tengo un faltante en la url
      .then((res) => {
        dispatch({
          type: PACIENTE_ESTUDIOS,
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
          type: PACIENTE_ERROR,
          payload:
            err.response !== undefined
              ? err.response.data
              : errorMessageDefault,
        });
      });
  });
};

export const resetEstudiosPaciente = () => (dispatch) => {
  dispatch({
    type: PACIENTE_RESETESTUDIOS,
  });
};

export const setEstudiosPacienteCtx = (data) => (dispatch) => {
  dispatch({
    type: PACIENTE_SETESTUDIOS,
    payload: data,
  });
};

export const setInformesPacienteCtx = (data) => (dispatch) => {
  dispatch({
    type: PACIENTE_SETINFORMES,
    payload: data,
  });
};

export const setInfHistoricoPacCtx = (data) => (dispatch) => {
  dispatch({
    type: PACIENTE_SETINFHISTORICO,
    payload: data,
  });
};

export const setDatoConfCtx = (data) => (dispatch) => {
  dispatch({
    type: PACIENTE_SETDATOCONFIDENCIAL,
    payload: data,
  });
};

export const wsGetInformesPaciente = (idUsuario, filtroFecha) => (dispatch) => {
  dispatch({
    type: PACIENTE_LOADING,
  });
  axiosInstance().then((respuesta) => {
    respuesta
      .get(`paciente/informes/${idUsuario}/${filtroFecha}`) //(historico de informes)
      .then((res) => {
        dispatch({
          type: PACIENTE_INFORMES,
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
          type: PACIENTE_ERROR,
          payload:
            err.response !== undefined
              ? err.response.data
              : errorMessageDefault,
        });
      });
  });
};

export const resetInformesPaciente = () => (dispatch) => {
  dispatch({
    type: PACIENTE_RESETINFORMES,
  });
};

export const wsGetDatosConfindenciales =
  (idUsuario, idMedico) => (dispatch) => {
    dispatch({
      type: PACIENTE_LOADING,
    });

    axiosInstance().then((respuesta) => {
      respuesta
        .get(`DatoConfidencial/buscar/${idUsuario}/${idMedico}`) //(obtener datos confidenciales)
        .then((res) => {
          dispatch({
            type: PACIENTE_DATOCONFIDENCIAL,
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
            type: PACIENTE_ERROR,
            payload:
              err.response !== undefined
                ? err.response.data
                : errorMessageDefault,
          });
        });
    });
  };

export const resetPaciente = () => (dispatch) => {
  dispatch({ type: PACIENTE_RESET });
};

export const wsGetLaboInformeHistorico = (codigoPac) => (dispatch) => {
  dispatch({
    type: PACIENTE_LOADING,
  });
  axiosInstance().then((respuesta) => {
    respuesta
      .get(`paciente/laboratorios/${codigoPac}`) //(historico labo)
      .then((res) => {
        dispatch({
          type: PACIENTE_INFHISTORICO,
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
          type: PACIENTE_ERROR,
          payload:
            err.response !== undefined
              ? err.response.data
              : errorMessageDefault,
        });
      });
  });
};

export const resetInfHistorico = () => (dispatch) => {
  dispatch({ type: PACIENTE_RESET_INFHISTORICO });
};
