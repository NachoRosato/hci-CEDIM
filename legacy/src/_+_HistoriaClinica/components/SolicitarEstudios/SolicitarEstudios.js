import EstudioMaxIcon from "global/assets/generico/EstudioMaxIcon";
import ProbetaMaxIcon from "global/assets/generico/ProbetaMaxIcon";
import {
  ContainerBox,
  ContainerTitle,
  ContainerOrden,
  CerrarCmp,
  ContainerQst,
  IconSelecTitle,
} from "./localStyle";
import FlechaIzquierdaIcon from "global/assets/generico/FlechaIzquierdaIcon";
import { HistoriaClinicaContext } from "_+_HistoriaClinica/context/Provider";
import { useContext } from "react";

const SolicitarEstudios = ({
  seleccionaoOrdenLabo,
  seleccionaOrdenPractica,
  setOpenSlider,
  finalizaEdicion,
  setEditaOrdenLabo,
}) => {
  const { pacienteState } = useContext(HistoriaClinicaContext);

  const cerrarSliderSelector = () => {
    setOpenSlider(false);
    finalizaEdicion();
    setEditaOrdenLabo({
      item: null,
      modifica: false,
      index: null,
    });
  };

  let config = localStorage.getItem("config");
  let opcOrdenesDigitalesLabo = JSON.parse(config).opcOrdenesDigitalesLabo;
  let opcOrdenesDigitalesEstudios =
    JSON.parse(config).opcOrdenesDigitalesEstudios;

  return (
    <>
      <CerrarCmp
        className="cerrarIcon ts_solicitaEstudios_close-btn"
        onClick={() => cerrarSliderSelector()}
      >
        <span className="rb16l c-latex30">Cerrar</span>{" "}
        <div>
          <FlechaIzquierdaIcon />{" "}
        </div>
      </CerrarCmp>
      <ContainerBox>
        <ContainerTitle>
          <span className="rb24b c-latex30">Solicitar Estudios</span>
        </ContainerTitle>
        <ContainerQst>
          <span className="rb18l c-latex30">
            Seleccione la opción según necesite emitir una orden de un estudio
            médico o un protocolo de laboratorio
          </span>
        </ContainerQst>
        <ContainerOrden>
          {opcOrdenesDigitalesEstudios === true &&
          pacienteState.paciente.buscarPac.value[0].ordenDigitalEstudio ? (
            <div
              className="pointer ts_solicitaEstudios_selCircuitoPrac-btn"
              onClick={seleccionaOrdenPractica}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginRight: 144,
              }}
            >
              <IconSelecTitle>
                <span className="rb24b c-latex30">Estudio Médico</span>
              </IconSelecTitle>
              <div>
                {" "}
                <EstudioMaxIcon></EstudioMaxIcon>
              </div>
            </div>
          ) : (
            <div
              className="pointer ts_solicitaEstudios_selCircuitoPrac-btn"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginRight: 0,
              }}
            >
              <span style={{ width: 200 }} className="rb14l c-danger">
                La obra social del paciente no permite solicitar órdenes de
                estudios de manera digital
              </span>
            </div>
          )}

          {opcOrdenesDigitalesLabo &&
          pacienteState.paciente.buscarPac.value[0].ordenDigitalLab ? (
            <div
              className="pointer ts_solicitaEstudios_selCircuitoLabo-btn"
              onClick={seleccionaoOrdenLabo}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <IconSelecTitle>
                <span className="rb24b c-latex30">Laboratorio</span>
              </IconSelecTitle>
              <div>
                <ProbetaMaxIcon></ProbetaMaxIcon>
              </div>
            </div>
          ) : (
            <div
              className="pointer ts_solicitaEstudios_selCircuitoPrac-btn"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginRight: 0,
              }}
            >
              <span style={{ width: 200 }} className="rb14l c-danger">
                La obra social del paciente no permite solicitar órdenes de
                laboratorio de manera digital
              </span>
            </div>
          )}
        </ContainerOrden>
      </ContainerBox>
    </>
  );
};

export default SolicitarEstudios;
