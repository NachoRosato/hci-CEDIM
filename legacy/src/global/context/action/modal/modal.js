import { MODAL_HIDE, MODAL_SHOW } from "../../ActionTypes";

export const showModal = (component,title, dissmiss, headerState, listBotones,posicion,bloquearDissmiss ) => (dispatch) => {
  dispatch({
    type: MODAL_SHOW,
    payload: {
      component: component,
      title: title,
      dissmiss: dissmiss,
      headerState: headerState,
      listBotones:listBotones,
      posicion:posicion,
      bloquearDissmiss: bloquearDissmiss,
    },
  });
};

export const hideModal = () => (dispatch) => {
  dispatch({
    type: MODAL_HIDE,
  });
};
