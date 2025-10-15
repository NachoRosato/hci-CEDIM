export const parseFilterKinesio = (varAux, e) => {
  // manejo el estado de los botones
  if (e.target.id.toString() === "0" && !e.target.checked) {
    // rangoArrx = rangoArrx.map((array) => ({ ...array, checked: true })); // FALSE
    // rangoArrx[0].checked = false;
  } else if (e.target.id.toString() === "0" && e.target.checked) {
    varAux = varAux.map((array) => ({ ...array, checked: false })); // TRUE
    varAux[0].checked = true;
  } else if (e.target.id.toString() !== "0") {
    let objIndex = varAux.findIndex(
      (obj) => obj.id.toString() === e.target.id.toString()
    );

    varAux[objIndex].checked = e.target.checked;
    //no se cumple la funcion de todos. Destildo.
    varAux[0].checked = false;
    if (!varAux[0].checked) {
      let rangoAux = varAux.filter((item) => item.checked !== true);
      if (
        (rangoAux.length === 7 &&
          rangoAux.filter((item) => item.id === 0).length > 0) ||
        (rangoAux.length === 1 &&
          rangoAux.filter((item) => item.id === 0).length > 0)
      ) {
        varAux[0].checked = true;
      }
    }
  }

  return varAux;
};

export const parseFiltros = (varAux, e) => {
  const id = e.target.id;
  if (id === 0 && varAux[0].checked === false) {
    // todos
    varAux.map((e) => (e.checked = false));
    varAux[0].checked = true;
  } else if (id !== 0) {
    varAux.map((e) => {
      if (Number(e.id) === Number(id)) {
        e.checked = !e.checked;
      }
    });
    varAux[0].checked = false;

    const allUnchecked = varAux.slice(1).every((item) => !item.checked);
    if (allUnchecked) {
      varAux[0].checked = true;
    }
  }

  return varAux;
};

export const parseCheckBox = (varAux, e) => {
  const id = e.target.id;
  if (id !== 0) {
    varAux.map((e) => {
      if (Number(e.id) === Number(id)) {
        e.checked = !e.checked;
      }
    });
  }
  return varAux;
};
