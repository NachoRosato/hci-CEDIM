export const agregarDesc = (array) => {
  const valoresLabo = [];

  array.forEach((item1, index, array) => {
    valoresLabo.push(item1.descripcion);
  });
  const descripcionConcatenada = valoresLabo.join(" | ");

  return descripcionConcatenada;
};
