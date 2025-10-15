import {
  SNOMED_LOADING,
  SNOMED_FSNITEM,
  SNOMED_ERROR,
  SNOMED_RESETDATA,
} from "../../ActionTypes";

import axiosSnomed from "global/helpers/axiosSnomed";

export const wsGetFsnSnomed = (term) => (dispatch) => {
  dispatch({
    type: SNOMED_LOADING,
  });

  axiosSnomed().then((respuesta) => {
    respuesta
      .get(
        `browser/MAIN/descriptions?&limit=100&term=${term}&active=true&conceptActive=true&language=es&semanticTags=trastorno&semanticTags=hallazgo&groupByConcept=true`
      )
      .then((res) => {
        dispatch({
          type: SNOMED_FSNITEM,
          payload: res.data,
        });
      })
      .catch((err) => {
        let error = {
          detail: err.response
            ? err.response.data
            : "Error al contactar el server.",
        };

        dispatch({
          type: SNOMED_ERROR,
          payload: error,
        });
      });
  });
};

export const resetSnomed = () => (dispatch) => {
  dispatch({
    type: SNOMED_RESETDATA,
  });
};
