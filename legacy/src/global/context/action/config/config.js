import { JSONCONFIG_SUCCESS } from "../../ActionTypes";

export const guardarJsonConfig = ( json ) => (dispatch) => {
  dispatch({
    type: JSONCONFIG_SUCCESS,
    payload: json,
  });
};