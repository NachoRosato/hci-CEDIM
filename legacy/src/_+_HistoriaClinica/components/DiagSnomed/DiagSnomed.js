import React, { useContext, useEffect, useState } from "react";
import ConsultaIcon from "global/assets/generico/ConsultaIcon";
import {
  ContainerDiagPres,
  ContainerDiagPresItems,
  DiagMasBtn,
  DiagnosticosBox,
  DiagPresSelectBox,
  DiagPresTitleBox,
} from "./localStyle";
import { HistoriaClinicaContext } from "_+_HistoriaClinica/context/Provider";
import { GlobalContext } from "global/context/Provider";
import CruzIcon from "global/assets/generico/CruzIcon";
import DropdownHC from "global/components/genericos/DropdownHC/DropdownHC";
import AskMarkLitIcon from "global/assets/generico/AskMarkLitIcon";
import TooltipV2 from "global/components/genericos/TooltipV2/TooltipV2";
import { updateEvoEditIndexDB } from "_+_HistoriaClinica/pages/Evolucion/EvolucionFun";

const DiagSnomed = ({
  removeDeterAdc,
  diagPresArr,
  onChangeDiagPres,
  setDiagPresArr,
  addNewItem,
  diagLista,
  setEnfermedadesAntecedentesLista,
  flgDiagFBack,
  setFlgDiagFBack,
  flgEnfYAntcBack,
  showDiagnosticos,
  setFlgEnfYAntcBack,
}) => {
  const { evolucionState, pacienteState } = useContext(HistoriaClinicaContext);
  const { authState } = useContext(GlobalContext);

  let itemInf = JSON.parse(localStorage.getItem("itemInfo"));

  //funcion async para cargar la edicion local
  async function asyncUpdEdicionIDB(key, ref, obj) {
    try {
      const response = await updateEvoEditIndexDB(key, ref, obj);
      if (response !== null) {
        //ok sin respuesta
      }
    } catch (error) {
      //no necesita
    }
  }

  const handleSelectItem = (e) => {
    onChangeDiagPres(e);
  };

  // Función para agregar un diagnóstico manualmente
  const handleAddItem = (query) => {
    const newItem = {
      descripcion: query,
      id: null, // No tiene id porque no viene de la base de datos
      idDiagnostico: null,
      idEvolucion: 0,
      manual: true, // Indicador de que fue agregado manualmente
      texto: query,
    };
    setDiagPresArr((prevArr) => [...prevArr, newItem]);
  };

  // Ciclo para cargar los diagnósticos presuntivos
  useEffect(() => {
    if (
      evolucionState.evolucion.actual !== null &&
      evolucionState.evolucion.actual.value !== null
    ) {
      //proceso diag en cero (sin modificar)
      if (flgDiagFBack) {
        if (
          evolucionState.evolucion.actual.value.listDiagnosEvoSnomed !== null
        ) {
          let diagAux =
            evolucionState.evolucion.actual.value.listDiagnosEvoSnomed;

          // hacer un foreach para agregar el id y texto
          diagAux = diagAux.map((item) => {
            return {
              ...item,
              texto: item.descripcion,
              idusuarioctrl: authState.auth.data.value.usuario,
              idusuarioctrl_desc: `${authState.auth.data.value.nombre} ${authState.auth.data.value.apellido}`,
            };
          });
          // diagAux[0] = {
          //   ...diagAux[0],
          //   texto:
          //     evolucionState.evolucion.actual.value.listDiagnosEvoSnomed[0]
          //       .descripcion,
          //   idusuarioctrl: authState.auth.data.value.usuario,
          //   idusuarioctrl_desc: `${authState.auth.data.value.nombre} ${authState.auth.data.value.apellido}`,
          // };
          setDiagPresArr(diagAux);
          setFlgDiagFBack(false);
        } else if (
          itemInf.diagPresuntivo !== null &&
          itemInf.diagPresuntivo !== "" &&
          itemInf.diagPresuntivo !== undefined
        ) {
          //sin snomed, dirijo hacia diagnosticos agregados.
          if (diagLista !== null) {
            let aux = diagLista.filter(
              (item) =>
                item.descripcion.trim() === itemInf.diagPresuntivo.trim()
            );
            if (aux.length > 0) {
              let diagPresDto = {
                descripcion: aux[0].descripcion,
                id: aux[0].id,
                idDiagnostico: null,
                idEvolucion: 0,
                manual: null,
                nuevo: null,
                texto: aux[0].descripcion,
              };
              setDiagPresArr([diagPresDto]);
            } else {
              addNewItem(itemInf.diagPresuntivo);
            }
            setFlgDiagFBack(false);
          }
        }
      }
      //fin proceso diag de cero(sin modificar)
    }
  }, [evolucionState.evolucion.actual, flgDiagFBack]);
  //fin ciclo para cargar los diagnósticos presuntivos

  //ciclo enf y antc diagnosticos
  useEffect(() => {
    if (
      pacienteState.paciente.buscarPac !== null &&
      pacienteState.paciente.buscarPac.value.length > 0 &&
      evolucionState.evolucion.actual !== null &&
      evolucionState.evolucion.actual.value !== null &&
      flgEnfYAntcBack
    ) {
      //diagnosticos viejos del pac
      let auxDiagsFinal = [];
      if (pacienteState.paciente.buscarPac.value[0].diagnosticosDto !== null) {
        let auxDiags =
          pacienteState.paciente.buscarPac.value[0].diagnosticosDto;
        let auxFiltrado = [];
        for (let i = 0; i < auxDiags.length; i++) {
          let eDiag = auxDiags[i];
          if (eDiag.texto !== undefined) {
            eDiag.display = eDiag.texto;
          }
          auxFiltrado.push(eDiag);
        }
        auxDiagsFinal = auxFiltrado;
      }
      //proceso para enf y antc snomed del pac
      if (evolucionState.evolucion.actual.value.enfermedadesAntecedentes) {
        let auxEnf =
          evolucionState.evolucion.actual.value.enfermedadesAntecedentes;
        auxEnf = auxEnf.filter((item) => item.idSnomed !== null);
        auxDiagsFinal = auxDiagsFinal.concat(auxEnf);
      }
      asyncUpdEdicionIDB(5, "enfYAntc", auxDiagsFinal);
      setEnfermedadesAntecedentesLista(auxDiagsFinal);
      setFlgDiagFBack(false);
    }
  }, [
    pacienteState.paciente.buscarPac,
    evolucionState.evolucion.actual,
    flgEnfYAntcBack,
  ]);
  //fin ciclo enf y antc diagnosticos

  return (
    <>
      <ContainerDiagPres>
        <ContainerDiagPresItems>
          <DiagPresTitleBox>
            <div className="busqPaciente-avatar">
              <ConsultaIcon color={"var(--color-latex30)"}></ConsultaIcon>
            </div>
            <div className="busqPaciente-title rb16b c-latex30">
              Diagnóstico presuntivo
            </div>
            <div style={{ paddingTop: 2, paddingLeft: 0 }} className="pointer">
              <TooltipV2
                csBoxWidth={289}
                csRadius={16}
                children={<AskMarkLitIcon color={"var(--color-latex30)"} />}
                detalle={
                  <p
                    className="rb12tl"
                    style={{ textAlign: "left", padding: 5 }}
                  >
                    Indicar cual es el diagnóstico presuntivo como conclusión de
                    la evolución.
                  </p>
                }
              />
            </div>
          </DiagPresTitleBox>

          {/* Dropdown para seleccionar o agregar diagnóstico */}
          <DropdownHC
            handleSelectItem={handleSelectItem}
            handleAddItem={handleAddItem} // Agregar la opción de añadir
            posTop={true}
            customHeight={400}
            customContWidth={diagPresArr.length <= 1 ? 300 : 160}
            customItemWidth={diagPresArr.length <= 1 ? 300 : 240}
            blockAgregar={true}
          />

          {/* Lista de diagnósticos presuntivos seleccionados */}
          {/* {diagPresArr.length > 0 &&
            diagPresArr.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <DiagPresSelectBox>
                    <div className="diagPresSelectBox-desc rb16b c-white">
                      {item.texto}
                    </div>
                    <div
                      className="diagPresSelectBox-ajusteX pointer ts_diagPres_del-item"
                      onClick={() => removeDeterAdc(item)}
                    >
                      <CruzIcon color={"var(--color-white)"}></CruzIcon>
                    </div>
                  </DiagPresSelectBox>
                </React.Fragment>
              );
            })} */}
          {diagPresArr?.length > 0 && (
            <>
              {diagPresArr.slice(0, 2).map((item, index) => (
                <React.Fragment key={index}>
                  <DiagPresSelectBox oneElement={diagPresArr.length === 1}>
                    <div className="diagPresSelectBox-desc rb16b c-white">
                      {item.texto}
                    </div>
                    <div
                      className="diagPresSelectBox-ajusteX pointer ts_diagPres_del-item"
                      onClick={() => removeDeterAdc(item)}
                    >
                      <CruzIcon color={"var(--color-white)"} />
                    </div>
                  </DiagPresSelectBox>
                </React.Fragment>
              ))}

              {diagPresArr?.length > 2 && (
                <DiagMasBtn
                  onClick={() => showDiagnosticos()}
                  className="pointer"
                >
                  <div className="diagPresSelectBox-desc rb16b c-white">
                    +{diagPresArr.length - 2}
                  </div>
                </DiagMasBtn>
              )}
            </>
          )}
        </ContainerDiagPresItems>
      </ContainerDiagPres>
    </>
  );
};

export default DiagSnomed;
