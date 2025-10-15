import { useEffect, useState } from "react";
import Body from "./components/Body/Body";
import Footer from "./components/Footer/Footer";
import Top from "./components/Top/Top";
import { pagination } from "./funtions/pagination";
import { ContainerTableGlobal } from "./localSyle";

const TableSnomed = ({ config, onChange, filtroBuscador }) => {
  //#region ------ useStates --------
  const [global, setGlobal] = useState({
    data: config.data, // lista de datos primaria
    dataFiltered: config.data, // lista filtrada
    dataSelected: [], // data seleccionada por usuario
    filter: [
      {
        column: "original",
        data: config.data,
        value: [],
        type: "",
        dataFiltered: config.data,
      },
    ], // lista de filtros
    pagination: pagination(config.data, config.paginationView), // lista de arrays
    indexPagination: 0,
    paginationView: config.paginationView,
    clientX: 0,
    indexMove: false,
    copyLenCol: { all: config.width / config.column.length },
    column: config.column,
    agrupamietoColumn: [],
    cursorItemSelected: 0,

    // esta parte es nueva
    // posiblemente reemplaze al campo dataFiltered
    filterForData: [],
  });

  //#endregion --- useStates --------

  //#region ------ constants --------

  //#endregion --- constants --------

  //#region ------ useEffects --------
  useEffect(() => {
    setGlobal({
      ...global,
      data: config.data,
      dataFiltered: config.data,
      pagination: pagination(config.data, config.paginationView), // lista de arrays
    });
  }, [config]);

  useEffect(() => {
    window.onkeydown = shorcuts;
  }, []);

  useEffect(() => {
    if (onChange) {
      onChange(global.dataSelected);
    }
  }, [global.dataSelected]);

  useEffect(() => {
    if (global.filter[global.filter.length - 1]) {
      setGlobal({
        ...global,
        pagination: pagination(
          global.filter[global.filter.length - 1].dataFiltered.length > 0
            ? global.filter[global.filter.length - 1].dataFiltered
            : global.filter[global.filter.length - 1].data,
          config.paginationView
        ), // lista de arrays
      });
    }
    // console.log("Filtro Global: ",global.filter);
  }, [global.filter]);

  //#endregion --- useEffects --------

  //#region ------ funciones --------
  const shorcuts = (e) => {
    const key = e.key.toLowerCase();
    const ctrl = e.ctrlKey;
    const lista = global.pagination[global.paginationView];

    if (key === "f" && ctrl) {
      e.preventDefault();
      const input = document.querySelector("#buscador-tabla-por-defecto");
      input.focus();
    }
  };
  //#endregion --- funciones --------

  //Ajuste por cambio de ancho en paginacion

  let mediaQuery = window.screen.width;

  useEffect(() => {
    if (mediaQuery <= 1366) {
      setGlobal({
        ...global,
        pagination: pagination(config.data, config.paginationViewQuery),
      });
    }
  }, []);

  return (
    <ContainerTableGlobal width={config.width} widthQuery={config.widthQuery}>
      <Top global={global} setGlobal={setGlobal} config={config} />
      <Body global={global} setGlobal={setGlobal} config={config} />
    </ContainerTableGlobal>
  );
};

export default TableSnomed;
