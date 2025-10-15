import { MODAL_HIDE, MODAL_SHOW, RESET_GLOBAL_CONTEXT } from "../ActionTypes";

import modalInitialState from "../initialStates/modalInitialState";

const modal = (state, { payload, type }) => {
  switch (type) {
    case MODAL_HIDE:
      return modalInitialState;
    case RESET_GLOBAL_CONTEXT:
      return modalInitialState;
    case MODAL_SHOW:
      return {
        modal: {
          show: true,
          data: payload,
        },
      };
    default:
      return state;
  }
};

export default modal;
