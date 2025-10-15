/*
 * CAMBIOS TEMPORALES PARA OCULTAR ESTUDIOS EN LA LÍNEA DE TIEMPO
 *
 * Se han realizado los siguientes cambios para ocultar los estudios de la línea de tiempo:
 *
 * 1. En TimeLineOpcData.js: Se comentó el filtro "Estudios" (líneas 26-32)
 * 2. En TimeLine.js línea 655: Se comentó arrxEstudios del concat
 * 3. En TimeLine.js línea 659: Se agregó filtro para remover elementos de tipo "Estudios"
 * 4. En TimeLine.js líneas 237-259: Se comentó la lógica de manejo de estudios en onClickShowItem
 * 5. En TimeLine.js líneas 1276-1290: Se comentó el botón "Ver Imagen" para estudios
 * 6. En TimeLine.js líneas 1254-1257: Se comentó el título para estudios
 *
 * PARA REVERTIR LOS CAMBIOS:
 * - Descomentar todas las secciones marcadas con "COMENTADO TEMPORALMENTE"
 * - Restaurar el filtro "Estudios" en TimeLineOpcData.js
 * - Remover el filtro adicional en la línea 659
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
import { formatFechaTimeLine } from "global/utils/formatFechaTimeLine";
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
  ContainerLeftColumn,
  ContainerRightColumn,
  ContainerCenterColumn,
  Box1,
  EstudiosPreviosBox,
  CronologiaContainer,
  IconoLinea,
  LineaHorizontal,
  LineaHorizontal2,
  LineaVertical,
  ContainerNombrePac,
  ContainerPacDatos,
  BoxDatos,
  BoxDatosHeader,
  ContainerBoxDatosBody,
  HeaderEstudiosPrev,
  IconContainer,
  FechaContainer,
  ContainerData,
  DescripcionItem,
  ContainerItemShown,
  ContainerItemShownTitle,
  ButtonEditarEv,
  ButtonVerImg,
  ContainerButtonsItemShown,
  ContainerItemTitle,
  LineaVerticalMas,
  IconoLineaMas,
  FilterBox,
  CheckMark,
} from "./localStyle";
import { parseFiltros } from "global/utils/parseFilter";
import {
  wsGetPdfInforme,
  wsGetVisorImagen,
  wsResetInformePdf,
  wsResetVisorImagen,
} from "_+_HistoriaClinica/context/action/informe/informe";
import { showToaster } from "global/context/action/toaster/toaster";
import { checkLocalDataTL, setLocalDataTL } from "./TimeLineFun";
import { IonSpinner } from "@ionic/react";
import {
  addItemIndexDB,
  deleteItemIndexDB,
  getItemIndexDB,
  setEvoInitialData,
} from "../Evolucion/EvolucionFun";
import { base64toBlob } from "global/utils/base64toBlob";
import PrevisualizarCmp from "_+_HistoriaClinica/components/PrevisualizarCmp/PrevisualizarCmp";
import NavTabBar from "_+_HistoriaClinica/components/NavTabBar/NavTabBar";
import ImagenesIcon from "global/assets/generico/ImagenesIcon";
import camelize from "global/utils/camelize";
import HeaderbarHome from "../../../global/components/genericos/HeaderbarHome/HeaderbarHome";
import Modal from "../../../global/components/genericos/Modal/Modal";
import defaultPerfil from "../../../global/assets/generico/defaultUserImage.png";
import getEdad from "global/utils/getEdad";
import InformesIcon from "global/assets/generico/InformesIcon";
import LaboTimeLineIcon from "global/assets/generico/LaboTimeLineIcon";
import Loading from "global/components/genericos/Loading/Loading";
import ReactTooltip from "react-tooltip";
import BtnSubir from "_+_HistoriaClinica/components/BtnSubir/BtnSubir";
import ItemActiveTL from "_+_HistoriaClinica/components/ItemActiveTL/ItemActiveTL";
import Mensaje from "global/components/genericos/Mensaje/Mensaje";
import LaboratorioIcon from "global/assets/generico/LaboratorioIcon";
import EditarMobileIcon from "global/assets/generico/EditarMobileIcon";
import Toaster from "global/components/genericos/Toaster/Toaster";
import DropdownCheck from "global/components/genericos/DropdownCheck/DropdownCheck";
import ModalDatosMedico from "_+_HistoriaClinica/components/ModalDatosMedico/ModalDatosMedico";
import HcDigitalizada from "_+_HistoriaClinica/components/HcDigitalizada/HcDigitalizada";
import ModalVerPdf from "_+_HistoriaClinica/components/ModalVerPdf/ModalVerPdf";

const TimeLine = () => {
  const {
    modalState,
    modalDispatch,
    authState,
    toasterState,
    toasterDispatch,
    usuarioRolState,
    versionPublicadaState,
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
    hcDigitalizadaState,
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
  const [flgBuscarAnteriores, setFlgBuscarAnteriores] = useState(true);
  const [buscadorTxt, setBuscadorTxt] = useState("");
  const [loadingTL, setLoadingTL] = useState(false);

  let config = localStorage.getItem("config");
  let version = JSON.parse(config).version;
  let opcDocumentosPaciente = JSON.parse(config).opcDocumentosPaciente;
  let opcDatosConfidenciales = JSON.parse(config).opcDatosConfidenciales;
  let opcFormatTags = JSON.parse(config).opcFormatearTextoTags;
  let opcImpresionPdf = JSON.parse(config).opcImpresionPdf;
  let opcRecetaDigital = JSON.parse(config).opcRecetaDigital;
  let opcHcDigitalizada = JSON.parse(config).opcHcDigitalizada;
  const imgAvatar = null;

  const fechaNac = () => {
    let parseFecha = pacienteState.paciente.buscarPac.value[0].fechaNacimiento
      .slice(0, 10)
      .replace(/[-]/g, "/");
    let fecha = getFechaNacFormat(new Date(parseFecha));
    let edad = getEdad(
      pacienteState.paciente.buscarPac.value[0].fechaNacimiento
    );

    return `${fecha + " (" + edad + " años)"}`;
  };

  const dissmiss = () => {
    hideModal()(modalDispatch);
  };

  // logica filtros ---
  const handleChangeFiltros = (e) => {
    setActiveFilter((prevFiltros) =>
      prevFiltros.map((item) =>
        item.id === e ? { ...item, checked: !item.checked } : item
      )
    );
    setFlgFiltrar(true);
  };

  const handleChangeInput = (e) => {
    setBuscadorTxt(e.target.value);
    let original = arrayTimeLineOr;
    let auxFiltros = activeFilter.filter(
      (centro) => centro.checked !== false && centro.id !== 0
    );
    auxFiltros = auxFiltros.map((array) => array.descripcion);

    let turnoFiltradoAux1 = original.filter(
      (item) =>
        (item.medico.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.especialidad
            .toLowerCase()
            .includes(e.target.value.toLowerCase())) &&
        auxFiltros.includes(item.tipos)
    );
    setArrayTimeLine(turnoFiltradoAux1);
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
  };

  // fin logica filtros ---

  // logica mostrar item
  const onClickShowItem = (item) => {
    //evito que se toquen otros item si esta el quill activo con flgEditaEvo
    wsResetVisorImagen()(informeDispatch);
    wsResetLabPdf()(laboratorioDispatch);
    setPdfPaciente(null);
    setShowItemTL(item);
    // COMENTADO TEMPORALMENTE - Lógica de manejo de estudios
    // Si se quiere volver a mostrar estudios, descomentar el siguiente bloque:
    // if (item.tipos === "Estudios") {
    //   if (item.informeAsoc !== null && item.informeAsoc !== undefined) {
    //     wsGetPdfInforme(
    //       item.informeAsoc[0].tipo,
    //       item.informeAsoc[0].estudio,
    //       item.informeAsoc[0].codigo,
    //       true
    //     )(informeDispatch);
    //     wsGetVisorImagen(
    //       item.informeAsoc[0].tipo,
    //       item.informeAsoc[0].estudio,
    //       item.informeAsoc[0].idTurno
    //     )(informeDispatch);
    //   } else {
    //     wsGetVisorImagen(
    //       "",
    //       "",
    //       item.accession_number.slice(1)
    //     )(informeDispatch);
    //   }
    // } else
    if (item.tipos === "Informes") {
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
      setArrayTimeLine([]);
      setArrayTimeLineOr([]);
      async function getDataIndexDB() {
        try {
          const response = await getItemIndexDB(1);
          checkData(response);
        } catch (error) {
          console.log(error);
        }
      }
      getDataIndexDB();
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
    if (
      authState.auth.data !== null &&
      opcRecetaDigital &&
      (authState.auth.data.value.sexo === null ||
        authState.auth.data.value.sexo === "" ||
        authState.auth.data.value.fechaNacimiento === "0001-01-01T00:00:00")
    ) {
      showModalDatosNecesarios();
    } else {
      funcionInicio();
    }
  }, []);

  const checkData = (data) => {
    if (checkLocalDataTL(data)) {
      refreshTL(true);
    } else {
      setEstudiosPacienteCtx(data.ListDataTL.paciente.estudioHistorico)(
        pacienteDispatch
      );
      setInformesPacienteCtx(data.ListDataTL.paciente.informeHistorico)(
        pacienteDispatch
      );
      setLabHistoricoCtx(data.ListDataTL.labo.labHistorico)(
        laboratorioDispatch
      );
      setEvolucionHistoricasCtx(data.ListDataTL.evolucion.evoHistorica)(
        evolucionDispatch
      );
      setFiltrosTLCtx(data.ListDataTL.evolucion.filtrosTL)(evolucionDispatch);
    }
  };

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

      // COMENTADO TEMPORALMENTE - Para ocultar estudios de la línea de tiempo
      // Si se quiere volver a mostrar estudios, cambiar la siguiente línea por:
      // arrx = arrx.concat(arrxLabo, arrxInformes, arrxEstudios, arrxEvoluciones);
      arrx = arrx.concat(
        arrxLabo,
        arrxInformes,
        /* arrxEstudios, */ arrxEvoluciones
      );

      // FILTRO ADICIONAL: Remover cualquier elemento de tipo "Estudios" que pueda haber quedado
      // Si se quiere volver a mostrar estudios, comentar las siguientes 2 líneas:
      arrx = arrx.filter((item) => item.tipos !== "Estudios");

      arrx = arrx.sort(
        (a, b) =>
          new Date(b.orderFecha).getTime() - new Date(a.orderFecha).getTime()
      );
      setArrayTimeLine(arrx);
      setArrayTimeLineOr(arrx);
      setFlgFiltrar(true);
      setFlgActualizarTL(true);
      setFlgStopFilter(false);
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
    setLoadingTL(true);
    wsGetEstudiosPaciente(pacienteState.paciente.buscarPac.value[0].documento)(
      pacienteDispatch
    );
    wsGetInformesPaciente(
      pacienteState.paciente.buscarPac.value[0].id,
      buscaAnteriores
    )(pacienteDispatch);
    wsGetLabHistorico(
      pacienteState.paciente.buscarPac.value[0].id,
      buscaAnteriores
    )(laboratorioDispatch);
    wsGetEvolucionHistoricas(
      pacienteState.paciente.buscarPac.value[0].id,
      authState.auth.data.value.usuario,
      opcFormatTags,
      buscaAnteriores,
      stopLoading
    )(evolucionDispatch);
    wsGetFiltrosTimeLine(
      pacienteState.paciente.buscarPac.value[0].id,
      authState.auth.data.value.usuario
    )(evolucionDispatch);
  };

  const stopLoading = () => {
    setLoadingTL(false);
  };

  const verMasEstudios = () => {
    setLoadingTL(true);
    //seteoEnNull los datos que quiero cambiar.
    resetHistoricas()(evolucionDispatch);
    //pongo en true el stopFilterNuevamente
    setFlgStopFilter(true);
    //deshabilito el btn
    setFlgBuscarAnteriores(false);
    //mando en false el refresh para que sepan que se busca el historico completo
    refreshTL(false);
  };

  //
  const preVisualizar = (
    fechaDesde,
    fechaHasta,
    especialidad,
    medico,
    centro,
    checkTalon
  ) => {
    //llamo a ws para traerme el pdf
    let documento = pacienteState.paciente.buscarPac.value[0].documento;
    wsGetHcXPdf(
      documento,
      fechaDesde,
      fechaHasta,
      especialidad,
      medico,
      centro,
      checkTalon
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
      const popup = window.open(
        "",
        "_blank",
        "width=800,height=600,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no"
      );
      if (!popup) {
        console.error("No se pudo abrir la ventana de impresión");
        return;
      }

      popup.document.open();
      popup.document.write(`${evolucionState.evolucion.hcXPdf.value}`);
      popup.document.close();

      resetHcXPdf()(evolucionDispatch);
    }
  }, [evolucionState.evolucion.hcXPdf]);

  //MODULO HC DIGIT
  const verHcDigitPdf = (pdf) => {
    showModal(
      <ModalVerPdf pdfPaciente={pdf}></ModalVerPdf>,
      "Historia Clínica digitalizada",
      dissmiss,
      false,
      [
        {
          text: "Volver",
          clase: "btn-Mensaje bgc-latex30 rb16m c-white",
          accion: dissmiss,
        },
      ],
      "centro",
      true
    )(modalDispatch);
  };

  //VersionPublicada
  const dismissVersion = () => {
    hideModal()(modalDispatch);
  };

  useEffect(() => {
    if (versionPublicadaState.versionPublicada.data !== null) {
      if (
        versionPublicadaState.versionPublicada.data.value.version !== version
      ) {
        showModal(
          <Mensaje
            textoNegrita={
              "Se encuentra trabajando con una versión desactualizada del sistema"
            }
            texto={
              "Le solicitamos que aprete las teclas Ctrl + F5 para actualizar la versión o solicite asistecia en la recepción para resolver esta problema."
            }
          ></Mensaje>,
          "Versión Incorrecta",
          dismissVersion,
          false,
          [
            {
              text: "Cerrar",
              clase: "btn-Mensaje bgc-danger rb16m c-white",
              accion: dismissVersion,
            },
          ],
          "centro",
          false
        )(modalDispatch);
      }
    }
  }, [versionPublicadaState.versionPublicada.data]);

  return (
    <>
      {modalState.modal.show && <Modal />}
      {toasterState.toaster.show && <Toaster />}
      <Loading
        dataLoading={
          pacienteState.paciente.loading ||
          laboratorioState.laboratorio.loading ||
          evolucionState.evolucion.loading ||
          informeState.informe.loading ||
          hcDigitalizadaState.hcDigit.loading
        }
        color="c-white"
        descripcion={
          (pacienteState.paciente.loading &&
            "Cargando datos del paciente...") ||
          (laboratorioState.laboratorio.loading &&
            "Cargando datos de laboratorio...") ||
          (evolucionState.evolucion.loading && "Cargando evoluciones...") ||
          (informeState.informe.loading && "Cargando informe...") ||
          (hcDigitalizadaState.hcDigit.loading && "Cargando HC digitalizada...")
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
        <ContainerLeftColumn>
          <ContainerData>
            <div className="perfilImg-box">
              <img
                className={`perfilImg-img clickedAvatar`}
                src={
                  imgAvatar
                    ? `data:image/jpeg;base64,${imgAvatar}`
                    : defaultPerfil
                }
                alt="Perfil"
              />
              <ContainerNombrePac>
                <span className="rb24b c-latex30">
                  {pacienteState.paciente.buscarPac.value[0].nombre}
                </span>
              </ContainerNombrePac>
            </div>
            <ContainerPacDatos>
              <p className="rb16l c-latex30">
                Fecha de Nacimiento:{" "}
                <span className="rb16b c-latex30">{fechaNac()}</span>
              </p>
              <p className="rb16l c-latex30">
                Obra Social:{" "}
                <span className="rb16b c-latex30">
                  {pacienteState.paciente.buscarPac.value[0].obraSocial}
                </span>
              </p>
              <p className="rb16l c-latex30">
                Plan:{" "}
                <span className="rb16b c-latex30">
                  {pacienteState.paciente.buscarPac.value[0].plan}
                </span>
              </p>
              <p className="rb16l c-latex30">
                Sexo:{" "}
                <span className="rb16b c-latex30">
                  {pacienteState.paciente.buscarPac.value[0].sexo === "M"
                    ? "Masculino"
                    : "Femenino"}
                </span>
              </p>
              <p className="rb16l c-latex30">
                Email:{" "}
                <span className="rb16b c-latex30">
                  {pacienteState.paciente.buscarPac.value[0].mail !== ""
                    ? pacienteState.paciente.buscarPac.value[0].mail
                    : "No tiene un email registrado"}
                </span>
              </p>
            </ContainerPacDatos>
            {opcDocumentosPaciente === true ? (
              <BoxDatos>
                <BoxDatosHeader expand={false} className="c-white">
                  <p className="rb18b">Documentos</p>
                </BoxDatosHeader>
                <ContainerBoxDatosBody>
                  <p>HC DIGITALIZADAS EN UN FUTURO</p>
                </ContainerBoxDatosBody>
              </BoxDatos>
            ) : (
              ""
            )}
            {opcHcDigitalizada === true ? (
              <BoxDatos>
                <HcDigitalizada
                  idPaciente={pacienteState.paciente.buscarPac?.value[0]?.id}
                  verHcDigitPdf={verHcDigitPdf}
                />
              </BoxDatos>
            ) : (
              ""
            )}
            {opcDatosConfidenciales === true ? (
              <BoxDatos>
                <BoxDatosHeader expand={false} className="c-white">
                  <p className="rb18b">Datos Confidenciales</p>
                </BoxDatosHeader>
                <ContainerBoxDatosBody>
                  {pacienteState.paciente.datosConf?.value?.length > 0 ? (
                    pacienteState.paciente.datosConf.value.map(
                      (item, index) => {
                        return <div key={index}>{item}</div>;
                      }
                    )
                  ) : (
                    <div className="bodyBoxDatosConf">
                      <p className="rb16b">No posee datos confidenciales</p>
                    </div>
                  )}
                </ContainerBoxDatosBody>
              </BoxDatos>
            ) : (
              ""
            )}
            {opcImpresionPdf === true &&
            usuarioRolState.usuarioRol.data !== null &&
            usuarioRolState.usuarioRol.data.value.length > 0 &&
            evolucionState.evolucion.filtrosTL !== null ? (
              <PrevisualizarCmp preVisualizar={preVisualizar} />
            ) : (
              ""
            )}
          </ContainerData>
        </ContainerLeftColumn>
        <ContainerCenterColumn>
          <HeaderEstudiosPrev>
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
          </HeaderEstudiosPrev>
          <input
            type="text"
            placeholder="Buscar..."
            className="inputTimeLine rb16m"
            onChange={(e) => handleChangeInput(e)}
          />
          <Box1 className={"idToScroll"}>
            <EstudiosPreviosBox>
              {!loadingTL ? (
                flgActualizarTL &&
                arrayTimeLine !== null &&
                arrayTimeLine.length > 0 ? (
                  <>
                    <CronologiaContainer>
                      {Array.isArray(arrayTimeLine) &&
                        arrayTimeLine.length > 0 &&
                        arrayTimeLine.map((item, index) => {
                          return (
                            <React.Fragment key={index}>
                              <IconoLinea
                                index={index}
                                onClick={() => onClickShowItem(item)}
                                className="ts_timeLine_cronologia-item"
                              >
                                <div className="pointer">{item.icon}</div>
                                <IconContainer>
                                  <FechaContainer
                                    index={index}
                                    className="rb12l c-latex30"
                                  >
                                    {formatFechaTimeLine(item.fecha)}{" "}
                                  </FechaContainer>
                                </IconContainer>
                                <LineaHorizontal className="linea1" />
                                <div className="estudio">
                                  <p className="headerDescItem rb16m c-primary">
                                    {item.tipos}
                                  </p>
                                  <LineaHorizontal2 className="linea2" />
                                  <div>
                                    {item.tipos === "Evolución" ? (
                                      <DescripcionItem className="rb12l c-latex30">
                                        <p>{camelize(item.medico)}</p>
                                        <p>({item.especialidad})</p>
                                        <span className="diagnosticoPresuntivo">
                                          Dx: {item.diagPresuntivo}
                                        </span>
                                      </DescripcionItem>
                                    ) : item.tipos === "Informes" ? (
                                      <DescripcionItem className="rb12l c-latex30">
                                        <p>{camelize(item.strEstudio)}</p>
                                      </DescripcionItem>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              </IconoLinea>
                              <LineaVertical
                                ultimoItem={
                                  item ===
                                  arrayTimeLine[arrayTimeLine.length - 1]
                                }
                              />
                              {item === arrayTimeLine[arrayTimeLine.length - 1]
                                ? ""
                                : ""}
                            </React.Fragment>
                          );
                        })}
                      {flgBuscarAnteriores && (
                        <>
                          <LineaVerticalMas />
                          <IconoLineaMas>
                            <button
                              className="iconoMas c-white rb24b ts_timeLine_completeSearch-btn"
                              data-tip
                              data-for={"tooltipiconoMas"}
                              onClick={() => verMasEstudios()}
                            >
                              +
                            </button>
                            <ReactTooltip
                              id={"tooltipiconoMas"}
                              place="bottom"
                              type="info"
                              effect="solid"
                              className="tooltip"
                            >
                              Buscar anteriores
                            </ReactTooltip>
                          </IconoLineaMas>
                        </>
                      )}
                      <BtnSubir body={"idToScroll"} />
                    </CronologiaContainer>
                  </>
                ) : !flgActualizarTL &&
                  arrayTimeLine !== null &&
                  !arrayTimeLine.length > 0 ? (
                  <p className="rb16m sinEstudiosTxt">
                    <IonSpinner name="lines" />
                  </p>
                ) : (
                  <p className="rb16m sinEstudiosTxt">
                    El paciente{" "}
                    <span className="rb16b">
                      {camelize(
                        pacienteState.paciente.buscarPac.value[0].nombre
                      )}
                    </span>{" "}
                    no cuenta con historial previo.
                  </p>
                )
              ) : (
                <p className="rb16m sinEstudiosTxt">
                  <IonSpinner name="lines" />
                </p>
              )}
            </EstudiosPreviosBox>
          </Box1>
        </ContainerCenterColumn>
        <ContainerRightColumn>
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
                      ) : /* COMENTADO TEMPORALMENTE - Título para estudios
                      showItemTL.tipos === "Estudios" ? (
                        <span>{showItemTL.accession_number}</span>
                      ) : */ showItemTL.tipos === "Laboratorio" ? (
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
                  {/* COMENTADO TEMPORALMENTE - Botón para ver imágenes de estudios
                      Si se quiere volver a mostrar estudios, descomentar el siguiente bloque:
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
                  */}
                  {/* Solo mostrar botón para informes con estudios asociados */}
                  {showItemTL.tipos === "Informes" &&
                  showItemTL.estudioAsoc !== null ? (
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
              timeline={true}
            ></ItemActiveTL>
          </ContainerItemShown>
        </ContainerRightColumn>
      </ContainerBody>
    </>
  );
};

export default TimeLine;
