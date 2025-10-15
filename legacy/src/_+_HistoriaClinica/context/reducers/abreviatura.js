import {
  ABREVIATURA_LOADING,
  ABREVIATURA_ERROR,
  ABREVIATURA_SUCCESS,
  RESET_CONTEXT,
} from "../ActionTypes";

import abreviaturaInitialState from "../initialStates/abreviaturaInitialState";

const abreviatura = (state, { payload, type }) => {
  switch (type) {
    case ABREVIATURA_LOADING:
      return {
        ...state,
        abreviatura: {
          ...state.abreviatura,
          error: null,
          loading: true,
        },
      };
    case ABREVIATURA_SUCCESS:
      return {
        ...state,
        abreviatura: {
          ...state.abreviatura,
          loading: false,
          error: null,
          data: payload,
        },
      };
    case ABREVIATURA_ERROR:
      return {
        ...state,
        abreviatura: {
          ...state.abreviatura,
          error: payload,
          loading: false,
          data: null,
        },
      };
    case RESET_CONTEXT:
      return abreviaturaInitialState;

    default:
      return state;
  }
};

export default abreviatura;
