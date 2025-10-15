import {
  TIPOS_LOADING,
  TIPOS_ERROR,
  TIPOS_SUCCESS,
  RESET_CONTEXT,
} from "../ActionTypes";

import tiposInitialState from "../initialStates/tiposInitialState";

const tipos = (state, { payload, type }) => {
  switch (type) {
    case TIPOS_LOADING:
      return {
        ...state,
        tipos: {
          ...state.TIPOS,
          error: null,
          loading: true,
        },
      };
    case TIPOS_SUCCESS:
      return {
        ...state,
        tipos: {
          ...state.TIPOS,
          loading: false,
          error: null,
          data: payload,
        },
      };
    case TIPOS_ERROR:
      return {
        ...state,
        tipos: {
          ...state.TIPOS,
          error: payload,
          loading: false,
          data: null,
        },
      };
    case RESET_CONTEXT:
      return tiposInitialState;

    default:
      return state;
  }
};

export default tipos;
