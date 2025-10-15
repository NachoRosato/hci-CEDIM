import {
  ALL_SELECTED_ITEM,
  DELETE_ABM,
  DELETE_ABM_FAIL,
  DELETE_ABM_SUCCESS,
  GET_ABM,
  GET_ABM_FAIL,
  GET_ABM_SUCCESS,
  POST_ABM,
  POST_ABM_FAIL,
  POST_ABM_SUCCESS,
  PUT_ABM,
  PUT_ABM_FAIL,
  PUT_ABM_SUCCESS,
  RESET_CONTEXT,
  SELECTED_ITEM,
} from "../ActionTypes";
import AbmInitialState from "../initialStates/abm";

const abm = (state, { payload, type }) => {
  switch (type) {
    case GET_ABM:
      return {
        ...state,
        abm: {
          data: false,
          loading: true,
          error: false,
        },
      };
    case GET_ABM_SUCCESS:
      return {
        ...state,
        abm: {
          data: payload,
          loading: false,
          error: false,
        },
      };
    case GET_ABM_FAIL:
      return {
        ...state,
        abm: {
          data: false,
          loading: false,
          error: payload.message,
        },
      };

    case ALL_SELECTED_ITEM:
      return {
        ...state,
        abm: {
          ...state.abm,
          selectedItem: "ALL",
        },
      };
    case SELECTED_ITEM:
      return {
        ...state,
        abm: {
          ...state.abm,
          selectedItem: payload,
        },
      };
    case POST_ABM:
      return {
        ...state,
        abm: {
          loading: true,
          data: false,
          error: false,
        },
      };
    case POST_ABM_SUCCESS:
      return {
        ...state,
        abm: {
          loading: false,
          data: payload,
          error: false,
        },
      };
    case POST_ABM_FAIL:
      return {
        ...state,
        abm: {
          loading: false,
          data: payload,
          error: payload.message,
        },
      };
    case DELETE_ABM:
      return {
        ...state,
        abm: {
          loading: true,
          data: false,
          error: false,
        },
      };
    case DELETE_ABM_SUCCESS:
      return {
        ...state,
        abm: {
          loading: false,
          data: payload,
          error: false,
        },
      };
    case DELETE_ABM_FAIL:
      return {
        ...state,
        abm: {
          loading: false,
          data: payload,
          error: payload.message,
        },
      };
    case PUT_ABM:
      return {
        ...state,
        abm: {
          loading: true,
          data: false,
          error: false,
        },
      };
    case PUT_ABM_SUCCESS:
      return {
        ...state,
        abm: {
          loading: false,
          data: payload,
          error: false,
        },
      };
    case PUT_ABM_FAIL:
      return {
        ...state,
        abm: {
          loading: false,
          data: payload,
          error: payload.message,
        },
      };
    case RESET_CONTEXT:
      return AbmInitialState
    default:
      return state;
  }
};

export default abm;
