import { useEffect, useState } from "react";
import Acordion from "../Acordion/Acordion";
import { ContainerBody, Item, SubItem } from "./localStyle";
import NextIcon from "global/assets/generico/NextIcon";

const Body = ({ global, setGlobal, config }) => {
  //#region ------ useStates --------
  // const [itemSelected, setItemSelected] = useState(global.dataSelected);
  //#region ------ useStates --------

  //#region ------ funciones --------
  const handleSelect = (id) => {
    if (global.customSeguimiento) {
      let newList = global.data.filter((item) => item.id === id);
      setGlobal({ ...global, dataSelected: [newList[0].id] });
    } else {
      if (global.dataSelected.includes(id)) {
        let newList = global.dataSelected.filter((item) => item !== id);
        setGlobal({ ...global, dataSelected: newList });
      } else {
        setGlobal({ ...global, dataSelected: [...global.dataSelected, id] });
      }
    }
  };
  //#endregion --- funciones --------

  //#region ------ useEffect ------
  // useEffect(()=> {

  // },[global.dataSelected])
  //#endregion --- useEffect ------

  //#region ------ constants ------
  // const lista = global.pagination[global.indexPagination];
  // const itemCursorSelected = lista[global.cursorItemSelected];
  //#endregion --- constants ------
  return (
    <ContainerBody bodyHeight={global.bodyHeight}>
      {global.agrupamietoColumn.length > 0 ? (
        // <Acordion
        //   global={global}
        //   itemSelected={global.dataSelected}
        //   handleSelect={handleSelect}
        // />
        ""
      ) : global.pagination.length === 0 ? (
        <h1>No hay items</h1>
      ) : (
        global?.pagination[global.indexPagination]?.map((item, key) => {
          return (
            <Item
              key={key}
              onClick={
                !config.disableAll
                  ? () => {
                      handleSelect(item.id);
                    }
                  : () => {}
              }
              selected={global.dataSelected.includes(item.id)}
            >
              {global.column.map((col, index) => {
                return (
                  <SubItem
                    key={index}
                    width={
                      global.copyLenCol[index]
                        ? global.copyLenCol[index]
                        : col.width
                        ? col.width
                        : global.copyLenCol["all"]
                    }
                    widthQuery={col.widthQuery}
                  >
                    {" "}
                    {col.type === "select-boolean" ? (
                      <input
                        type={"checkbox"}
                        checked={
                          global.customSeguimiento
                            ? item.estado === "C"
                              ? true
                              : false
                            : global.dataSelected.includes(item.id)
                        }
                        onChange={() => {
                          col?.funChangeValue(item);
                        }}
                      />
                    ) : col?.funChangeValue ? (
                      col?.funChangeValue(item[col.name])
                    ) : col?.name === "icon" ? (
                      <span style={{ justifyContent: "center" }}>
                        <div onClick={() => col?.onClickAccion(item)}>
                          <NextIcon />
                        </div>
                      </span>
                    ) : col?.name === "arrBtn" && col?.arrBtn !== null ? (
                      <span style={{ justifyContent: "center" }}>
                        {col?.arrBtn.map((itemArrBtn, index) => {
                          return (
                            <div
                              key={index}
                              onClick={() => itemArrBtn.arFun(item)}
                            >
                              {itemArrBtn.btn}
                            </div>
                          );
                        })}
                      </span>
                    ) : (
                      <span>
                        {col?.funChangeValue ? (
                          col?.funChangeValue(item[col.name])
                        ) : col?.name === "icon" ? (
                          <div onClick={() => col?.onClickAccion(item)}>
                            <NextIcon />
                          </div>
                        ) : (
                          item[col.name]
                        )}
                      </span>
                    )}
                  </SubItem>
                );
              })}
            </Item>
          );
        })
      )}
    </ContainerBody>
  );
};

export default Body;
