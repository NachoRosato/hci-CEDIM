import TimeLine from "global/assets/generico/TimeLine";
export const itemsHcNav = [
  {
    id: 1,
    descripcion: "Línea de tiempo",
    icon: <TimeLine color={"var(--color-latex30)"} />,
  },
  {
    id: 2,
    descripcion: "Auditoría",
    icon: <TimeLine color={"var(--color-latex30)"} />,
  },
];

export const itemsFiltros = [
  // {
  //   id: 0,
  //   descripcion: "Todos",
  //   checked: true,
  // },
  {
    id: 1,
    descripcion: "Evolución",
    checked: true,
  },
  // COMENTADO TEMPORALMENTE - Para ocultar estudios de la línea de tiempo
  // Si se quiere volver a mostrar, descomentar las siguientes líneas:
  // {
  //   id: 2,
  //   descripcion: "Estudios",
  //   checked: true,
  // },
  {
    id: 3,
    descripcion: "Laboratorio",
    checked: true,
  },
  {
    id: 4,
    descripcion: "Informes",
    checked: true,
  },
];
