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
    checked: false,
  },
  // COMENTADO TEMPORALMENTE - Filtro de Estudios en EvoPrevia
  // Para reactivar el filtro de estudios, descomentar las siguientes líneas:
  // {
  //   id: 2,
  //   descripcion: "Estudios",
  //   checked: false,
  // },
  {
    id: 3,
    descripcion: "Laboratorio",
    checked: false,
  },
  {
    id: 4,
    descripcion: "Informes",
    checked: false,
  },
];
