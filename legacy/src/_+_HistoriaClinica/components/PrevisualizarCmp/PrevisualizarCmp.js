import { useContext, useEffect, useState } from "react";
import {
  ContainerPIBtn,
  ContainerPICbo,
  ContainerPICboFecha,
  ContainerPICentro,
  ContainerPICentroDrop,
  ContainerPICentroTitle,
  ContainerPIEsp,
  ContainerPIEspDrop,
  ContainerPIEspTitle,
  ContainerPIFechaDesde,
  ContainerPIFechaDrop,
  ContainerPIFechaHasta,
  ContainerPIFechaTitle,
  ContainerPIMed,
  ContainerPIMedDrop,
  ContainerPIMedTitle,
  ContainerPITitle,
  ContainerPreImpr,
  PIBtn,
} from "./localStyle";
import DatePicker from "global/components/genericos/DatePicker/DatePicker";
import { HistoriaClinicaContext } from "_+_HistoriaClinica/context/Provider";
import DropdownV4Filters from "global/components/genericos/DropdownV4Filters/DropdownV4Filters";

const PrevisualizarCmp = ({ preVisualizar }) => {
  const { evolucionState } = useContext(HistoriaClinicaContext);

  //valores a pasar en la func
  const [valueCentros, setValueCentros] = useState(null);
  const [valueMed, setValueMed] = useState(null);
  const [valueEsp, setValueEsp] = useState(null);
  const [checkTalon, setCheckTalon] = useState(false);

  const [dropCenter, SetDropCenter] = useState({
    data: [{ id: 0, descripcion: "Todos los centros" }],
    header: "",
    footer: "",
    descripcion: "descripcion",
    placeholder: "Ej: Ecografía abdominal adulto",
    placeHolderFontSize: 14,
    defaultValue: "vacio",
    defaultValueParametro: "descripcion",
    height: 32,
    width: 445,
    cantidadItems: 6,
    maxlength: 100,
    error: false,
    arrow: true,
    search: false,
    disabled: false,
    tooltip: true,
    showUp: true,
    regex: /^[a-zA-Z\s]+$/,
    masBuscados: false,
    buscarPorDefault: true,
    autoFocus: false,
    ordenPersonalizado: true,
  });

  const [dropMed, SetDropMed] = useState({
    data: [{ id: 0, descripcion: "Todos los médicos" }],
    header: "",
    footer: "",
    descripcion: "descripcion",
    placeholder: "Ej: Ecografía abdominal adulto",
    placeHolderFontSize: 14,
    defaultValue: "vacio",
    defaultValueParametro: "descripcion",
    height: 32,
    width: 445,
    cantidadItems: 6,
    maxlength: 100,
    error: false,
    arrow: true,
    search: false,
    disabled: false,
    tooltip: true,
    showUp: true,
    regex: /^[a-zA-Z\s]+$/,
    masBuscados: false,
    buscarPorDefault: false,
    autoFocus: false,
    ordenPersonalizado: true,
  });

  const [dropEsp, SetDropEsp] = useState({
    data: [{ id: 0, descripcion: "Todos las especialidades" }],
    header: "",
    footer: "",
    descripcion: "descripcion",
    placeholder: "Ej: Ecografía abdominal adulto",
    placeHolderFontSize: 14,
    defaultValue: [{ id: 0, descripcion: "Todos las esp" }],
    defaultValueParametro: "descripcion",
    height: 32,
    width: 445,
    cantidadItems: 6,
    maxlength: 100,
    error: false,
    arrow: true,
    search: false,
    disabled: false,
    tooltip: true,
    showUp: true,
    regex: /^[a-zA-Z\s]+$/,
    masBuscados: false,
    buscarPorDefault: false,
    autoFocus: false,
    ordenPersonalizado: true,
  });

  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const hoy = new Date();

  const onClickPrevisualizar = () => {
    let centro;
    let medico;
    let especialidad;
    let fechaD = fechaDesde;
    let fechaH = fechaHasta;

    if (valueCentros !== null) {
      if (valueCentros.id !== "0") {
        centro = parseInt(valueCentros.id);
      } else {
        centro = "0";
      }
    } else {
      centro = "0";
    }

    if (valueMed !== null) {
      if (valueMed.id !== "0") {
        medico = parseInt(valueMed.id);
      } else {
        medico = "0";
      }
    } else {
      medico = "0";
    }

    if (valueEsp !== null) {
      if (valueEsp.id !== "0") {
        especialidad = valueEsp.id;
      } else {
        especialidad = 0;
      }
    } else {
      especialidad = 0;
    }
    //envio ambas fechas de hoy para no enviar vacio
    if (fechaD === "") {
      fechaD = `${hoy.getFullYear()}-${
        hoy.getMonth() + 1 >= 10 ? hoy.getMonth() + 1 : `0${hoy.getMonth() + 1}`
      }-${hoy.getDate() >= 10 ? hoy.getDate() : `0${hoy.getDate()}`}`;
    }
    if (fechaH === "") {
      fechaH = `${hoy.getFullYear()}-${
        hoy.getMonth() + 1 >= 10 ? hoy.getMonth() + 1 : `0${hoy.getMonth() + 1}`
      }-${hoy.getDate() >= 10 ? hoy.getDate() : `0${hoy.getDate()}`}`;
    }
    preVisualizar(fechaD, fechaH, especialidad, medico, centro, checkTalon);
  };

  const onChangeDropCenter = (e) => {
    setValueCentros(e);
  };
  const onChangeDropMed = (e) => {
    setValueMed(e);
  };
  const onChangeDropEsp = (e) => {
    setValueEsp(e);
  };

  const onChangeFechaDesde = (e) => {
    setFechaDesde(e);
  };
  const onChangeFechaHasta = (e) => {
    setFechaHasta(e);
  };

  //carga de drops
  useEffect(() => {
    if (evolucionState.evolucion.filtrosTL !== null) {
      if (
        evolucionState.evolucion.filtrosTL.value !== undefined &&
        evolucionState.evolucion.filtrosTL.value !== null
      ) {
        let auxCentros =
          evolucionState.evolucion.filtrosTL.value.centros.filter(
            (item) => item.id !== "0"
          );
        auxCentros.unshift({ id: "0", descripcion: "Todos los centros" });
        SetDropCenter({
          ...dropCenter,
          data: auxCentros,
          defaultValue: auxCentros[0].descripcion,
        });
        let auxMed = evolucionState.evolucion.filtrosTL.value.medicos.filter(
          (item) => item.id !== "0"
        );
        auxMed.unshift({ id: "0", descripcion: "Todos los médicos" });
        SetDropMed({
          ...dropMed,
          data: auxMed,
          defaultValue: auxMed[0].descripcion,
        });
        let auxEsp =
          evolucionState.evolucion.filtrosTL.value.especialidades.filter(
            (item) => item.id !== "0"
          );
        auxEsp.unshift({ id: "0", descripcion: "Todas las especialidades" });
        SetDropEsp({
          ...dropEsp,
          data: auxEsp,
          defaultValue: auxEsp[0].descripcion,
        });
      }
    }
  }, [evolucionState]);

  //imprime talon

  const onChangeImprimeTalon = () => {
    setCheckTalon(!checkTalon);
  };

  return (
    <>
      {evolucionState.evolucion.filtrosTL !== null && (
        <ContainerPreImpr>
          <ContainerPITitle className="rb16b c-latex30">
            Impresión de Historia Clínica
          </ContainerPITitle>

          <ContainerPICentro>
            <ContainerPICentroTitle className="rb16l c-latex30">
              Centro:
            </ContainerPICentroTitle>
            <ContainerPICentroDrop>
              <DropdownV4Filters
                config={dropCenter}
                onClick={onChangeDropCenter}
              />
            </ContainerPICentroDrop>
          </ContainerPICentro>
          <ContainerPIMed>
            <ContainerPIMedTitle className="rb16l c-latex30">
              Médico:
            </ContainerPIMedTitle>
            <ContainerPIMedDrop>
              {" "}
              <DropdownV4Filters config={dropMed} onClick={onChangeDropMed} />
            </ContainerPIMedDrop>
          </ContainerPIMed>

          <ContainerPIEsp>
            <ContainerPIEspTitle className="rb16l c-latex30">
              Espec..:
            </ContainerPIEspTitle>
            <ContainerPIEspDrop>
              <DropdownV4Filters config={dropEsp} onClick={onChangeDropEsp} />
            </ContainerPIEspDrop>
          </ContainerPIEsp>
          {/* </ContainerPICbo> */}

          <ContainerPICboFecha>
            <ContainerPIFechaDesde>
              <ContainerPIFechaTitle className="rb16l c-latex30">
                Fecha desde:
              </ContainerPIFechaTitle>
              <ContainerPIFechaDrop>
                {" "}
                <DatePicker
                  fechaInicial="1990 01 01"
                  fechaFinal={`${hoy.getFullYear()} ${
                    hoy.getMonth() + 1 >= 10
                      ? hoy.getMonth() + 1
                      : `0${hoy.getMonth() + 1}`
                  } ${
                    hoy.getDate() >= 10 ? hoy.getDate() : `0${hoy.getDate()}`
                  }`}
                  onChange={onChangeFechaDesde}
                  selectedFecha={`${hoy.getFullYear()}-${
                    hoy.getMonth() + 1 >= 10
                      ? hoy.getMonth() + 1
                      : `0${hoy.getMonth() + 1}`
                  }-${
                    hoy.getDate() >= 10 ? hoy.getDate() : `0${hoy.getDate()}`
                  }`}
                  checkError={"fecha incorrecta"}
                  errorStr="La fecha es requerida"
                  isRequired={false}
                  posicion={"absolute"}
                  botones={true}
                  background={true}
                  customCss={"rb16l"}
                  customPosition={"hc-previsualizarCmp-fixedbottom"}
                />
              </ContainerPIFechaDrop>
            </ContainerPIFechaDesde>
            <ContainerPIFechaHasta>
              <ContainerPIFechaTitle className="rb16l c-latex30">
                Fecha hasta:
              </ContainerPIFechaTitle>
              <ContainerPIFechaDrop>
                {" "}
                <DatePicker
                  fechaInicial="1990 01 01"
                  fechaFinal={`${hoy.getFullYear()} ${
                    hoy.getMonth() + 1 >= 10
                      ? hoy.getMonth() + 1
                      : `0${hoy.getMonth() + 1}`
                  } ${
                    hoy.getDate() >= 10 ? hoy.getDate() : `0${hoy.getDate()}`
                  }`}
                  onChange={onChangeFechaHasta}
                  selectedFecha={`${hoy.getFullYear()}-${
                    hoy.getMonth() + 1 >= 10
                      ? hoy.getMonth() + 1
                      : `0${hoy.getMonth() + 1}`
                  }-${
                    hoy.getDate() >= 10 ? hoy.getDate() : `0${hoy.getDate()}`
                  }`}
                  checkError={"fecha incorrecta"}
                  errorStr="La fecha es requerida"
                  isRequired={false}
                  posicion={"absolute"}
                  botones={true}
                  background={true}
                  customCss={"rb16l"}
                  customPosition={"hc-previsualizarCmp-fixedbottom"}
                />
              </ContainerPIFechaDrop>
            </ContainerPIFechaHasta>
          </ContainerPICboFecha>

          <ContainerPIBtn>
            <div className="talonCheckContainer pointer">
              <input
                type="checkbox"
                name="checkTalon"
                value={checkTalon}
                className="rb14l pointer"
                onChange={() => onChangeImprimeTalon()}
                checked={checkTalon}
              />
              <label htmlFor={""} className="rb14l c-latex30 pointer">
                Imprime con talón firma médico
              </label>
            </div>
            <PIBtn className="rb16m pointer" onClick={onClickPrevisualizar}>
              Previsualizar
            </PIBtn>
          </ContainerPIBtn>
        </ContainerPreImpr>
      )}
    </>
  );
};

export default PrevisualizarCmp;
