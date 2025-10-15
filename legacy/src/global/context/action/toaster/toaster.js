import { TOASTER_HIDE, TOASTER_SHOW } from "../../ActionTypes";

export const showToaster = ( params,posicion) => (dispatch) => {
  dispatch({
    type: TOASTER_SHOW,
    payload: {      
      params: params,      
      posicion:posicion
    },
  });
};

export const hideToaster = () => (dispatch) => {
  dispatch({
    type: TOASTER_HIDE,
  });
};