export const setFarmacoDtoId = (editar, medicamentoSelected, tipoVademecum) => {
  let id;
  if (editar && tipoVademecum === "alfa") {
    id = `V|${medicamentoSelected.idProducto}`;
  } else if (!editar && tipoVademecum === "alfa") {
    id = `V|${medicamentoSelected.producto}`;
  } else if (editar && tipoVademecum === "kairos") {
    id = `K|${medicamentoSelected.idProducto}`;
  } else if (!editar && tipoVademecum === "kairos") {
    id = `K|${medicamentoSelected.producto}`;
  } else {
    id = "";
  }
  return id;
};
