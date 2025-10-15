import {
  ORDENPRACTICA_LOADING,
  ORDENPRACTICA_ERROR,
  ORDENPRACTICA_SUCCESS,
  ORDENPRACTICA_XESP,
  ORDENPRACTICA_XUSER,
  ORDENPRACTICA_GUARDARPRAC,
  ORDENPRACTICA_RESETXUSER,
  ORDENPRACTICA_RESETXESP,
  ORDENPRACTICA_RESET,
  ORDENPRACTICA_RESETERROR,
  ORDENPRACTICA_ESTUDIOGRUPO,
  ORDENPRACTICA_SETESTUDIOGRUPO,
  ORDENPRACTICA_SETORDENPRACXMED,
  ORDENPRACTICA_SETORDENPRACXUSR,
  RESET_CONTEXT,
} from "../ActionTypes";

import ordenPracticaInitialState from "../initialStates/medicamento";

const ordenPractica = (state, { payload, type }) => {
  switch (type) {
    case ORDENPRACTICA_LOADING:
      return {
        ...state,
        ordenPractica: {
          ...state.ordenPractica,
          error: null,
          loading: true,
        },
      };
    case ORDENPRACTICA_XESP:
      return {
        ...state,
        ordenPractica: {
          ...state.ordenPractica,
          loading: false,
          error: null,
          practicasXEsp: payload,
        },
      };
    case ORDENPRACTICA_SETORDENPRACXMED:
      return {
        ...state,
        ordenPractica: {
          ...state.ordenPractica,
          loading: false,
          error: null,
          practicasXEsp: payload,
        },
      };
    case ORDENPRACTICA_XUSER:
      return {
        ...state,
        ordenPractica: {
          ...state.ordenPractica,
          loading: false,
          error: null,
          practicasXUser: payload,
        },
      };
    case ORDENPRACTICA_SETORDENPRACXUSR:
      return {
        ...state,
        ordenPractica: {
          ...state.ordenPractica,
          loading: false,
          error: null,
          practicasXUser: payload,
        },
      };
    case ORDENPRACTICA_RESETXUSER:
      return {
        ...state,
        ordenPractica: {
          ...state.ordenPractica,
          loading: false,
          error: null,
          practicasXUser: null,
        },
      };
    case ORDENPRACTICA_RESETXESP:
      return {
        ...state,
        ordenPractica: {
          ...state.ordenPractica,
          loading: false,
          error: null,
          practicasXEsp: null,
        },
      };
    case ORDENPRACTICA_GUARDARPRAC:
      return {
        ...state,
        ordenPractica: {
          ...state.ordenPractica,
          loading: false,
          error: null,
          guardarPrac: payload,
        },
      };
    case ORDENPRACTICA_ERROR:
      return {
        ...state,
        ordenPractica: {
          ...state.ordenPractica,
          error: payload,
          loading: false,
          data: null,
        },
      };
    case ORDENPRACTICA_RESETERROR:
      return {
        ...state,
        ordenPractica: {
          ...state.ordenPractica,
          error: null,
          loading: false,
          data: null,
        },
      };
    case ORDENPRACTICA_ESTUDIOGRUPO:
      return {
        ...state,
        ordenPractica: {
          ...state.ordenPractica,
          loading: false,
          error: null,
          estudioGrupo: payload,
        },
      };
    case ORDENPRACTICA_SETESTUDIOGRUPO:
      return {
        ...state,
        ordenPractica: {
          ...state.ordenPractica,
          loading: false,
          error: null,
          estudioGrupo: payload,
        },
      };

    case ORDENPRACTICA_RESET:
      return ordenPracticaInitialState;
    case RESET_CONTEXT:
      return ordenPracticaInitialState;
    default:
      return state;
  }
};

export default ordenPractica;
