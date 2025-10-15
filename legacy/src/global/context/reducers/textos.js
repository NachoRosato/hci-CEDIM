import { TEXTOS_ERROR, TEXTOS_LOADING, TEXTOS_RESET, TEXTOS_SUCCESS } from "../ActionTypes";
import textosInitialState from "../initialStates/textosInitialState";

const textos = (state, { payload, type }) => {  
    switch (type) {
      case TEXTOS_LOADING:
        return {
          ...state,
          textos: {
            ...state.textos,
            error: false,
            loading: true,
          },
        };
        case TEXTOS_SUCCESS:
        return {
          ...state,
          textos: {
            ...state.textos,
            loading: false,
            error: false,
            data: payload,
          },
        };
      case TEXTOS_ERROR:
        return {
          ...state,
          textos: {
            ...state.textos,
            error: payload,
            loading: false,
            data: null
          },
        };
  
      case TEXTOS_RESET:
        return textosInitialState;
  
      default:
        return state;
    }
  };
  
  export default textos;