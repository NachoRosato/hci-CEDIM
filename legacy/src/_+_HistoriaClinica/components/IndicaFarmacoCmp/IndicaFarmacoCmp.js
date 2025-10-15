import React from "react";
import {
  ContainerCardOrden,
  ContainerCardOrdenCrear,
  ContainerCardOrdenItem,
  ContainerCardOrdenItems,
  ContainerCardOrdenTitle,
} from "./localStyle";
import LaboratorioIcon from "global/assets/generico/LaboratorioIcon";
import CircleMasMini from "global/assets/generico/CircleMasMini";
import FlechaRefresh from "global/assets/generico/FlechaRefresh";
import AskMarkLitIcon from "global/assets/generico/AskMarkLitIcon";
import XLitleIcon from "global/assets/generico/XLitleIcon";
import EditLitleIcon from "global/assets/generico/EditLitleIcon";
import TooltipV2 from "global/components/genericos/TooltipV2/TooltipV2";

const IndicaFarmacoCmp = ({
  indicacionFarmacologica,
  abrirSlider,
  borrarMedicamento,
  editarMedicamento,
  opcRecetaDigital,
}) => {
  return (
    <>
      <div>
        <ContainerCardOrdenTitle opcRecetaDigital={opcRecetaDigital}>
          <div>
            <LaboratorioIcon color={"var(--color-white)"} />
          </div>
          <div className="ordenTitleClass rb16b c-white">
            {" "}
            Indicaciones Farmacológicas
          </div>
          <div className="qMarkClass pointer">
            <TooltipV2
              csBoxWidth={289}
              csRadius={16}
              children={<AskMarkLitIcon color={"var(--color-white)"} />}
              detalle={
                <p className="rb12tl" style={{ textAlign: "left", padding: 5 }}>
                  Aqui se listan los medicamentos activos solicitados al
                  paciente.Se puede crear una nueva receta para una nueva
                  indicación farmacológica presionando el botón{" "}
                  <b>“Nueva Indicación”</b>
                </p>
              }
            />
          </div>
        </ContainerCardOrdenTitle>
        <ContainerCardOrden>
          <ContainerCardOrdenItems>
            {indicacionFarmacologica &&
              indicacionFarmacologica.length > 0 &&
              indicacionFarmacologica.map((item, index) => {
                if (
                  item.activo === "1" ||
                  (item.activo === "0" &&
                    item.activoNoEditable !== undefined &&
                    item.activoNoEditable)
                )
                  return (
                    <React.Fragment key={index}>
                      <ContainerCardOrdenItem
                        aSuspender={
                          item.activoNoEditable !== undefined &&
                          (item.activo || item.activo === "1") &&
                          item.nuevo === "0" &&
                          item.activoNoEditable
                        }
                        activoNoEditable={
                          item.activoNoEditable !== undefined &&
                          item.activo === "1" &&
                          item.activoNoEditable
                        }
                        nuevoItem={
                          item.activoNoEditable !== undefined &&
                          item.activo === "1" &&
                          !item.activoNoEditable
                        }
                      >
                        <div className="textAdjust rb16b c-white">
                          {item.producto}{" "}
                          {item.medicamentoActivo &&
                            `(${item.idPresentacion_Desc})`}
                        </div>
                        {item.id.slice(0, 1) !== "V" &&
                          item.activoNoEditable !== undefined &&
                          !item.activoNoEditable && (
                            <div
                              className="padAdjust pointer ts_farmaco_edit-item"
                              onClick={() => editarMedicamento(item, true)}
                            >
                              <EditLitleIcon color={"var(--color-white)"} />
                            </div>
                          )}
                        {item.activoNoEditable !== undefined &&
                          !item.activoNoEditable && (
                            <div
                              className="padAdjust pointer ts_farmaco_del-item"
                              onClick={() => borrarMedicamento(item)}
                            >
                              <XLitleIcon color={"var(--color-white)"} />
                            </div>
                          )}
                        {item.activoNoEditable !== undefined &&
                          (item.activo || item.activo === "1") &&
                          item.nuevo === "0" &&
                          item.activoNoEditable && (
                            <div
                              className="padAdjust pointer ts_farmaco_del-item"
                              onClick={() => borrarMedicamento(item)}
                            >
                              <FlechaRefresh color={"var(--color-white)"} />
                            </div>
                          )}
                      </ContainerCardOrdenItem>
                    </React.Fragment>
                  );
              })}
          </ContainerCardOrdenItems>
          <ContainerCardOrdenCrear
            className="pointer ts_farmaco_new-btn"
            onClick={abrirSlider}
          >
            <span className="busqPaciente-avatar">
              <CircleMasMini></CircleMasMini>
            </span>
            <span className="busqPaciente-title rb14l  c-latex30">
              {" "}
              Nueva indicación
            </span>
          </ContainerCardOrdenCrear>
        </ContainerCardOrden>
      </div>
    </>
  );
};

export default IndicaFarmacoCmp;
