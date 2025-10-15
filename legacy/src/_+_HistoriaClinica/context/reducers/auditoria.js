import {
  AUDITORIA_LOADING,
  AUDITORIA_ERROR,
  AUDITORIA_MANUALES,
  AUDITORIA_SETMANUALES,
  RESET_CONTEXT,
} from "../ActionTypes";

import auditoriaInitialState from "../initialStates/auditoriaInitialState";

const auditoria = (state, { payload, type }) => {
  switch (type) {
    case AUDITORIA_LOADING:
      return {
        ...state,
        auditoria: {
          ...state.auditoria,
          error: null,
          loading: true,
        },
      };
    case AUDITORIA_MANUALES:
      return {
        ...state,
        auditoria: {
          ...state.auditoria,
          loading: false,
          error: null,
          manuales: payload,
        },
      };
    case AUDITORIA_SETMANUALES:
      return {
        ...state,
        auditoria: {
          ...state.auditoria,
          loading: false,
          error: null,
          manuales: payload,
        },
      };
    case AUDITORIA_ERROR:
      return {
        ...state,
        auditoria: {
          ...state.auditoria,
          error: payload,
          loading: false,
          manuales: null,
        },
      };
    case RESET_CONTEXT:
      return auditoriaInitialState;

    default:
      return state;
  }
};

export default auditoria;
