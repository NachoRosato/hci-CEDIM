import React, { useEffect, useState } from "react";
import {
  dias,
  formatDate,
  meses,
  obtenerFecha,
  obtenerMesYaño,
} from "./dataDatePicker";
import "./Calendar.css";
import Dropdown from "../../Dropdown/Dropdown";

const Calendar = ({
  fechaFinal,
  fechaInicial,
  calendarShow,
  setCalendarShow,
  setFechaSelect,
  fechaSelected,
  onChange,
  fechaAnterior,
  setFechaAnterior,
  background,
  posicion,
  botones,
  customPosition,
}) => {
  // Lógica para la función de los días
  // Desde  y hasta
  const [fecha, setFecha] = useState(fechaInicial);
  const [allMes, setAllMes] = useState("initial"); // all || initial || end  || medium
  const mes = obtenerFecha(new Date(formatDate(fecha, true)));
  const mes_anio_dia = obtenerMesYaño(fechaInicial, fechaFinal);

  // escucha los cambios de los mes
  let añoProvisorio = null;
  const handleMes = ({ id }) => {
    if (id) {
      let fechaProvisoria = fecha.split(" ");
      fechaProvisoria[1] = id;
      if (
        fechaInicial.split(" ")[1] === id &&
        fechaInicial.split(" ")[0] === fecha.split(" ")[0]
      ) {
        fechaProvisoria[2] = fechaInicial.split(" ")[2];
      } else fechaProvisoria[2] = "01";

      if (añoProvisorio) {
        fechaProvisoria[0] = añoProvisorio;
        añoProvisorio = null;
      }
      fechaProvisoria = fechaProvisoria
        .toString()
        .replace(",", " ")
        .replace(",", " ");
      // alert(fechaProvisoria);
      setFecha(fechaProvisoria);
    }
  };

  // Escucha los cambios del año
  const handleAño = ({ id }) => {
    if (id) {
      // seteo el año para que cambie el datePicker
      let fechaProvisoria = fecha.split(" ");
      fechaProvisoria[0] = id;

      // me fijo que si es el año final
      const añoFinal = fechaFinal.split(" ")[0];
      fechaProvisoria[2] = "01";

      // setea el año final
      if (añoFinal === id) {
        fechaProvisoria[1] = "01";
        setAllMes("end");
      } else setAllMes("all");

      // setea el  año inicial
      if (fechaInicial.split(" ")[0] === id) {
        fechaProvisoria[1] = fechaInicial.split(" ")[1];
        fechaProvisoria[2] = fechaInicial.split(" ")[2];
        setAllMes("initial");
      }
      if (fechaInicial.split(" ")[0] === fechaFinal.split(" ")[0]) {
        setAllMes("medium");
      }
      fechaProvisoria = fechaProvisoria
        .toString()
        .replace(",", " ")
        .replace(",", " ");
      setFecha(fechaProvisoria);
    }
  };
  const handleDissmissCalendar = () => {
    if (fechaAnterior) {
      setFechaSelect({ fechaSelected: fechaAnterior, select: true });
    } else setFechaSelect({ fechaSelected: fechaInicial, select: false });

    setCalendarShow(false);
  };
  const handleSetFecha = () => {
    if (!fechaSelected.select)
      setFechaSelect({ ...fechaSelected, select: true });
    let fechaEnviar = fechaSelected.fechaSelected.split(" ");
    onChange(`${fechaEnviar[0]}-${fechaEnviar[1]}-${fechaEnviar[2]}`);
    setFechaAnterior(fechaSelected.fechaSelected);
    setCalendarShow(false);
  };
  // seleccionar una fecha
  const handleSelected = (dia) => {
    if (dia) {
      dia = dia.toString();
      if (dia.length === 1) dia = "0" + dia;
      let fechaNueva = fecha.split(" ");
      fechaNueva[2] = dia;
      fechaNueva = fechaNueva.toString().replace(",", " ").replace(",", " ");
      setFechaSelect({ fechaSelected: fechaNueva, select: true });
    }
  };

  // Cuando se inicia se seta el mes y el año seleccionado
  useEffect(() => {
    if (fechaSelected.fechaSelected) {
      añoProvisorio = fechaSelected.fechaSelected.split(" ")[0];
      handleMes({ id: fechaSelected.fechaSelected.split(" ")[1] });
    }
    if (fechaInicial.split(" ")[0] === fechaFinal.split(" ")[0]) {
      setAllMes("medium");
    }
  }, [fechaSelected]);

  return (
    <>
      <div
        className={background ? "ptur-datePicker-background" : ""}
        onClick={handleDissmissCalendar}
      ></div>
      <div
        className={`ptur-datePiker-containerCalendar  ${customPosition}`}
        style={{ position: posicion }}
      >
        {/* ----------- HEADER DATE PICKER -----------------*/}
        <div className="ptur-datePiker-headerContainer">
          <Dropdown
            valor={fecha.split(" ")[1]}
            name="familia"
            onChange={handleMes}
            placeholder="Elegí una opción"
            // headerStr="Mes"
            datos={
              allMes === "initial"
                ? mes_anio_dia.mesInicial
                : allMes === "all"
                ? meses
                : allMes === "medium"
                ? mes_anio_dia.mesMedium
                : mes_anio_dia.mesFinal
            }
            campoCodigo="id"
            descripcion="descripcion"
            // errorStr="El parentesco es requerido"
            customCss={"ptur-datePiker-body-parentesco-dropdown"}
          />
          <Dropdown
            valor={fecha.split(" ")[0]}
            name="familia"
            onChange={handleAño}
            placeholder="Elegí una opción"
            // headerStr="Año"
            datos={mes_anio_dia.años}
            campoCodigo="id"
            descripcion="descripcion"
            // errorStr="El parentesco es requerido"
            customCss={"ptur-datePiker-body-parentesco-dropdown"}
          />
        </div>
        {/* ----------- BODY DATE PICKER -----------------*/}
        <div className="ptur-datePiker-bodyContainer">
          {dias.map((dia, index) => {
            return (
              <div key={index} className="column-picker">
                <span className="text-picker rb18m">{dia.dia}</span>
                {mes[dia.index].map((numeroDia, index2) => {
                  let numeroDiaString = numeroDia ? numeroDia.toString() : "";
                  let fechaProvisoria = fecha.split(" ");
                  fechaProvisoria[2] =
                    numeroDiaString.length === 1
                      ? "0" + numeroDiaString
                      : numeroDia;
                  fechaProvisoria = fechaProvisoria
                    .toString()
                    .replace(",", " ")
                    .replace(",", " ");
                  const diaSeleccionado =
                    fechaSelected.fechaSelected === fechaProvisoria &&
                    numeroDia ===
                      Number(fechaSelected.fechaSelected.split(" ")[2]);

                  return fechaFinal.split(" ")[0] !== fecha.split(" ")[0] ? (
                    <span
                      key={index2}
                      onClick={() => handleSelected(numeroDia)}
                      className={
                        !numeroDia
                          ? "date-picker null-picker rb18m "
                          : diaSeleccionado
                          ? "date-picker-selected"
                          : "date-picker rb18m"
                      }
                    >
                      {numeroDia}
                    </span>
                  ) : Number(fechaFinal.split(" ")[1]) !==
                    Number(fecha.split(" ")[1]) ? (
                    <span
                      key={index2}
                      onClick={() => handleSelected(numeroDia)}
                      className={
                        !numeroDia
                          ? "date-picker null-picker rb18m "
                          : diaSeleccionado
                          ? "date-picker-selected"
                          : "date-picker rb18m"
                      }
                    >
                      {numeroDia}
                    </span>
                  ) : Number(fechaFinal.split(" ")[2]) < Number(numeroDia) ? (
                    <span
                      key={index2}
                      className={"date-picker null-picker rb18m "}
                    >
                      {null}
                    </span>
                  ) : (
                    <span
                      key={index2}
                      onClick={() => handleSelected(numeroDia)}
                      className={
                        !numeroDia
                          ? "date-picker null-picker rb18m "
                          : diaSeleccionado
                          ? "date-picker-selected"
                          : "date-picker rb18m"
                      }
                    >
                      {numeroDia}
                    </span>
                  );
                })}
              </div>
            );
          })}
        </div>
        {/* ----------- FOOTER DATE PICKER -----------------*/}
        {botones ? (
          <div className="ptur-datePiker-footerContainer">
            <button
              className="ptur-datePiker-footerContainer-btn  rb18m pointer"
              onClick={handleDissmissCalendar}
            >
              Cancelar
            </button>
            <button
              className="ptur-datePiker-footerContainer-btn2 rb18m pointer"
              onClick={handleSetFecha}
            >
              Aceptar
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Calendar;
