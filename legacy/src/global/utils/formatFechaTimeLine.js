export function formatFechaTimeLine(fecha) {
  let reg = /-/g;
  let auxFecha = fecha.replace(reg, "/");
  return `${
    auxFecha.slice(8, 10) +
    "/" +
    auxFecha.slice(5, 7) +
    "/" +
    auxFecha.slice(0, 4)
  }`;
}

export function formatFechaEvo(fecha) {
  let auxFecha = fecha;
  auxFecha =
    auxFecha.slice(0, 4) +
    "-" +
    auxFecha.slice(5, 7) +
    "-" +
    auxFecha.slice(8, 10);
  return `${auxFecha}`;
}
