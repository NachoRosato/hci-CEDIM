import {
  LABORATORIO_LOADING,
  LABORATORIO_ERROR,
  LABORATORIO_LABNOMENCLADOR,
  LABORATORIO_ITEMSORDENHC,
  LABORATORIO_GRUPOESTUDIOSUSUARIO,
  LABORATORIO_GRUPOESTUDIOS,
  LABORATORIO_HISTORICO,
  LABORATORIO_PDF,
  LABORATORIO_RESETPDF,
  LABORATORIO_RESETHISTORICO,
  LABORATORIO_RESET,
  LABORATORIO_RESETPARCIAL,
  LABORATORIO_GUARDARORDEN,
  LABORATORIO_SETGRUPOESTUDIOSUSUARIO,
  LABORATORIO_SETGRUPOESTUDIOS,
  LABORATORIO_SETITEMSORDENHC,
  LABORATORIO_SETLABNOMENCLADOR,
  LABORATORIO_SETHISTORICO,
  LABORATORIO_INFORMESTRING,
  LABORATORIO_INFORMEANORMAL,
  LABORATORIO_LABORATORIOSPACIENTE,
  LABORATORIO_DATOSGRAFICO,
  LABORATORIO_COLUMNASGRAFICO,
  LABORATORIO_FILASGRAFICO,
  LABORATORIO_ESTUDIOSGRAFICO,
  LABORATORIO_RESETINFORME,
  RESET_CONTEXT,
} from "../ActionTypes";

import laboratorioInitialState from "../initialStates/laboratorioInitialState";

const laboratorio = (state, { payload, type }) => {
  switch (type) {
    case LABORATORIO_LOADING:
      return {
        ...state,
        laboratorio: {
          ...state.laboratorio,
          error: null,
          loading: true,
        },
      };
    case LABORATORIO_LABNOMENCLADOR:
      return {
        ...state,
        laboratorio: {
          ...state.laboratorio,
          loading: false,
          error: null,
          labNomenclador: payload,
        },
      };
    case LABORATORIO_SETLABNOMENCLADOR:
      return {
        ...state,
        laboratorio: {
          ...state.laboratorio,
          loading: false,
          error: null,
          labNomenclador: payload,
        },
      };
    case LABORATORIO_GUARDARORDEN:
      return {
        ...state,
        laboratorio: {
          ...state.laboratorio,
          loading: false,
          error: null,
          guardarOrden: payload,
        },
      };
    case LABORATORIO_ITEMSORDENHC:
      return {
        ...state,
        laboratorio: {
          ...state.laboratorio,
          loading: false,
          error: null,
          itemsOrdenHc: payload,
        },
      };
    case LABORATORIO_SETITEMSORDENHC:
      return {
        ...state,
        laboratorio: {
          ...state.laboratorio,
          loading: false,
          error: null,
          itemsOrdenHc: payload,
        },
      };
    case LABORATORIO_GRUPOESTUDIOSUSUARIO:
      return {
        ...state,
        laboratorio: {
          ...state.laboratorio,
          loading: false,
          error: null,
          grupoEstudiosUsuario: payload,
        },
      };
    case LABORATORIO_SETGRUPOESTUDIOSUSUARIO:
      return {
        ...state,
        laboratorio: {
          ...state.laboratorio,
          loading: false,
          error: null,
          grupoEstudiosUsuario: payload,
        },
      };
    case LABORATORIO_GRUPOESTUDIOS:
      return {
        ...state,
        laboratorio: {
          ...state.laboratorio,
          loading: false,
          error: null,
          grupoEstudios: payload,
        },
      };
    case LABORATORIO_SETGRUPOESTUDIOS:
      return {
        ...state,
        laboratorio: {
          ...state.laboratorio,
          loading: false,
          error: null,
          grupoEstudios: payload,
        },
      };
    case LABORATORIO_HISTORICO:
      return {
        ...state,
        laboratorio: {
          ...state.laboratorio,
          loading: false,
          error: null,
          historico: payload,
        },
      };
    case LABORATORIO_SETHISTORICO:
      return {
        ...state,
        laboratorio: {
          ...state.laboratorio,
          loading: false,
          error: null,
          historico: payload,
        },
      };
    case LABORATORIO_PDF:
      return {
        ...state,
        laboratorio: {
          ...state.laboratorio,
          loading: false,
          error: null,
          laboPdf: payload,
        },
      };
    case LABORATORIO_INFORMESTRING:
      return {
        ...state,
        laboratorio: {
          ...state.laboratorio,
          loading: false,
          error: null,
          labInforme: payload,
        },
      };
    case LABORATORIO_INFORMEANORMAL:
      return {
        ...state,
        laboratorio: {
          ...state.laboratorio,
          loading: false,
          error: null,
          labInformeAnormal: payload,
        },
      };
    case LABORATORIO_LABORATORIOSPACIENTE:
      return {
        ...state,
        laboratorio: {
          ...state.laboratorio,
          loading: false,
          error: null,
          laboratoriosPaciente: payload,
        },
      };
    case LABORATORIO_DATOSGRAFICO:
      return {
        ...state,
        laboratorio: {
          ...state.laboratorio,
          loading: false,
          error: null,
          datosGrafico: payload,
        },
      };
    case LABORATORIO_COLUMNASGRAFICO:
      return {
        ...state,
        laboratorio: {
          ...state.laboratorio,
          loading: false,
          error: null,
          columnasGrafico: payload,
        },
      };
    case LABORATORIO_FILASGRAFICO:
      return {
        ...state,
        laboratorio: {
          ...state.laboratorio,
          loading: false,
          error: null,
          filasGrafico: payload,
        },
      };
    case LABORATORIO_ESTUDIOSGRAFICO:
      return {
        ...state,
        laboratorio: {
          ...state.laboratorio,
          loading: false,
          error: null,
          estudiosGrafico: payload,
        },
      };
    case LABORATORIO_RESETPDF:
      return {
        ...state,
        laboratorio: {
          ...state.laboratorio,
          loading: false,
          error: null,
          laboPdf: null,
        },
      };
    case LABORATORIO_ERROR:
      return {
        ...state,
        laboratorio: {
          ...state.laboratorio,
          error: payload,
          loading: false,
          data: null,
        },
      };
    case LABORATORIO_RESETHISTORICO:
      return {
        ...state,
        laboratorio: {
          ...state.laboratorio,
          error: null,
          loading: false,
          historico: null,
        },
      };
    case LABORATORIO_RESETPARCIAL:
      return {
        ...state,
        laboratorio: {
          ...state.laboratorio,
          labInformeAnormal: null,
        },
      };
    case LABORATORIO_RESETINFORME:
      return {
        ...state,
        laboratorio: {
          ...state.laboratorio,
          labInforme: null,
        },
      };
    case LABORATORIO_RESET:
      return laboratorioInitialState;
    case RESET_CONTEXT:
      return laboratorioInitialState;

    default:
      return state;
  }
};

export default laboratorio;
