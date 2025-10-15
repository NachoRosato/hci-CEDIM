import { useEffect, useState } from "react";
import { filterOrder, findByColumn } from "../../funtions/filter";
import {
  newOrderLista,
  repeatStr,
} from "../../funtions/searcher";
import { ContainerCheck, ContainerFilterString } from "./localStyle";

const FilterString = ({ item, name, global, setGlobal, setFilterActive, active }) => {
  let newData = findByColumn(name, global.filter); 
  let value = newData.filtered; 
  value = value ? value.value : []; 
  const [selected, setSelected] = useState(value);
  newData = findByColumn(name, global.filter).current; 
  const data = repeatStr(newData, name);
  const [items, setItems] = useState(data);

  const handleClick = (id) => {
    let filterData = global.filter; 
    const newFilterData = filterOrder("string", filterData, id, name);
    // console.log(newFilterData.currentData.value); 
    setSelected(newFilterData.currentData.value); 
    setGlobal({ ...global, filter: newFilterData.filterData});
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const newDatos = newOrderLista(newData, [name], value);
    setItems(repeatStr(newDatos, name));
  };

  const handleDelete = () => {
    // setSelected([]);
    
    const filterSelected = global.filter.filter((e) => e.column !== name);
    setGlobal({ ...global, filter: filterSelected});
    setFilterActive(-1); 
  };


  const viewObject = () => {
    const keys = Object.keys(items);

    return keys.map((key, index) => (
      <div
        key={index}
        className="container-item"
        onClick={() => handleClick(key)}
      >
        <input
          type={"checkbox"}
          checked={selected.includes(key)}
          value={selected.includes(key)}
          onChange={() => {
          }}
        />{" "}
        <span>{`${key} (${items[key]})`}</span>
      </div>
    ));
  };








  return (
    <ContainerFilterString>
      <input
        type={"text"}
        placeholder={"Ingresar texto de búsqueda ..."}
        onChange={handleChange}
      />
      <ContainerCheck>{viewObject()}</ContainerCheck>
      <div className="container-btn">
        <button onClick={handleDelete}>Borrar el filtro</button>
        <button onClick={() => setFilterActive(-1)}>Cerrar</button>
      </div>
    </ContainerFilterString>
  );
};

export default FilterString;





