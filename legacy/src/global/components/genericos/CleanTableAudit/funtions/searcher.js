export const newOrderLista = (datos, params, strCompare) => {
  // primero transformamos el strCompare en un str;
  let valueSearching =
    typeof strCompare === "string" ? strCompare : JSON.stringify(strCompare);

  // luego hacemos que se transforme en un array
  // EJ: "se ba" => ["s", "e", "b", "a"]
  valueSearching = parseStringArray(valueSearching);

  // Recorremos el strCompare y filtramos la lista
  valueSearching.forEach((value) => {
    // filtramos los datos teniendo en cuenta los params
    datos = datos.filter((dato) => {
      // Nueva recorrida para obtener los diferentes param
      for (let index = 0; index < params.length; index++) {
        let element = dato[params[index]];
        element = JSON.stringify(element);
        if (parserString(element).includes(parserString(value))) {
          return true;
        }
      }
    });
  });
  return datos;
};
export const parserString = (str) => {
  if (str) {
    str = str
      .toUpperCase()
      .normalize("NFD")
      .replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2")
      .replace(/ /g, "");
  } else str = "";
  return str;
};

export const parseStringArray = (str) => {
  str = str.split(" ");
  const newArray = [];
  str.forEach((element) => {
    if (element !== "") {
      newArray.push(element);
    }
  });
  return newArray;
};

export const repeatStr = (list, name) => {
  const obj = {};

  list.map((e) => {
    if (obj[e[name]]) {
      obj[e[name]] = obj[e[name]] + 1;
    } else {
      obj[e[name]] = 1;
    }
  });

  return obj;
};


export const filterPerColumna = (list, columns, name) => {
  if(columns.length === 0 ){
    return list; 
  }
  list = list.filter((e) => {
    return (columns.includes(e[name]))
  }); 
  return list; 
};