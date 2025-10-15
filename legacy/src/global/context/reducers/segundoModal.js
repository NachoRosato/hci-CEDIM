import { RESET_GLOBAL_CONTEXT, SEGUNDOMODAL_HIDE, SEGUNDOMODAL_SHOW } from "../ActionTypes";

import { segundoModalInitialState } from "../initialStates/segundoModalInitialState";

const segundoModal = (state, { payload, type }) => {
  switch (type) {
    case SEGUNDOMODAL_HIDE:
      return segundoModalInitialState;
    case RESET_GLOBAL_CONTEXT:
      return segundoModalInitialState;
    case SEGUNDOMODAL_SHOW:
      return {
        segundoModal: {
          show: true,
          data: payload,
        },
      };
    default:
      return state;
  }
};

export default segundoModal;
