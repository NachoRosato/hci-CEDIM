import { CHANGE_MODE } from "../../ActionTypes";

export const changeMode = () => (dispatch) => {
    dispatch({type: CHANGE_MODE});
}