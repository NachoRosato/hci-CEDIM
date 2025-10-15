import {
  LOGIN_ERROR,
  LOGIN_LOADING,
  LOGIN_SETUSUARIO,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  TOKEN_VALIDATION,
  TOKEN_VALIDATION_FAIL,
  TOKEN_VALIDATION_SUCCESS,
  LOGIN_AGENDA,
  RESET_GLOBAL_CONTEXT,
} from "../ActionTypes";
// import authInitialState from "../initialStates/authInitialState";

const auth = (state, { payload, type }) => {
  switch (type) {
    case LOGIN_LOADING:
      return {
        ...state,
        auth: {
          ...state.auth,
          error: false,
          loading: true,
        },
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        auth: {
          ...state.auth,
          loading: false,
          error: false,
          data: payload,
        },
      };
    case LOGIN_ERROR:
      return {
        ...state,
        auth: {
          ...state.auth,
          error: payload,
          loading: false,
          data: null,
        },
      };
    case LOGIN_SETUSUARIO:
      return {
        ...state,
        auth: {
          ...state.auth,
          error: false,
          loading: false,
          data: payload,
        },
      };
    case LOGIN_AGENDA:
      return {
        ...state,
        auth: {
          ...state.auth,
          error: false,
          loading: false,
          data: payload,
        },
      };

    case TOKEN_VALIDATION:
      return {
        ...state,
        auth: {
          ...state.auth,
          loadingMobile: true,
        },
      };
    case TOKEN_VALIDATION_SUCCESS:
      return {
        ...state,
        auth: {
          ...state.auth,
          loadingMobile: false,
        },
      };
    case TOKEN_VALIDATION_FAIL:
      return {
        ...state,
        auth: {
          ...state.auth,
          loadingMobile: false,
        },
      };
    case LOGOUT_USER:
      return {
        auth: {
          authenticate: false,
          loading: false,
          error: null,
        },
      };
    case RESET_GLOBAL_CONTEXT:
      return {
        auth: {
          authenticate: false,
          loading: false,
          error: false,
        },
      };

    default:
      return state;
  }
};

export default auth;
