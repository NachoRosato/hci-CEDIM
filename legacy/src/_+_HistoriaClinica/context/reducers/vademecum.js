import {
  VADEMECUM_LOADING,
  VADEMECUM_SUCCESS,
  VADEMECUM_ERROR,
  VADEMECUMBYID_LOADING,
  VADEMECUMBYID_SUCCESS,
  VADEMECUM_TIPO,
  VADEMECUMBYID_ERROR,
  VADEMECUMBYID_RESET,
  VADEMECUM_RESET,
} from "../ActionTypes";

import vademecumInitialState from "../initialStates/vademecumInitialState";

const vademecum = (state, { payload, type }) => {
  switch (type) {
    case VADEMECUM_LOADING:
      return {
        ...state,
        vademecum: {
          ...state.vademecum,
          error: null,
          loading: true,
        },
      };
    case VADEMECUM_SUCCESS:
      return {
        ...state,
        vademecum: {
          ...state.vademecum,
          loading: false,
          error: null,
          data: payload,
        },
      };
    case VADEMECUM_TIPO:
      return {
        ...state,
        vademecum: {
          ...state.vademecum,
          loading: false,
          error: null,
          tipoVademecum: payload,
        },
      };
    case VADEMECUM_ERROR:
      return {
        ...state,
        vademecum: {
          ...state.vademecum,
          error: payload,
          loading: false,
          data: null,
        },
      };
    case VADEMECUMBYID_LOADING:
      return {
        ...state,
        selected: {
          ...state.selected,
          error: null,
          loading: true,
        },
      };
    case VADEMECUMBYID_SUCCESS:
      return {
        ...state,
        selected: {
          ...state.selected,
          loading: false,
          error: null,
          data: payload,
        },
      };
    case VADEMECUMBYID_ERROR:
      return {
        ...state,
        selected: {
          ...state.selected,
          error: payload,
          loading: false,
          data: null,
        },
      };
    case VADEMECUMBYID_RESET:
      return {
        ...state,
        selected: {
          ...state.selected,
          error: null,
          loading: false,
          data: null,
        },
      };
    case VADEMECUM_RESET:
      return vademecumInitialState;

    default:
      return state;
  }
};

export default vademecum;
