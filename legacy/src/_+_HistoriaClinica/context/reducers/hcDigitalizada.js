import {
  HCDIGIT_ERROR,
  HCDIGIT_LOADING,
  HCDIGIT_PDFOK,
  HCDIGIT_LISTOK,
  RESET_CONTEXT,
} from "../ActionTypes";

import hcDigitalizadaInitialState from "../initialStates/hcDigitalizadaInitialState";

const hcDigitalizada = (state, { payload, type }) => {
  switch (type) {
    case HCDIGIT_LOADING:
      return {
        ...state,
        hcDigit: {
          ...state.hcDigit,
          error: null,
          loading: true,
        },
      };
    case HCDIGIT_LISTOK:
      return {
        ...state,
        hcDigit: {
          ...state.hcDigit,
          loading: false,
          error: null,
          listaOk: payload,
        },
      };
    case HCDIGIT_PDFOK:
      return {
        ...state,
        hcDigit: {
          ...state.hcDigit,
          loading: false,
          error: null,
          pdfOk: payload,
        },
      };
    case HCDIGIT_ERROR:
      return {
        ...state,
        hcDigit: {
          ...state.hcDigit,
          error: payload,
          loading: false,
        },
      };
    case RESET_CONTEXT:
      return hcDigitalizadaInitialState;

    default:
      return state;
  }
};

export default hcDigitalizada;
