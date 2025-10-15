import NavAuditIcon from "global/assets/generico/NavAuditIcon";
import NavEvoIcon from "global/assets/generico/NavEvoIcon";
import NavEvoPrevIcon from "global/assets/generico/NavEvoPrevIcon";
import NavFollowIcon from "global/assets/generico/NavFollowIcon";
import NavReportIcon from "global/assets/generico/NavReportIcon";
import NavResumenIcon from "global/assets/generico/NavResumenIcon";
import NavSearchIcon from "global/assets/generico/NavSearchIcon";
import NavTimeLineIcon from "global/assets/generico/NavTimeLineIcon";

export const ItemXRoll = (arrayState) => {
  let itemsHamburguer;
  if (arrayState.length > 0) {
    itemsHamburguer = [
      {
        id: 1,
        descripcion: "Buscar paciente",
        icon: (
          <NavSearchIcon
            className={"ptur-dropDownAvatar-icons"}
            color={"white"}
          />
        ),
        path: "/buscarpaciente",
      },
      {
        id: 5,
        descripcion: "Evolución Actual",
        icon: (
          <NavEvoIcon className={"ptur-dropDownAvatar-icons"} color={"white"} />
        ),
        path: "/evolucion",
      },
      {
        id: 6,
        descripcion: "Linea de Tiempo",
        icon: (
          <NavTimeLineIcon
            className={"ptur-dropDownAvatar-icons"}
            color={"white"}
            color2={"var(--color-latex10)"}
          />
        ),
        path: "/evolucion/lineadetiempo",
      },
      {
        id: 2,
        descripcion: "Seguimientos",
        icon: (
          <NavFollowIcon
            className={"ptur-dropDownAvatar-icons"}
            color={"white"}
          />
        ),
        path: "/seguimientos",
      },
      {
        id: 3,
        descripcion: "Auditoría",
        icon: (
          <NavAuditIcon
            className={"ptur-dropDownAvatar-icons"}
            color={"white"}
          />
        ),
        path: "/auditoria",
      },
      {
        id: 4,
        descripcion: "Receta Digital",
        icon: (
          <NavReportIcon
            className={"ptur-dropDownAvatar-icons"}
            color={"white"}
          />
        ),
        path: "/recetas",
      },
      {
        id: 7,
        descripcion: "Grilla Histórica",
        icon: (
          <NavEvoPrevIcon
            className={"ptur-dropDownAvatar-icons"}
            color={"white"}
          />
        ),
        path: "/grillahistorica",
      },
      {
        id: 8,
        descripcion: "Resumen IA",
        icon: (
          <NavResumenIcon
            className={"ptur-dropDownAvatar-icons"}
            color={"white"}
          />
        ),
        path: "/resumenIA",
      },
      {
        id: 9,
        descripcion: "Laboratorio",
        icon: (
          <NavResumenIcon
            className={"ptur-dropDownAvatar-icons"}
            color={"white"}
          />
        ),
        path: "/laboratorio",
      },
    ];
    return itemsHamburguer;
  } else {
    itemsHamburguer = [
      {
        id: 1,
        descripcion: "Buscar paciente",
        icon: (
          <NavSearchIcon
            className={"ptur-dropDownAvatar-icons"}
            color={"white"}
          />
        ),
        path: "/buscarpaciente",
      },
      {
        id: 5,
        descripcion: "Evolución Actual",
        icon: (
          <NavEvoIcon className={"ptur-dropDownAvatar-icons"} color={"white"} />
        ),
        path: "/evolucion",
      },
      {
        id: 6,
        descripcion: "Linea de Tiempo",
        icon: (
          <NavTimeLineIcon
            className={"ptur-dropDownAvatar-icons"}
            color={"white"}
            color2={"var(--color-latex10)"}
          />
        ),
        path: "/evolucion/lineadetiempo",
      },
      {
        id: 4,
        descripcion: "Receta Digital",
        icon: (
          <NavReportIcon
            className={"ptur-dropDownAvatar-icons"}
            color={"white"}
          />
        ),
        path: "/recetas",
      },
      {
        id: 7,
        descripcion: "Grilla Histórica",
        icon: (
          <NavEvoPrevIcon
            className={"ptur-dropDownAvatar-icons"}
            color={"white"}
          />
        ),
        path: "/grillahistorica",
      },
      {
        id: 8,
        descripcion: "Resumen IA",
        icon: (
          <NavResumenIcon
            className={"ptur-dropDownAvatar-icons"}
            color={"white"}
          />
        ),
        path: "/resumenIA",
      },
      {
        id: 9,
        descripcion: "Laboratorio",
        icon: (
          <NavResumenIcon
            className={"ptur-dropDownAvatar-icons"}
            color={"white"}
          />
        ),
        path: "/laboratorio",
      },
      // {
      //   id: 10,
      //   descripcion: "Salir",
      //   icon: (
      //     <SalirIconDrop
      //       className={"ptur-dropDownAvatar-icons"}
      //     ></SalirIconDrop>
      //   ),
      //   path: "/",
      // },
    ];
    return itemsHamburguer;
  }
};
