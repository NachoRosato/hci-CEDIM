export const filterSearchNumber = (list, min, max, col) => {
  list = list.filter((e) => {
    const current = Number(e[col]);
    if (min <= current && max >= current) return true;
    else return false;
  });
  return list;
};

export const dataFilter = (filter, colname, cb, itemBase) => {
  let isFiltered;
  //    console.log("Es el filtro antes: ", filter);

  filter = filter.map((e, index) => {
    if (e.column === colname) {
      isFiltered = true;

      if (filter[index - 1]) {
        return { data: cb(filter[index - 1].data, colname), column: colname };
      } else return { data: cb(itemBase, colname), column: colname };
    } else {
      return e;
    }
  });

  if (filter.length === 0 || !isFiltered) {
    // return filter.concat([{data: cb(itemBase), column: colname}]);
    // console.log("PRIMERO: ",filter.concat([{data: cb(itemBase, colname), column: colname}]));
    return filter.concat([{ data: cb(itemBase, colname), column: colname }]);
  } else {
    // return filter;
    // console.log("SEGUNDO: ",filter);
    return filter;
  }
};

export const dataViewFiltered = (filter, active, itemBase) => {
  let result = [];

  // console.log(active);
  // console.log(filter);
  if (filter.length === 0) return itemBase;
  else {
    filter.map((e, index) => {
      if (active) {
        if (filter[index - 1]) result = filter[index - 1].data;
        else result = filter[filter.length - 1].data;
      }
    });
  }

  return result;
};

const filterString = (data, col, values) => {
  data = data.filter((e, index) => values.includes(e[col]));
  return data;
};

const filterNumber = (data, col, value, isDate) => {
  // debugger
  let newData = data.filter((e) => {
    if (value[0] <= e[col] && e[col] <= value[1]) {
      return true;
    } else return false;
  });
  if(isDate){
    newData = parserDate(newData,col); 
  }
    
  return newData;
};

/**
 * Filtra los datos de una tabla según un tipo de filtro, una columna y un valor de filtro.
 *
 * @param {string} typeFilter - El tipo de filtro ("string" o "number").
 * @param {Array} filterData - Los datos de filtrado previos.
 * @param {Array|String} value - El valor de filtro (para "string" es un arreglo, para "number" es un arreglo de dos elementos).
 * @param {string} colname - El nombre de la columna a filtrar.
 * @returns {Object} - Un objeto con los datos de filtrado actualizados y el resultado del filtrado.
 */

export const filterOrder = (typeFilter, filterData, value, colname) => {
  let agregarAlFinal = true;
  let result = {
    column: colname,
    data: [],
    value: [],
    type: typeFilter,
    dataFiltered: [],
  };

  filterData = filterData.map((e, index) => {
    if (e.column === colname) {
      const previousData =
        filterData[index - 1].dataFiltered.length > 0
          ? filterData[index - 1].dataFiltered
          : filterData[index - 1].data;

      let previousValue = e.value;

      if (typeFilter === "string") {
        if (previousValue.includes(value))
          previousValue = previousValue.filter((e) => e !== value);
        else previousValue.push(value);

        result.value = [...previousValue];
        result.data = previousData;
        result.dataFiltered = filterString(
          previousData,
          colname,
          previousValue
        );
        agregarAlFinal = false;
        return result;
      }

      if (typeFilter === "number") {
        result.value = value;
        result.data = previousData;
        result.dataFiltered = filterNumber(previousData, colname, value);
        agregarAlFinal = false;
        return result;
      }
      if (typeFilter === "date") {
        result.value = value;
        result.data = previousData;
        result.dataFiltered = filterNumber(
          globalParserDate(previousData, colname),
          colname,
          value, 
          true,
        );
        agregarAlFinal = false;
        return result;
      }
    } else return e;
  });

  filterData = filterData.filter((e) => {
    if (e.value.length === 0 && e.column === colname) return false;
    if (typeFilter === "number" && value.length === 0 && e.column === colname)
      return false;
    else return true;
  });

  if (agregarAlFinal) {
    const previousData =
      filterData[filterData.length - 1].dataFiltered.length > 0
        ? filterData[filterData.length - 1].dataFiltered
        : filterData[filterData.length - 1].data;
    const previousValue = [value];
    result.value = previousValue;
    if (typeFilter === "number" || typeFilter === "date") {
      result.value = value;
    }
    result.data = previousData;
    if (typeFilter === "string") {
      result.dataFiltered = filterString(previousData, colname, previousValue);
    }
    if (typeFilter === "number") {
      result.dataFiltered = filterNumber(previousData, colname, value);
    }
    if (typeFilter === "date") {
      result.dataFiltered = filterNumber(
        globalParserDate(previousData, colname),
        colname,
        value, 
        true,
      );
    }
    return { filterData: filterData.concat([result]), currentData: result };
  } else return { filterData, currentData: result };
};

export const findByColumn = (colname, filterList) => {
  let result = { current: false, filtered: false };
  let agregarAlFinal = true;

  filterList.map((e, index) => {
    if (e.column === colname) {
      agregarAlFinal = false;
      result.current = filterList[index - 1].dataFiltered;
      result.filtered = filterList[index];
    }
  });
  if (agregarAlFinal) {
    result.current = filterList[filterList.length - 1].dataFiltered;
    return result;
  }
  return result;
};

export const selectedData = (dataSelected, data) => {
  if (dataSelected.length === 0) return data;
  else return dataSelected;
};

const addZero = (number) => {
  if (number <= 9) {
    return `0${number}`;
  } else return number;
};

export const fechaParser = (fecha) => {
  return `${fecha.getFullYear()}-${addZero(fecha.getMonth() + 1)}-${addZero(
    fecha.getDate()
  )}`;
};

const globalParserDate = (item, name) => {
  let list = [...item]; 
  let data = list.map((e) => {
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
  return data;
};

export const parserDate = (data, col) => {
  if (data.length === 0) {
    return data;
  } else {
    data = data.map((e) => {
      let fecha = e[col];
      if(typeof fecha !== "string"){
        fecha =
          fecha.getFullYear() +
          "-" +
          (fecha.getMonth() + 1 < 10
            ? "0" + (fecha.getMonth() + 1)
            : fecha.getMonth() + 1) +
          "-" +
          (fecha.getDate() < 10 ? "0" + fecha.getDate() : fecha.getDate()) +
          "T00:00:00";
          e[col] = fecha;
      }else {
        alert("Esta aca en algun momento")
      }
    
      return e;
    });
    return data;
  }
};
