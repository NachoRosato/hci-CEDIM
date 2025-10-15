import {
  EXAMEN_LOADING,
  EXAMEN_SUCCESS,
  EXAMEN_ERROR,
  EXAMEN_RESET,
  RESET_CONTEXT,
  EXAMEN_SETCONTEXT,
} from "../ActionTypes";
import examenInitialState from "../initialStates/examenInitialState";

const examen = (state, { payload, type }) => {
  switch (type) {
    case EXAMEN_LOADING:
      return {
        ...state,
        examen: {
          ...state.examen,
          error: null,
          loading: true,
        },
      };
    case EXAMEN_SUCCESS:
      return {
        ...state,
        examen: {
          ...state.examen,
          loading: false,
          error: null,
          data: payload,
        },
      };
    case EXAMEN_ERROR:
      return {
        ...state,
        examen: {
          ...state.examen,
          error: payload,
          loading: false,
        },
      };
    case EXAMEN_SETCONTEXT:
      return {
        ...state,
        examen: {
          ...state.examen,
          loading: false,
          error: null,
          data: payload,
        },
      };
    case EXAMEN_RESET:
      return examenInitialState;
    case RESET_CONTEXT:
      return examenInitialState;

    default:
      return state;
  }
};

export default examen;
