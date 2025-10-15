import {
  INFORME_LOADING,
  INFORME_ERROR,
  INFORME_INFORMEPDF,
  INFORME_VISORES,
  INFORME_RESETVISOR,
  INFORME_RESETINFORMEPDF,
  INFORME_RESET,
  RESET_CONTEXT
} from "../ActionTypes";

import informeInitialState from "../initialStates/informeInitialState";

const informe = (state, { payload, type }) => {
  switch (type) {
    case INFORME_LOADING:
      return {
        ...state,
        informe: {
          ...state.informe,
          error: null,
          loading: true,
        },
      };
    case INFORME_INFORMEPDF:
      return {
        ...state,
        informe: {
          ...state.informe,
          loading: false,
          error: null,
          informePdf: payload,
        },
      };
    case INFORME_RESETINFORMEPDF:
      return {
        ...state,
        informe: {
          ...state.informe,
          loading: false,
          error: null,
          informePdf: null,
        },
      };
    case INFORME_VISORES:
      return {
        ...state,
        informe: {
          ...state.informe,
          loading: false,
          error: null,
          visorPacs: payload,
        },
      };
    case INFORME_RESETVISOR:
      return {
        ...state,
        informe: {
          ...state.informe,
          loading: false,
          error: null,
          visorPacs: null,
        },
      };
    case INFORME_ERROR:
      return {
        ...state,
        informe: {
          ...state.informe,
          error: payload,
          loading: false,
          data: null,
        },
      };
    case INFORME_RESET:
      return informeInitialState;
    case RESET_CONTEXT:
      return informeInitialState;

    default:
      return state;
  }
};

export default informe;
