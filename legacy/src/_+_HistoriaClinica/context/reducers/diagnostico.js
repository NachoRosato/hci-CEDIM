import {
  DIAGNOSTICO_LOADING,
  DIAGNOSTICO_ERROR,
  DIAGNOSTICO_SUCCESS,
  DIAGBYNAME_SUCCESS,
  DIAGNOSTICO_SETDATA,
  DIAGBYNAME_SETDATA,
  RESET_CONTEXT,
} from "../ActionTypes";

import diagnosticoInitialState from "../initialStates/diagnosticoInitialState";

const diagnostico = (state, { payload, type }) => {
  switch (type) {
    case DIAGNOSTICO_LOADING:
      return {
        ...state,
        diagnostico: {
          ...state.diagnostico,
          error: null,
          loading: true,
        },
      };
    case DIAGNOSTICO_SUCCESS:
      return {
        ...state,
        diagnostico: {
          ...state.diagnostico,
          loading: false,
          error: null,
          data: payload,
        },
      };
    case DIAGBYNAME_SUCCESS:
      return {
        ...state,
        diagnostico: {
          ...state.diagnostico,
          loading: false,
          error: null,
          diagByName: payload,
        },
      };
    case DIAGNOSTICO_SETDATA:
      return {
        ...state,
        diagnostico: {
          ...state.diagnostico,
          loading: false,
          error: null,
          data: payload,
        },
      };
    case DIAGBYNAME_SETDATA:
      return {
        ...state,
        diagnostico: {
          ...state.diagnostico,
          loading: false,
          error: null,
          diagByName: payload,
        },
      };
    case DIAGNOSTICO_ERROR:
      return {
        ...state,
        diagnostico: {
          ...state.diagnostico,
          error: payload,
          loading: false,
          data: null,
        },
      };
    case RESET_CONTEXT:
      return diagnosticoInitialState;

    default:
      return state;
  }
};

export default diagnostico;
