import {
  PACIENTE_LOADING,
  PACIENTE_ERROR,
  PACIENTE_BUSCARPAC,
  PACIENTE_ESTUDIOS,
  PACIENTE_INFORMES,
  PACIENTE_DATOCONFIDENCIAL,
  PACIENTE_INFHISTORICO,
  PACIENTE_RESET,
  PACIENTE_RESETESTUDIOS,
  PACIENTE_RESETINFORMES,
  PACIENTE_SETPACIENTEBUSQ,
  PACIENTE_RESET_INFHISTORICO,
  PACIENTE_SETESTUDIOS,
  PACIENTE_SETINFHISTORICO,
  PACIENTE_SETINFORMES,
  PACIENTE_SETDATOCONFIDENCIAL,
  RESET_CONTEXT,
} from "../ActionTypes";

import pacienteInitiaState from "../initialStates/pacienteInitialState";

const paciente = (state, { payload, type }) => {
  switch (type) {
    case PACIENTE_LOADING:
      return {
        ...state,
        paciente: {
          ...state.paciente,
          error: null,
          loading: true,
        },
      };
    case PACIENTE_BUSCARPAC:
      return {
        ...state,
        paciente: {
          ...state.paciente,
          loading: false,
          error: null,
          buscarPac: payload,
        },
      };
    case PACIENTE_SETPACIENTEBUSQ:
      return {
        ...state,
        paciente: {
          ...state.paciente,
          loading: false,
          error: null,
          buscarPac: { ...state.paciente.buscarPac, value: payload },
        },
      };
    case PACIENTE_ESTUDIOS:
      return {
        ...state,
        paciente: {
          ...state.paciente,
          loading: false,
          error: null,
          estudiosPac: payload,
        },
      };
    case PACIENTE_SETESTUDIOS:
      return {
        ...state,
        paciente: {
          ...state.paciente,
          loading: false,
          error: null,
          estudiosPac: payload,
        },
      };
    case PACIENTE_INFORMES:
      return {
        ...state,
        paciente: {
          ...state.paciente,
          loading: false,
          error: null,
          informesPac: payload,
        },
      };
    case PACIENTE_SETINFORMES:
      return {
        ...state,
        paciente: {
          ...state.paciente,
          loading: false,
          error: null,
          informesPac: payload,
        },
      };
    case PACIENTE_DATOCONFIDENCIAL:
      return {
        ...state,
        paciente: {
          ...state.paciente,
          loading: false,
          error: null,
          datosConf: payload,
        },
      };
    case PACIENTE_SETDATOCONFIDENCIAL:
      return {
        ...state,
        paciente: {
          ...state.paciente,
          loading: false,
          error: null,
          datosConf: payload,
        },
      };
    case PACIENTE_INFHISTORICO:
      return {
        ...state,
        paciente: {
          ...state.paciente,
          loading: false,
          error: null,
          laboHisInformes: payload,
        },
      };
    case PACIENTE_SETINFHISTORICO:
      return {
        ...state,
        paciente: {
          ...state.paciente,
          loading: false,
          error: null,
          laboHisInformes: payload,
        },
      };
    case PACIENTE_ERROR:
      return {
        ...state,
        paciente: {
          ...state.paciente,
          error: payload,
          loading: false,
          data: null,
        },
      };
    case PACIENTE_RESETESTUDIOS:
      return {
        ...state,
        paciente: {
          ...state.paciente,
          error: null,
          loading: false,
          estudiosPac: null,
        },
      };
    case PACIENTE_RESETINFORMES:
      return {
        ...state,
        paciente: {
          ...state.paciente,
          error: null,
          loading: false,
          informesPac: null,
        },
      };
    case PACIENTE_RESET_INFHISTORICO:
      return {
        ...state,
        paciente: {
          ...state.paciente,
          error: null,
          loading: false,
          laboHisInformes: null,
        },
      };

    case PACIENTE_RESET:
      return pacienteInitiaState;
    case RESET_CONTEXT:
      return pacienteInitiaState;

    default:
      return state;
  }
};

export default paciente;
