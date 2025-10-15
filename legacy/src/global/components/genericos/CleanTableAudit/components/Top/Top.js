import { newOrderLista } from "global/utils/orderData";
import React, { useEffect, useState } from "react";
import Arrow from "../../assets/arrow";
import { orderForColumn } from "../../funtions/acordion";
import { orderItemsFun } from "../../funtions/order";
import { pagination } from "../../funtions/pagination";
import FilterNumber from "../FilterNumber/FilterNumber";
import FilterString from "../FilterString/FilterString";
import {
  Button1,
  Column,
  ColumnTopZone,
  Container1,
  ContainerItemColumn,
  ContainerItemExport,
  ContainerItemFilter,
  ContainerItemSearch,
  ContainerTop,
  FilterContainer,
  Icon,
  Icon1,
  IconConainter,
  Input1,
  InputContainer1,
  ItemBar,
  ItemBarSearch,
  SearcherZone,
} from "./localStyle";
import ArrowColumnDown from "global/assets/generico/ArrowColumnDown";
import ArrowColumnUp from "global/assets/generico/ArrowColumnUp";
import SearchIconAbm from "global/assets/generico/SearchIconAbm";
import FilterIconAbm from "global/assets/generico/FilterIconAbm";
import FilterColumnIcon from "global/assets/generico/FilterColumnIcon";
import ShareAbmIcon from "global/assets/generico/ShareAbmIcon";
import FilterDate from "../FilterDate/FilterDate";
import TooltipNew from "global/components/genericos/TooltipNew/TooltipNew";

const Top = ({ global, config, setGlobal }) => {
  //#region ------ useStates --------
  const [mouseLive, setMouseLive] = useState(false);
  const [lenCol, setLenCol] = useState({
    all: config.width / config.column.length,
  });
  const [copyLenCol, setCopyLenCol] = useState(lenCol);
  const [borderActive, setBorderActive] = useState(false);
  const [acordeonCol, setAcordeonCol] = useState([]);
  const [colView, setColView] = useState("");
  const [filterActive, setFilterActive] = useState(-1);
  const [activeDownFilter, setActiveDownFilter] = useState(true);
  const [filtrosEspeciales, setFiltrosEspeciales] = useState(false);

  //#endregion --- useStates --------

  //#region ------ funciones --------
  const onMouseUp = (e) => {
    // setMouseLive(false);

    if (typeof global.indexMove === "number") {
      setGlobal({
        ...global,
        initialLen: {
          ...global.initialLen,
          [global.indexMove]: true,
        },
        copyLenCol: { ...copyLenCol, ...lenCol },
        indexMove: false,
      });
    } else {
      setGlobal({
        ...global,
        indexMove: false,
        copyLenCol: { ...copyLenCol, ...lenCol },
      });
    }
    setMouseLive(false);
    setCopyLenCol(lenCol);
  };
  const onMouseDown = (e, key) => {
    setGlobal({ ...global, clientX: e.clientX, indexMove: key });
    setMouseLive(true);
  };
  const onMouseMove = (e, key) => {
    if (mouseLive) {
      let client = e.clientX - global.clientX;
      let initialLen = copyLenCol[global.indexMove]
        ? copyLenCol[global.indexMove]
        : lenCol.all;
      let initialLenNext = copyLenCol[global.indexMove + 1]
        ? copyLenCol[global.indexMove + 1]
        : lenCol.all;
      let lenNext = global.column[global.indexMove + 1]
        ? global.indexMove + 1
        : false;
      const resul =
        client >= 0 ? initialLen + client : initialLen - client * -1;
      if (resul >= 100) {
        if (lenNext) {
          setLenCol({
            ...lenCol,
            [global.indexMove]:
              client >= 0 ? initialLen + client : initialLen - client * -1,
            [lenNext]: initialLenNext - client,
          });
        } else {
          setLenCol({
            ...lenCol,
            [global.indexMove]:
              client >= 0 ? initialLen + client : initialLen - client * -1,
            [lenNext]: initialLenNext + client * -1,
          });
        }
      }
    }
  };
  const ondropcolumn = (e, key) => {
    let columnCurrent = e.target.id
      .toLowerCase()
      .replaceAll("\r", "")
      .replaceAll("\n", "");

    let newColumn = e.dataTransfer
      .getData("text")
      .toLowerCase()
      .replaceAll("\r", "")
      .replaceAll("\n", "");
    let indexCurrent;
    let indexNew;
    let column = global.column;
    column.map((col, index) => {
      if (col.name === columnCurrent) {
        indexCurrent = index;
      }
      if (col.name === newColumn) {
        indexNew = index;
      }
    });
    let currentCol = column[indexCurrent];
    let newCol = column[indexNew];
    if (currentCol && newCol) {
      column[indexNew] = currentCol;
      column[indexCurrent] = newCol;
      setGlobal({ ...global, column: [...column] });
    }
  };

  const ondrop = (e) => {
    let columnName = e.dataTransfer.getData("text");
    if (!acordeonCol.includes(columnName) && acordeonCol.length < 1) {
      const resultado = pagination(
        orderForColumn(global.data, columnName.toLowerCase()),
        13
      );
      setAcordeonCol([...acordeonCol, columnName]);
      setGlobal({
        ...global,
        agrupamietoColumn: [...acordeonCol, columnName],
        pagination: resultado,
      });
    }
  };
  const ondeleteAcordionCol = (col) => {
    let newCol = acordeonCol.filter((e) => e !== col);
    setAcordeonCol(newCol);
    setGlobal({
      ...global,
      agrupamietoColumn: newCol,
      pagination: pagination(config.data, 13),
    });
  };
  const ondragend = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const onChange = (e) => {
    let value = e.target.value;
    let newColumn = global.column.map((e) => e.colname.toLowerCase());
    let filtrado = newOrderLista(global.data, newColumn, value);
    let pag = pagination(filtrado, 200);
    if (pag.length === 1) {
      setGlobal({ ...global, pagination: pag, indexPagination: 0 });
    } else {
      setGlobal({ ...global, pagination: pag });
    }
  };

  const handleChangeCheckbox = (e) => {
    if (e.target.checked) {
      const data = config.data.map((e) => e.id);
      setGlobal({ ...global, dataSelected: data });
    } else {
      setGlobal({ ...global, dataSelected: [] });
    }
  };

  const orderItems = (key) => {
    if (!config.disableFilters) {
      const doc = document.getElementById(`icon-arrow-${key}`);
      const element = global.column[key];
      let columnOrden;
      doc.style.opacity = "1";

      // columnOrden = orderItemsFun(global.dataFiltered, element.name, true);
      // console.log(columnOrden);

      if (doc.className == "active") {
        doc.className = "icon-arrow";
        columnOrden = orderItemsFun(global.dataFiltered, element.name, false);
      } else {
        doc.className = "active";
        columnOrden = orderItemsFun(global.dataFiltered, element.name, true);
      }

      setTimeout(() => {
        // doc.style.opacity = "0";
      }, 500);
      setGlobal({
        ...global,
        pagination: pagination(columnOrden, global.paginationView),
      });
    }
  };

  //#endregion --- funciones --------

  //#region ------ useEffects --------
  useEffect(() => {
    if (config?.colWidth) {
      let config = {};
      global.column.map((col, key) => {
        config = {
          ...config,
          [key]: col.width,
        };
      });
      setLenCol({ ...config });
      setCopyLenCol({ ...config });
    }
  }, [config?.colWidth]);
  //#endregion --- useEffects --------

  const activeFilter = () => {
    if (activeDownFilter) {
      setActiveDownFilter(false);
    } else {
      setActiveDownFilter(true);
    }
  };

  const [isOpen, setIsOpen] = useState(true);

  const handleButtonClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <ContainerTop>
      {/* <SearcherZone>
        <div
          className="drag-and-drop-columns"
          onDrop={ondrop}
          onDragOver={ondragend}
        >
          {acordeonCol.length === 0 ? (
            <span className="rb14l">
              Arrastrar hasta aquí las columnas para agrupar
            </span>
          ) : (
            acordeonCol.map((e, key) => {
              return (
                <div key={key} className="acordeon-col">
                  {colView}{" "}
                  <span className="cruz" onClick={() => ondeleteAcordionCol(e)}>
                    X
                  </span>
                </div>
              );
            })
          )}
        </div>
        <ItemBar>
          <ItemBarSearch>
            <ContainerItemSearch isOpen={isOpen} onClick={handleButtonClick}>
              <div className="iconAdjust">
                <TooltipNew
                  icon={
                    <SearchIconAbm color={"var(--color-white)"}></SearchIconAbm>
                  }
                  textoBox="Buscador"
                  extraProperty={{
                    textStyle: "rb14l c-white",
                    widthBox: 100,
                    heightBox: 50,
                    posicionX: -41,
                    posicionY: 50,
                    overflowSpan: "hidden",
                    whiteSpaceSpan: "nowrap",
                    backGround: "var(--color-latex10)",
                  }}
                />
              </div>
            </ContainerItemSearch>
            <InputContainer1 isOpen={isOpen}>
              <IconConainter
                onClick={handleButtonClick}
                className="fa fa-search pointer"
              >
                {" "}
                <SearchIconAbm
                  color={"var(--color-latexAbmRgb)"}
                ></SearchIconAbm>{" "}
              </IconConainter>
              <Input1
                className="rb14m c-latex10"
                isOpen={isOpen}
                placeholder="Search..."
                onChange={onChange}
                autoFocus={true}
              ></Input1>
            </InputContainer1>
          </ItemBarSearch>
          <ContainerItemFilter>
            <div className="iconAdjust">
              <TooltipNew
                icon={
                  <FilterIconAbm color={"var(--color-white)"}></FilterIconAbm>
                }
                textoBox="Filtros"
                extraProperty={{
                  textStyle: "rb14l c-white",
                  widthBox: 100,
                  heightBox: 50,
                  posicionX: -41,
                  posicionY: 50,
                  overflowSpan: "hidden",
                  whiteSpaceSpan: "nowrap",
                  backGround: "var(--color-latex10)",
                }}
                onclick={() => {
                  setFiltrosEspeciales(!filtrosEspeciales);
                }}
              />
            </div>
          </ContainerItemFilter>
          <ContainerItemColumn>
            <div className="iconAdjust">
              <TooltipNew
                icon={
                  <FilterColumnIcon
                    color={"var(--color-white)"}
                  ></FilterColumnIcon>
                }
                textoBox="Filter Column"
                extraProperty={{
                  textStyle: "rb14l c-white",
                  widthBox: 100,
                  heightBox: 50,
                  posicionX: -41,
                  posicionY: 50,
                  overflowSpan: "hidden",
                  whiteSpaceSpan: "nowrap",
                  backGround: "var(--color-latex10)",
                }}
              />
            </div>
          </ContainerItemColumn>
          <ContainerItemExport>
            <div className="iconAdjust">
              <TooltipNew
                icon={
                  <ShareAbmIcon color={"var(--color-white)"}></ShareAbmIcon>
                }
                textoBox="Exportar"
                extraProperty={{
                  textStyle: "rb14l c-white",
                  widthBox: 100,
                  heightBox: 50,
                  posicionX: -41,
                  posicionY: 50,
                  overflowSpan: "hidden",
                  whiteSpaceSpan: "nowrap",
                  backGround: "var(--color-latex10)",
                }}
              />
            </div>
          </ContainerItemExport>
        </ItemBar>
      </SearcherZone> */}
      <ColumnTopZone mouseLive={mouseLive} borderActive={borderActive}>
        <div className="view">
          {global.column.map((col, key) => {
            return (
              <Column
                noBorder={global.column.length - 1 === key ? true : false}
                key={key}
                mouseLive={mouseLive}
                width={copyLenCol[key] ? copyLenCol[key] : copyLenCol["all"]}
                maxWidth={lenCol.all}
                id={col.name}
                widthQuery={col.widthQuery}
                onDragOver={ondragend}
                onDrop={(e) => {
                  ondropcolumn(e, key);
                }}
                noFilter={!config.disableFilters}
              >
                {col.colname === "" ? (
                  <input type={"checkbox"} onClick={handleChangeCheckbox} />
                ) : (
                  <span
                    draggable
                    id={col.name}
                    onDragStart={(e) => {
                      setColView(col.colname);
                      e.dataTransfer.setData("text", col.name);
                    }}
                    // onClick={() => {
                    //   setFilterActive(key);
                    // }}
                    onClick={() => orderItems(key)}
                    className="rb14b"
                  >
                    {col.colname}
                  </span>
                )}
                <div id={`icon-arrow-${key}`} className="icon-arrow">
                  {!config.disableFilters ? (
                    <ArrowColumnDown color={"var(--color-white)"} />
                  ) : (
                    ""
                  )}
                </div>

                {filtrosEspeciales ? (
                  <div
                    className="filter-class"
                    onClick={() => {
                      setFilterActive(key);
                    }}
                  >
                    <FilterIconAbm color={"var(--color-white)"}></FilterIconAbm>
                  </div>
                ) : (
                  ""
                )}

                {/* {activeDownFilter ? (
                  <div className="arrowDown">
                    <ArrowColumnDown
                      onClick={() => {
                        activeFilter();
                      }}
                      color={"var(--color-white)"}
                    />
                  </div>
                ) : (
                  <div className="arrowUp" >
                    <ArrowColumnUp
                      onClick={() => {
                        activeFilter();
                      }}
                      color={"var(--color-white)"}
                    />
                  </div>
                )} */}

                {/* <div className="icon-arrow" id={`icon-arrow-${key}`}>
                    <Arrow color={"var(--color-white)"} />
                  </div> */}
                <div
                  className="border-new"
                  // onMouseDown={(e) => onMouseDown(e, key)}
                  // onMouseUp={(e) => onMouseUp(e, key)}
                  // onMouseMove={(e) => onMouseMove(e, key)}
                  onMouseOver={() => {
                    if (!borderActive) {
                      setBorderActive(true);
                    }
                  }}
                ></div>
                <FilterContainer active={filterActive === key}>
                  {col.type === "string" && filterActive === key ? (
                    <FilterString
                      item={global.data}
                      name={col.name}
                      setGlobal={setGlobal}
                      global={global}
                      setFilterActive={setFilterActive}
                      config={config}
                      active={filterActive === key}
                    />
                  ) : col.type === "number" && filterActive === key ? (
                    <FilterNumber
                      item={global.data}
                      name={col.name}
                      setGlobal={setGlobal}
                      global={global}
                      setFilterActive={setFilterActive}
                      config={config}
                      active={filterActive === key}
                    />
                  ) : col.type === "date" && filterActive === key ? (
                    <FilterDate
                      item={global.data}
                      name={col.name}
                      setGlobal={setGlobal}
                      global={global}
                      setFilterActive={setFilterActive}
                      config={config}
                      active={filterActive === key}
                    />
                  ) : (
                    ""
                  )}
                </FilterContainer>
              </Column>
            );
          })}
        </div>
        <div className="border-view">
          {global.column.map((col, key) => {
            return (
              <Column
                key={key}
                mouseLive={mouseLive}
                width={lenCol[key] ? lenCol[key] : lenCol["all"]}
                second={global.indexMove === key}
                maxWidth={lenCol.all}
              >
                {/* {col.name === "" ? <input type={"checkbox"} /> : col.name} */}
                <div
                  className="content-border"
                  onMouseOver={() => {
                    if (borderActive) {
                      setBorderActive(false);
                    }
                  }}
                ></div>

                <div
                  className="border"
                  onMouseDown={(e) => onMouseDown(e, key)}
                  onMouseUp={(e) => onMouseUp(e, key)}
                  onMouseMove={(e) => onMouseMove(e, key)}
                ></div>
              </Column>
            );
          })}
        </div>
      </ColumnTopZone>
    </ContainerTop>
  );
};

export default Top;
