import { useState } from "react";
import { createStructureData, orderForColumn } from "../../funtions/acordion";
import { pagination } from "../../funtions/pagination";
import { Item, SubItem } from "../Body/localStyle";
import { ItemAcordion } from "./localStyle";

const Acordion = ({ global, itemSelected, handleSelect }) => {
  //#region ------ states --------
  const [acordeonSelected, setAcordeonSelected] = useState(false);
  //#endregion --- states --------

  //#region ------ constants --------
  const column = global.agrupamietoColumn;
  const resultado = pagination(orderForColumn(global.data, column[0].toLowerCase()), 13);
  //#endregion --- constants --------

  //#region ------ funciones --------
  const handleClick = (index) => {
    if (acordeonSelected !== index) {
      setAcordeonSelected(index);
    }else {
      setAcordeonSelected(false);
    }
  };

  //#endregion --- funciones --------

  return resultado[global.indexPagination].map((col, index) => {
    return (
      <ItemAcordion
        key={index}
        allRow={col[1].length}
        id={index}
        acordeonSelected={acordeonSelected}
      >
        <div className="containerText"  onClick={() => handleClick(index)}>
        {col[0] } {`(${col[1].length})`}
        </div>
        <div className="container-content-acordeon">
          {col[1].map((item, index) => {
            return (
              <Item
                key={index}
                onClick={() => {
                  handleSelect(item.id);
                }}
                selected={itemSelected.includes(item.id)}
              >
                {global.column.map((col, index) => {
                  return (
                    <SubItem
                      key={index}
                      width={
                        global.copyLenCol[index]
                          ? global.copyLenCol[index]
                          : global.copyLenCol["all"]
                      }
                    >
                      {" "}
                      {col.type === "select-boolean" ? (
                        <input
                          type={"checkbox"}
                          checked={itemSelected.includes(item.id)}
                        />
                      ) : (
                        item[col.name]
                      )}
                    </SubItem>
                  );
                })}
              </Item>
            );
          })}
        </div>
      </ItemAcordion>
    );
  });
};

export default Acordion;
