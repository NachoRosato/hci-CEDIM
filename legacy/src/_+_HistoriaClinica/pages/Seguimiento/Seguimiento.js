import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../global/context/Provider";
import { itemsTipoEstado, itemsTipoSegData } from "./SeguimientoOpcData";
import { HistoriaClinicaContext } from "_+_HistoriaClinica/context/Provider";
import camelize from "global/utils/camelize";
import HeaderbarHome from "../../../global/components/genericos/HeaderbarHome/HeaderbarHome";
import Modal from "../../../global/components/genericos/Modal/Modal";
import Loading from "global/components/genericos/Loading/Loading";
import {
  ContainerBody,
  ContainerTitleFilters,
  ContainerTitle,
  ContainerFilters,
  ContainerSegAccion,
  ContainerSegEstado,
  FilterBox,
  CheckMark,
  BoxFiltros,
  SeguimientosContainer,
} from "./localStyle";
import Toaster from "global/components/genericos/Toaster/Toaster";
import { checkLocalDataSeg, setLocalDataSeg } from "./SeguimientoFun";
import { IonSpinner } from "@ionic/react";
import {
  addItemIndexDB,
  deleteItemIndexDB,
  getItemIndexDB,
} from "../Evolucion/EvolucionFun";
import CleanTable from "global/components/genericos/CleanTable/CleanTable";
import { pagination } from "global/components/genericos/CleanTable/funtions/pagination";
import {
  resetEventXIdSegCtx,
  resetSegCtx,
  setSegAllCtx,
  wsGetSeguimientosAll,
} from "_+_HistoriaClinica/context/action/seguimiento/seguimiento";
import { hideModal, showModal } from "global/context/action/modal/modal";
import SeguimientoE4 from "_+_HistoriaClinica/components/Seguimiento/SeguimientoE4";
import DropdownV2 from "global/components/genericos/DropdownV2/DropdownV2";
import NavTabBar from "_+_HistoriaClinica/components/NavTabBar/NavTabBar";

const Seguimiento = () => {
  const { modalState, modalDispatch, toasterState } = useContext(GlobalContext);

  const { seguimientoState, seguimientoDispatch } = useContext(
    HistoriaClinicaContext
  );

  const [activeFilter, setActiveFilter] = useState(itemsTipoEstado);
  const [filtroBuscador, setFiltroBuscador] = useState(null);
  const [listaOriginal, setListaOriginal] = useState(null);
  const [filters, setFilters] = useState({
    estado: "",
    tipoSeg: "",
  });
  const windowWidth = window.innerWidth;

  // logica filtros ---

  // fin logica filtros ---

  //logica items actuales

  async function asyncDelItemEVOTLIndexDB() {
    try {
      const response = await deleteItemIndexDB(2);
      if (response) {
        // dissmissEdicion();
      }
    } catch (error) {
      //agregar toaster de error
      console.log(error);
    }
  }

  //funcion async para cargar la db local
  async function asyncAddItemIndexDB(ListDataSeg) {
    try {
      const response = await addItemIndexDB(3, "ListDataSeg", ListDataSeg);
      if (response !== null) {
        //DATOS GUARDADOS OK
      }
    } catch (error) {
      //agregar toaster de error
      console.log("No se pudo continuar");
      // history.push("/evolucion");
    }
  }

  useEffect(() => {
    //mantengo los datos en el contexto
    async function getDataIndexDB() {
      try {
        const response = await getItemIndexDB(3);
        checkData(response);
      } catch (error) {
        console.log(error);
      }
    }
    getDataIndexDB();
  }, []);

  const checkData = (data) => {
    if (checkLocalDataSeg(data)) {
      refreshSeg();
    } else {
      setSegAllCtx(data.ListDataSeg.seguimiento.segAll)(seguimientoDispatch);
    }
  };

  const refreshSeg = () => {
    wsGetSeguimientosAll()(seguimientoDispatch);
  };

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

  const obtenerFechaDesing = (e) => {
    //modifica la fecha en el formato solicitado
    const dateString = e;
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} ${date.getHours()}:${
      (date.getMinutes() < 10 ? "0" : "") + date.getMinutes()
    } hs`;
    return formattedDate;
  };

  useEffect(() => {
    if (seguimientoState.seguimiento.segAll !== null) {
      let dataCompleted = setLocalDataSeg(seguimientoState.seguimiento.segAll);
      //cargo la paginacion de la tabla
      let auxArr = seguimientoState.seguimiento.segAll.value.map((item) => {
        return {
          ...item,
          fechaDesign: obtenerFechaDesing(item.fechaIndicacion),
          estadoDesign: item.estado === "A" ? "Abierto" : "Cerrado",
          unixTimeDesign: calcularTiempoTranscurrido(item.unixTime),
        };
      });
      auxArr = auxArr.sort((a, b) => {
        return new Date(b.fechaIndicacion) - new Date(a.fechaIndicacion);
      });
      setConfigTable({
        ...configTable,
        data: auxArr,
      });
      setListaOriginal(auxArr);
      setFiltroBuscador(pagination(auxArr, configTable.paginationView));
      asyncAddItemIndexDB(dataCompleted);
    }

    //eslint-disable-next-line
  }, [seguimientoState.seguimiento.segAll]);

  useEffect(() => {
    if (listaOriginal !== null) {
      onChangeFiltroEstado({
        id: 2,
        descripcion: "ABIERTO",
        alias: "A",
      });
      setFilters({ ...filters, estado: "ABIERTO" });
    }
  }, [listaOriginal]);

  //table configurations
  const ColumnBaseNewComplete = [
    {
      type: "string",
      name: "diagnostico",
      width: 0,
    },
  ];
  const ColumnBaseNew = [
    {
      type: "string",
      name: "fechaDesign",
      width: windowWidth > 1366 ? 177 : 130,
      colname: "Fecha",
      funChangeValue: null,
      onClickAccion: null,
    },
    {
      type: "string",
      name: "tipoSeguimiento",
      width: 137,
      colname: "Tipo",
      funChangeValue: null,
      onClickAccion: null,
    },
    {
      type: "string",
      name: "usuario",
      width: 262,
      colname: "Solicitado por",
      funChangeValue: null,
      onClickAccion: null,
    },
    {
      type: "string",
      name: "paciente",
      width: windowWidth > 1366 ? 328 : 220,
      colname: "Paciente",
      funChangeValue: null,
      onClickAccion: null,
    },
    {
      type: "string",
      name: "subTipoDesc",
      width: windowWidth > 1366 ? 330 : 200,
      colname: "Acción",
      funChangeValue: null,
      onClickAccion: null,
    },
    {
      type: "string",
      name: "estadoDesign",
      width: windowWidth > 1366 ? 305 : 200,
      colname: "Estado",
      funChangeValue: null,
      onClickAccion: null,
    },
    {
      type: "string",
      name: "unixTimeDesign",
      width: windowWidth > 1366 ? 305 : 150,
      colname: "Horas creado",
      funChangeValue: null,
      onClickAccion: null,
    },
  ];
  //agregar el resto posteriormente
  const [configTable, setConfigTable] = useState({
    data: [],
    columnComplete: ColumnBaseNewComplete,
    column: ColumnBaseNew,
    paginationView: 18,
    pagination: true,
    border: true,
    borderType: "line",
    width: windowWidth > 1366 ? 1847 : 1300,
    colWidth: true,
    footer: true,
    bodyHeight: 600,
    customSeguimiento: true,
    disableFilters: true,
  });

  const onChangeSelectedRow = (item) => {
    if (item.length > 0) {
      let auxItemSeg = seguimientoState.seguimiento.segAll.value.filter(
        (e) => e.id === item[0]
      );
      setConfigTable({
        ...configTable,
        disableAll: true,
      });
      showModal(
        <SeguimientoE4
          dissmiss={dissmissS1}
          dissmissActSeg={dissmissActSeg}
          selectedSeg={auxItemSeg[0]}
          pacName={camelize(auxItemSeg[0].paciente)}
        />,
        `Seguimientos de paciente: ${camelize(auxItemSeg[0].paciente)}`,
        dissmissS1,
        false,
        {},
        "centro",
        true
      )(modalDispatch);
    }
  };

  const dissmissS1 = () => {
    resetEventXIdSegCtx()(seguimientoDispatch);
    setConfigTable({
      ...configTable,
      disableAll: false,
    });
    hideModal()(modalDispatch);
  };

  const dissmissActSeg = () => {
    resetSegCtx()(seguimientoDispatch);
    wsGetSeguimientosAll()(seguimientoDispatch);
    setConfigTable({
      ...configTable,
      disableAll: false,
    });
    hideModal()(modalDispatch);
  };

  //dropdownConfigurations
  // const [configDropTipo, setConfigDropTipo] = useState({
  //   data: itemsTipoEstado,
  //   header: "",
  //   footer: "",
  //   descripcion: "descripcion",
  //   placeholder: "",
  //   placeHolderFontSize: 14,
  //   defaultValue: itemsTipoEstado[1].descripcion,
  //   defaultValueParametro: "descripcion",
  //   width: 155,
  //   height: 32,
  //   cantidadItems: 10,
  //   maxlength: 100,
  //   error: false,
  //   arrow: true,
  //   search: false,
  //   disabled: false,
  //   keyboardNavigation: false,
  //   showUp: true,
  //   regex: /^[a-zA-Z\s]+$/,
  // });

  const [configDropAcc, setConfigDropAcc] = useState({
    data: itemsTipoSegData,
    header: "",
    footer: "",
    descripcion: "descripcion",
    placeholder: "Ej: Ecografía abdominal adulto",
    placeHolderFontSize: 14,
    defaultValue: itemsTipoSegData[0].descripcion,
    defaultValueParametro: "descripcion",
    height: 32,
    width: 181,
    cantidadItems: 10,
    maxlength: 100,
    error: false,
    arrow: true,
    search: false,
    disabled: false,
    keyboardNavigation: false,
    showUp: true,
    regex: /^[a-zA-Z\s]+$/,
  });

  useEffect(() => {
    const itemsTipoSegData1 = [
      {
        id: 1,
        descripcion: "TODOS",
      },
      {
        id: 2,
        descripcion: "ADMINISTRATIVO",
      },
      {
        id: 3,
        descripcion: "MÉDICO",
      },
      {
        id: 4,
        descripcion: "INTERCONSULTA",
      },
    ];
    if (filters.tipoSeg !== "") {
      setConfigDropAcc({
        ...configDropAcc,
        data: itemsTipoSegData1,
        defaultValue: filters.tipoSeg,
      });
    } else {
      setConfigDropAcc({
        ...configDropAcc,
        data: itemsTipoSegData1,
        defaultValue: itemsTipoSegData1[0].descripcion,
      });
    }
  }, [filters]);

  const onChangeFiltroEstado = (e) => {
    if (e.alias !== "") {
      let aux =
        listaOriginal !== null
          ? listaOriginal
          : seguimientoState.seguimiento.segAll.value;
      aux = aux.filter((item) => item.estado === e.alias);
      // if (filters.fecha !== "") {
      //   aux = aux.filter((item) => item.fechaIndicacion === filters.fecha);
      // }
      if (filters.tipoSeg !== "") {
        aux = aux.filter((item) => item.tipoSeguimiento === filters.tipoSeg);
      }
      setFilters({ ...filters, estado: e.alias });
      setConfigTable({
        ...configTable,
        data: aux,
      });
    } else {
      let aux = listaOriginal;
      // if (filters.fecha !== "") {
      //   aux = aux.filter((item) => item.fechaIndicacion === filters.fecha);
      // }
      if (filters.tipoSeg !== "") {
        aux = aux.filter((item) => item.tipoSeguimiento === filters.tipoSeg);
      }
      setFilters({ ...filters, estado: "" });
      setConfigTable({
        ...configTable,
        data: aux,
      });
    }
    setActiveFilter(
      activeFilter.map((item) => ({
        ...item,
        checked: item.id === e.id, // Solo el que coincide con el ID será true, los demás false
      }))
    );
  };

  const onChangeFiltroTipoSeg = (e) => {
    if (e.descripcion !== "TODOS") {
      let aux = listaOriginal.filter(
        (item) => item.tipoSeguimiento === e.descripcion
      );
      if (filters.estado !== "") {
        aux = aux.filter((item) => item.estado === filters.estado);
      }
      // if (filters.fecha !== "") {
      //   aux = aux.filter((item) => item.fechaIndicacion === filters.fecha);
      // }
      setFilters({ ...filters, tipoSeg: e.descripcion });
      setConfigTable({
        ...configTable,
        data: aux,
      });
    } else {
      let aux = listaOriginal;
      if (filters.estado !== "") {
        aux = aux.filter((item) => item.estado === filters.estado);
      }
      // if (filters.fecha !== "") {
      //   aux = aux.filter((item) => item.fechaIndicacion === filters.fecha);
      // }
      setFilters({ ...filters, tipoSeg: "" });
      setConfigTable({
        ...configTable,
        data: aux,
      });
    }
  };

  return (
    <>
      {modalState.modal.show && <Modal />}
      {toasterState.toaster.show && <Toaster />}
      <Loading
        dataLoading={seguimientoState.seguimiento.loading}
        color="c-white"
        descripcion={
          seguimientoState.seguimiento.loading &&
          "Cargando seguimientos del paciente..."
        }
      />
      <HeaderbarHome />
      <NavTabBar refreshNavTab={() => refreshSeg(false)} />
      <SeguimientosContainer
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <ContainerTitleFilters>
          <ContainerTitle>
            <span className="rb20nh c-latex30">Seguimientos</span>
          </ContainerTitle>
          <ContainerFilters>
            <ContainerSegEstado>
              <span className="rb16l c-latex30">Estado:</span>
              {/* <div>
              <DropdownV2
                config={configDropTipo}
                onClick={onChangeFiltroEstado}
              />
            </div> */}
              <BoxFiltros>
                {activeFilter.map((item, index) => {
                  return (
                    <FilterBox
                      key={index}
                      className={`${
                        item.checked
                          ? "bgc-latex30 c-white"
                          : "bgc-white c-latex30"
                      }`}
                      onClick={(e) => onChangeFiltroEstado(item)}
                    >
                      <CheckMark
                        active={item.checked}
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path d="M5 12l5 5L19 7" />
                      </CheckMark>
                      <span className="txtFilter">{item.descripcion}</span>
                    </FilterBox>
                  );
                })}
              </BoxFiltros>
            </ContainerSegEstado>
            <ContainerSegAccion>
              <span className="rb16l c-latex30">Tipo:</span>
              <div>
                <DropdownV2
                  config={configDropAcc}
                  onClick={onChangeFiltroTipoSeg}
                />
              </div>
            </ContainerSegAccion>
          </ContainerFilters>
        </ContainerTitleFilters>
        <ContainerBody>
          {seguimientoState.seguimiento.segAll !== null ? (
            <CleanTable
              config={configTable}
              filtroBuscador={filtroBuscador}
              onChange={onChangeSelectedRow}
            />
          ) : (
            <IonSpinner name="lines-small" />
          )}
        </ContainerBody>
      </SeguimientosContainer>
    </>
  );
};

export default Seguimiento;
