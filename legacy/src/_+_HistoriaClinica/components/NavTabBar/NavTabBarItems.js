import NavAuditIcon from "global/assets/generico/NavAuditIcon";
import NavEvoIcon from "global/assets/generico/NavEvoIcon";
import NavEvoPrevIcon from "global/assets/generico/NavEvoPrevIcon";
import NavFollowIcon from "global/assets/generico/NavFollowIcon";
import NavReportIcon from "global/assets/generico/NavReportIcon";
import NavResumenIcon from "global/assets/generico/NavResumenIcon";
import TimeLine from "global/assets/generico/TimeLine";
import ResumenIAIcon from "global/assets/generico/ResumenIAIcon";

export const itemsNavTabBar = [
  {
    id: 1,
    descripcion: "Evolución Actual",
    icon: <NavEvoIcon color={"var(--color-latex30)"} size={25} />,
    route: "/evolucion",
    opcModule: true,
  },
  {
    id: 2,
    descripcion: "Línea de tiempo",
    icon: <TimeLine color={"var(--color-latex30)"} />,
    route: "/evolucion/lineadetiempo",
    opcModule: true,
  },
  {
    id: 3,
    descripcion: "Seguimientos",
    icon: <NavFollowIcon color={"var(--color-latex30)"} size={25} />,
    route: "/seguimientos",
    opcModule: true,
  },
  {
    id: 4,
    descripcion: "Auditoría",
    icon: <NavAuditIcon color={"var(--color-latex30)"} size={25} />,
    route: "/auditoria",
    opcModule: true,
  },
  {
    id: 5,
    descripcion: "Recetas Paciente",
    icon: <NavReportIcon color={"var(--color-latex30)"} size={25} />,
    route: "/recetas",
    opcModule: true,
  },
  {
    id: 6,
    descripcion: "Grilla Histórica",
    icon: <NavEvoPrevIcon color={"var(--color-latex30)"} size={25} />,
    route: "/grillahistorica",
    opcModule: true,
  },
  {
    id: 7,
    descripcion: "Resumen IA",
    icon: <ResumenIAIcon color={"var(--color-latex30)"} size={25} />,
    route: "/resumenIA",
    opcModule: true,
  },
  {
    id: 8,
    descripcion: "Laboratorio",
    icon: <ResumenIAIcon color={"var(--color-latex30)"} size={25} />,
    route: "/laboratorio",
    opcModule: true,
  },
];
