import { SEGUNDOMODAL_HIDE, SEGUNDOMODAL_SHOW } from "../../ActionTypes";

export const showSegundoModal = (component,title, dissmiss, headerState, listBotones,posicion,bloquearDissmiss ) => (dispatch) => {
  dispatch({
    type: SEGUNDOMODAL_SHOW,
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

export const hideSegundoModal = () => (dispatch) => {
  dispatch({
    type: SEGUNDOMODAL_HIDE,
  });
};
