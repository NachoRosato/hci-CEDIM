import {
  USUARIOROL_ERROR,
  USUARIOROL_LOADING,
  USUARIOROL_SUCCESS,
  USUARIOROL_ITEMEDITADO,
  RESET_GLOBAL_CONTEXT,
} from "../ActionTypes";
import { usuarioRolInitialState } from "../initialStates/usuarioRolInitialState";

const usuarioRol = (state, { payload, type }) => {
  switch (type) {
    case USUARIOROL_LOADING:
      return {
        ...state,
        usuarioRol: {
          ...state.usuarioRol,
          error: null,
          loading: true,
        },
      };
    case USUARIOROL_SUCCESS:
      return {
        ...state,
        usuarioRol: {
          ...state.usuarioRol,
          loading: false,
          error: null,
          data: payload,
        },
      };
    case USUARIOROL_ITEMEDITADO:
      return {
        ...state,
        usuarioRol: {
          ...state.usuarioRol,
          loading: false,
          error: null,
          arrayEditado: payload,
        },
      };
    case USUARIOROL_ERROR:
      return {
        ...state,
        usuarioRol: {
          ...state.usuarioRol,
          error: payload,
          loading: false,
          data: null,
        },
      };

    case RESET_GLOBAL_CONTEXT:
      return usuarioRolInitialState;

    default:
      return state;
  }
};

export default usuarioRol;
