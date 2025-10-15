import {
  ORDENPRACTICA_LOADING,
  ORDENPRACTICA_ERROR,
  ORDENPRACTICA_SUCCESS,
  ORDENPRACTICA_XESP,
  ORDENPRACTICA_XUSER,
  ORDENPRACTICA_GUARDARPRAC,
  ORDENPRACTICA_RESETERROR,
  ORDENPRACTICA_ESTUDIOGRUPO,
  ORDENPRACTICA_SETESTUDIOGRUPO,
  ORDENPRACTICA_SETORDENPRACXMED,
  ORDENPRACTICA_SETORDENPRACXUSR,
} from "../../ActionTypes";

import axiosInstance from "../../../../global/helpers/axiosInstance";

export const wsGetOrdenXEsp = (idEsp) => (dispatch) => {
  dispatch({
    type: ORDENPRACTICA_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .get(`OrdenDigitalConfig/GetByIDESPECIALIDAD/${idEsp}`) // (lista de practicas por esp)
      .then((res) => {
        dispatch({
          type: ORDENPRACTICA_XESP,
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
          type: ORDENPRACTICA_ERROR,
          payload:
            err.response !== undefined
              ? err.response.data
              : errorMessageDefault,
        });
      });
  });
};

export const wsGetOrdenXUser = (IDMEDICO) => (dispatch) => {
  dispatch({
    type: ORDENPRACTICA_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .get(`OrdenDigitalConfig/GetByIDMED/${IDMEDICO}`) // (lista de practicas por idmedico)
      .then((res) => {
        dispatch({
          type: ORDENPRACTICA_XUSER,
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
          type: ORDENPRACTICA_ERROR,
          payload:
            err.response !== undefined
              ? err.response.data
              : errorMessageDefault,
        });
      });
  });
};

export const wsPostGuardarPractica = (ordenPrac) => (dispatch) => {
  dispatch({
    type: ORDENPRACTICA_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .post("OrdenDigital/Alta", ordenPrac) // guardar la orden
      .then((res) => {
        dispatch({
          type: ORDENPRACTICA_GUARDARPRAC,
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
          type: ORDENPRACTICA_ERROR,
          payload:
            err.response !== undefined
              ? err.response.data
              : errorMessageDefault,
        });
      });
  });
};

export const resetErrorOrdenPrac = () => (dispatch) => {
  dispatch({
    type: ORDENPRACTICA_RESETERROR,
  });
};

export const wsEstudioGrupoPrac = (soloPractica) => (dispatch) => {
  dispatch({
    type: ORDENPRACTICA_LOADING,
  });
  axiosInstance().then((respuesta) => {
    respuesta
      .get(`/Estudio/${soloPractica}`)
      .then((res) => {
        dispatch({
          type: ORDENPRACTICA_ESTUDIOGRUPO,
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
          type: ORDENPRACTICA_ERROR,
          payload:
            err.response !== undefined
              ? err.response.data
              : errorMessageDefault,
        });
      });
  });
};

export const setEstudiosGrupoCtx = (data) => (dispatch) => {
  dispatch({
    type: ORDENPRACTICA_SETESTUDIOGRUPO,
    payload: data,
  });
};

export const setOrdenPracXMedCtx = (data) => (dispatch) => {
  dispatch({
    type: ORDENPRACTICA_SETORDENPRACXMED,
    payload: data,
  });
};

export const setOrdenPracXUsrCtx = (data) => (dispatch) => {
  dispatch({
    type: ORDENPRACTICA_SETORDENPRACXUSR,
    payload: data,
  });
};

// export const resetEstudioGrupo = () => (dispatch) => {
//   dispatch({
//     type: ESTUDIOGRUPO_RESET,
//   });
// };
