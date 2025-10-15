import {
    ESTUDIO_LOADING,
    ESTUDIO_ERROR,
    ESTUDIO_SUCCESS,
    ESTUDIO_RESET,
    RESET_CONTEXT
  } from "../ActionTypes";

  import estudioInitialState from "../initialStates/estudio";
  
  const estudio = (state, { payload, type }) => {
    switch (type) {
      case ESTUDIO_LOADING:
        return {
          ...state,
          estudio: {
            ...state.estudio,
            error: null,
            loading: true,
          },
        };
      case ESTUDIO_SUCCESS:
        return {
          ...state,
          estudio: {
            ...state.estudio,
            loading: false,
            error: null,
            data: payload,
          },
        };
      case ESTUDIO_ERROR:
        return {
          ...state,
          estudio: {
            ...state.estudio,
            error: payload,
            loading: false,
            data: null,
          },
        };
      case ESTUDIO_RESET:
        return estudioInitialState;
      case RESET_CONTEXT:
        return estudioInitialState;
  
      default:
        return state;
    }
  };
  
  export default estudio;