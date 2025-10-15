import React, { useEffect } from "react";
import ConsultaIcon from "global/assets/generico/ConsultaIcon";
import BuscadorOrden from "../BuscadorOrden/BuscadorOrden";
import CruzIcon from "global/assets/generico/CruzIcon";
import {
  ContainerDiagPres,
  ContainerDiagPresItems,
  DiagPresInputBox,
  DiagPresSelectBox,
  DiagPresTitleBox,
} from "./localStyle";

const DiagPresuntivo = ({
  diagPresArr,
  diagLista,
  onChangeBuscador,
  addNewItem,
  removeDeterAdc,
  ultimaConsulta,
}) => {
  useEffect(() => {
    if (ultimaConsulta !== null && ultimaConsulta !== "") {
      if (diagLista !== null) {
        let aux = diagLista.filter(
          (item) => item.descripcion.trim() === ultimaConsulta.trim()
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
          onChangeBuscador(diagPresDto);
        } else {
          addNewItem(ultimaConsulta);
        }
      }
    }
  }, [ultimaConsulta]);

  return (
    <>
      <ContainerDiagPres>
        <ContainerDiagPresItems>
          <DiagPresTitleBox>
            <span className="busqPaciente-avatar">
              <ConsultaIcon color={"var(--color-latex30)"}></ConsultaIcon>
            </span>
            <span className="busqPaciente-title rb16b c-latex30">
              {" "}
              Diagnóstico Presuntivo
            </span>
          </DiagPresTitleBox>
          <DiagPresInputBox className="ts_diagPres-dropdown">
            <BuscadorOrden
              datos={diagLista !== null ? diagLista : []}
              campoCodigo="descripcion"
              descripcion="descripcion"
              onChange={onChangeBuscador}
              campoAgenda="medico"
              campoEspecialidad="especialidad"
              widthLista={"100%"}
              autoFocus={false}
              origen={"CONSULTA_MEDICA"}
              placeholder={"ej. Colesterol LDL"}
              desactivarOnBlur={true}
              checkError={false}
              addNewItem={addNewItem}
              fondoAdjust={"ajustarFondoEvo"}
              positionBox={"ajustarBoxDesplegable"}
            />
          </DiagPresInputBox>

          {diagPresArr.length > 0 &&
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
            })}
        </ContainerDiagPresItems>
        {/* <ContainerDiagPresUltimo>
          <DiagPresUltimoTitleBox>
            <span className="busqPaciente-title rb16b c-latex30">
              {" "}
              Última consulta:
            </span>
          </DiagPresUltimoTitleBox>
          {ultimaConsulta !== null && ultimaConsulta !== "" ? (
            <DiagPresSelectedBox>
              <span className="rb16b c-white">{ultimaConsulta}</span>
            </DiagPresSelectedBox>
          ) : (
            <DiagPresSelectedBox>
              <span className="rb16b c-white">No posee</span>
            </DiagPresSelectedBox>
          )}
        </ContainerDiagPresUltimo> */}
      </ContainerDiagPres>
    </>
  );
};

export default DiagPresuntivo;
