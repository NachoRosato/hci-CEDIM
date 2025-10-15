import React from "react";
import {
  ContainerEstPrev,
  DivisorEstPrev,
  EstPrevBox,
  EstPrevBoxTitle,
  EstPrevItem,
  EstPrevItems,
  EstPrevTitle,
  LaboratorioVacio,
} from "./localStyle";
import { formatFechaTimeLine } from "global/utils/formatFechaTimeLine";
import ConsultaIcon from "global/assets/generico/ConsultaIcon";
import camelize from "global/utils/camelize";
import AskMarkLitIcon from "global/assets/generico/AskMarkLitIcon";
import TooltipV2 from "global/components/genericos/TooltipV2/TooltipV2";

const EstudioPrevCmp = ({ estudiosArr, labosArr, onClickEstPrev }) => {
  return (
    <>
      <ContainerEstPrev>
        <EstPrevTitle className="rb16b c-white">
          <div className="iconAdjust">
            <ConsultaIcon color={"var(--color-white)"} />
          </div>
          <div className="titleEdit">Estudios Previos</div>
          <div className="qMarkClass pointer">
            <TooltipV2
              csBoxWidth={289}
              csRadius={16}
              children={<AskMarkLitIcon color={"var(--color-white)"} />}
              detalle={
                <p className="rb12tl" style={{ textAlign: "left", padding: 5 }}>
                  Aqui se listan todos los estudios realizados al paciente en
                  los últimos 3 años. Separando en 2 columnas para mostrar
                  estudios médicos generales y laboratorios por separado. Se
                  puede abrir uno de estos para agregar texto a la evolución
                </p>
              }
            />
          </div>
        </EstPrevTitle>
        <EstPrevBox>
          <DivisorEstPrev>
            <EstPrevBoxTitle>
              <span className="rb16b c-latex30">Estudios</span>
            </EstPrevBoxTitle>
            <EstPrevItems>
              {estudiosArr.length > 0 ? (
                estudiosArr.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <EstPrevItem
                        onClick={() => onClickEstPrev(item)}
                        className="rb16mb c-white pointer ts_estudiosPrev_estudio-item"
                      >
                        <span>
                          {camelize(item.strEstudio)} {`(`}
                          {formatFechaTimeLine(item.fecha)}
                          {`)`}
                        </span>
                      </EstPrevItem>
                    </React.Fragment>
                  );
                })
              ) : (
                <LaboratorioVacio className="rb16b c-latex30">
                  No posee Estudios
                </LaboratorioVacio>
              )}
            </EstPrevItems>
          </DivisorEstPrev>
          <DivisorEstPrev>
            <EstPrevBoxTitle>
              <span className="rb16b c-latex30">Laboratorio</span>
            </EstPrevBoxTitle>
            <EstPrevItems>
              {labosArr.length > 0 ? (
                labosArr.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <EstPrevItem
                        onClick={() => onClickEstPrev(item)}
                        className="rb16mb c-white pointer ts_estudiosPrev_labo-item"
                      >
                        <span>
                          Laboratorio {`(`}
                          {formatFechaTimeLine(item.fecha)}
                          {`)`}
                        </span>
                      </EstPrevItem>
                    </React.Fragment>
                  );
                })
              ) : (
                <LaboratorioVacio className="rb16b c-latex30">
                  No posee Laboratorios
                </LaboratorioVacio>
              )}
            </EstPrevItems>
          </DivisorEstPrev>
        </EstPrevBox>
      </ContainerEstPrev>
    </>
  );
};

export default EstudioPrevCmp;
