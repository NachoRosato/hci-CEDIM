import { useEffect, useState } from "react";
import { orderForColumn } from "../../funtions/acordion";
import {
  dataFilter,
  filterOrder,
  filterSearchNumber,
  findByColumn,
} from "../../funtions/filter";
import { orderItemsFun } from "../../funtions/order";
import { pagination } from "../../funtions/pagination";
import { FilterNumberContainer } from "./localStyle";

const FilterNumber = ({
  setFilterActive,
  item,
  name,
  setGlobal,
  config,
  global,
}) => {
  let newData = findByColumn(name, global.filter);
  let value = newData.current;
  let filterValue = newData.filtered?.value?.length > 0 ?  newData.filtered?.value: false; 
  // value = value ? value.dataFiltered : newData.current; 

  const listOrdenada = orderItemsFun(value, name);
  const max = listOrdenada[listOrdenada.length - 1][name];
  const min = listOrdenada[0][name];

  const [firstNumber, setFirstNumber] = useState(filterValue ? filterValue[0]: min);
  const [secondNumber, setSecondNumber] = useState(filterValue ? filterValue[1]: max);

  const changeFirstNumber = (e) => {
    const value = Number(e.target.value);
    if (value < secondNumber) {
      setFirstNumber(value);
      let newData; 
      if (value === min && secondNumber === max) {
        newData = filterOrder("number", global.filter, [], name);
      }else {
        newData = filterOrder(
          "number",
          global.filter,
          [value, secondNumber],
          name
        );
      }
      setGlobal({ ...global, filter: newData.filterData });
    }
  };
  const changeSecondNumber = (e) => {
    const value = Number(e.target.value);
    if (value > firstNumber) {
      setSecondNumber(value);
      let newData; 
      if (value === max && firstNumber === min) {
        newData = filterOrder("number", global.filter, [], name);
      }else {
        newData = filterOrder(
          "number",
          global.filter,
          [firstNumber, value],
          name
        );
      }
      setGlobal({ ...global, filter: newData.filterData });
    }
  };
  const deleteRange = () => {
    // setFirstNumber(0);
    // setSecondNumber(max);
     
    const filterSelected = global.filter.filter((e) => e.column !== name);
    setGlobal({ ...global, filter: filterSelected});
    setFilterActive(-1);
  };

  // useEffect(() => {

  // },[firstNumber, secondNumber])

  return (
    <FilterNumberContainer>
      <div className="range-container">
        <input
          onChange={changeFirstNumber}
          type={"range"}
          max={max}
          min={0}
          value={firstNumber}
        />
        <input
          onChange={changeSecondNumber}
          type={"range"}
          max={max}
          min={0}
          value={secondNumber}
        />
      </div>
      <div className="max-min-container">
        <span>MAX</span>
        <input
          type={"number"}
          onChange={changeFirstNumber}
          max={max}
          min={0}
          value={firstNumber}
        />
        <span>MIN</span>
        <input
          type={"number"}
          onChange={changeSecondNumber}
          max={max}
          min={0}
          value={secondNumber}
        />
      </div>
      <div className="container-btn">
        <button onClick={deleteRange}>borrar filtro</button>
        <button
          onClick={() => {
            setFilterActive(-1);
          }}
        >
          Cerrar
        </button>
      </div>
    </FilterNumberContainer>
  );
};

export default FilterNumber;
