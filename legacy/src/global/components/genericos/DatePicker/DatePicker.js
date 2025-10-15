import { useEffect, useState } from "react";
import Calendar from "./Calendar/Calendar";
import "./DatePicker.css";
import InputDatePicker from "./InputDatePicker/InputDatePicker";

const DatePicker = ({
  fechaInicial,
  fechaFinal,
  selectedFecha,
  headerStr,
  disable,
  customCss,
  onChange,
  checkError,
  errorStr,
  isRequired,
  background,
  posicion,
  botones,
  customPosition,
}) => {
  // setea correctamente los dias
  if (fechaInicial) {
    fechaInicial = fechaInicial
      .split("T")[0]
      .replace("-", " ")
      .replace("-", " ");
    let mesInicial = fechaInicial.split(" ")[1];
    let diaInicial = fechaInicial.split(" ")[2];
    let anioInicial = fechaInicial.split(" ")[0];
    mesInicial = mesInicial.length === 1 ? "0" + mesInicial : mesInicial;
    diaInicial = diaInicial.length === 1 ? "0" + diaInicial : diaInicial;
    fechaInicial = `${anioInicial} ${mesInicial} ${diaInicial}`;
  }

  const [calendarShow, setCalendarShow] = useState(false);
  const [fechaSelected, setFechaSelect] = useState({
    fechaSelected: fechaInicial,
    select: false,
  });
  const [fechaAnterior, setFechaAnterior] = useState(false);

  // te setea la fecha seleccionada //se agrego en [] selectedFecha para que escuche por el tema del perfil.
  useEffect(() => {
    if (selectedFecha) {
      const newFecha = selectedFecha
        .split("T")[0]
        .replace("-", " ")
        .replace("-", " ");
      if (newFecha) setFechaSelect({ fechaSelected: newFecha, select: true });
    }
  }, [selectedFecha]);

  return (
    <>
      <InputDatePicker
        calendarShow={calendarShow}
        setCalendarShow={setCalendarShow}
        fechaSelected={fechaSelected}
        headerStr={headerStr}
        customCss={customCss}
        disable={disable}
        checkError={checkError}
        errorStr={errorStr}
        isRequired={isRequired}
      />

      {calendarShow ? (
        <Calendar
          fechaSelected={fechaSelected}
          calendarShow={calendarShow}
          setCalendarShow={setCalendarShow}
          setFechaSelect={setFechaSelect}
          onChange={onChange}
          setFechaAnterior={setFechaAnterior}
          fechaAnterior={fechaAnterior}
          fechaInicial={fechaInicial}
          fechaFinal={fechaFinal}
          background={background}
          posicion={posicion}
          botones={botones}
          customPosition={customPosition}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default DatePicker;
