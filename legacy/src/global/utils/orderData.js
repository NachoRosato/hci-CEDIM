const parserString = (str) => {
  if (str) {
    str = str
      .toUpperCase()
      .normalize("NFD")
      .replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2")
      .replace(/ /g, "");
  } else str = "";
  return str;
};

const parseStringArray = (str) => {
  str = str.split(" ");
  const newArray = [];
  str.forEach((element) => {
    if (element !== "") {
      newArray.push(element);
    }
  });
  return newArray;
};
export const orderLista = (datos, palabra, origen, param) => {
  if (Array.isArray(datos) && typeof palabra === "string") {
    palabra = parseStringArray(palabra);
    for (let index = 0; index < palabra.length; index++) {
      const elementOne = palabra[index];
      datos = datos.filter((elementTwo) => {
        let encontrado = false;
        if (
          parserString(
            origen && origen === "OBRA_SOCIAL"
              ? elementTwo.nombre
              : origen && origen === "CUSTOM"
              ? JSON.stringify(elementTwo[param])
              : elementTwo.descripcion
          ).includes(parserString(elementOne)) ||
          parserString(
            origen && origen === "OBRA_SOCIAL"
              ? elementTwo.codigo
              : elementTwo.tags
          ).includes(parserString(elementOne))
        ) {
          encontrado = true;
        }
        return encontrado;
      });
    }
    return datos;
  } else return datos;
};

export const orderListaStartsWith = (datos, palabra, origen, param) => {
  if (!Array.isArray(datos) || typeof palabra !== "string") return datos;

  const palabraCompleta = parserString(palabra); // ej: "acido f"
  const palabrasSeparadas = parseStringArray(palabra); // ej: ["acido", "f"]

  const getCampo = (element) => {
    return parserString(
      origen === "OBRA_SOCIAL"
        ? element.nombre
        : origen === "CUSTOM"
        ? JSON.stringify(element[param])
        : origen === "RECETA"
        ? element.nombreComercial
        : element.descripcion
    );
  };

  const getCampoAlt = (element) => {
    return parserString(
      origen === "OBRA_SOCIAL" ? element.codigo : element.tags
    );
  };

  // 1. Primero: los que empiezan exactamente con el string completo
  const empiezaCon = datos.filter((element) =>
    getCampo(element).startsWith(palabraCompleta)
  );

  // 2. Segundo: los que contienen el string completo, ordenados por posición de aparición
  const contieneCompleto = datos
    .filter(
      (element) =>
        !getCampo(element).startsWith(palabraCompleta) &&
        (getCampo(element).includes(palabraCompleta) ||
          getCampoAlt(element).includes(palabraCompleta))
    )
    .sort((a, b) => {
      const indexA = getCampo(a).indexOf(palabraCompleta);
      const indexB = getCampo(b).indexOf(palabraCompleta);
      return indexA - indexB;
    });

  // 3. Tercero: búsqueda por cada palabra
  let restantes = datos.filter(
    (element) =>
      !empiezaCon.includes(element) && !contieneCompleto.includes(element)
  );

  for (let i = 0; i < palabrasSeparadas.length; i++) {
    const palabraParcial = parserString(palabrasSeparadas[i]);
    restantes = restantes.filter((element) => {
      const campo = getCampo(element);
      const campoAlt = getCampoAlt(element);
      return (
        campo.includes(palabraParcial) || campoAlt.includes(palabraParcial)
      );
    });
  }

  return [...empiezaCon, ...contieneCompleto, ...restantes];
};

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
