import {
  RECETADIGITAL_LOADING,
  RECETADIGITAL_CREARRECETA,
  RECETADIGITAL_DIAGNOSTICOS,
  RECETADIGITAL_MEDICAMENTOS,
  RECETADIGITAL_ERROR,
  RECETADIGITAL_RESET,
  RESET_CONTEXT,
} from "../ActionTypes";

import recetaDigitalInitialState from "../initialStates/recetaDigitalInitialState";

const recetaDigital = (state, { payload, type }) => {
  switch (type) {
    case RECETADIGITAL_LOADING:
      return {
        ...state,
        recetaDigital: {
          ...state.recetaDigital,
          error: null,
          loading: true,
        },
      };
    case RECETADIGITAL_CREARRECETA:
      return {
        ...state,
        recetaDigital: {
          ...state.recetaDigital,
          loading: false,
          error: null,
          crearReceta: payload,
        },
      };
    case RECETADIGITAL_DIAGNOSTICOS:
      return {
        ...state,
        recetaDigital: {
          ...state.recetaDigital,
          loading: false,
          error: null,
          diagnosticos: payload,
        },
      };
    case RECETADIGITAL_MEDICAMENTOS:
      return {
        ...state,
        recetaDigital: {
          ...state.recetaDigital,
          loading: false,
          error: null,
          recetaDigital: payload,
        },
      };

    case RECETADIGITAL_ERROR:
      return {
        ...state,
        recetaDigital: {
          ...state.recetaDigital,
          error: payload,
          loading: false,
          crearReceta: null,
        },
      };
    case RECETADIGITAL_RESET:
      return recetaDigitalInitialState;

    case RESET_CONTEXT:
      return recetaDigitalInitialState;

    default:
      return state;
  }
};

export default recetaDigital;
