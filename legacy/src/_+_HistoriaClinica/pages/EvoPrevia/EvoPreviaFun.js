//func de chequeo de data LOCAL

export const checkLocalDataTL = (data) => {
  let flgCheck = false;
  if (data !== undefined) {
    for (let clave in data.ListDataTL.evolucion) {
      if (data.ListDataTL.evolucion[clave] === null) {
        flgCheck = true;
      }
    }
    for (let clave in data.ListDataTL.paciente) {
      if (data.ListDataTL.paciente[clave] === null) {
        flgCheck = true;
      }
    }
    for (let clave in data.ListDataTL.labHistorico) {
      if (data.ListDataTL.labHistorico[clave] === null) {
        flgCheck = true;
      }
    }
  } else {
    flgCheck = true;
  }
  return flgCheck;
};

export const setLocalDataTL = (
  evoHistorica,
  estudioHistorico,
  informeHistorico,
  labHistorico,
  filtrosTL
) => {
  let ListDataTL = {
    evolucion: {
      evoHistorica: evoHistorica,
      filtrosTL: filtrosTL,
    },
    paciente: {
      estudioHistorico: estudioHistorico,
      informeHistorico: informeHistorico,
    },
    labo: {
      labHistorico: labHistorico,
    },
  };
  return ListDataTL;
};
