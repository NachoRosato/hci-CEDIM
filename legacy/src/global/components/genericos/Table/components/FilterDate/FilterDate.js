import { useEffect, useState } from "react";
import { ContainerFilterDate } from "./localStyle";
import { fechaParser, filterOrder, findByColumn } from "../../funtions/filter";

// item={global.data}
// name={col.name}
// setGlobal={setGlobal}
// global={global}
// setFilterActive={setFilterActive}
// config={config}
// active={filterActive === key}
const FilterDate = ({ setFilterActive, item, config, name, global, setGlobal }) => {
  const [data, setData] = useState([]);
  const [max, setMax] = useState(""); 
  const [min, setMin] = useState(""); 
  const [baseMax, setBaseMax] = useState(""); 
  const [baseMin, setBaseMin] = useState(""); 


  useEffect(() => {
    let dataModify = [...item]; 

    let data = dataModify.map((e) => {
      const element = {...e}; 
      if (typeof element[name] === "string") {
        let fecha = element[name].split("T")[0].split("-");
        let año = fecha[0];
        let mes = fecha[1];
        let dia = fecha[2];
        let newDate = new Date(`${año} ${mes} ${dia}`);
        element[name] = newDate;
      }

      return element;
    });
    data = data.sort((a, b) => {
      if (a[name] < b[name]) return -1;
      else if (a[name] > b[name]) return 1;
      else return 0;
    });
    let newData = findByColumn(name, global.filter);
    let value = newData.current;
    let filterValue = newData.filtered?.value?.length > 0 ?  newData.filtered?.value: false;
    setData(data);
    if(filterValue){
      setMax(fechaParser(filterValue[1])); 
      setMin(fechaParser(filterValue[0]));
      setBaseMax(fechaParser(filterValue[1])); 
      setBaseMin(fechaParser(filterValue[0])); 
    }else {
      setMax(fechaParser(data[data.length - 1][name])); 
      setMin(fechaParser(data[0][name]));
      setBaseMax(fechaParser(data[data.length - 1][name])); 
      setBaseMin(fechaParser(data[0][name])); 
    }
  }, []);


  const changeFilter = (type,e) => {
    // alert(type); 
    const value = e.target.value; 
    
    if(type === "max"){
        setMax(value);
        let newData;  
        if(value === baseMax && min === baseMin){
            newData = filterOrder("date", global.filter, [], name);
        }else {
            newData = filterOrder("date", global.filter, [new Date(min.replaceAll("-"," ")), new Date(value.replaceAll("-"," "))], name);   
        }        
        setGlobal({ ...global, filter: newData.filterData});
    }
    if(type === "min"){
        setMin(value); 
        let newData;
        if(value === baseMax && min === baseMin){
            newData = filterOrder("date", global.filter, [], name);
        }else {
            newData =  filterOrder("date", global.filter, [new Date(value.replaceAll("-"," ")),new Date(max.replaceAll("-"," "))], name);   
        }        
        setGlobal({ ...global, filter: newData.filterData }); 
    }
  }; 

 const handleDelete = () => {
  const filterSelected = global.filter.filter((e) => e.column !== name);
  setGlobal({ ...global, filter: filterSelected});
  setFilterActive(-1); 
 }

  return (
    <ContainerFilterDate>
      <div className="container-date">
        <div className="container-date-item">
          <span>Fecha desde: </span>
          <input type="date" value={min} min={baseMin} max={baseMax} onChange={(e) => changeFilter("min", e)} />
        </div>
        <div className="container-date-item">
          <span>Fecha hasta: </span>
          <input type="date" value={max}  min={baseMin} max={baseMax} onChange={(e) => changeFilter("max", e)}/>
        </div>
      </div>
      <div className="container-btn">
        <button onClick={handleDelete}>borrar filtro</button>
        <button onClick={() => setFilterActive(-1)}>Cerrar</button>
      </div>
    </ContainerFilterDate>
  );
};

export default FilterDate;
