/*
 * =====================================================================================
 * CAMBIOS TEMPORALES PARA OCULTAR ESTUDIOS EN EVOPREVIA
 * =====================================================================================
 *
 * DESCRIPCIÓN:
 * Se han implementado cambios temporales para ocultar los elementos de tipo "Estudios"
 * de la vista previa de evolución (EvoPrevia). Los cambios están diseñados para ser
 * fácilmente reversibles en caso de que el propietario del sistema decida reactivar
 * la funcionalidad de estudios.
 *
 * CAMBIOS REALIZADOS:
 * 1. TimeLineOpcData.js (líneas 26-32): Filtro "Estudios" comentado
 * 2. EvoPrevia.js (líneas 874-876): Filtro adicional en configTable para remover estudios
 *
 * IMPACTO:
 * - Los estudios no aparecerán en la tabla de EvoPrevia
 * - El botón de filtro "Estudios" no será visible
 * - La funcionalidad de estudios permanece intacta en el código
 *
 * PARA REVERTIR LOS CAMBIOS:
 * 1. Descomentar el filtro "Estudios" en TimeLineOpcData.js (líneas 28-32)
 * 2. Comentar las líneas 874-876 y cambiar "data: arrayTimeLineFiltrado" por "data: arrayTimeLine"
 *
 * FECHA DE IMPLEMENTACIÓN: [Fecha actual]
 * RESPONSABLE: [Nombre del desarrollador]
 * =====================================================================================
 */

import React, { useContext, useEffect, useState } from "react";
import {
  hideModal,
  showModal,
} from "../../../global/context/action/modal/modal";
import { GlobalContext } from "../../../global/context/Provider";
import { itemsFiltros } from "./TimeLineOpcData";
import { useHistory } from "react-router";
import {
  setEstudiosPacienteCtx,
  setInformesPacienteCtx,
  wsGetEstudiosPaciente,
  wsGetInformesPaciente,
} from "_+_HistoriaClinica/context/action/paciente/paciente";
import { HistoriaClinicaContext } from "_+_HistoriaClinica/context/Provider";
import { getFechaNacFormat } from "global/utils/getFechaNacFormat";
import {
  resetEditarEvo,
  resetEvoActual,
  resetHcXPdf,
  resetHistoricas,
  setEvolucionHistoricasCtx,
  setFiltrosTLCtx,
  wsGetEvolucionHistoricas,
  wsGetFiltrosTimeLine,
  wsGetHcXPdf,
} from "_+_HistoriaClinica/context/action/evolucion/evolucion";
import {
  setLabHistoricoCtx,
  wsGetLabHistorico,
  wsGetLabPdf,
  wsResetLabPdf,
} from "_+_HistoriaClinica/context/action/laboratorio/laboratorio";
import {
  ContainerBody,
  ContainerLeft,
  ContainerNombrePac,
  ContainerPacDatos,
  ContainerData,
  ContainerItemShown,
  ContainerItemShownTitle,
  ButtonEditarEv,
  ButtonVerImg,
  ContainerButtonsItemShown,
  ContainerItemTitle,
  ContainerRight,
  FilterBox,
  CheckMark,
  FiltrosContainer,
} from "./localStyle";
import {
  wsGetPdfInforme,
  wsGetVisorImagen,
  wsResetInformePdf,
  wsResetVisorImagen,
} from "_+_HistoriaClinica/context/action/informe/informe";
import { showToaster } from "global/context/action/toaster/toaster";
import { checkLocalDataTL, setLocalDataTL } from "./EvoPreviaFun";
import {
  addItemIndexDB,
  deleteItemIndexDB,
  getItemIndexDB,
  setEvoInitialData,
} from "../Evolucion/EvolucionFun";
import { base64toBlob } from "global/utils/base64toBlob";
import NavTabBar from "_+_HistoriaClinica/components/NavTabBar/NavTabBar";
import ImagenesIcon from "global/assets/generico/ImagenesIcon";
import camelize from "global/utils/camelize";
import HeaderbarHome from "../../../global/components/genericos/HeaderbarHome/HeaderbarHome";
import Modal from "../../../global/components/genericos/Modal/Modal";
import getEdad from "global/utils/getEdad";
import InformesIcon from "global/assets/generico/InformesIcon";
import LaboTimeLineIcon from "global/assets/generico/LaboTimeLineIcon";
import Loading from "global/components/genericos/Loading/Loading";
import ItemActiveTL from "_+_HistoriaClinica/components/ItemActiveTL/ItemActiveTL";
import Mensaje from "global/components/genericos/Mensaje/Mensaje";
import LaboratorioIcon from "global/assets/generico/LaboratorioIcon";
import EditarMobileIcon from "global/assets/generico/EditarMobileIcon";
import Toaster from "global/components/genericos/Toaster/Toaster";
import ModalDatosMedico from "_+_HistoriaClinica/components/ModalDatosMedico/ModalDatosMedico";
import Table from "global/components/genericos/Table/Table";

const EvoPrevia = () => {
  const {
    modalState,
    modalDispatch,
    authState,
    toasterState,
    toasterDispatch,
    usuarioRolState,
  } = useContext(GlobalContext);
  const {
    pacienteState,
    pacienteDispatch,
    laboratorioDispatch,
    laboratorioState,
    evolucionState,
    evolucionDispatch,
    informeDispatch,
    informeState,
  } = useContext(HistoriaClinicaContext);
  const history = useHistory();
  const [showItemTL, setShowItemTL] = useState(null);
  const [pdfPaciente, setPdfPaciente] = useState(null);
  const [arrayTimeLine, setArrayTimeLine] = useState([]);
  const [arrayTimeLineOr, setArrayTimeLineOr] = useState([]);
  const [activeFilter, setActiveFilter] = useState(itemsFiltros);
  const [flgFiltrar, setFlgFiltrar] = useState(false);
  const [flgActualizarTL, setFlgActualizarTL] = useState(false);
  const [flgStopFilter, setFlgStopFilter] = useState(true);
  const [buscadorTxt, setBuscadorTxt] = useState("");
  const [loading, setLoading] = useState(false);
  const windowWidth = window.innerWidth;

  let config = localStorage.getItem("config");
  let opcFormatTags = JSON.parse(config).opcFormatearTextoTags;

  const fechaNac = () => {
    let parseFecha =
      pacienteState?.paciente?.buscarPac?.value[0]?.fechaNacimiento
        .slice(0, 10)
        .replace(/[-]/g, "/");
    let fecha = getFechaNacFormat(new Date(parseFecha));
    let edad = getEdad(
      pacienteState?.paciente?.buscarPac?.value[0]?.fechaNacimiento
    );

    return `${fecha + " (" + edad + " años)"}`;
  };

  const dissmiss = () => {
    hideModal()(modalDispatch);
  };

  useEffect(() => {
    if (flgFiltrar) {
      filtrarHistorico();
      setFlgFiltrar(false);
    }
  }, [flgFiltrar]);

  const filtrarHistorico = () => {
    let original = arrayTimeLineOr;
    let auxFiltros = activeFilter.filter(
      (centro) => centro.checked !== false && centro.id !== 0
    );
    // Si desmarco todo, marco todos los filtros nuevamente y muestro todos los items
    if (auxFiltros.length === 0) {
      setActiveFilter(itemsFiltros);
      auxFiltros = itemsFiltros;
    }
    auxFiltros = auxFiltros.map((array) => array.descripcion);
    let turnoFiltradoAux1 = original.filter((item) =>
      auxFiltros.includes(item.tipos)
    );
    if (buscadorTxt !== "") {
      turnoFiltradoAux1 = turnoFiltradoAux1.filter(
        (item) =>
          item.medico.toLowerCase().includes(buscadorTxt.toLowerCase()) ||
          item.especialidad.toLowerCase().includes(buscadorTxt.toLowerCase())
      );
    }
    setArrayTimeLine(turnoFiltradoAux1);
    setLoading(false);
  };

  // fin logica filtros ---

  // logica mostrar item
  const onClickShowItem = (item) => {
    //evito que se toquen otros item si esta el quill activo con flgEditaEvo
    wsResetVisorImagen()(informeDispatch);
    wsResetLabPdf()(laboratorioDispatch);
    setPdfPaciente(null);
    setShowItemTL(item);
    if (item.tipos === "Estudios") {
      if (item.informeAsoc !== null && item.informeAsoc !== undefined) {
        wsGetPdfInforme(
          item.informeAsoc[0].tipo,
          item.informeAsoc[0].estudio,
          item.informeAsoc[0].codigo,
          true
        )(informeDispatch);
        wsGetVisorImagen(
          item.informeAsoc[0].tipo,
          item.informeAsoc[0].estudio,
          item.informeAsoc[0].idTurno
        )(informeDispatch);
      } else {
        wsGetVisorImagen(
          "",
          "",
          item.accession_number.slice(1)
        )(informeDispatch);
      }
    } else if (item.tipos === "Informes") {
      wsGetPdfInforme(
        item.tipo,
        item.estudio,
        item.codigo,
        true
      )(informeDispatch);
      if (item.estudioAsoc !== null && item.estudioAsoc !== undefined) {
        wsGetVisorImagen(
          item.tipo,
          item.estudio,
          item.idTurno
        )(informeDispatch);
      }
    } else if (item.tipos === "Laboratorio") {
      wsGetLabPdf(
        item.codigo,
        pacienteState.paciente.buscarPac.value[0].documento
      )(laboratorioDispatch);
    }
  };

  //logica items actuales

  const dissmissEdicion = () => {
    resetEditarEvo()(evolucionDispatch);
    resetEvoActual()(evolucionDispatch);
    setEvoInitialData();
    localStorage.removeItem("editandoEvo");
    localStorage.removeItem("itemInfo");
    onClickEditarEvo();
    hideModal()(modalDispatch);
  };

  async function asyncDelItemEVOTLIndexDB() {
    try {
      const response = await deleteItemIndexDB(2);
      if (response) {
        dissmissEdicion();
      }
    } catch (error) {
      //agregar toaster de error
      console.log(error);
    }
  }

  const continuaEvo = () => {
    hideModal()(modalDispatch);
    history.push("/evolucion");
  };

  //funcion async para cargar la db local
  async function asyncAddItemIndexDB(ListDataTL) {
    try {
      const response = await addItemIndexDB(1, "ListDataTL", ListDataTL);
      if (response !== null) {
        //DATOS GUARDADOS OK
      }
    } catch (error) {
      //agregar toaster de error
      console.log("No se pudo continuar");
      // history.push("/evolucion");
    }
  }

  const isWithinEightHours = (dateString) => {
    // Convertir la fecha de la cadena a un objeto Date
    const inputDate = new Date(dateString);
    // Obtener la fecha y hora actual
    const currentDate = new Date();
    // Calcular la diferencia en milisegundos
    const differenceInMilliseconds = currentDate - inputDate;
    // Convertir la diferencia a minutos
    const differenceInMinutes = differenceInMilliseconds / (1000 * 60);
    // Validar si la diferencia es de 60 minutos o menos
    return differenceInMinutes <= 480;
  };

  const checkEditEvo = () => {
    if (
      isWithinEightHours(showItemTL.orderFecha) &&
      showItemTL.idMedico === authState.auth.data.value.idMedico
    ) {
      return true;
    } else if (usuarioRolState.usuarioRol.data !== null) {
      let arrAux = usuarioRolState.usuarioRol.data.value;
      let habilitaEdicion = false;
      for (let i = 0; i < arrAux.length; i++) {
        if (arrAux[i].idDerechoTipo === 3 && arrAux[i].idDerechoSubtipo === 3) {
          habilitaEdicion = true;
        }
      }
      if (habilitaEdicion) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const dissmissMsgEdit = () => {
    hideModal()(modalDispatch);
  };

  const onClickEditarEvo = () => {
    if (showItemTL.react !== undefined && showItemTL.react) {
      let habilitaEdicion = checkEditEvo();
      if (habilitaEdicion) {
        let auxInfo = JSON.parse(localStorage.getItem("itemInfo"));
        let auxEdit = JSON.parse(localStorage.getItem("editandoEvo"));
        if (
          (auxEdit !== undefined && auxEdit !== null) ||
          (auxInfo !== null &&
            auxInfo.id !== undefined &&
            auxInfo.id !== null &&
            showItemTL.id !== auxInfo.id)
        ) {
          showModal(
            <Mensaje
              textoNegrita={"Usted posee edición de evolución en curso"}
              texto={"¿Desea continuar la evolución?"}
            ></Mensaje>,
            "Edición en curso",
            dissmissMsgEdit,
            false,
            [
              {
                text: "Cancelar edición",
                clase: "btn-Mensaje bgc-danger rb16m c-white",
                accion: asyncDelItemEVOTLIndexDB,
              },
              {
                text: "Continuar",
                clase: "btn-Mensaje b-latex30 rb16m c-latex30",
                accion: continuaEvo,
              },
            ],
            "centro",
            true
          )(modalDispatch);
        } else {
          if (
            showItemTL.evolucionHtml !== null &&
            showItemTL.evolucionHtml !== ""
          ) {
            let evoAux = null;
            if (showItemTL.texto !== null && showItemTL.texto !== undefined) {
              evoAux = {
                motivoConsulta: showItemTL.texto,
                evolucion: showItemTL.comentario,
                evoHTML: showItemTL.comentario,
              };
            } else {
              evoAux = {
                motivoConsulta: showItemTL.motivoConsulta,
                evolucion: showItemTL.comentario,
                evoHTML: showItemTL.comentario,
              };
            }
            localStorage.setItem("editandoEvo", JSON.stringify(evoAux));
            //agrego proceso para diferenciar edicion de una nueva
            let itemAux = {
              ...showItemTL,
              proceso: "edita",
              lAntecedentes: null,
            };
            localStorage.setItem("itemInfo", JSON.stringify(itemAux));
            history.push("/evolucion");
          } else {
            showToaster(
              {
                texto: "No posee una evolución para editar",
                tipo: "danger",
              },
              "centroArriba"
            )(toasterDispatch);
          }
        }
      } else {
        showToaster(
          {
            texto: "No se encuentra habilitado para editar esta Evolución",
            tipo: "danger",
          },
          "centroArriba"
        )(toasterDispatch);
      }
    } else {
      showToaster(
        {
          texto:
            "No puede editar esta evolución desde este versionado de la Historia Clínica",
          tipo: "danger",
        },
        "centroArriba"
      )(toasterDispatch);
    }
  };

  const funcionInicio = () => {
    //mantengo los datos en el contexto
    if (pacienteState.paciente.buscarPac !== null) {
      // setArrayTimeLine([]);
      // setArrayTimeLineOr([]);
      // async function getDataIndexDB() {
      //   try {
      //     const response = await getItemIndexDB(1);
      //     checkData(response);
      //   } catch (error) {
      //     console.log(error);
      //   }
      // }
      // getDataIndexDB();
      refreshTL(false);
    }
  };

  const showModalDatosNecesarios = () => {
    showModal(
      <ModalDatosMedico
        datosMedico={authState.auth.data.value}
        continuarEvo={() => {
          dissmiss();
          funcionInicio();
        }}
      />,
      "Datos Médicos",
      () => {},
      false,
      [],
      "centro",
      true
    )(modalDispatch);
  };

  useEffect(() => {
    setLoading(true);
    if (
      authState.auth.data !== null &&
      (authState.auth.data.value.sexo === null ||
        authState.auth.data.value.sexo === "" ||
        authState.auth.data.value.fechaNacimiento === "0001-01-01T00:00:00")
    ) {
      showModalDatosNecesarios();
    } else {
      funcionInicio();
    }
  }, []);

  // const checkData = (data) => {
  // if (checkLocalDataTL(data)) {
  // refreshTL(false);
  // } else {
  //   setEstudiosPacienteCtx(data.ListDataTL.paciente.estudioHistorico)(
  //     pacienteDispatch
  //   );
  //   setInformesPacienteCtx(data.ListDataTL.paciente.informeHistorico)(
  //     pacienteDispatch
  //   );
  //   setLabHistoricoCtx(data.ListDataTL.labo.labHistorico)(
  //     laboratorioDispatch
  //   );
  //   setEvolucionHistoricasCtx(data.ListDataTL.evolucion.evoHistorica)(
  //     evolucionDispatch
  //   );
  //   setFiltrosTLCtx(data.ListDataTL.evolucion.filtrosTL)(evolucionDispatch);
  // }
  // };

  useEffect(() => {
    if (
      pacienteState.paciente.estudiosPac !== null &&
      pacienteState.paciente.informesPac !== null &&
      laboratorioState.laboratorio.historico !== null &&
      evolucionState.evolucion.historicoPac !== null &&
      evolucionState.evolucion.filtrosTL !== null &&
      flgStopFilter
    ) {
      //agrego la data en local la primera vez
      let dataList = setLocalDataTL(
        evolucionState.evolucion.historicoPac,
        pacienteState.paciente.estudiosPac,
        pacienteState.paciente.informesPac,
        laboratorioState.laboratorio.historico,
        evolucionState.evolucion.filtrosTL
      );
      asyncAddItemIndexDB(dataList);
      let arrx = [];
      let arrxEvoluciones = [];
      if (
        evolucionState.evolucion.historicoPac.value !== null &&
        evolucionState.evolucion.historicoPac.value.length > 0
      ) {
        arrxEvoluciones = evolucionState.evolucion.historicoPac.value.map(
          (item) => {
            return {
              ...item,
              fecha: item.orderFecha.slice(0, -9),
              tipos: "Evolución",
              icon: <InformesIcon />,
            };
          }
        );
      }
      let arrxEstudios = [];
      if (
        pacienteState.paciente.estudiosPac.value !== null &&
        pacienteState.paciente.estudiosPac.value.length > 0
      ) {
        arrxEstudios = pacienteState.paciente.estudiosPac.value.map((item) => {
          return {
            ...item,
            fecha: item.study_date,
            tipos: "Estudios",
            especialidad: "ESTUDIO",
            medico: "-",
            id: item.accession_number.slice(1, 9),
            icon: <ImagenesIcon />,
            idTurno: item.accession_number.slice(1, 9),
            informeAsoc: null,
          };
        });
      }
      let arrxInformes = [];
      if (
        pacienteState.paciente.informesPac.value !== null &&
        pacienteState.paciente.informesPac.value.length > 0
      ) {
        arrxInformes = pacienteState.paciente.informesPac.value.map((item) => {
          return {
            ...item,
            fecha: item.fecha.slice(0, -9),
            tipos: "Informes",
            especialidad: item.strEstudio,
            medico: item.medicoDesc,
            icon: <InformesIcon />,
            estudioAsoc: null,
          };
        });
      }
      //asocio Informe a estudios
      let con = [];
      for (let i = 0; i < arrxEstudios.length; i++) {
        con = arrxInformes.filter(
          (item) => item.idTurno.toString() === arrxEstudios[i].idTurno
        );
        if (con.length > 0) {
          if (arrxEstudios[i].informeAsoc === null) {
            arrxEstudios[i].informeAsoc = con;
          }
        }
      }
      //asocio estudio a informe
      let conAux = [];
      for (let i = 0; i < arrxInformes.length; i++) {
        conAux = arrxEstudios.filter(
          (item) => item.idTurno === arrxInformes[i].idTurno.toString()
        );
        if (conAux.length > 0) {
          if (arrxInformes[i].estudioAsoc === null) {
            arrxInformes[i].estudioAsoc = conAux;
          }
        }
      }
      let arrxLabo = laboratorioState.laboratorio.historico.value.map(
        (item) => {
          return {
            ...item,
            fecha: item.fecha.slice(0, -9),
            tipos: "Laboratorio",
            especialidad: "LABORATORIO",
            id: item.codigo,
            icon: <LaboTimeLineIcon />,
          };
        }
      );
      for (let i = 0; i < arrxEstudios.length; i++) {
        const element = arrxEstudios[i];
        if (element) {
          arrxEstudios[i].orderFecha = arrxEstudios[i].fecha + "T05:00:00";
        }
      }
      for (let i = 0; i < arrxInformes.length; i++) {
        const element = arrxInformes[i];
        if (element) {
          arrxInformes[i].orderFecha = arrxInformes[i].fecha + "T05:00:00";
        }
      }
      for (let i = 0; i < arrxLabo.length; i++) {
        const element = arrxLabo[i];
        if (element) {
          arrxLabo[i].orderFecha = arrxLabo[i].fecha + "T05:00:00";
        }
      }

      arrx = arrx.concat(arrxLabo, arrxInformes, arrxEstudios, arrxEvoluciones);
      arrx = arrx.sort(
        (a, b) =>
          new Date(b.orderFecha).getTime() - new Date(a.orderFecha).getTime()
      );
      setArrayTimeLine(arrx);
      setArrayTimeLineOr(arrx);
      setFlgActualizarTL(true);
      setFlgStopFilter(false);
      //filtro inicial en estudios
      handleChangeFiltros(1);
      setFlgFiltrar(true);
    }
  }, [
    pacienteState.paciente,
    laboratorioState.laboratorio,
    evolucionState.evolucion,
  ]);

  useEffect(() => {
    if (pacienteState.paciente.error !== null && pacienteState.paciente.error) {
      showToaster(
        {
          texto: pacienteState.paciente.error.error.errorMessage,
          tipo: "danger",
        },
        "centroArriba"
      )(toasterDispatch);
    } else if (
      laboratorioState.laboratorio.error &&
      laboratorioState.laboratorio.error !== null
    ) {
      if (laboratorioState.laboratorio.error.error !== undefined) {
        showToaster(
          {
            texto: laboratorioState.laboratorio.error.error.errorMessage,
            tipo: "danger",
          },
          "centroArriba"
        )(toasterDispatch);
      } else {
        showToaster(
          {
            texto: laboratorioState.laboratorio.error.message,
            tipo: "danger",
          },
          "centroArriba"
        )(toasterDispatch);
      }
    } else if (
      evolucionState.evolucion.error &&
      evolucionState.evolucion.error !== null
    ) {
      showToaster(
        {
          texto: evolucionState.evolucion.error.error.errorMessage,
          tipo: "danger",
        },
        "centroArriba"
      )(toasterDispatch);
    } else if (
      informeState.informe.error &&
      informeState.informe.error !== null
    ) {
      if (informeState.informe.error.error.errorCode === "INFOR-002") {
        setPdfPaciente(null);
        setShowItemTL(null);
        showToaster(
          {
            texto: informeState.informe.error.error.errorMessage,
            tipo: "danger",
          },
          "centroArriba"
        )(toasterDispatch);
      } else {
        showToaster(
          {
            texto: informeState.informe.error.error.errorMessage,
            tipo: "danger",
          },
          "centroArriba"
        )(toasterDispatch);
      }
    }
  }, [
    pacienteState.paciente,
    laboratorioState.laboratorio,
    evolucionState.evolucion,
    informeState.informe,
  ]);

  useEffect(() => {
    if (informeState.informe.informePdf !== null) {
      if (informeState.informe.informePdf.value.informe !== "") {
        const blob = base64ToBlob(
          informeState.informe.informePdf.value.informe,
          "application/pdf"
        );
        setPdfPaciente(URL.createObjectURL(blob));
        wsResetInformePdf()(informeDispatch);
      }
    }
    if (laboratorioState.laboratorio.laboPdf !== null) {
      if (
        laboratorioState.laboratorio.laboPdf.value !== "" &&
        laboratorioState.laboratorio.laboPdf.isSuccess
      ) {
        const blob = base64ToBlob(
          laboratorioState.laboratorio.laboPdf.value,
          "application/pdf"
        );
        setPdfPaciente(URL.createObjectURL(blob));
        wsResetLabPdf()(laboratorioDispatch);
      }
    }
  }, [informeState, laboratorioState]);

  function base64ToBlob(base64, type = "application/octet-stream") {
    const binStr = atob(base64);
    const len = binStr.length;
    const arr = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      arr[i] = binStr.charCodeAt(i);
    }
    return new Blob([arr], { type: type, title: "Informe" });
  }

  const verImagenes = () => {
    dissmiss();
    if (informeState.informe.visorPacs?.value?.proteus) {
      window.open(informeState.informe.visorPacs.value.proteus);
    } else {
      showToaster(
        {
          texto: "Error al abrir imágen",
          tipo: "danger",
        },
        "centroArriba"
      )(toasterDispatch);
    }
  };

  const refreshTL = (buscaAnteriores) => {
    wsGetEstudiosPaciente(
      pacienteState?.paciente?.buscarPac?.value[0]?.documento
    )(pacienteDispatch);
    wsGetInformesPaciente(
      pacienteState?.paciente?.buscarPac?.value[0]?.id,
      false
    )(pacienteDispatch);
    wsGetLabHistorico(
      pacienteState?.paciente?.buscarPac?.value[0]?.id,
      false
    )(laboratorioDispatch);
    wsGetEvolucionHistoricas(
      pacienteState?.paciente?.buscarPac?.value[0]?.id,
      authState.auth.data.value.usuario,
      opcFormatTags,
      false
    )(evolucionDispatch);
    wsGetFiltrosTimeLine(
      pacienteState?.paciente?.buscarPac?.value[0]?.id,
      authState.auth.data.value.usuario
    )(evolucionDispatch);
  };

  const downloadPdf = (byteArray) => {
    const b64Data = byteArray; // Reemplaza esto con tu data en base64
    const contentType = "application/pdf";
    const blob = base64toBlob(b64Data, contentType);
    const blobUrl = URL.createObjectURL(blob);

    const newWindow = window.open(
      blobUrl,
      "_blank",
      "width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no"
    );
    if (newWindow) {
      // Esperar a que el nuevo contenido se cargue completamente
      newWindow.onload = () => {
        newWindow.print();
      };
    } else {
      showToaster(
        {
          texto: "No se pudo abrir la ventana",
          tipo: "danger",
        },
        "centroArriba"
      )(toasterDispatch);
    }
  };

  useEffect(() => {
    if (evolucionState.evolucion.hcXPdf !== null) {
      downloadPdf(evolucionState.evolucion.hcXPdf.value);
      resetHcXPdf()(evolucionDispatch);
    }
  }, [evolucionState.evolucion.hcXPdf]);

  const fechaItem = (fecha) => {
    let fechaAux = fecha.split("T");
    let fechaAux2 = fechaAux[0].split("-");
    return `${fechaAux2[2]}/${fechaAux2[1]}/${fechaAux2[0]}`;
  };

  const ColumnBaseNewComplete = [
    {
      type: "select-boolean",
      name: "",
      width: 0,
    },

    {
      type: "string",
      name: "descripcion",
      width: 0,
    },
    {
      type: "number",
      name: "id",
      width: 0,
    },
    {
      type: "string",
      name: "domicilio",
      width: 0,
    },
    {
      type: "date",
      name: "fecha",
      width: 300,
    },
  ];
  const ColumnBaseNew = [
    {
      type: "date",
      name: "fecha",
      width: 273.33,
      widthQuery: 217,
      colname: "Fecha",
      funChangeValue: fechaItem,
      onClickAccion: null,
    },

    {
      type: "string",
      name: "especialidad",
      width: 273.33,
      widthQuery: 217,
      colname: "Especialidad",
      onClickAccion: null,
    },
    {
      type: "string",
      name: "medico",
      width: 273.33,
      widthQuery: 217,
      colname: "Médico",
      funChangeValue: null,
    },
  ];

  // FILTRO TEMPORAL: Excluir estudios de la tabla de EvoPrevia
  // Para reactivar los estudios, comentar la siguiente línea y usar arrayTimeLine directamente
  const arrayTimeLineFiltrado = arrayTimeLine.filter(
    (item) => item.tipos !== "Estudios"
  );

  const configTable = {
    data: arrayTimeLineFiltrado, // Usar array filtrado en lugar de arrayTimeLine original
    columnComplete: ColumnBaseNewComplete,
    column: ColumnBaseNew,
    paginationView: windowWidth > 1366 ? 16 : 8,
    pagination: true,
    border: true,
    borderType: "line",
    width: 820,
    height: windowWidth > 1366 ? 540 : 280,
    widthQuery: 650,
    colWidth: true,
    selectData: true,
    onClickRow: (e) => onClickShowItem(e),
  };

  const handleChangeFiltros = (id) => {
    setActiveFilter((prevFiltros) =>
      prevFiltros.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
    setFlgFiltrar(true);
  };

  const filtroCombinado = (value) => {
    let original = arrayTimeLineOr;
    let auxFiltros = activeFilter.filter(
      (centro) => centro.checked !== false && centro.id !== 0
    );
    auxFiltros = auxFiltros.map((array) => array.descripcion);

    let turnoFiltradoAux1 = original.filter(
      (item) =>
        (item.medico.toLowerCase().includes(value.toLowerCase()) ||
          item.especialidad.toLowerCase().includes(value.toLowerCase())) &&
        auxFiltros.includes(item.tipos)
    );
    setArrayTimeLine(turnoFiltradoAux1);
  };

  return (
    <>
      {modalState.modal.show && <Modal />}
      {toasterState.toaster.show && <Toaster />}
      <Loading
        dataLoading={
          loading ||
          pacienteState.paciente.loading ||
          laboratorioState.laboratorio.loading ||
          evolucionState.evolucion.loading ||
          informeState.informe.loading
        }
        color="c-white"
        descripcion={
          (pacienteState.paciente.loading &&
            "Cargando datos del paciente...") ||
          (laboratorioState.laboratorio.loading &&
            "Cargando datos de laboratorio...") ||
          (evolucionState.evolucion.loading && "Cargando evoluciones...") ||
          (loading && "Cargando datos...") ||
          (informeState.informe.loading && "Cargando informe...")
        }
      />
      <HeaderbarHome />
      <NavTabBar refreshNavTab={() => refreshTL(false)} />
      <ContainerBody
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <ContainerLeft>
          <ContainerData>
            <div className="perfilImg-box">
              {/* <img
                className={`perfilImg-img clickedAvatar`}
                src={
                  imgAvatar
                    ? `data:image/jpeg;base64,${imgAvatar}`
                    : defaultPerfil
                }
                alt="Perfil"
              /> */}
              <ContainerNombrePac>
                <span className="rb24b c-latex30">
                  {pacienteState?.paciente?.buscarPac?.value[0]?.nombre}
                </span>{" "}
                -
                <span className="rb16b c-latex30">
                  {pacienteState?.paciente?.buscarPac?.value[0] && fechaNac()}
                </span>
              </ContainerNombrePac>
            </div>
            <ContainerPacDatos>
              <p className="rb16l c-latex30">
                Obra Social:{" "}
                <span className="rb16b c-latex30">
                  {pacienteState?.paciente?.buscarPac?.value[0]?.obraSocial}
                </span>
              </p>
              <p className="rb16l c-latex30">
                Plan:{" "}
                <span className="rb16b c-latex30">
                  {pacienteState?.paciente?.buscarPac?.value[0]?.plan}
                </span>
              </p>
              <p className="rb16l c-latex30">
                Sexo:{" "}
                <span className="rb16b c-latex30">
                  {pacienteState?.paciente?.buscarPac?.value[0]?.sexo === "M"
                    ? "Masculino"
                    : "Femenino"}
                </span>
              </p>
              <p className="rb16l c-latex30">
                Email:{" "}
                <span className="rb16b c-latex30">
                  {pacienteState?.paciente?.buscarPac?.value[0]?.mail !== ""
                    ? pacienteState?.paciente?.buscarPac?.value[0]?.mail
                    : "No tiene un email registrado"}
                </span>
              </p>
            </ContainerPacDatos>
          </ContainerData>
          <FiltrosContainer>
            {activeFilter.map((item, index) => {
              return (
                <FilterBox
                  key={index}
                  className={`${
                    item.checked ? "bgc-latex30 c-white" : "bgc-white c-latex30"
                  }`}
                  onClick={(e) => handleChangeFiltros(item.id)}
                >
                  <CheckMark
                    active={item.checked}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path d="M5 12l5 5L19 7" />
                  </CheckMark>
                  <span className="txtFilter">{item.descripcion}</span>
                </FilterBox>
              );
            })}
          </FiltrosContainer>
          <Table
            config={configTable}
            setBuscadorTxt={setBuscadorTxt}
            filtroCombinado={filtroCombinado}
          />
        </ContainerLeft>
        <ContainerRight>
          <ContainerItemShown>
            {showItemTL ? (
              <ContainerItemShownTitle>
                <ContainerItemTitle>
                  <div style={{ marginRight: 20 }}>
                    <LaboratorioIcon color={"var(--color-latex30)"} />
                  </div>
                  <div>
                    <p className="rb16b c-black">
                      {showItemTL.tipos === "Informes" ? (
                        <span>
                          {camelize(showItemTL.medicoDesc)} -{" "}
                          {camelize(showItemTL.strEstudio)}
                        </span>
                      ) : showItemTL.tipos === "Estudios" ? (
                        <span>{showItemTL.accession_number}</span>
                      ) : showItemTL.tipos === "Laboratorio" ? (
                        <span>
                          {camelize(showItemTL.medico)} -{" "}
                          {camelize(showItemTL.tipos)}
                          {showItemTL.validadoParcial
                            ? " (resultado parcial)"
                            : ""}
                        </span>
                      ) : showItemTL.tipos === "Evolución" ? (
                        <span>
                          {camelize(showItemTL.medico)} -{" "}
                          {camelize(showItemTL.especialidad)}
                        </span>
                      ) : (
                        ""
                      )}
                    </p>
                  </div>
                </ContainerItemTitle>
                <ContainerButtonsItemShown>
                  {showItemTL.tipos === "Estudios" ||
                  (showItemTL.tipos === "Informes" &&
                    showItemTL.estudioAsoc !== null) ? (
                    <ButtonVerImg
                      onClick={() => verImagenes(showItemTL)}
                      className="rb12m c-white pointer ts_timeLine_img-btn"
                    >
                      Ver Imagen
                    </ButtonVerImg>
                  ) : (
                    ""
                  )}

                  {
                    // cuando este ok agregar
                    showItemTL.tipos === "Evolución" ? (
                      <ButtonEditarEv
                        className="rb18m c-white pointer ts_timeLine_editEvo-btn"
                        onClick={() => onClickEditarEvo()}
                      >
                        <>
                          <EditarMobileIcon
                            color={"var(--color-white)"}
                          ></EditarMobileIcon>
                          {" Editar"}
                        </>
                      </ButtonEditarEv>
                    ) : (
                      ""
                    )
                  }
                </ContainerButtonsItemShown>
              </ContainerItemShownTitle>
            ) : (
              ""
            )}
            <ItemActiveTL
              pdfPaciente={pdfPaciente}
              showItemTL={showItemTL}
            ></ItemActiveTL>
          </ContainerItemShown>
        </ContainerRight>
      </ContainerBody>
    </>
  );
};

export default EvoPrevia;
