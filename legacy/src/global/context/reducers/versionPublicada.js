import { VERSION_PUBLICADA_ERROR, VERSION_PUBLICADA_LOADING, VERSION_PUBLICADA_RESET, VERSION_PUBLICADA_SUCCESS } from "../ActionTypes";
import versionPublicadaInitialState from "../initialStates/versionInitialState";

const versionPublicada = (state, { payload, type }) => {
  switch (type) {
    case VERSION_PUBLICADA_LOADING:
      return {
        ...state,
        versionPublicada: {
          ...state.versionPublicada,
          error: false,
          loading: true,
        },
      };
    case VERSION_PUBLICADA_SUCCESS:
      return {
        ...state,
        versionPublicada: {
          ...state.versionPublicada,
          loading: false,
          error: false,
          data: payload,
        },
      };
    case VERSION_PUBLICADA_ERROR:
      return {
        ...state,
        versionPublicada: {
          ...state.versionPublicada,
          error: payload,
          loading: false,
          data: null,
        },
      };

    case VERSION_PUBLICADA_RESET:
      return versionPublicadaInitialState;

    default:
      return state;
  }
};

export default versionPublicada;
