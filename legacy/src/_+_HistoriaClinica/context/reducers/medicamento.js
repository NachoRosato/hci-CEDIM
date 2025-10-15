import {
  MEDICAMENTO_LOADING,
  MEDICAMENTO_ERROR,
  MEDICAMENTO_SUCCESS,
  MEDICAMENTO_RESET,
  RESET_CONTEXT,
} from "../ActionTypes";

import medicamentoInitialState from "../initialStates/medicamento";

const medicamento = (state, { payload, type }) => {
  switch (type) {
    case MEDICAMENTO_LOADING:
      return {
        ...state,
        medicamento: {
          ...state.medicamento,
          error: null,
          loading: true,
        },
      };
    case MEDICAMENTO_SUCCESS:
      return {
        ...state,
        medicamento: {
          ...state.medicamento,
          loading: false,
          error: null,
          data: payload,
        },
      };
    case MEDICAMENTO_ERROR:
      return {
        ...state,
        medicamento: {
          ...state.medicamento,
          error: payload,
          loading: false,
          data: null,
        },
      };
      case MEDICAMENTO_RESET:
      return {
        ...state,
        medicamento: {
          ...state.medicamento,
          error: null,
          loading: false,
          data: null,
        },
      };
    case RESET_CONTEXT:
      return medicamentoInitialState;

    default:
      return state;
  }
};

export default medicamento;
