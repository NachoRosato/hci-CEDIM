import {
  EVOLUCION_LOADING,
  EVOLUCION_ERROR,
  EVOLUCION_GUARDAREVO,
  EVOLUCION_PREIMPRESION,
  EVOLUCION_DATOS,
  EVOLUCION_HISTORICAS,
  EVOLUCION_FILTROSTL,
  EVOLUCION_SETFILTROSTL,
  EVOLUCION_HCXPDF,
  EVOLUCION_EDITAEVO,
  EVOLUCION_RESETEDITAEVO,
  EVOLUCION_CREARHTML,
  EVOLUCION_RESETEVO,
  EVOLUCION_RESETGUARDAREVO,
  EVOLUCION_RESET,
  EVOLUCION_RESETHISTORICAS,
  EVOLUCION_SETHISTORICAS,
  RESET_CONTEXT,
  EVOLUCION_RESET_DATOS,
  EVOLUCION_RESETHCXPDF,
  EVOLUCION_RESETPREIMPRESION,
} from "../ActionTypes";

import evolucionInitialState from "../initialStates/evolucionInitialState";

const evolucion = (state, { payload, type }) => {
  switch (type) {
    case EVOLUCION_LOADING:
      return {
        ...state,
        evolucion: {
          ...state.evolucion,
          error: null,
          loading: true,
        },
      };
    case EVOLUCION_GUARDAREVO:
      return {
        ...state,
        evolucion: {
          ...state.evolucion,
          loading: false,
          error: null,
          guardarEvo: payload,
        },
      };
    case EVOLUCION_PREIMPRESION:
      return {
        ...state,
        evolucion: {
          ...state.evolucion,
          loading: false,
          error: null,
          preImpresion: payload,
        },
      };
    case EVOLUCION_RESETGUARDAREVO:
      return {
        ...state,
        evolucion: {
          ...state.evolucion,
          loading: false,
          error: null,
          guardarEvo: null,
        },
      };
    case EVOLUCION_HISTORICAS:
      return {
        ...state,
        evolucion: {
          ...state.evolucion,
          loading: false,
          error: null,
          historicoPac: payload,
        },
      };
    case EVOLUCION_FILTROSTL:
      return {
        ...state,
        evolucion: {
          ...state.evolucion,
          loading: false,
          error: null,
          filtrosTL: payload,
        },
      };
    case EVOLUCION_SETFILTROSTL:
      return {
        ...state,
        evolucion: {
          ...state.evolucion,
          loading: false,
          error: null,
          filtrosTL: payload,
        },
      };
    case EVOLUCION_HCXPDF:
      return {
        ...state,
        evolucion: {
          ...state.evolucion,
          loading: false,
          error: null,
          hcXPdf: payload,
        },
      };
    case EVOLUCION_DATOS:
      return {
        ...state,
        evolucion: {
          ...state.evolucion,
          loading: false,
          error: null,
          actual: payload,
        },
      };
    case EVOLUCION_SETHISTORICAS:
      return {
        ...state,
        evolucion: {
          ...state.evolucion,
          loading: false,
          error: null,
          historicoPac: payload,
        },
      };
    case EVOLUCION_RESETHISTORICAS:
      return {
        ...state,
        evolucion: {
          ...state.evolucion,
          loading: false,
          error: null,
          historicoPac: null,
        },
      };
    case EVOLUCION_EDITAEVO:
      return {
        ...state,
        evolucion: {
          ...state.evolucion,
          loading: false,
          error: null,
          editarEvo: payload,
        },
      };
    case EVOLUCION_RESETEDITAEVO:
      return {
        ...state,
        evolucion: {
          ...state.evolucion,
          loading: false,
          error: null,
          editarEvo: null,
        },
      };
    case EVOLUCION_CREARHTML:
      return {
        ...state,
        evolucion: {
          ...state.evolucion,
          loading: false,
          error: null,
          crearHtml: null,
        },
      };
    case EVOLUCION_RESET_DATOS:
      return {
        ...state,
        evolucion: {
          ...state.evolucion,
          actual: null,
        },
      };
    case EVOLUCION_RESETHCXPDF:
      return {
        ...state,
        evolucion: {
          ...state.evolucion,
          hcXPdf: null,
        },
      };
    case EVOLUCION_RESETPREIMPRESION:
      return {
        ...state,
        evolucion: {
          ...state.evolucion,
          preImpresion: null,
        },
      };
    case EVOLUCION_ERROR:
      return {
        ...state,
        evolucion: {
          ...state.evolucion,
          error: payload,
          loading: false,
          data: null,
        },
      };
    case EVOLUCION_RESETEVO:
      return {
        ...state,
        evolucion: {
          ...state.evolucion,
          error: null,
          loading: false,
          data: null,
          guardarEvo: null,
          historicoPac: null,
          crearHtml: null,
          // editarEvo: null, necesito tenerlo asi por el flow de trabajo.
        },
      };
    case EVOLUCION_RESET:
      return evolucionInitialState;
    case RESET_CONTEXT:
      return evolucionInitialState;

    default:
      return state;
  }
};

export default evolucion;
