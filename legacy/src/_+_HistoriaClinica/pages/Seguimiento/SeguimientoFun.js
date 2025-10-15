export const setSegInitialData = () => {
  let ListDataSeg = {
    seguimiento: {
      segAll: null,
    },
  };
  localStorage.setItem("ListDataSeg", JSON.stringify(ListDataSeg));
};

export const checkLocalDataSeg = (data) => {
  let flgCheck = false;
  if (data !== undefined) {
    for (let clave in data.ListDataSeg.evolucion) {
      if (data.ListDataSeg.seguimiento[clave] === null) {
        flgCheck = true;
      }
    }
  } else {
    flgCheck = true;
  }
  return flgCheck;
};

export const setLocalDataSeg = (segAll) => {
  let ListDataSeg = {
    seguimiento: {
      segAll: segAll,
    },
  };
  return ListDataSeg;
};
