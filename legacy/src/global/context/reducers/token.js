import {
    TOKEN_ERROR,
    TOKEN_LOADING,
    TOKEN_SUCCESS,
    TOKEN_LOGOUT,
    RESET_GLOBAL_CONTEXT,
  } from "../ActionTypes";
  
  import tokenInitialState from "../initialStates/tokenInitialState";
  
  const token = (state, { payload, type }) => {
    switch (type) {
      case TOKEN_LOADING:
        return {
          ...state,
          token: {
            ...state.token,
            error: false,
            loading: true,
          },
        };
      case TOKEN_SUCCESS:
        return {
          ...state,
          token: {
            ...state.token,
            loading: false,
            error: false,
            data: payload,
          },
        };
      case TOKEN_ERROR:
        return {
          ...state,
          token: {
            ...state.token,
            error: payload,
            loading: false,
          },
        };
  
      case TOKEN_LOGOUT:
        return tokenInitialState;
      case RESET_GLOBAL_CONTEXT:
        return tokenInitialState;
  
      default:
        return state;
    }
  };
  
  export default token;