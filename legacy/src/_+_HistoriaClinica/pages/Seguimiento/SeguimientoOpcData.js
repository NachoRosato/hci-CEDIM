import LaboratorioIcon from "global/assets/generico/LaboratorioIcon";
import TimeLine from "global/assets/generico/TimeLine";
export const itemsHcNav = [
  {
    id: 1,
    descripcion: "Evolución Actual",
    icon: <LaboratorioIcon color={"var(--color-latex30)"} />,
  },
  {
    id: 2,
    descripcion: "Línea de tiempo",
    icon: <TimeLine color={"var(--color-latex30)"} />,
  },
  {
    id: 3,
    descripcion: "Seguimientos",
    icon: <TimeLine color={"var(--color-latex30)"} />,
  },
  {
    id: 4,
    descripcion: "Auditoría",
    icon: <TimeLine color={"var(--color-latex30)"} />,
  },
];

export const itemsFiltros = [
  {
    id: 0,
    descripcion: "Todos",
    checked: true,
  },
  {
    id: 1,
    descripcion: "Evolución",
    checked: false,
  },
  {
    id: 2,
    descripcion: "Estudios",
    checked: false,
  },
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

export const itemsTipoSegData = [
  {
    id: 1,
    descripcion: "TODOS",
  },
  {
    id: 2,
    descripcion: "ADMINISTRATIVO",
  },
  {
    id: 3,
    descripcion: "MÉDICO",
  },
  {
    id: 4,
    descripcion: "INTERCONSULTA",
  },
];
export const itemsTipoEstado = [
  {
    id: 1,
    descripcion: "TODOS",
    alias: "",
    checked: true,
  },
  {
    id: 2,
    descripcion: "ABIERTO",
    alias: "A",
    checked: false,
  },
  {
    id: 3,
    descripcion: "CERRADO",
    alias: "C",
    checked: false,
  },
];
