import { CHANGE_MODE } from "../ActionTypes";

const mode = (state, { payload, type }) => {
    switch (type) {
        case CHANGE_MODE:
            return {
                ...state,
                mode: {
                    ...state.mode,
                    darkMode : !state.mode.darkMode
                }
            }
    
        default: 
        return state
    }
}

export default mode;