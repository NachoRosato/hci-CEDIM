import Login from "../pages/Login/Login";
import BuscarPaciente from "_+_HistoriaClinica/pages/BuscarPaciente/BuscarPaciente";
import Evolucion from "_+_HistoriaClinica/pages/Evolucion/Evolucion";
import TimeLine from "_+_HistoriaClinica/pages/TimeLine/TimeLine";
import PaginaNoEncontrada from "_+_HistoriaClinica/pages/PaginaNoEncontrada/PaginaNoEncontrada";
import Seguimiento from "_+_HistoriaClinica/pages/Seguimiento/Seguimiento";
import Auditoria from "_+_HistoriaClinica/pages/Auditoria/Auditoria";
import RecetasPaciente from "_+_HistoriaClinica/pages/RecetasPaciente/RecetasPaciente";
import EvoPrevia from "_+_HistoriaClinica/pages/EvoPrevia/EvoPrevia";
import ResumenIA from "_+_HistoriaClinica/pages/ResumenIA/ResumenIA";
import Laboratorio from "_+_HistoriaClinica/pages/Laboratorio/Laboratorio";

const routes = [
  {
    path: "/",
    component: Login,
    auth: false,
    title: "Login HC",
  },
  {
    path: "/auth/login",
    component: Login,
    auth: false,
    title: "Login HC",
  },
  {
    path: "/buscarpaciente",
    component: BuscarPaciente,
    auth: true,
    title: "Buscar paciente",
  },
  {
    path: "/evolucion",
    component: Evolucion,
    auth: true,
    title: "Evolución",
  },
  {
    path: "/evolucion/lineadetiempo",
    component: TimeLine,
    auth: true,
    title: "Línea de Tiempo",
  },
  {
    path: "/seguimientos",
    component: Seguimiento,
    auth: true,
    title: "Seguimientos",
  },
  {
    path: "/auditoria",
    component: Auditoria,
    auth: true,
    title: "Auditoría",
  },
  {
    path: "/recetas",
    component: RecetasPaciente,
    auth: true,
    title: "Recetas Paciente",
  },
  {
    path: "/grillahistorica",
    component: EvoPrevia,
    auth: true,
    title: "Evoluciones Previas",
  },
  {
    path: "/resumenIA",
    component: ResumenIA,
    auth: true,
    title: "Resumen IA",
  },
  {
    path: "/laboratorio",
    component: Laboratorio,
    auth: true,
    title: "Laboratorio",
  },
  {
    path: "/404",
    component: PaginaNoEncontrada,
    auth: false,
    title: "Página no Encontrada",
  },
];

export default routes;
