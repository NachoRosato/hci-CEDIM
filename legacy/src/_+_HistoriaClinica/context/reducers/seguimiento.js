import {
  SEGUIMIENTO_LOADING,
  SEGUIMIENTO_ERROR,
  SEGUIMIENTO_SUCCESS,
  RESET_SEGCTX,
  SEGUIMIENTO_IDPAC,
  SEGUIMIENTO_ALL,
  SEGUIMIENTO_SAVE,
  SEGUIMIENTO_EDIT,
  SEGUIMIENTO_EVENTXID,
  SEGUIMIENTO_EVENTSAVE,
  SEGUIMIENTO_UPDATEXID,
  SEGUIMIENTO_SETSEGALL,
  RESET_EVENTXID,
  RESET_SEGIDPAC,
} from "../ActionTypes";

import seguimientoInitialState from "../initialStates/seguimientoInitialState";

const seguimiento = (state, { payload, type }) => {
  switch (type) {
    case SEGUIMIENTO_LOADING:
      return {
        ...state,
        seguimiento: {
          ...state.seguimiento,
          error: null,
          loading: true,
        },
      };
    case SEGUIMIENTO_SUCCESS:
      return {
        ...state,
        seguimiento: {
          ...state.seguimiento,
          loading: false,
          error: null,
          data: payload,
        },
      };
    case SEGUIMIENTO_IDPAC:
      return {
        ...state,
        seguimiento: {
          ...state.seguimiento,
          loading: false,
          error: null,
          segXIdPac: payload,
        },
      };
    case SEGUIMIENTO_ALL:
      return {
        ...state,
        seguimiento: {
          ...state.seguimiento,
          loading: false,
          error: null,
          segAll: payload,
        },
      };
    case SEGUIMIENTO_SETSEGALL:
      return {
        ...state,
        seguimiento: {
          ...state.seguimiento,
          loading: false,
          error: null,
          segAll: payload,
        },
      };
    case SEGUIMIENTO_SAVE:
      return {
        ...state,
        seguimiento: {
          ...state.seguimiento,
          loading: false,
          error: null,
          segSave: payload,
        },
      };
    case SEGUIMIENTO_EDIT:
      return {
        ...state,
        seguimiento: {
          ...state.seguimiento,
          loading: false,
          error: null,
          segEdit: payload,
        },
      };
    case SEGUIMIENTO_EVENTXID:
      return {
        ...state,
        seguimiento: {
          ...state.seguimiento,
          loading: false,
          error: null,
          segEventXIdSeg: payload,
        },
      };
    case SEGUIMIENTO_EVENTSAVE:
      return {
        ...state,
        seguimiento: {
          ...state.seguimiento,
          loading: false,
          error: null,
          segEventSave: payload,
        },
      };
    case SEGUIMIENTO_UPDATEXID:
      return {
        ...state,
        seguimiento: {
          ...state.seguimiento,
          loading: false,
          error: null,
          segUpdateXIdSeg: payload,
        },
      };
    case SEGUIMIENTO_ERROR:
      return {
        ...state,
        seguimiento: {
          ...state.seguimiento,
          error: payload,
          loading: false,
          data: null,
        },
      };
    case RESET_EVENTXID:
      return {
        ...state,
        seguimiento: {
          ...state.seguimiento,
          loading: false,
          error: null,
          segEventXIdSeg: null,
        },
      };
    case RESET_SEGIDPAC:
      return {
        ...state,
        seguimiento: {
          ...state.seguimiento,
          loading: false,
          error: null,
          segXIdPac: null,
        },
      };
    case RESET_SEGCTX:
      return seguimientoInitialState;

    default:
      return state;
  }
};

export default seguimiento;
