import { createContext, useEffect, useReducer } from "react";
import AbmInitialState from "./initialStates/abm";
import pacienteInitiaState from "./initialStates/pacienteInitialState";
import evolucionInitialState from "./initialStates/evolucionInitialState";
import laboratorioInitialState from "./initialStates/laboratorioInitialState";
import abreviaturaInitialState from "./initialStates/abreviaturaInitialState";
import medicamentoInitialState from "./initialStates/medicamento";
import estudioInitialState from "./initialStates/estudio";
import tiposInitialState from "./initialStates/tiposInitialState";
import diagnosticoInitialState from "./initialStates/diagnosticoInitialState";
import seguimientoInitialState from "./initialStates/seguimientoInitialState";
import informeInitialState from "./initialStates/informeInitialState";
import ordenPracticaInitialState from "./initialStates/ordenPracticaInitialState";
import examenInitialState from "./initialStates/examenInitialState";
import vademecumInitialState from "./initialStates/vademecumInitialState";
import snomedInitialState from "./initialStates/snomedInitialState";
import auditSnomedInitialState from "./initialStates/auditoriaSnomedInitialState";
import recetaDigitalInitialState from "./initialStates/recetaDigitalInitialState";
import hcDigitalizadaInitialState from "./initialStates/hcDigitalizadaInitialState";
import resumenIAInitialState from "./initialStates/resumenIAInitialState";
import ordenPractica from "./reducers/ordenPractica";
import informe from "./reducers/informe";
import seguimiento from "./reducers/seguimiento";
import diagnostico from "./reducers/diagnostico";
import tipos from "./reducers/tipos";
import estudio from "./reducers/estudio";
import medicamento from "./reducers/medicamento";
import abreviatura from "./reducers/abreviatura";
import laboratorio from "./reducers/laboratorio";
import evolucion from "./reducers/evolucion";
import paciente from "./reducers/paciente";
import abm from "./reducers/abm";
import examen from "./reducers/examen";
import vademecum from "./reducers/vademecum";
import snomed from "./reducers/snomed";
import auditoriaSnomed from "./reducers/auditoriaSnomed";
import recetaDigital from "./reducers/recetaDigital";
import hcDigitalizada from "./reducers/hcDigitalizada";
import resumenIA from "./reducers/resumenIA";

import { RESET_CONTEXT } from "./ActionTypes";

export const HistoriaClinicaContext = createContext();

export const HistoriaClinicaProvider = ({ children }) => {
  const [abmState, abmDispatch] = useReducer(abm, AbmInitialState);
  const [pacienteState, pacienteDispatch] = useReducer(paciente, [], () => {
    const localData = sessionStorage.paciente;
    return localData ? JSON.parse(localData) : pacienteInitiaState;
  });
  const [evolucionState, evolucionDispatch] = useReducer(
    evolucion,
    evolucionInitialState
  );
  const [laboratorioState, laboratorioDispatch] = useReducer(
    laboratorio,
    laboratorioInitialState
  );
  const [abreviaturaState, abreviaturaDispatch] = useReducer(
    abreviatura,
    abreviaturaInitialState
  );
  const [medicamentoState, medicamentoDispatch] = useReducer(
    medicamento,
    medicamentoInitialState
  );
  const [estudioState, estudioDispatch] = useReducer(
    estudio,
    estudioInitialState
  );
  const [tiposState, tiposDispatch] = useReducer(tipos, tiposInitialState);
  const [diagnosticoState, diagnosticoDispatch] = useReducer(
    diagnostico,
    diagnosticoInitialState
  );
  const [seguimientoState, seguimientoDispatch] = useReducer(
    seguimiento,
    seguimientoInitialState
  );
  const [informeState, informeDispatch] = useReducer(
    informe,
    informeInitialState
  );
  const [ordenPracticaState, ordenPracticaDispatch] = useReducer(
    ordenPractica,
    ordenPracticaInitialState
  );
  const [examenState, examenDispatch] = useReducer(examen, examenInitialState);
  const [vademecumState, vademecumDispatch] = useReducer(
    vademecum,
    vademecumInitialState
  );
  const [snomedState, snomedDispatch] = useReducer(snomed, snomedInitialState);
  const [auditSnomedState, auditSnomedDispatch] = useReducer(
    auditoriaSnomed,
    auditSnomedInitialState
  );
  const [recetaDigitalState, recetaDigitalDispatch] = useReducer(
    recetaDigital,
    recetaDigitalInitialState
  );
  const [hcDigitalizadaState, hcDigitalizadaDispatch] = useReducer(
    hcDigitalizada,
    hcDigitalizadaInitialState
  );
  const [resumenIAState, resumenIADispatch] = useReducer(
    resumenIA,
    resumenIAInitialState
  );

  useEffect(() => {
    sessionStorage.paciente = JSON.stringify(pacienteState);
  }, [pacienteState]);

  //RESET CONTEXT
  const arrayDispatch = [
    abmDispatch,
    pacienteDispatch,
    evolucionDispatch,
    laboratorioDispatch,
    abreviaturaDispatch,
    medicamentoDispatch,
    estudioDispatch,
    tiposDispatch,
    diagnosticoDispatch,
    seguimientoDispatch,
    informeDispatch,
    ordenPracticaDispatch,
    examenDispatch,
    vademecumDispatch,
    snomedDispatch,
    auditSnomedDispatch,
    recetaDigitalDispatch,
    hcDigitalizadaDispatch,
    resumenIADispatch,
  ];

  const sessionStorageExclusion = [];
  const localStorageExclusion = ["config"];

  const limpiarStorage = (sessionExcepcion, localExcepcion) => {
    //limpiar sessionStorage
    if (Object.keys(sessionStorage).length > 0) {
      Object.keys(sessionStorage).map(
        (key) =>
          !sessionExcepcion.includes(key) && sessionStorage.removeItem(key)
      );
    }
    //limpiar localStorage
    if (Object.keys(localStorage).length > 0) {
      Object.keys(localStorage).map(
        (key) => !localExcepcion.includes(key) && localStorage.removeItem(key)
      );
    }
  };

  const resetHcContext = (index) => {
    if (Array.isArray(arrayDispatch)) {
      if (index >= arrayDispatch.length) {
        limpiarStorage(sessionStorageExclusion, localStorageExclusion);
        return;
      }
      const dispatch = arrayDispatch[index];
      dispatch({ type: RESET_CONTEXT });
      resetHcContext(index + 1);
    }
  };

  return (
    <HistoriaClinicaContext.Provider
      value={{
        abmState,
        abmDispatch,
        pacienteState,
        pacienteDispatch,
        evolucionState,
        evolucionDispatch,
        laboratorioState,
        laboratorioDispatch,
        abreviaturaState,
        abreviaturaDispatch,
        medicamentoState,
        medicamentoDispatch,
        estudioState,
        estudioDispatch,
        tiposState,
        tiposDispatch,
        diagnosticoState,
        diagnosticoDispatch,
        seguimientoState,
        seguimientoDispatch,
        informeState,
        informeDispatch,
        ordenPracticaState,
        ordenPracticaDispatch,
        examenState,
        examenDispatch,
        vademecumState,
        vademecumDispatch,
        snomedState,
        snomedDispatch,
        auditSnomedState,
        auditSnomedDispatch,
        recetaDigitalState,
        recetaDigitalDispatch,
        hcDigitalizadaState,
        hcDigitalizadaDispatch,
        resumenIAState,
        resumenIADispatch,
        resetHcContext,
      }}
    >
      {children}
    </HistoriaClinicaContext.Provider>
  );
};
