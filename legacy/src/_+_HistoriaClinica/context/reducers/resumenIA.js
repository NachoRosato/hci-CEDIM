import {
  RESUMENIA_LOADING,
  RESUMENIA_ERROR,
  RESUMENIA_SUCCESS,
  RESUMENIA_RESET,
  RESET_CONTEXT,
} from "../ActionTypes";

import resumenIAInitialState from "../initialStates/resumenIAInitialState";

const resumenIA = (state, { payload, type }) => {
  switch (type) {
    case RESUMENIA_LOADING:
      return {
        ...state,
        resumenIA: {
          ...state.resumenIA,
          error: null,
          loading: true,
        },
      };
    case RESUMENIA_SUCCESS:
      return {
        ...state,
        resumenIA: {
          ...state.resumenIA,
          loading: false,
          error: null,
          data: payload,
        },
      };
    case RESUMENIA_ERROR:
      return {
        ...state,
        resumenIA: {
          ...state.resumenIA,
          error: payload,
          loading: false,
          data: null,
        },
      };
    case RESUMENIA_RESET:
      return {
        ...state,
        resumenIA: {
          ...state.resumenIA,
          error: null,
          loading: false,
          data: null,
        },
      };
    case RESET_CONTEXT:
      return resumenIAInitialState;
    default:
      return state;
  }
};

export default resumenIA;
