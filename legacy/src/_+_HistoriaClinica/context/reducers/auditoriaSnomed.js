import {
  AUDITSNOMED_LOADING,
  AUDITSNOMED_ERROR,
  AUDITSNOMED_TABLELISTOK,
  AUDITSNOMED_SETDATATABLE,
  AUDITSNOMED_REEMPLAZAROK,
  AUDITSNOMED_RESETAFTEREDIT,
  AUDITSNOMED_EVOHTML,
  RESET_CONTEXT,
} from "../ActionTypes";

import auditSnomedInitialState from "../initialStates/auditoriaSnomedInitialState";

const auditoriaSnomed = (state, { payload, type }) => {
  switch (type) {
    case AUDITSNOMED_LOADING:
      return {
        ...state,
        auditSnomed: {
          ...state.auditSnomed,
          error: null,
          loading: true,
        },
      };
    case AUDITSNOMED_TABLELISTOK:
      return {
        ...state,
        auditSnomed: {
          ...state.auditSnomed,
          loading: false,
          error: null,
          tableList: payload,
        },
      };
    case AUDITSNOMED_SETDATATABLE:
      return {
        ...state,
        auditSnomed: {
          ...state.auditSnomed,
          loading: false,
          error: null,
          tableList: payload,
        },
      };
    case AUDITSNOMED_REEMPLAZAROK:
      return {
        ...state,
        auditSnomed: {
          ...state.auditSnomed,
          loading: false,
          error: null,
          replaceSnomed: payload,
        },
      };
    case AUDITSNOMED_RESETAFTEREDIT:
      return {
        ...state,
        auditSnomed: {
          ...state.auditSnomed,
          loading: false,
          error: null,
          replaceSnomed: null,
        },
      };
    case AUDITSNOMED_EVOHTML:
      return {
        ...state,
        auditSnomed: {
          ...state.auditSnomed,
          loading: false,
          error: null,
          evoHtml: payload,
        },
      };
    case AUDITSNOMED_ERROR:
      return {
        ...state,
        auditSnomed: {
          ...state.auditSnomed,
          error: payload,
          loading: false,
        },
      };
    case RESET_CONTEXT:
      return auditSnomedInitialState;

    default:
      return state;
  }
};

export default auditoriaSnomed;
