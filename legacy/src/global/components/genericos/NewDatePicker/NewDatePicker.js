import { useContext, useEffect, useState } from "react";
import { hideModal, showModal } from "../../../context/action/modal/modal";
import {
  hideSegundoModal,
  showSegundoModal,
} from "../../../context/action/segundoModal/segundoModal";
import { GlobalContext } from "../../../context/Provider";
import Calendar from "./Calendar/Calendar";
import Input from "./Input/Input";
import { ContainerDatePickerNew } from "./localstyle";

const NewDatePicker = ({
  fechaSeleccionada,
  fechaInicial,
  fechaFinal,
  opcionesDias,
  onchange,
  headerStr,
  itemOrange,
  checkError,
  errorStr,
  customCss,
  disabled,
  fechaOriginal
}) => {
  // La estructura es MES DIA AÑO

  const [date, setDate] = useState(fechaInicial);
  const [dateFinish, setDateFinish] = useState(fechaFinal);

  // const {agendaState} = useContext(GlobalContextMain);
  const { segundoModalDispatch } = useContext(GlobalContext);

  // 11 29 2022
  // 8 31 2022
  // 8 31 2022

  // fecha actual de tabla
  const orderDatePicker = (fecha) => {
    if (typeof fecha !== "object") {
      fecha = fecha.split("T");
      fecha = fecha[0].split("-");
      return `${fecha[1]} ${fecha[2]} ${fecha[0]}`;
    } else {
      return fecha;
    }
  };
  // const todayDate = new Date();
  let fecha = fechaSeleccionada; 
  const [dateSelected, setDateSelected] = useState(new Date(fecha));
  

  const [active, setActive] = useState(false);

  // Franjas
  const [franja, setFranja] = useState(false);

  // ----------------- LOGICA PARA SELECCIONAR DIAS CORRECTOS -------------------------
  const franjaNueva = (day, franja) => {
    if (Array.isArray(franja)) {
      const newFranja = franja.filter((element, index) => {
        const fechaFranja = new Date(orderDatePicker(element.fecha));
        return (
          fechaFranja.getMonth() === day.getMonth() &&
          fechaFranja.getDate() === day.getDate() &&
          fechaFranja.getFullYear() === day.getFullYear()
        );
      });
      if (newFranja.length > 0) return false;
      else return true;
    } else return false;
  };

  let franjaDias =
    opcionesDias?.length > 0
      ? opcionesDias.sort((a, b) => {
          const fechaA = new Date(orderDatePicker(a.fecha));
          const fechaB = new Date(orderDatePicker(b.fecha));
          if (fechaA < fechaB) {
            return -1;
          } else if (fechaA < fechaB) {
            return 1;
          } else return 1;
        })
      : [];
  useEffect(() => {
    if (franjaDias?.length > 0) {
      setFranja(franjaDias);
      setDate(orderDatePicker(franjaDias[0].fecha));
      setDateFinish(orderDatePicker(franjaDias[franjaDias.length - 1].fecha));
    }
  }, [opcionesDias]);


  useEffect(() => {
    if(disabled){
      setActive(false); 
    }
    if(fechaOriginal){
      setDateSelected(new Date(fechaOriginal));
    }
  },[disabled, fechaOriginal]);
  // ----------------- LOGICA PARA SELECCIONAR DIAS CORRECTOS -------------------------


  const onClick = () => {
    if (!disabled) {
      showSegundoModal(
        <Calendar
          dateInitial={date}
          dateSelected={dateSelected}
          setDateSelected={setDateSelected}
          dateFinish={dateFinish}
          setDate={setDate}
          franja={franja}
          setActive={setActive}
          onchange={onchange}
          itemOrange={itemOrange}
        />,
        "Información Paciente",
        () => {
          hideSegundoModal()(segundoModalDispatch);
        },
        false,
        {},
        "centro",
        true
      )(segundoModalDispatch);
    }
    
  };

  return (
    <ContainerDatePickerNew className={`custom-container-datepicker `}>
      {!headerStr ? "" : <span className="header-title">{headerStr}</span>}
      <Input
        onClick={onClick}
        dateSelected={dateSelected}
        active={active}
        error={checkError}
        customCss={customCss}
      />
      {checkError ? (
        <span className="error">{errorStr}</span>
      ) : (
        <span className="error"></span>
      )}
    </ContainerDatePickerNew>
  );
};

export default NewDatePicker;
