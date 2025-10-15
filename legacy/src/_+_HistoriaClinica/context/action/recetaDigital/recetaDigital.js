import {
  RECETADIGITAL_LOADING,
  RECETADIGITAL_CREARRECETA,
  RECETADIGITAL_DIAGNOSTICOS,
  RECETADIGITAL_MEDICAMENTOS,
  RECETADIGITAL_ERROR,
  RECETADIGITAL_RESET,
} from "../../ActionTypes";

import axiosInstance from "../../../../global/helpers/axiosInstance";

export const wsGetRctaDiags = (term) => (dispatch) => {
  dispatch({
    type: RECETADIGITAL_LOADING,
  });

  axiosInstance().then((respuesta) => {
    respuesta
      .get(`Receta/recetaDigital/getDiagnosticos/${term}`)
      .then((res) => {
        dispatch({
          type: RECETADIGITAL_DIAGNOSTICOS,
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
          type: RECETADIGITAL_ERROR,
          payload: error,
        });
      });
  });
};

export const wsGetRctaMedicamentos = (term, pageNum, nextStep) => () => {
  axiosInstance().then((respuesta) => {
    respuesta
      .get(`Receta/recetaDigital/getMedicamentos/${term}/${pageNum}`)
      .then((resp) => {
        if (nextStep) nextStep(true, resp.data);
      })
      .catch((err) => {
        const errorData = err.response?.data || {
          error: {
            errorMessage: err.message || "Error al obtener medicamentos",
          },
        };
        if (nextStep) nextStep(false, errorData);
      });
  });
};

export const wsPostCrearRecetaDig = (dtoRecetaDigital, nextStep) => () => {
  axiosInstance().then((respuesta) => {
    respuesta
      .post("Receta/recetaDigital/crearReceta", dtoRecetaDigital)
      .then((resp) => {
        if (nextStep) nextStep(true, resp.data);
      })
      .catch((err) => {
        const errorData = err.response?.data || {
          error: {
            errorMessage: err.message || "Error al crear la receta digital",
          },
        };
        if (nextStep) nextStep(false, errorData);
      });
  });
};

export const wsPutDatosMedico = (idMedico, dtoMedico, nextStep) => () => {
  axiosInstance().then((respuesta) => {
    respuesta
      .put(`Receta/recetaDigital/actualizarMedico/${idMedico}`, dtoMedico)
      .then((resp) => {
        if (nextStep) nextStep(true, resp.data);
      })
      .catch((err) => {
        const errorData = err.response?.data || {
          error: {
            errorMessage: err.message || "Error al actualizar datos del médico",
          },
        };
        if (nextStep) nextStep(false, errorData);
      });
  });
};

export const wsDeleteRecetaDig = (idReceta, id, nextStep) => () => {
  axiosInstance().then((respuesta) => {
    respuesta
      .delete(`Receta/recetaDigital/eliminarReceta/${idReceta}/${id}`)
      .then((resp) => {
        if (nextStep) nextStep(true, idReceta);
      })
      .catch((err) => {
        const errorData = err.response?.data || {
          error: {
            errorMessage: err.message || "Error al eliminar la receta",
          },
        };
        if (nextStep) nextStep(false, errorData);
      });
  });
};

export const wsGetFinanciadores = (pacFullName, nextStep) => () => {
  axiosInstance().then((respuesta) => {
    respuesta
      .get(`Receta/recetaDigital/getFinanciadores/${pacFullName}`)
      .then((resp) => {
        if (nextStep) nextStep(true, resp.data);
      })
      .catch((err) => {
        const errorData = err.response?.data || {
          error: {
            errorMessage: err.message || "Error al obtener financiadores",
          },
        };
        if (nextStep) nextStep(false, errorData);
      });
  });
};

export const wsGetRecetaByPaciente = (dniPac, filtroFecha, nextStep) => () => {
  axiosInstance().then((respuesta) => {
    respuesta
      .get(`Receta/getRecetasPaciente/${dniPac}/${filtroFecha}`)
      .then((resp) => {
        if (nextStep) nextStep(true, resp.data);
      })
      .catch((err) => {
        const errorData = err.response?.data || {
          error: {
            errorMessage:
              err.message || "Error al obtener recetas del paciente",
          },
        };
        if (nextStep) nextStep(false, errorData);
      });
  });
};

export const resetRecetaDigital = () => (dispatch) => {
  dispatch({
    type: RECETADIGITAL_RESET,
  });
};
