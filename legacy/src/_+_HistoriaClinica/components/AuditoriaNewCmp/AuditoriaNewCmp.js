import React, { useContext, useEffect, useState } from "react";
import {
  AuditoriaNewCmpContainer,
  BtnCerrar,
  BtnContainer,
  DiagBtn,
  DiagBtnContainer,
  DiagContainer,
  DiagDropContainer,
  DiagTagContainer,
  DiagTextContainer,
  DiagTitleContainer,
  EvoContainer,
  MainContainer,
  TitleContainer,
} from "./localStyle";
import DropdownAudit from "../DropdownAudit/DropdownAudit";
import { IonSpinner } from "@ionic/react";
import { HistoriaClinicaContext } from "_+_HistoriaClinica/context/Provider";

const AuditoriaNewCmp = ({
  itemInfo,
  exitModal,
  reemplazarDiag,
  onChangeDiag,
}) => {
  const { auditSnomedState } = useContext(HistoriaClinicaContext);
  const [evoHtml, setEvoHtml] = useState(null);

  useEffect(() => {
    if (auditSnomedState.auditSnomed.evoHtml !== null) {
      if (auditSnomedState.auditSnomed.evoHtml.value) {
        setEvoHtml(auditSnomedState.auditSnomed.evoHtml.value.evolucionHtml);
      }
    }
  }, [auditSnomedState.auditSnomed.evoHtml]);

  return (
    <>
      <AuditoriaNewCmpContainer>
        <TitleContainer className="rb20nh c-latex30">
          Evolución del paciente
        </TitleContainer>
        <MainContainer>
          <EvoContainer>
            {evoHtml !== null ? (
              <div dangerouslySetInnerHTML={{ __html: evoHtml }} />
            ) : (
              <IonSpinner name="lines-small" />
            )}
          </EvoContainer>
          <DiagContainer>
            <DiagTitleContainer className="rb20nh c-latex30">
              Diagnóstico ingresado:
            </DiagTitleContainer>
            <DiagTagContainer className="c-white rb16mb">
              <span>{itemInfo.descripcion}</span>
            </DiagTagContainer>
            <DiagTextContainer className="c-latex30 rb14mb">
              Si el diagnóstico utilizado es un sinónimo de otro exsitente,
              buscarlo y tocar “Reemplazar”. Si es un diangóstico que no existe
              y se desea agregar, hacerlo mediante el botón “Crear Nuevo”
            </DiagTextContainer>
            <DiagDropContainer>
              <DropdownAudit
                handleSelectItem={onChangeDiag}
                posTop={false}
                customHeight={32}
                blockAgregar={false}
                customContWidth={377}
              />
            </DiagDropContainer>
            <DiagBtnContainer>
              <DiagBtn
                className="rb16b c-white pointer"
                onClick={() => reemplazarDiag(itemInfo)}
              >
                Reemplazar
              </DiagBtn>
            </DiagBtnContainer>
          </DiagContainer>
        </MainContainer>
        <BtnContainer>
          <BtnCerrar className="pointer rb16mb" onClick={exitModal}>
            Cerrar
          </BtnCerrar>
        </BtnContainer>
      </AuditoriaNewCmpContainer>
    </>
  );
};

export default AuditoriaNewCmp;
