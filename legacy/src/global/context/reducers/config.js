import {
  JSONCONFIG_SUCCESS,
} from "../ActionTypes";

const config = (state, { payload, type }) => {
  switch (type) {
    case JSONCONFIG_SUCCESS:
      return {
        ...state,
        config: {
          data: payload,
        },
      };
    default:
      break;
  }
};

export default config;
