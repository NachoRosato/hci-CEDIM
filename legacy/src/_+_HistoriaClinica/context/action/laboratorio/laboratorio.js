import {
  LABORATORIO_LOADING,
  LABORATORIO_ERROR,
  LABORATORIO_LABNOMENCLADOR,
  LABORATORIO_ITEMSORDENHC,
  LABORATORIO_GRUPOESTUDIOSUSUARIO,
  LABORATORIO_GRUPOESTUDIOS,
  LABORATORIO_HISTORICO,
  LABORATORIO_PDF,
  LABORATORIO_RESETPDF,
  LABORATORIO_RESETHISTORICO,
  LABORATORIO_RESET,
  LABORATORIO_RESETPARCIAL,
  LABORATORIO_GUARDARORDEN,
  LABORATORIO_SETGRUPOESTUDIOSUSUARIO,
  LABORATORIO_SETGRUPOESTUDIOS,
  LABORATORIO_SETITEMSORDENHC,
  LABORATORIO_SETLABNOMENCLADOR,
  LABORATORIO_SETHISTORICO,
  LABORATORIO_INFORMESTRING,
  LABORATORIO_INFORMEANORMAL,
  LABORATORIO_LABORATORIOSPACIENTE,
  LABORATORIO_DATOSGRAFICO,
  LABORATORIO_COLUMNASGRAFICO,
  LABORATORIO_FILASGRAFICO,
  LABORATORIO_ESTUDIOSGRAFICO,
  LABORATORIO_RESETINFORME,
} from "../../ActionTypes";

import axiosInstance from "../../../../global/helpers/axiosInstance";

export const wsGetLabNomencladores = () => (dispatch) => {
  dispatch({
    type: LABORATORIO_LOADING,
  });
  axiosInstance().then((respuesta) => {
    respuesta
      .get(`laboratorio/LabNomenclador`) // (COMBO DETER DE LABO)
      .then((res) => {
        dispatch({
          type: LABORATORIO_LABNOMENCLADOR,
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
          type: LABORATORIO_ERROR,
          payload:
            err.response !== undefined
              ? err.response.data
              : errorMessageDefault,
        });
      });
  });
};

export const wsGetLabGrupoEstudioOrden = () => (dispatch) => {
  dispatch({
    type: LABORATORIO_LOADING,
  });
  axiosInstance().then((respuesta) => {
    respuesta
      .get(`laboratorio/grupoestudioitemsParaOrdenHC`) // trae lo que dice la url
      .then((res) => {
        dispatch({
          type: LABORATORIO_ITEMSORDENHC,
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
          type: LABORATORIO_ERROR,
          payload:
            err.response !== undefined
              ? err.response.data
              : errorMessageDefault,
        });
      });
  });
};

export const wsGetLabGrupoEstudiosUsuario = (idUsuario) => (dispatch) => {
  dispatch({
    type: LABORATORIO_LOADING,
  });
  axiosInstance().then((respuesta) => {
    respuesta
      .get(`laboratorio/grupoestudios/${idUsuario}`) // (RUTINAS DE LABO ESPECIFICAS DEL USUARIO)
      .then((res) => {
        dispatch({
          type: LABORATORIO_GRUPOESTUDIOSUSUARIO,
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
          type: LABORATORIO_ERROR,
          payload:
            err.response !== undefined
              ? err.response.data
              : errorMessageDefault,
        });
      });
  });
};

export const setGrupoEstudioUsuarioCtx = (data) => (dispatch) => {
  dispatch({
    type: LABORATORIO_SETGRUPOESTUDIOSUSUARIO,
    payload: data,
  });
};
export const setGrupoEstudioCtx = (data) => (dispatch) => {
  dispatch({
    type: LABORATORIO_SETGRUPOESTUDIOS,
    payload: data,
  });
};
export const setItemOrdenHcCtx = (data) => (dispatch) => {
  dispatch({
    type: LABORATORIO_SETITEMSORDENHC,
    payload: data,
  });
};
export const setLabNomeclCtx = (data) => (dispatch) => {
  dispatch({
    type: LABORATORIO_SETLABNOMENCLADOR,
    payload: data,
  });
};
export const setLabHistoricoCtx = (data) => (dispatch) => {
  dispatch({
    type: LABORATORIO_SETHISTORICO,
    payload: data,
  });
};

export const wsGetLabGrupoEstudios = () => (dispatch) => {
  dispatch({
    type: LABORATORIO_LOADING,
  });
  axiosInstance().then((respuesta) => {
    respuesta
      .get(`laboratorio/grupoestudioitems`) // (SE TRAE TODAS DETER/rutinas DE LABO SEPARADAS)
      .then((res) => {
        dispatch({
          type: LABORATORIO_GRUPOESTUDIOS,
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
          type: LABORATORIO_ERROR,
          payload:
            err.response !== undefined
              ? err.response.data
              : errorMessageDefault,
        });
      });
  });
};

export const wsGetLabHistorico = (idUsuario, filtroFecha) => (dispatch) => {
  dispatch({
    type: LABORATORIO_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .get(`laboratorio/${idUsuario}/${filtroFecha}`) // (historico de labo)
      .then((res) => {
        dispatch({
          type: LABORATORIO_HISTORICO,
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
          type: LABORATORIO_ERROR,
          payload:
            err.response !== undefined
              ? err.response.data
              : errorMessageDefault,
        });
      });
  });
};

export const resetLabHistorico = () => (dispatch) => {
  dispatch({
    type: LABORATORIO_RESETHISTORICO,
  });
};

export const wsGetLabPdf = (codigo, dni) => (dispatch) => {
  dispatch({
    type: LABORATORIO_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .get(`Laboratorio/pdf/${codigo}/${dni}`) // (historico de labo)
      .then((res) => {
        dispatch({
          type: LABORATORIO_PDF,
          payload: res.data,
        });
      })
      .catch((err) => {
        let error = {
          detail: err.response
            ? err.response.data
            : "Error al contactar el server.",
        };

        dispatch({
          type: LABORATORIO_ERROR,
          payload: error,
        });
      });
  });
};

export const wsResetLabPdf = () => (dispatch) => {
  dispatch({
    type: LABORATORIO_RESETPDF,
  });
};
export const resetLabo = () => (dispatch) => {
  dispatch({
    type: LABORATORIO_RESET,
  });
};
export const resetLaboParcial = () => (dispatch) => {
  dispatch({
    type: LABORATORIO_RESETPARCIAL,
  });
};
export const resetLaboInforme = () => (dispatch) => {
  dispatch({
    type: LABORATORIO_RESETINFORME,
  });
};

export const wsPostGuardarOrdenLabo = (dtoOrdenLabo) => (dispatch) => {
  dispatch({
    type: LABORATORIO_LOADING,
  });
  axiosInstance().then((respuesta) => {
    respuesta
      .post("laboratorio/ordenLabo", dtoOrdenLabo) // guardar la orden
      .then((res) => {
        dispatch({
          type: LABORATORIO_GUARDARORDEN,
          payload: res.data,
        });
      })
      .catch((err) => {
        let error = {
          detail: err.response
            ? err.response.data
            : "Error al contactar el server.",
        };

        dispatch({
          type: LABORATORIO_ERROR,
          payload: error,
        });
      });
  });
};

export const wsGetInformeLab = (codigo) => (dispatch) => {
  dispatch({
    type: LABORATORIO_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .get(`laboratorio/resultadosNew/${codigo}`) // (resultado de labo en string)
      .then((res) => {
        dispatch({
          type: LABORATORIO_INFORMESTRING,
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
          type: LABORATORIO_ERROR,
          payload:
            err.response !== undefined
              ? err.response.data
              : errorMessageDefault,
        });
      });
  });
};

export const wsGetInformeLabAnormales = (codigo) => (dispatch) => {
  dispatch({
    type: LABORATORIO_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .get(`laboratorio/resultadosAnormales/${codigo}`) // (resultado de labo anormal en string)
      .then((res) => {
        dispatch({
          type: LABORATORIO_INFORMEANORMAL,
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
          type: LABORATORIO_ERROR,
          payload:
            err.response !== undefined
              ? err.response.data
              : errorMessageDefault,
        });
      });
  });
};

// Endpoint para obtener lista de laboratorios del paciente
export const wsGetLaboratoriosPaciente = (idPaciente) => (dispatch) => {
  dispatch({
    type: LABORATORIO_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .get(`laboratorio/${idPaciente}`) // Obtener laboratorios del paciente
      .then((res) => {
        dispatch({
          type: LABORATORIO_LABORATORIOSPACIENTE,
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
          type: LABORATORIO_ERROR,
          payload:
            err.response !== undefined
              ? err.response.data
              : errorMessageDefault,
        });
      });
  });
};

// Endpoint para obtener datos de gráfico de laboratorio
export const wsGetLaboratorioGrafico = (idPaciente) => (dispatch) => {
  dispatch({
    type: LABORATORIO_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .get(`laboratorio/grafico/${idPaciente}`) // Obtener datos para gráfico
      .then((res) => {
        // Separar los datos del gráfico en diferentes campos
        dispatch({
          type: LABORATORIO_COLUMNASGRAFICO,
          payload: res.data.columnas,
        });
        dispatch({
          type: LABORATORIO_FILASGRAFICO,
          payload: res.data.filas,
        });
        dispatch({
          type: LABORATORIO_ESTUDIOSGRAFICO,
          payload: res.data.items,
        });
        dispatch({
          type: LABORATORIO_DATOSGRAFICO,
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
          type: LABORATORIO_ERROR,
          payload:
            err.response !== undefined
              ? err.response.data
              : errorMessageDefault,
        });
      });
  });
};
