const fechaTurnoFormat = () => {
  let fechaDefault = new Date();

  return (
    fechaDefault.getFullYear() +
    "-" +
    (fechaDefault.getMonth() + 1 < 10
      ? "0" + (fechaDefault.getMonth() + 1)
      : fechaDefault.getMonth() + 1) +
    "-" +
    (fechaDefault.getDate() < 10
      ? "0" + fechaDefault.getDate()
      : fechaDefault.getDate())
  );
};
export default fechaTurnoFormat;

export const orderDatePicker = (fecha) => {
  if (fecha && typeof fecha !== "object") {
    fecha = fecha.split("T");
    fecha = fecha[0].split("-");
    return `${fecha[1]} ${fecha[2]} ${fecha[0]}`;
  } else {
    return fecha;
  }
};

export const fechaDatePicker = (fechaOrden) => {
  if (fechaOrden !== undefined) {
    return fechaOrden.replaceAll("-", " ");
  } else {
    let fechaDefault = new Date();

    return (
      fechaDefault.getFullYear() +
      " " +
      (fechaDefault.getMonth() + 1 < 10
        ? "0" + (fechaDefault.getMonth() + 1)
        : fechaDefault.getMonth() + 1) +
      " " +
      (fechaDefault.getDate() < 10
        ? "0" + fechaDefault.getDate()
        : fechaDefault.getDate())
    );
  }
};
