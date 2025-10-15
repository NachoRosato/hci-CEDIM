import React, { useContext, useEffect, useState } from "react";
import {
  ContainerButtons,
  BtnCerrar,
  BtnEditSeg,
  BtnConfirmar,
  ContainerBoxS4,
  ContainerDataS4,
  ContainerDataPacS4,
  ContainerAccPacS4,
  ContainerDPacLine,
  ContainerAccPacInfoS4,
  ContainerAccPacComentario,
  ContainerDPacLineElp,
} from "./localStyle";

import { IonSpinner } from "@ionic/react";
import RelojIcon from "global/assets/generico/RelojIcon";
import InputV1 from "global/components/genericos/InputV1/InputV1";
import { HistoriaClinicaContext } from "_+_HistoriaClinica/context/Provider";
import { GlobalContext } from "global/context/Provider";
import camelize from "global/utils/camelize";
import { showToaster } from "global/context/action/toaster/toaster";
import {
  wsGetEventXIdSeg,
  wsGetSaveSegEvent,
  wsGetUpdateSegXIdSeg,
} from "_+_HistoriaClinica/context/action/seguimiento/seguimiento";

const SeguimientoE4 = ({ dissmiss, selectedSeg, pacName, dissmissActSeg }) => {
  const { pacienteState, seguimientoState, seguimientoDispatch } = useContext(
    HistoriaClinicaContext
  );
  const { toasterDispatch, authState } = useContext(GlobalContext);

  const [detalles, setDetalles] = useState("");
  const [dataEventXIdSeg, setDataEventXIdSeg] = useState(null);
  const [cerrarAlGuardar, setCerrarAlGuardar] = useState(false);

  const onChangeDetalles = (e) => {
    setDetalles(e.target.value);
  };

  useEffect(() => {
    if (seguimientoState.seguimiento.segEventXIdSeg !== null) {
      if (
        seguimientoState.seguimiento.segEventXIdSeg.value !== null &&
        seguimientoState.seguimiento.segEventXIdSeg.value.length > 0
      ) {
        let auxItem = {
          ...seguimientoState.seguimiento.segEventXIdSeg.value[
            seguimientoState.seguimiento.segEventXIdSeg.value.length - 1
          ],
        };
        setDetalles(auxItem.observacion);
        setDataEventXIdSeg(auxItem);
      } else if (seguimientoState.seguimiento.segEventXIdSeg.error !== null) {
        showToaster(
          {
            texto:
              seguimientoState.seguimiento.segEventXIdSeg.error.error
                .errorMessage,
            tipo: "danger",
          },
          "danger"
        )(toasterDispatch);
      }
    } else if (seguimientoState.seguimiento.segEventXIdSeg === null) {
      wsGetEventXIdSeg(selectedSeg.id)(seguimientoDispatch);
    } else if (seguimientoState.seguimiento.error !== null) {
      showToaster(
        {
          texto: seguimientoState.seguimiento.error.error.errorMessage,
          tipo: "danger",
        },
        "danger"
      )(toasterDispatch);
    }
  }, [seguimientoState.seguimiento.segEventXIdSeg]);

  const calcularTiempoTranscurrido = (fechaString) => {
    const fechaActual = new Date();
    const fecha = new Date(fechaString);

    // Calcula la diferencia en milisegundos entre las dos fechas
    const diferenciaEnMs = fechaActual - fecha;

    // Convierte la diferencia en minutos y horas
    const minutosTranscurridos = Math.floor(diferenciaEnMs / (1000 * 60));
    const horasTranscurridas = Math.floor(minutosTranscurridos / 60);

    // Lógica para generar la cadena de tiempo transcurrido
    if (minutosTranscurridos < 60) {
      if (minutosTranscurridos === 1) {
        return "hace 1 minuto";
      } else {
        return `hace ${minutosTranscurridos} minutos`;
      }
    } else if (horasTranscurridas < 24) {
      if (horasTranscurridas === 1) {
        return "hace 1 hora";
      } else {
        return `hace ${horasTranscurridas} horas`;
      }
    } else {
      // Si han pasado más de 24 horas, calcula los días
      const diasTranscurridos = Math.floor(
        diferenciaEnMs / (1000 * 60 * 60 * 24)
      );
      if (diasTranscurridos === 1) {
        return "hace 1 día";
      } else {
        return `hace ${diasTranscurridos} días`;
      }
    }
  };

  const guardarSinCerrar = () => {
    setCerrarAlGuardar(false);
    if (detalles !== "") {
      let auxSinCerrar = {
        estado: "P",
        idSegPaciente: selectedSeg.id,
        idUsuario: authState.auth.data.value.usuario,
        observacion: detalles,
      };
      wsGetSaveSegEvent(auxSinCerrar)(seguimientoDispatch);
    } else {
      showToaster(
        {
          texto: "Complete el campo observación",
          tipo: "danger",
        },
        "danger"
      )(toasterDispatch);
    }
  };

  useEffect(() => {
    if (seguimientoState.seguimiento.segEventSave !== null) {
      if (seguimientoState.seguimiento.segEventSave.value !== null) {
        showToaster(
          {
            texto: "Evento ingresado guardado correctamente",
            tipo: "success",
          },
          "success"
        )(toasterDispatch);
        wsGetEventXIdSeg(selectedSeg.id)(seguimientoDispatch);
        if (cerrarAlGuardar) {
          let auxActSeg = {
            id: selectedSeg.id,
            idPaciente: 0,
            idUsuario: authState.auth.data.value.usuario,
            fechaIndicacion: obtenerFechaEdit(),
            idSegSubTipo: 0,
            observaciones: detalles,
            estado: "C",
            accionEnDias: 0,
            tipoSeguimiento: selectedSeg.tipoSeguimiento,
            paciente: pacienteState.paciente.buscarPac.value[0].nombre,
            usuario: `${authState.auth.data.value.apellido} ${authState.auth.data.value.nombre}`,
            idSegTipo: selectedSeg.idSegTipo,
            tipoDesc: null,
            subTipoDesc: selectedSeg.subTipoDesc,
            pacienteTelefono: "",
            unixTime: obtenerFechaEdit(),
            minutosDiff: 2,
          };
          wsGetUpdateSegXIdSeg(selectedSeg.id, auxActSeg)(seguimientoDispatch);
        }
      } else if (seguimientoState.seguimiento.segEventSave.error !== null) {
        showToaster(
          {
            texto:
              seguimientoState.seguimiento.segEventXIdSeg.error.error
                .errorMessage,
            tipo: "danger",
          },
          "danger"
        )(toasterDispatch);
      }
    } else if (seguimientoState.seguimiento.error !== null) {
      showToaster(
        {
          texto: seguimientoState.seguimiento.error.error.errorMessage,
          tipo: "danger",
        },
        "danger"
      )(toasterDispatch);
    }
  }, [seguimientoState.seguimiento.segEventSave]);

  const guardarYCerrar = () => {
    if (detalles !== "") {
      let auxCerrarYGuardar = {
        estado: "C",
        idSegPaciente: selectedSeg.id,
        idUsuario: authState.auth.data.value.usuario,
        observacion: detalles,
      };
      setCerrarAlGuardar(true);
      wsGetSaveSegEvent(auxCerrarYGuardar)(seguimientoDispatch);
    } else {
      showToaster(
        {
          texto: "Complete el campo observación",
          tipo: "danger",
        },
        "danger"
      )(toasterDispatch);
    }
  };

  useEffect(() => {
    if (seguimientoState.seguimiento.segUpdateXIdSeg !== null) {
      if (seguimientoState.seguimiento.segUpdateXIdSeg.value !== null) {
        showToaster(
          {
            texto: "Evento actualizado correctamente",
            tipo: "success",
          },
          "success"
        )(toasterDispatch);
        if (cerrarAlGuardar) {
          setCerrarAlGuardar(false);
          dissmissActSeg();
        }
      } else if (seguimientoState.seguimiento.segUpdateXIdSeg.error !== null) {
        showToaster(
          {
            texto:
              seguimientoState.seguimiento.segUpdateXIdSeg.error.error
                .errorMessage,
            tipo: "danger",
          },
          "danger"
        )(toasterDispatch);
      }
    } else if (seguimientoState.seguimiento.error !== null) {
      showToaster(
        {
          texto: seguimientoState.seguimiento.error.error.errorMessage,
          tipo: "danger",
        },
        "danger"
      )(toasterDispatch);
    }
  }, [seguimientoState.seguimiento.segUpdateXIdSeg]);

  const obtenerFechaEdit = () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let day = String(date.getDate()).padStart(2, "0");
    let hours = String(date.getHours()).padStart(2, "0");
    let minutes = String(date.getMinutes()).padStart(2, "0");
    let seconds = String(date.getSeconds()).padStart(2, "0");
    let milliseconds = String(date.getMilliseconds()).padStart(3, "0");
    // Formateo
    let localDateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
    return localDateString.slice(0, 22);
  };

  return (
    <>
      {selectedSeg ? (
        <ContainerBoxS4>
          <ContainerDataS4>
            <ContainerDataPacS4>
              <ContainerDPacLineElp className="rb16l c-latex30">
                Paciente:
                <div className="rb16mb c-latex30" style={{ paddingLeft: 15 }}>
                  {pacName}
                </div>
              </ContainerDPacLineElp>
              <ContainerDPacLine className="rb16l c-latex30">
                Acción:
                <span className="rb16mb c-latex30" style={{ paddingLeft: 30 }}>
                  {camelize(selectedSeg.subTipoDesc)}
                </span>
              </ContainerDPacLine>
              <ContainerDPacLine className="rb16l c-latex30">
                Tipo:
                <span className="rb16mb c-latex30" style={{ paddingLeft: 49 }}>
                  {camelize(selectedSeg.tipoSeguimiento)}
                </span>
              </ContainerDPacLine>
              <ContainerDPacLine className="rb16l c-latex30">
                Teléfono:
                <span className="rb16mb c-latex30" style={{ paddingLeft: 18 }}>
                  11654889562
                </span>
              </ContainerDPacLine>
              <ContainerDPacLine className="rb16l c-latex30">
                Estado:
                <span className="rb16mb c-danger" style={{ paddingLeft: 30 }}>
                  {selectedSeg.estado === "A" ? "Abierto" : "Cerrado"}
                </span>
              </ContainerDPacLine>
            </ContainerDataPacS4>
            {seguimientoState.seguimiento.loading ? (
              <IonSpinner name="lines-small" />
            ) : (
              <ContainerAccPacS4>
                <ContainerAccPacInfoS4>
                  <div>
                    <p className="rb16l c-latex30">
                      {camelize(selectedSeg.usuario)}:
                    </p>
                    <div className="rb16l c-latex30 horasStyle">
                      <RelojIcon />{" "}
                      <span className="spanS4">
                        {calcularTiempoTranscurrido(selectedSeg.unixTime)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span
                      className="rb16l c-latex30"
                      style={{ textAlign: "left" }}
                    >
                      {selectedSeg.observaciones}
                    </span>
                  </div>
                </ContainerAccPacInfoS4>
                <ContainerAccPacComentario>
                  <InputV1
                    className="xd"
                    name="detalles_recepcion"
                    placeholderText={"Escriba su comentario aqui.."}
                    inputType="textarea"
                    onChange={onChangeDetalles}
                    value={detalles}
                    desactivado={selectedSeg.estado === "C" ? true : false}
                  />
                </ContainerAccPacComentario>
              </ContainerAccPacS4>
            )}
          </ContainerDataS4>
          <ContainerButtons>
            <div>
              <BtnCerrar onClick={dissmiss} className="rb16mb c-white">
                Cerrar
              </BtnCerrar>
            </div>
            {selectedSeg.estado === "A" ? (
              <div>
                <BtnEditSeg
                  onClick={guardarSinCerrar}
                  className="rb16mh c-primary"
                >
                  Guardar sin Cerrar
                </BtnEditSeg>
                <BtnConfirmar
                  onClick={guardarYCerrar}
                  className="rb16mh c-white"
                >
                  Guardar y Cerrar
                </BtnConfirmar>
              </div>
            ) : (
              ""
            )}
          </ContainerButtons>
        </ContainerBoxS4>
      ) : (
        <IonSpinner name="lines-small" />
      )}
    </>
  );
};

export default SeguimientoE4;
