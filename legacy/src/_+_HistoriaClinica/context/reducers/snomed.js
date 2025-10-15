import {
  SNOMED_LOADING,
  SNOMED_FSNITEM,
  SNOMED_ERROR,
  RESET_CONTEXT,
  SNOMED_RESETDATA,
} from "../ActionTypes";

import snomedInitialState from "../initialStates/snomedInitialState";

const snomed = (state, { payload, type }) => {
  switch (type) {
    case SNOMED_LOADING:
      return {
        ...state,
        snomed: {
          ...state.snomed,
          error: null,
          loading: true,
        },
      };
    case SNOMED_FSNITEM:
      return {
        ...state,
        snomed: {
          ...state.snomed,
          loading: false,
          error: null,
          fsnItems: payload,
        },
      };
    case SNOMED_ERROR:
      return {
        ...state,
        snomed: {
          ...state.snomed,
          error: payload,
          loading: false,
          fsnItems: null,
        },
      };
    case SNOMED_RESETDATA:
      return {
        ...state,
        snomed: {
          ...state.snomed,
          error: null,
          loading: false,
          fsnItems: null,
        },
      };

    case RESET_CONTEXT:
      return snomedInitialState;

    default:
      return state;
  }
};

export default snomed;
