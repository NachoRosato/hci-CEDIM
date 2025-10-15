import {
  ContainerBox,
  ContainerTitle,
  ContainerOrden,
  CerrarCmp,
  MedicamentoContainer,
  ContainerCardOrdenCrear,
  ActivosContainer,
  InactivosContainer,
  BoxMedicamentos,
} from "./localStyle";
import FlechaIzquierdaIcon from "global/assets/generico/FlechaIzquierdaIcon";
import CircleMasMini from "global/assets/generico/CircleMasMini";
import React, { useContext } from "react";
import FlechaRefresh from "global/assets/generico/FlechaRefresh";
import EditIcon from "global/assets/generico/EditIcon";
import CruzCloseBurguer from "global/assets/generico/CruzCloseBurguer";
import { HistoriaClinicaContext } from "_+_HistoriaClinica/context/Provider";

const Farmacos = ({
  cerrarSlider,
  agregarMedicamento,
  listaMedicamentos,
  indicacionFarmacologica,
  indicarMedicamento,
  editarMedicamento,
  borrarMedicamento,
}) => {
  const { vademecumState } = useContext(HistoriaClinicaContext);

  const abreviatura = (string) => {
    switch (string) {
      case "Miligramos":
        return "Mg";
      case "Mililitros":
        return "Ml";
      case "Unidades":
        return "U";
      case "Gotas":
        return "Gotas";
      case "Aplicación":
        return "Ap";
      case "Microgramo":
        return "Micgr";
      case "Comprimido/s":
        return "Comp";
      case "Comprimido":
        return "Comp";
      default:
        return "-";
    }
  };

  const returnDroga = (e) => {
    if (
      (vademecumState.vademecum.tipoVademecum === "kairos" &&
        e.id.includes("V")) ||
      (vademecumState.vademecum.tipoVademecum === "alfa" && e.id.includes("K"))
    ) {
      return "No asociado";
    } else {
      if (listaMedicamentos && listaMedicamentos.length > 0) {
        let itemBuscado = listaMedicamentos.filter(
          (item) => item.id === e.idProducto
        );
        if (itemBuscado.length > 0) {
          if (itemBuscado[0].drogas !== null) {
            return itemBuscado[0].drogas.slice(2);
          } else return "";
        } else return "";
      }
    }
  };

  const borrarMed = (item) => {
    borrarMedicamento(item);
  };

  return (
    <>
      <CerrarCmp className="cerrarIcon" onClick={() => cerrarSlider()}>
        <span className="rb16l c-latex30">Cerrar</span>{" "}
        <div>
          <FlechaIzquierdaIcon />{" "}
        </div>
      </CerrarCmp>
      <ContainerBox>
        <ContainerTitle>
          <span className="rb24b c-latex30">Indicaciones Farmacológicas</span>
        </ContainerTitle>
        <ContainerOrden>
          <ActivosContainer>
            <p className="rb16b c-latex30">Medicamentos activos del paciente</p>
            <BoxMedicamentos
              item={indicacionFarmacologica.filter(
                (item) => item.activo === "1"
              )}
            >
              {indicacionFarmacologica.map((item, index) => {
                if (item.activo === "1") {
                  return (
                    <React.Fragment key={index}>
                      <MedicamentoContainer
                        className="c-white rb16b"
                        activo={true}
                      >
                        <p className="prod">{item.producto}</p>
                        <p>
                          {item.idProducto !== -1 ? returnDroga(item) : "-"}
                        </p>
                        <p>
                          {item.dosis} {abreviatura(item.tipoDosisDescripcion)}
                        </p>
                        <p>
                          {item.cadaNoHoras === ""
                            ? `${item.cadaXHoras} hs`
                            : item.cadaNoHoras === "S"
                            ? "Semanal"
                            : "Mensual"}
                        </p>
                        <p>
                          {item.durante === 0 && item.tipoDurante === "V"
                            ? "Única Vez"
                            : item.tipoDurante === "P"
                            ? "Perm"
                            : `${item.durante} ${
                                item.tipoDurante === "D"
                                  ? "Día/s"
                                  : item.tipoDurante === "S"
                                  ? "Semana/s"
                                  : "Mes/es"
                              }`}
                        </p>
                        <p className="rb16l">-</p>
                        <p className="rb16l">
                          {new Date(item.fechaIndicacion).toLocaleDateString()}
                        </p>
                        <div
                          className="btnEditar"
                          onClick={() => editarMedicamento(item, true)}
                        >
                          <EditIcon color={"var(--color-white)"} />
                        </div>
                        <div
                          className="btnAgregar"
                          onClick={() => borrarMed(item)}
                        >
                          <CruzCloseBurguer color={"var(--color-white)"} />
                        </div>
                      </MedicamentoContainer>
                    </React.Fragment>
                  );
                }
              })}
            </BoxMedicamentos>
            <ContainerCardOrdenCrear
              className="pointer"
              onClick={agregarMedicamento}
            >
              <span className="busqPaciente-avatar">
                <CircleMasMini></CircleMasMini>
              </span>
              <span className="busqPaciente-title rb16b c-latex30">
                {" "}
                Nuevo medicamento
              </span>
            </ContainerCardOrdenCrear>
          </ActivosContainer>
          <InactivosContainer>
            <p className="rb16b c-latex30">
              Medicamentos inactivos del paciente{" "}
              <span className="rb16l">
                (de aquí puede volver a indicar un medicamento inactivo)
              </span>
            </p>
            <BoxMedicamentos
              item={indicacionFarmacologica.filter(
                (item) => item.activo === "0"
              )}
            >
              {indicacionFarmacologica.map((item, index) => {
                if (item.activo === "0")
                  return (
                    <React.Fragment key={index}>
                      <MedicamentoContainer className="c-white rb16b">
                        <p className="prod">{item.producto}</p>
                        <p>
                          {item.idProducto !== -1 ? returnDroga(item) : "-"}
                        </p>
                        <p>
                          {item.dosis} {abreviatura(item.tipoDosisDescripcion)}
                        </p>
                        <p>
                          {item.cadaNoHoras === ""
                            ? `${item.cadaXHoras} hs`
                            : item.cadaNoHoras === "S"
                            ? "Semanal"
                            : "Mensual"}
                        </p>
                        <p>
                          {item.durante === 0 && item.tipoDurante === "V"
                            ? "Única Vez"
                            : item.tipoDurante === "P"
                            ? "Perm"
                            : `${item.durante} ${
                                item.tipoDurante === "D"
                                  ? `Día${item.durante > 1 ? "s" : ""}`
                                  : item.tipoDurante === "S"
                                  ? "Semana/s"
                                  : "Mes/es"
                              }`}
                        </p>
                        <p className="rb16l">-</p>
                        <p className="rb16l">
                          {new Date(item.fechaIndicacion).toLocaleDateString()}
                        </p>
                        <div
                          className="btnAgregar"
                          onClick={() => indicarMedicamento(item)}
                        >
                          <FlechaRefresh color={"var(--color-white)"} />
                        </div>
                      </MedicamentoContainer>
                    </React.Fragment>
                  );
              })}
            </BoxMedicamentos>
          </InactivosContainer>
        </ContainerOrden>
      </ContainerBox>
    </>
  );
};

export default Farmacos;
