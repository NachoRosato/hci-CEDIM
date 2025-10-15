import ConsultaIcon from "global/assets/generico/ConsultaIcon";
import LaboratorioIcon from "global/assets/generico/LaboratorioIcon";
import InputV1 from "global/components/genericos/InputV1/InputV1";
import Loading from "global/components/genericos/Loading/Loading";
import Toaster from "global/components/genericos/Toaster/Toaster";
import ModalVerMas from "_+_HistoriaClinica/components/ModalVerMas/ModalVerMas";
import EnfermedadesCmp from "_+_HistoriaClinica/components/EnfermedadesCmp/EnfermedadesCmp";
import EstudioPrevCmp from "_+_HistoriaClinica/components/EstudioPrevCmp/EstudioPrevCmp";
import OrdenLaboCmp from "_+_HistoriaClinica/components/OrdenLaboCmp/OrdenLaboCmp";
import IndicaFarmacoCmp from "_+_HistoriaClinica/components/IndicaFarmacoCmp/IndicaFarmacoCmp";
import {
  hideSegundoModal,
  showSegundoModal,
} from "global/context/action/segundoModal/segundoModal";
import { showToaster } from "global/context/action/toaster/toaster";
import { loginTokenReset } from "global/context/action/token/loginToken";
import { regexNumeroLetras } from "global/utils/expresionesRegulares";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  resetEditarEvo,
  resetEvoActual,
  resetEvolucion,
  resetGuardarEvo,
  resetPreImpresion,
  setEvolucionActualCtx,
  wsGetAntecedentesByPacId,
  wsGetDatosEvolucionById,
  wsPostGuardarEvolucion,
  wsPostPreImpresion,
} from "_+_HistoriaClinica/context/action/evolucion/evolucion";
import {
  resetLabHistorico,
  setGrupoEstudioCtx,
  setGrupoEstudioUsuarioCtx,
  setItemOrdenHcCtx,
  setLabNomeclCtx,
  wsGetInformeLab,
  resetLaboParcial,
  wsGetLabGrupoEstudioOrden,
  wsGetLabGrupoEstudios,
  wsGetLabGrupoEstudiosUsuario,
  wsGetLabNomencladores,
  resetLaboInforme,
} from "_+_HistoriaClinica/context/action/laboratorio/laboratorio";
import {
  resetErrorOrdenPrac,
  setEstudiosGrupoCtx,
  setOrdenPracXMedCtx,
  setOrdenPracXUsrCtx,
  wsEstudioGrupoPrac,
  wsGetOrdenXEsp,
  wsGetOrdenXUser,
  wsPostGuardarPractica,
} from "_+_HistoriaClinica/context/action/ordenPractica/ordenPractica";
import {
  resetEstudiosPaciente,
  resetInformesPaciente,
  setEstudiosPacienteCtx,
  setInfHistoricoPacCtx,
  setInformesPacienteCtx,
  setPacienteSeleccionado,
  wsGetBuscarPacienteDni,
  wsGetEstudiosPaciente,
  wsGetInformesPaciente,
  wsGetLaboInformeHistorico,
} from "_+_HistoriaClinica/context/action/paciente/paciente";
import { HistoriaClinicaContext } from "_+_HistoriaClinica/context/Provider";
import HeaderbarHome from "../../../global/components/genericos/HeaderbarHome/HeaderbarHome";
import Modal from "../../../global/components/genericos/Modal/Modal";
import SegundoModal from "../../../global/components/genericos/SegundoModal/SegundoModal";
import {
  hideModal,
  showModal,
} from "../../../global/context/action/modal/modal";
import { GlobalContext } from "../../../global/context/Provider";
import {
  setDiagnosticosDataCtx,
  wsGetDiagnosticos,
} from "_+_HistoriaClinica/context/action/diagnostico/diagnostico";
import {
  formatFechaEvo,
  formatFechaTimeLine,
} from "global/utils/formatFechaTimeLine";
import {
  ContainerBody,
  ContainerMotCons,
  ContainerMotConsItems,
  ContainerMotConsTitleBox,
  ContainerMotConsDropBox,
  ContainerLeftColumn,
  ContainerRightColumn,
  ContainerEvolucion,
  ContainerEvolucionItems,
  ContainerEvolucionTitleBox,
  ContainerEvolucionDropBox,
  ContainerBtnPreImpresionBox,
  BtnPreImpresion,
  ButtonEvActSave,
  ContainerEvoBtn,
  ButtonEvActCancelar,
  ContainerOrdenes,
  ContainerDatosPac,
  ContainerExamenFisico,
  ExamenFisicoBtn,
  SlidingComponent,
  ContainerContadorCarac,
  BarContainer,
  ProgressBar,
  SlidingFarmacos,
  ButtonNuevoSeg,
  ContainerSegBtn,
  ContainerCircleSeg,
  LeftContainerLine,
  BtnDictado,
  RECButton,
  DictadoTutorialBox,
  SlidingReceta,
} from "./localStyle";
import {
  addItemIndexDB,
  checkLocalDataEvoTEST,
  deleteIndexDBXNueva,
  deleteItemIndexDB,
  getItemIndexDB,
  setEvoInitialData,
  setLocalDataList,
  solicitudLaboDesc,
  solicitudPracDesc,
  updateEvoEditIndexDB,
} from "./EvolucionFun";
import AdicionarInformeCmp from "_+_HistoriaClinica/components/AdicionarInformeCmp/AdicionarInformeCmp";
import ExamenFisico from "_+_HistoriaClinica/components/ExamenFisico/ExamenFisico";
import Farmacos from "_+_HistoriaClinica/components/Farmacos/Farmacos";
import RecetaDigital from "_+_HistoriaClinica/components/RecetaDigital/RecetaDigital";
import Medicamento from "_+_HistoriaClinica/components/Medicamento/Medicamento";
import {
  setTipoVademecumCtx,
  setVademecumCtx,
  wsGetVademecum,
} from "_+_HistoriaClinica/context/action/vademecum/vademecum";
import {
  resetMedicamentos,
  setMedicamentosCtx,
  wsGetMedicamentos,
} from "_+_HistoriaClinica/context/action/medicamento/medicamento";
import MedicamentoPaso3 from "_+_HistoriaClinica/components/MedicamentoPaso3/MedicamentoPaso3";
import SliderEvoOrden from "_+_HistoriaClinica/components/SliderEvoOrden/SliderEvoOrden";
import SliderVisualizacionPrevia from "_+_HistoriaClinica/components/SliderVisualizacionPrevia/SliderVisualizacionPrevia";
import ModalEnfAnt from "_+_HistoriaClinica/components/ModalEnfAnt/ModalEnfAnt";
import DatosPacEvo from "_+_HistoriaClinica/components/DatosPacEvo/DatosPacEvo";
import { logoutAuth } from "global/context/action/auth/auth";
import {
  setExamenFisicoCtx,
  wsGetExamen,
} from "_+_HistoriaClinica/context/action/examen/examen";
import Mensaje from "global/components/genericos/Mensaje/Mensaje";
import DiagSnomed from "_+_HistoriaClinica/components/DiagSnomed/DiagSnomed";
import { resetSnomed } from "_+_HistoriaClinica/context/action/snomed/snomed";
import fechaTurnoFormat from "global/utils/fechaTurnoFormat";
import SeguimientoE1 from "_+_HistoriaClinica/components/Seguimiento/SeguimientoE1";
import camelize from "global/utils/camelize";
import LupaIcon from "global/assets/generico/LupaIcon";
import ModalPreImpresion from "_+_HistoriaClinica/components/ModalPreImpresion/ModalPreImpresion";
import {
  resetEventXIdSegCtx,
  resetSegCtx,
  resetSegXIdPacCtx,
} from "_+_HistoriaClinica/context/action/seguimiento/seguimiento";
import NavTabBar from "_+_HistoriaClinica/components/NavTabBar/NavTabBar";
import { IonSpinner } from "@ionic/react";
import AskMarkLitIcon from "global/assets/generico/AskMarkLitIcon";
import useDictadoVoz from "_+_HistoriaClinica/components/DictadoVoz/DictadoVoz";
import PlayIcon from "global/assets/generico/PlayIcon";
import StopIcon from "global/assets/generico/StopIcon";
import TildeIcon from "global/assets/generico/TildeIcon";
import CruzCloseBurguer from "global/assets/generico/CruzCloseBurguer";
import ModalDictado from "_+_HistoriaClinica/components/ModalDictado/ModalDictado";
import TooltipV2 from "global/components/genericos/TooltipV2/TooltipV2";
import Quill from "_+_HistoriaClinica/components/Quill/Quill";
import RecetaDigitalBtn from "_+_HistoriaClinica/components/RecetaDigital/RecetaDigitalBtn";
import ModalDiagnosticos from "_+_HistoriaClinica/components/ModalDiagnosticos/ModalDiagnosticos";

const Evolucion = () => {
  const {
    modalState,
    modalDispatch,
    authState,
    toasterState,
    toasterDispatch,
    tokenState,
    tokenDispatch,
    segundoModalState,
    segundoModalDispatch,
    authDispatch,
    versionPublicadaState,
  } = useContext(GlobalContext);
  const {
    pacienteState,
    evolucionDispatch,
    evolucionState,
    pacienteDispatch,
    laboratorioDispatch,
    laboratorioState,
    medicamentoState,
    medicamentoDispatch,
    ordenPracticaDispatch,
    ordenPracticaState,
    diagnosticoState,
    diagnosticoDispatch,
    examenState,
    vademecumState,
    vademecumDispatch,
    examenDispatch,
    snomedDispatch,
    seguimientoDispatch,
  } = useContext(HistoriaClinicaContext);

  const history = useHistory();
  const [valueBuscador, setValueBuscador] = useState("");
  const [flgOpenLaboInf, setFlgOpenLaboInf] = useState(false);
  const [loadingGral, setLoadingGral] = useState(true);
  const [loadingMedicamentos, setLoadingMedicamentos] = useState(false);
  const [loadingReceta, setLoadingReceta] = useState(false);
  const [loadingDeleteRcta, setLoadingDeleteRcta] = useState(false);
  const [openSliderPreview, setOpenSliderPreview] = useState(false);
  const [datosPreviewEvolucion, setDatosPreviewEvolucion] = useState(null);
  const [ordenDigital, setOrdenDigital] = useState([]);
  const [indicacionFarmacologica, setIndicacionFarmacologica] = useState([]);
  const [enfermedadesAntecedentesLista, setEnfermedadesAntecedentesLista] =
    useState([]);
  const [flgDiagFBack, setFlgDiagFBack] = useState(false);
  const [flgEnfYAntcBack, setFlgEnfYAntcBack] = useState(false);
  const [diagPresArr, setDiagPresArr] = useState([]);
  const [bajasDiag, setBajasDiag] = useState([]);
  const [estudiosArr, setEstudiosArr] = useState([]);
  const [labosArr, setLabosArr] = useState([]);
  const [laboPrev, setLaboPrev] = useState({
    item: null,
    informeStr: null,
  });
  const [savedQuill, setSavedQuill] = useState(null);
  const [updateTxtQuill, setUpdateTxtQuill] = useState(null);
  const [laboratoriosEvo, setLaboratoriosEvo] = useState([]);
  const [otrosEstudiosEvo, setOtrosEstudiosEvo] = useState([]);
  const [contadorCarac, setContadorCarac] = useState(0);
  const [datosPaso2Prac, setDatosPaso2Prac] = useState({
    agregadosConsulta: [],
    fechaElegida: "",
  });
  const [openExmFisico, setOpenExmFisico] = useState(false);
  const [openFarmacos, setOpenFarmacos] = useState(false);
  const [openReceta, setOpenReceta] = useState(false);
  const [openSlider, setOpenSlider] = useState(false);
  const [openSelectorOrden, setOpenSelectorOrden] = useState(false);
  const [openCirOrdenPrac, setOpenCirOrdenPrac] = useState(false);
  const [editaOrdPrac, setEditaOrdPrac] = useState({
    item: null,
    modifica: null,
    index: null,
  });
  const [grabarEvoLoading, setGrabarEvoLoading] = useState(false);
  const [editedSeg, setEditedSeg] = useState([]);
  const [dictado, setDictado] = useState(false);
  const [cambiosVoz, setCambiosVoz] = useState(false);
  const [quillState, setQuillState] = useState(null);
  const [textInput, setTextInput] = useState(null);
  const [textoDictado, setTextoDictado] = useState(null);
  const [quillPointerIndex, setQuillPointerIndex] = useState(0);
  const { startListening, stopListening } = useDictadoVoz({
    options: { continuous: true },
    quillRef: quillState,
    setTextInput,
    setTextoDictado,
    quillPointerIndex,
  });
  const [examenFisico, setExamenFisico] = useState([]);
  const [lastDiagSnomedDeleted, setLastDiagSnomedDeleted] = useState([]);
  const [recetaDigital, setRecetaDigital] = useState([]);

  const editorCaracLimit = 4800;
  const procesoOrdenPrac = {
    proceso: "nueva",
    index: "",
  };

  let config = localStorage.getItem("config");
  let version = JSON.parse(config).version;
  let opcEnfermedadesyAntecedentes =
    JSON.parse(config).opcEnfermedadesyAntecedentes;
  let opcEstudiosPrevios = JSON.parse(config).opcEstudiosPrevios;
  let opcOrdenesDigitales = JSON.parse(config).opcOrdenesDigitales;
  let opcIndicacionFarmaco = JSON.parse(config).opcIndicacionFarmaco;
  let opcSeguimiento = JSON.parse(config).opcSeguimiento;
  let datosEdicion = JSON.parse(localStorage.getItem("editandoEvo"));
  let itemInfo = JSON.parse(localStorage.getItem("itemInfo"));
  let opcSnomed = JSON.parse(config).opcSnomed;
  let opcExamenFisico = JSON.parse(config).opcExamenFisico;
  let opcDictadoVoz = JSON.parse(config).opcDictadoVoz;
  let opcRecetaDigital = JSON.parse(config).opcRecetaDigital;
  let opcRecetasEvo = JSON.parse(config).opcRecetasEvo;

  let empresaLogoUrl = `https://portal.${
    JSON.parse(config).empresa
  }.com.ar/assets/images/empresa/rctaLogo.png`;

  // Cuando la pestaña de historia clínica se carga, la identificamos
  window.name = "historiaClinica";

  // Si la pestaña se cierra, eliminamos su referencia de localStorage
  window.addEventListener("beforeunload", function () {
    if (window.name === "historiaClinica") {
      localStorage.removeItem("historiaClinicaTabId");
    }
  });

  const onChangeMotCons = (e) => {
    if (e !== undefined && e !== null) {
      setValueBuscador(e.target.value);
      asyncUpdEdicionIDB(5, "motivoConsulta", e.target.value);
    }
  };

  const preventKeyOnlyTextandLetters = (e) => {
    if (!regexNumeroLetras.test(e.key)) {
      e.preventDefault();
    }
  };

  const verifyQuillTxt = (verifyString) => {
    const sequence = 'class="ql-editor ql-blank"';
    if (!verifyString.includes(sequence)) {
      return true;
    } else {
      return false;
    }
  };

  // Función para validar si el examen físico tiene datos guardados
  const validarExamenFisico = () => {
    if (!examenFisico || examenFisico.length === 0) {
      return false;
    }

    // Verificar si hay al menos un campo con valor válido
    return examenFisico.some(
      (item) =>
        item.valor !== null &&
        item.valor !== false &&
        item.valor !== "" &&
        item.valor !== "\n"
    );
  };

  // Función para mostrar modal de confirmación de examen físico
  const mostrarModalExamenFisico = (preImpresion) => {
    const botones = [
      {
        text: "Guardar sin examen",
        clase: "btn-Mensaje bgc-primary c-white",
        accion: () => {
          hideModal()(modalDispatch);
          continuarGuardado(preImpresion);
        },
      },
      {
        text: "Ir a examen",
        clase: "btn-Mensaje-1 bgc-latex30 c-white",
        accion: () => {
          hideModal()(modalDispatch);
          setOpenExmFisico(true);
        },
      },
    ];

    showModal(
      <Mensaje
        textoNegrita="No ha generado ninguna entrada para Examen Físico"
        texto="El sistema ha detectado que no se realizó ninguna carga de datos en el examen físico, le solicitamos que haga la carga correspondiente"
      />,
      "Validación de Examen Físico",
      () => hideModal()(modalDispatch),
      false,
      botones,
      "centro",
      false
    )(modalDispatch);
  };

  // Función que continúa con el guardado normal
  const continuarGuardado = (preImpresion) => {
    procesarGuardado(preImpresion);
  };

  const onCLickGuardaEvo = (preImpresion) => {
    //agregar luego este post con todas las orden generadas de labo
    if (
      valueBuscador !== "" &&
      valueBuscador !== undefined &&
      (!opcSnomed || diagPresArr.length > 0)
    ) {
      // Validar examen físico solo cuando se quiere guardar (no en visualización previa)
      if (!preImpresion && !validarExamenFisico()) {
        mostrarModalExamenFisico(preImpresion);
        return;
      }

      procesarGuardado(preImpresion);
    } else {
      showToaster(
        {
          texto: "Debe completar motivo de consulta y diagnósticos",
          tipo: "danger",
        },
        "centroArriba"
      )(toasterDispatch);
    }
  };

  const procesarGuardado = (preImpresion) => {
    // data necesaria para guardar
    let itemInfo = JSON.parse(localStorage.getItem("itemInfo"));
    let dtoGuardarEvo = null;
    setGrabarEvoLoading(true);
    if (
      datosEdicion &&
      datosEdicion.evoHTML &&
      datosEdicion.evoHTML.length > 2 &&
      datosEdicion.evoHTML.length < editorCaracLimit &&
      verifyQuillTxt(datosEdicion.evoHTML)
    ) {
      //valido si tengo algun farmaco primero en local
      let indcFiltered = [];
      let indcFiltered2 = [];
      if (
        indicacionFarmacologica !== undefined &&
        indicacionFarmacologica !== null
      ) {
        //limpio indc farmaco
        indcFiltered = indicacionFarmacologica.filter(
          (item) => item.activo === "1" && !item.activoNoEditable
        );
        indcFiltered2 = indicacionFarmacologica.filter(
          (item) =>
            item.activo === "0" &&
            item.activoNoEditable &&
            item.idMedicamentoModificado > 0
        );
        if (indcFiltered2.length > 0) {
          indcFiltered2[0].idMedicamentoModificado = -1;
        }
      }
      //fin limpieza farmaco
      //concateno el array para enviarlo
      indcFiltered = indcFiltered.concat(indcFiltered2);
      //inicio baja concat antecedentes con diag.
      let diagSnomed = diagPresArr.filter(
        (item) => item.idsnomed !== undefined
      );
      diagSnomed = diagSnomed.concat(bajasDiag);
      //fin bajas
      //inicio enfyantc snomed
      let enfYAntc = procesaEnfAnt(true);
      diagSnomed = diagSnomed.concat(enfYAntc);
      //fin enfyantc
      //inicio Ordenes nuevas para guardar
      let ordenLab = ordenDigital.filter((item) => item.tipoOrden === "Labo");
      let ordenPrac = ordenDigital.filter((item) => item.tipoOrden === "Prac");
      //fin ordenes guardar
      //inicio Ordenes para eliminar labo
      let delOrdenLab = ordenDigital.filter(
        (item) =>
          item.dtoReEdicion === undefined &&
          item.listGrupoEstudioItem !== undefined
      );
      //fin ordenes para eliminar labo
      //inicio Ordenes para eliminar prac
      let delOrdenPrac = ordenDigital.filter(
        (item) =>
          item.dtoReEdicion === undefined && item.grupoItems !== undefined
      );
      //fin ordenes para eliminar labo
      //guardado seguimientos
      let flagSegSaveList = false;
      let segSaveList = [];
      if (editedSeg.length > 0) {
        //habilito que va a haber un guardado de seguimientos
        flagSegSaveList = true;
        //filtro los nuevos y elimino los id de cada uno, luego sumo los item a editar a la lista
        let auxNewSeg = editedSeg.filter((item) => !item.segEdit);
        if (auxNewSeg.length > 0) {
          for (let i = 0; i < auxNewSeg.length; i++) {
            delete auxNewSeg[i].itemEdited.id;
          }
          segSaveList = auxNewSeg.map((item) => {
            return item.itemEdited;
          });
        }
        //filtro los editados, luego sumo los item a editar a la lista
        let auxEditedSeg = editedSeg.filter((item) => item.segEdit);
        if (auxEditedSeg.length > 0) {
          for (let i = 0; i < auxEditedSeg.length; i++) {
            segSaveList.push(auxEditedSeg[i].itemEdited);
          }
        }
      }
      //fin guardado de seguimientos
      //inicio ordenes
      let flagOrdenLabo = false;
      if (ordenLab.length > 0) {
        flagOrdenLabo = true;
        ordenLab = solicitudLaboDesc(ordenLab);
      }
      //fin ordenes
      if (itemInfo.proceso === "edita") {
        // agregar validacion de cant de carac permitidos antes de guardar
        dtoGuardarEvo = {
          comentario: datosEdicion.evoHTML,
          diagnosticosPresuntivos:
            diagPresArr.length === 0 || diagPresArr[0].idsnomed !== undefined
              ? null
              : diagPresArr,
          diagnostivoPresuntivoTexto:
            diagPresArr.length === 0 || diagPresArr[0].idsnomed !== undefined
              ? diagPresArr.length > 0
                ? diagPresArr[0].texto
                : ""
              : itemInfo.diagPresuntivo, //solo para editados viejos
          enfermedadesAntecedentes: [], // esto lo consulta con un get
          evolucionHtml: datosEdicion.evoHTML,
          examenFisico: examenFisico.length > 0 ? examenFisico : null,
          id: itemInfo.id,
          idCentro: itemInfo.idCentro,
          idEspecialidad: itemInfo.idEspecialidad,
          idMedico: itemInfo.idMedico, // numero de id de medico
          idPaciente: itemInfo.idPaciente,
          idTurno: itemInfo.idTurno,
          idUsuarioAlta: itemInfo.idUsuarioAlta,
          indicacionesFarmacologicas: indcFiltered,
          isEdicionAuditor: true, //por ahora edicion esta asi, definir logica de roles/derechos
          lAntecedentes: procesaEnfAnt(false),
          lEstudios: solicitudPracDesc(ordenPrac),
          lLaboratorioEvolucion: ordenLab, //ordenes de labo
          lMotivoConsulta: [], // ahora es libre
          laboratorios: checkResLabo(),
          otrosEstudios: checkResEstudios(),
          motivoConsulta: valueBuscador,
          oculto: itemInfo.oculto, //este boton se activa en la misma evolucion
          listDiagnosEvoSnomed:
            diagSnomed.length > 0 && diagSnomed[0].idsnomed !== undefined
              ? diagSnomed
              : null,
          listDelDiagSnomed: lastDiagSnomedDeleted,
          flgFuncEvolucionHtml: true,
          react: true,
          listSeg: segSaveList,
          SeguimientoSave: flagSegSaveList, //flag seg
          OrdenDigitalSave: flagOrdenLabo, //flag orden labo por ahora
          recetaDigital: recetaDigital, //receta digital array
          delOrdenLabo: delOrdenLab, //elimina orden labo
          delOrdenPrac: delOrdenPrac, //elimina orden Prac
        };
        if (preImpresion) {
          wsPostPreImpresion(dtoGuardarEvo)(evolucionDispatch);
          setGrabarEvoLoading(false);
        } else {
          //guardo ordenes de prac
          if (ordenPrac.length > 0) {
            let formatedArr = [];
            for (let i = 0; i < ordenPrac.length; i++) {
              const element = ordenPrac[i];
              if (element.hasOwnProperty("items")) {
                for (let j = 0; j < element.items.length; j++) {
                  const element2 = element.items[j];
                  formatedArr.push(element2);
                }
              } else {
                formatedArr.push(element);
              }
            }
            wsPostGuardarPractica(formatedArr)(ordenPracticaDispatch);
          }
          //guardo evolucion
          wsPostGuardarEvolucion(dtoGuardarEvo)(evolucionDispatch);
        }
      } else if (itemInfo.proceso === "nueva") {
        dtoGuardarEvo = {
          idPaciente: pacienteState.paciente.buscarPac.value[0].id,
          lLaboratorioEvolucion: ordenLab,
          examenFisico: examenFisico.length > 0 ? examenFisico : null,
          laboratorios: checkResLabo(),
          otrosEstudios: checkResEstudios(),
          indicacionesFarmacologicas: indcFiltered,
          isEdicionAuditor: false, //lo dejo asi ya que la logica no la aplicamos aun
          idUsuarioAlta: authState.auth.data.value.usuario,
          idEspecialidad: authState.auth.data.value.idEspecialidad,
          idMedico: authState.auth.data.value.idMedico, // numero de id de medico
          idCentro: itemInfo.idCentro,
          idTurno: itemInfo.idTurno,
          lMotivoConsulta: [],
          lAntecedentes: procesaEnfAnt(false),
          diagnosticosPresuntivos:
            diagPresArr.length === 0 || diagPresArr[0].idsnomed !== undefined
              ? null
              : diagPresArr,
          listDiagnosEvoSnomed:
            diagSnomed.length > 0 && diagSnomed[0].idsnomed !== undefined
              ? diagSnomed
              : null,
          evolucionHtml: datosEdicion.evoHTML,
          motivoConsulta: valueBuscador,
          comentario: datosEdicion.evoHTML,
          enfermedadesAntecedentes: [],
          lEstudios: solicitudPracDesc(ordenPrac),
          flgFuncEvolucionHtml: true,
          react: true,
          listSeg: segSaveList,
          SeguimientoSave: flagSegSaveList, //flag seg
          OrdenDigitalSave: flagOrdenLabo, //flag orden labo por ahora
          recetaDigital: recetaDigital, //receta digital string
        };
        //guardo evolucion
        if (preImpresion) {
          wsPostPreImpresion(dtoGuardarEvo)(evolucionDispatch);
          setGrabarEvoLoading(false);
        } else {
          //guardo ordenes de prac
          if (ordenPrac.length > 0) {
            let formatedArr = [];
            for (let i = 0; i < ordenPrac.length; i++) {
              const element = ordenPrac[i];
              if (element.hasOwnProperty("items")) {
                for (let j = 0; j < element.items.length; j++) {
                  const element2 = element.items[j];
                  formatedArr.push(element2);
                }
              } else {
                formatedArr.push(element);
              }
            }
            wsPostGuardarPractica(formatedArr)(ordenPracticaDispatch);
          }
          wsPostGuardarEvolucion(dtoGuardarEvo)(evolucionDispatch);
        }
      }
    } else {
      showToaster(
        {
          texto: "Complete correctamente la Evolución",
          tipo: "danger",
        },
        "centroArriba"
      )(toasterDispatch);
      setGrabarEvoLoading(false);
    }
  };

  const procesaEnfAnt = (filtered) => {
    let auxAnt = enfermedadesAntecedentesLista;
    let arrFiltered = [];
    let concatArrAux = [];
    if (itemInfo.id !== undefined && itemInfo.id !== null) {
      //filtro los antc que sea de la misma evo.
      concatArrAux = auxAnt.filter((item) => item.idEvolucion === itemInfo.id);
    }
    if (auxAnt !== null && auxAnt.length > 0) {
      for (let i = 0; i < auxAnt.length; i++) {
        const element = auxAnt[i];
        if (element.newItem !== undefined && element.newItem) {
          //cargo todos aquellos que sean nuevos en la evo
          arrFiltered.push(element);
        }
      }
      //uno ambos array
      arrFiltered = arrFiltered.concat(concatArrAux);
      //filtro snomed
      if (filtered) {
        //si es que si trae los nuevos agregados en esta evo
        arrFiltered = arrFiltered.filter((item) => item.idsnomed !== undefined);
        return arrFiltered;
      } else {
        arrFiltered = arrFiltered.filter((item) => item.idsnomed === undefined);
        //hago un arreglo para que se vean las que se cargaron en una evo nueva, pero que ahora la queres editar(snomedrelated)
        if (arrFiltered.length > 0) {
          arrFiltered = arrFiltered.map((item) => {
            if (item.idSnomed !== undefined) {
              item.display = item.descripcion;
              item.idKeySnomed = item.idKeySnomed.toString();
            }
            return item;
          });
        }
        return arrFiltered;
      }
    } else {
      return arrFiltered;
    }
  };

  const onClickCancelarEvo = () => {
    asyncDelItemIndexDB(2);
  };

  const processOrdDig = (ordenLabo, ordenPrac) => {
    let auxOrden = [];
    if (ordenLabo !== null && ordenLabo.length > 0) {
      auxOrden = auxOrden.concat(ordenLabo);
    }
    if (ordenPrac !== null && ordenPrac.length > 0) {
      auxOrden = auxOrden.concat(ordenPrac);
    }
    setOrdenDigital(auxOrden);
    return auxOrden;
  };

  //checkdata estprevios
  const checkResEstudios = () => {
    let resultadosPreviosEstudios = [];
    if (
      otrosEstudiosEvo !== null &&
      otrosEstudiosEvo.length > 0 &&
      otrosEstudiosEvo[0].resultado.trim() !== ""
    ) {
      resultadosPreviosEstudios = otrosEstudiosEvo;
    }
    // Lógica para llenar resultadosPreviosEstudios
    return resultadosPreviosEstudios;
  };

  const checkResLabo = () => {
    let resultadosPreviosLabo = [];
    if (
      laboratoriosEvo !== null &&
      laboratoriosEvo.length > 0 &&
      laboratoriosEvo[0].resultado.trim() !== ""
    ) {
      resultadosPreviosLabo = laboratoriosEvo;
    }
    // Lógica para llenar resultadosPreviosLabo
    return resultadosPreviosLabo;
  };

  //inicio useEffect vacio
  useEffect(() => {
    if (datosEdicion !== null || tokenState.token.data !== null) {
      resetEvolucion()(evolucionDispatch);
      resetEstudiosPaciente()(pacienteDispatch);
      resetInformesPaciente()(pacienteDispatch);
      resetLabHistorico()(laboratorioDispatch);
      //agrego para limpiar token en esta instancia.
      if (
        tokenState.token.data !== null &&
        tokenState.token.data.value.idTurno !== 0
      ) {
        let itemEvoXToken = {
          ...itemInfo,
          idTurno: tokenState.token.data.value.idTurno,
          idCentro: tokenState.token.data.value.idCentro,
          proceso: "nueva",
        };
        localStorage.setItem("itemInfo", JSON.stringify(itemEvoXToken));
        loginTokenReset()(tokenDispatch);
      }
      //proceso de regeneracion por indexDB
      async function getDataIndexDB() {
        try {
          const response = await getItemIndexDB(2);
          checkData(response);
        } catch (error) {
          console.log(error);
        }
      }
      getDataIndexDB();
    } else {
      history.push("/evolucion/lineadetiempo");
    }
    //eslint-disable-next-line
  }, []);

  const checkData = (data) => {
    //si es la carga inicial y la lista local le faltan datos =>
    if (checkLocalDataEvoTEST(data)) {
      refreshDataEvolucion();
    } else {
      //seteo la data denuevo en el contexto
      setGrupoEstudioCtx(data.ListNData.labo.grupoEstudios)(
        laboratorioDispatch
      );
      setGrupoEstudioUsuarioCtx(data.ListNData.labo.grupoEstudiosUsuario)(
        laboratorioDispatch
      );
      setItemOrdenHcCtx(data.ListNData.labo.itemsOrdenHc)(laboratorioDispatch);
      setLabNomeclCtx(data.ListNData.labo.labNomenclador)(laboratorioDispatch);
      setDiagnosticosDataCtx(data.ListNData.diagnostico.data)(
        diagnosticoDispatch
      );
      setEstudiosPacienteCtx(data.ListNData.paciente.estudiosPac)(
        pacienteDispatch
      );
      setInformesPacienteCtx(data.ListNData.paciente.informesPac)(
        pacienteDispatch
      );
      setInfHistoricoPacCtx(data.ListNData.paciente.laboHisInformes)(
        pacienteDispatch
      );
      setEvolucionActualCtx(data.ListNData.datosComplementarios.enfermedades)(
        evolucionDispatch
      );
      setVademecumCtx(data.ListNData.vademecum.data)(vademecumDispatch);
      setMedicamentosCtx(data.ListNData.medicamentos.data)(medicamentoDispatch);
      setEstudiosGrupoCtx(data.ListNData.grupoEstudiosPrac.data)(
        ordenPracticaDispatch
      );
      setExamenFisicoCtx(data.ListNData.examenFisico.data)(examenDispatch);
      setOrdenPracXMedCtx(data.ListNData.ordenXMed.data)(ordenPracticaDispatch);
      setOrdenPracXUsrCtx(data.ListNData.ordenXUsr.data)(ordenPracticaDispatch);
      setLoadingGral(false);
    }
    //eslint-disable-next-line
  };

  const checkEdit = () => {
    async function getDataIndexDB() {
      try {
        const response = await getItemIndexDB(5);
        if (response) {
          if (response.ListEditEvo.motivoConsulta) {
            setValueBuscador(response.ListEditEvo.motivoConsulta);
          }
          if (response.ListEditEvo.pacData) {
            setPacienteSeleccionado([response.ListEditEvo.pacData])(
              pacienteDispatch
            );
          }
          if (response.ListEditEvo.seguimientos) {
            setEditedSeg(response.ListEditEvo.seguimientos);
          }
          if (response.ListEditEvo.ordenDigital) {
            setOrdenDigital(response.ListEditEvo.ordenDigital);
          }
          if (response.ListEditEvo.examenFisico) {
            setExamenFisico(response.ListEditEvo.examenFisico);
          }
          if (
            response.ListEditEvo.diagPreSnomed &&
            response.ListEditEvo.diagPreSnomed.length > 0
          ) {
            setDiagPresArr(response.ListEditEvo.diagPreSnomed);
            setFlgDiagFBack(false);
          } else {
            setFlgDiagFBack(true);
          }
          if (
            response.ListEditEvo.enfYAntc &&
            response.ListEditEvo.enfYAntc.length > 0
          ) {
            setEnfermedadesAntecedentesLista(response.ListEditEvo.enfYAntc);
            setFlgEnfYAntcBack(false);
          } else {
            setFlgEnfYAntcBack(true);
          }
          if (
            response.ListEditEvo.indicacionFarmacologica &&
            response.ListEditEvo.indicacionFarmacologica.length > 0
          ) {
            setIndicacionFarmacologica(
              response.ListEditEvo.indicacionFarmacologica
            );
          }
          if (
            response.ListEditEvo.lastDiagSnomedDeleted &&
            response.ListEditEvo.lastDiagSnomedDeleted.length > 0
          ) {
            setLastDiagSnomedDeleted(
              response.ListEditEvo.lastDiagSnomedDeleted
            );
          }
          if (response.ListEditEvo.resultadosLabo) {
            setLaboratoriosEvo(response.ListEditEvo.resultadosLabo);
          }
          if (response.ListEditEvo.resultadosEstInf) {
            setOtrosEstudiosEvo(response.ListEditEvo.resultadosEstInf);
          }
          if (
            response.ListEditEvo.recetaDigital &&
            response.ListEditEvo.recetaDigital.length > 0
          ) {
            setRecetaDigital(response.ListEditEvo.recetaDigital);
          }
          //aca podria agregar el resto el quill, el diagpres, enf antc, est, farmaco.
        } else {
          let txtMot = evolucionState.evolucion.actual.value.texto;
          let evoActValue = evolucionState.evolucion.actual.value;
          asyncAddEdicionIDB({
            motivoConsulta: txtMot !== null ? txtMot : "",
            evoHTML: "",
            evolucion: "",
            pacData: pacienteState.paciente.buscarPac.value[0],
            resultadosEstInf: valResEstudios(evoActValue),
            resultadosLabo: valResLabo(evoActValue),
            seguimientos: [],
            ordenDigital: processOrdDig(
              evoActValue.ordenLabo,
              evoActValue.ordenPrac
            ),
            examenFisico: validateExPrevio(evoActValue.examenFisico),
            diagPreSnomed: [],
            enfYAntc: [],
            indicacionFarmacologica: [],
            lastDiagSnomedDeleted: [],
            recetaDigital: [],
          });
          //seteo el hook de motivo consulta
          setValueBuscador(txtMot !== null ? txtMot : "");
          //seteo flg de diag pres (carga data del back)
          setFlgDiagFBack(true);
          //seteo flg antc y enf (carga data del back)
          setFlgEnfYAntcBack(true);
          //seteo por si quiere ver la previa sin editar (circ est prev)
          if (
            evoActValue !== null &&
            evoActValue.laboratorios !== null &&
            evoActValue.laboratorios.length > 0
          ) {
            setLaboratoriosEvo(evoActValue.laboratorios);
          }
          if (
            evoActValue !== null &&
            evoActValue.otrosEstudios !== null &&
            evoActValue.otrosEstudios.length > 0
          ) {
            setOtrosEstudiosEvo(evoActValue.otrosEstudios);
          }
          if (evoActValue !== null) {
            processOrdDig(evoActValue.ordenLabo, evoActValue.ordenPrac);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    getDataIndexDB();
  };

  const valResLabo = (evoActValue) => {
    let listLaboItem = [
      {
        idEvolucion: itemInfo.proceso === "edita" ? itemInfo.id : 0,
        fecha:
          evoActValue !== null &&
          evoActValue.laboratorios !== null &&
          evoActValue.laboratorios.length > 0
            ? evoActValue.laboratorios[0].fecha
            : "",
        interno:
          evoActValue !== null &&
          evoActValue.laboratorios !== null &&
          evoActValue.laboratorios.length > 0
            ? evoActValue.laboratorios[0].interno
            : "", //no especifica func, en angular siempre era 1
        resultado:
          evoActValue !== null &&
          evoActValue.laboratorios !== null &&
          evoActValue.laboratorios.length > 0
            ? evoActValue.laboratorios[0].resultado
            : "",
      },
    ];
    setLaboratoriosEvo(listLaboItem);
    return listLaboItem;
  };
  const valResEstudios = (evoActValue) => {
    let listEstudiosItem = [
      {
        idEvolucion: itemInfo.proceso === "edita" ? itemInfo.id : 0,
        fecha:
          evoActValue !== null &&
          evoActValue.otrosEstudios !== null &&
          evoActValue.otrosEstudios.length > 0
            ? evoActValue.otrosEstudios[0].fecha
            : "",
        interno:
          evoActValue !== null &&
          evoActValue.otrosEstudios !== null &&
          evoActValue.otrosEstudios.length > 0
            ? evoActValue.otrosEstudios[0].interno
            : "", //no especifica func, en angular siempre era 1
        resultado:
          evoActValue !== null &&
          evoActValue.otrosEstudios !== null &&
          evoActValue.otrosEstudios.length > 0
            ? evoActValue.otrosEstudios[0].resultado
            : "",
      },
    ];

    setOtrosEstudiosEvo(listEstudiosItem);
    return listEstudiosItem;
  };

  const validateExPrevio = (listaExamenPrevio) => {
    if (
      examenState.examen.data !== null &&
      examenState.examen.data.value !== null &&
      examenState.examen.data.value.length > 0 &&
      listaExamenPrevio !== null
    ) {
      // Creamos una copia de la lista principal
      const nuevaLista = examenState.examen.data.value.map((item) => {
        // Buscamos si hay algún elemento en listaExamenPrevio cuyo idExamenFisicoPadre coincida con el id de este item
        const match = listaExamenPrevio.find(
          (exPrev) =>
            exPrev.idExamenFisicoPadre.toString() === item.id.toString()
        );
        // Si hay coincidencia, copiamos el valor
        if (match) {
          return { ...item, valor: match.valor };
        }
        // Si no hay coincidencia, devolvemos el item tal cual
        return item;
      });
      setExamenFisico(nuevaLista);
      return nuevaLista;
    } else {
      setExamenFisico([]);
      return [];
    }
  };

  //por ahora sirve
  useEffect(() => {
    if (
      medicamentoState.medicamento.data !== null &&
      medicamentoState.medicamento.data !== undefined
    ) {
      let medicamentosEvolucion = medicamentoState.medicamento.data;
      if (
        medicamentosEvolucion !== null &&
        medicamentosEvolucion.value !== null &&
        medicamentosEvolucion.value.length > 0
      ) {
        let auxMed = medicamentosEvolucion.value.map((item) => {
          if (item.activo === "1") {
            item.activoNoEditable = true;
            return item;
          } else {
            return item;
          }
        });
        setIndicacionFarmacologica(auxMed);
      }
    }
  }, [medicamentoState.medicamento.data]);

  //funcion async para cargar la db local
  async function asyncAddItemIndexDB(ListNData) {
    try {
      const response = await addItemIndexDB(2, "ListNData", ListNData);
      if (response !== null) {
        //DATOS GUARDADOS OK
      }
    } catch (error) {
      //agregar toaster de error
      history.push("/evolucion/lineadetiempo");
    }
  }
  //funcion async para cargar la edicion local
  async function asyncAddEdicionIDB(ListEditEvo) {
    try {
      const response = await addItemIndexDB(5, "ListEditEvo", ListEditEvo);
      if (response !== null) {
        //DATOS GUARDADOS OK
      }
    } catch (error) {
      //fix 6/9 sale el cartel cuando no encuentra
      // showToaster(
      //   { texto: "Error al guardar la edición", tipo: "danger" },
      //   "centroArriba"
      // )(toasterDispatch);
    }
  }

  //funcion async para updatear la edicion local
  async function asyncUpdEdicionIDB(key, ref, obj) {
    try {
      const response = await updateEvoEditIndexDB(key, ref, obj);
      if (response !== null) {
        //DATOS GUARDADOS OK
      }
    } catch (error) {
      //agregar toaster de error
    }
  }

  //funcion async para eliminar item de la db local
  async function asyncDelItemIndexDB(key) {
    try {
      const response = await deleteItemIndexDB(key);
      if (response) {
        salirEvoXedicion();
      }
    } catch (error) {
      //agregar toaster de error
      console.log(error);
    }
  }
  //funcion async para eliminar item de la db local
  async function asyncDelItemIndexDB1(key) {
    try {
      const response = await deleteItemIndexDB(key);
      if (response) {
        history.push("/evolucion/lineadetiempo");
      }
    } catch (error) {
      //agregar toaster de error
      console.log(error);
    }
  }
  //funcion async para eliminar item de la db local
  async function asyncDelItemIndexDB5(key) {
    try {
      const response = await deleteItemIndexDB(key);
      if (response) {
        //nada solo necesito borrar el item 5
      }
    } catch (error) {
      //agregar toaster de error
      console.log(error);
    }
  }

  const salirEvoXedicion = () => {
    setEvoInitialData();
    setEditedSeg([]);
    resetSegCtx()(seguimientoDispatch);
    resetGuardarEvo()(evolucionDispatch);
    resetMedicamentos()(medicamentoDispatch);
    resetEvoActual()(evolucionDispatch);
    localStorage.removeItem("editandoEvo");
    localStorage.removeItem("itemInfo");
    resetPreImpresion()(evolucionDispatch);
    resetEditarEvo()(evolucionDispatch);
    asyncDelItemIndexDB5(5);
    asyncDelItemIndexDB1(1);
  };

  // Seteo el texto en el textarea antes de dictar
  useEffect(() => {
    if (quillState) {
      if (quillState.current) {
        quillState.current.setEditorContents(
          quillState.current.getEditor(),
          datosEdicion.evoHTML
        );
      }
    }
  }, [quillState]);

  useEffect(() => {
    if (
      evolucionState.evolucion.actual !== null &&
      evolucionState.evolucion.actual.value !== null &&
      evolucionState.evolucion.actual.value !== undefined
    ) {
      //disparo el controlado de ediciones
      checkEdit();
    }
  }, [evolucionState.evolucion.actual]);

  useEffect(() => {
    if (
      evolucionState.evolucion.guardarEvo &&
      evolucionState.evolucion.guardarEvo !== null
    ) {
      if (evolucionState.evolucion.guardarEvo.isSuccess) {
        //caso falso positivo al guardarlaboorden cambio msj
        if (
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
        } else {
          showToaster(
            {
              texto: "Evolución guardada correctamente",
              tipo: "success",
            },
            "centroArriba"
          )(toasterDispatch);
        }
        //continua proceso de evo OK
        if (itemInfo.proceso === "nueva") {
          localStorage.setItem("salir", true);
          logoutAuth()(authDispatch);
          deleteIndexDBXNueva();
          history.push("/");
        } else if (itemInfo.proceso === "edita") {
          //actualizo los datos del pac - aqui obtengo los ultimas enf y antc
          wsGetBuscarPacienteDni(
            pacienteState.paciente.buscarPac.value[0].documento
          )(pacienteDispatch);
          //elimino toda la info que mantengo respecto a la edicion de una evo
          //en funcion de sacar primero de indexDB
          asyncDelItemIndexDB(2);
        }
      } else if (!evolucionState.evolucion.guardarEvo.isSuccess) {
        showToaster(
          {
            texto: evolucionState.evolucion.guardarEvo.error.errorMessage,
            tipo: "danger",
          },
          "centroArriba"
        )(toasterDispatch);
      }
    }
    if (
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
      resetGuardarEvo()(evolucionDispatch);
      //comentamos 15/4 el error te deja en el mismo guarda
      // history.push("/evolucion/lineadetiempo");
    }
  }, [evolucionState.evolucion]);

  //una vez tengo los datos completos los seteo en local y freno el loading
  useEffect(() => {
    if (
      laboratorioState.laboratorio.grupoEstudiosUsuario !== null &&
      laboratorioState.laboratorio.grupoEstudios !== null &&
      laboratorioState.laboratorio.itemsOrdenHc !== null &&
      laboratorioState.laboratorio.labNomenclador !== null &&
      diagnosticoState.diagnostico.data !== null &&
      pacienteState.paciente.estudiosPac !== null &&
      pacienteState.paciente.informesPac !== null &&
      evolucionState.evolucion.actual !== null &&
      pacienteState.paciente.laboHisInformes !== null &&
      vademecumState.vademecum.data !== null &&
      medicamentoState.medicamento.data !== null &&
      ordenPracticaState.ordenPractica?.estudioGrupo !== null &&
      examenState.examen.data !== null &&
      ordenPracticaState.ordenPractica?.practicasXEsp !== null &&
      ordenPracticaState.ordenPractica?.practicasXUser !== null &&
      loadingGral
    ) {
      let dataCompleted = setLocalDataList(
        laboratorioState.laboratorio.grupoEstudiosUsuario,
        laboratorioState.laboratorio.grupoEstudios,
        laboratorioState.laboratorio.itemsOrdenHc,
        laboratorioState.laboratorio.labNomenclador,
        diagnosticoState.diagnostico.data,
        pacienteState.paciente.estudiosPac,
        pacienteState.paciente.informesPac,
        pacienteState.paciente.laboHisInformes,
        evolucionState.evolucion.actual,
        vademecumState.vademecum.data,
        medicamentoState.medicamento.data,
        ordenPracticaState.ordenPractica.estudioGrupo,
        examenState.examen.data,
        ordenPracticaState.ordenPractica.practicasXEsp,
        ordenPracticaState.ordenPractica.practicasXUser
      );
      asyncAddItemIndexDB(dataCompleted);
      setLoadingGral(false);
      //agrego el tipo de vademecum alfa o kairos para saber con que base estoy trabajando
      if (vademecumState.vademecum.data.value.length > 0) {
        setTipoVademecumCtx(
          vademecumState.vademecum.data.value[0].tipoVademecum
        )(vademecumDispatch);
      }
    }
    //eslint-disable-next-line
  }, [
    laboratorioState.laboratorio.grupoEstudiosUsuario,
    laboratorioState.laboratorio.grupoEstudios,
    laboratorioState.laboratorio.itemsOrdenHc,
    laboratorioState.laboratorio.labNomenclador,
    diagnosticoState.diagnostico.data,
    pacienteState.paciente.estudiosPac,
    pacienteState.paciente.informesPac,
    evolucionState.evolucion.actual,
    pacienteState.paciente.laboHisInformes,
    vademecumState.vademecum.data,
    medicamentoState.medicamento.data,
    ordenPracticaState.ordenPractica?.estudioGrupo,
    examenState.examen.data,
    ordenPracticaState.ordenPractica?.practicasXEsp,
    ordenPracticaState.ordenPractica?.practicasXUser,
  ]);

  //manejo de errores de datos
  useEffect(() => {
    if (laboratorioState.laboratorio.error !== null) {
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
        resetLaboInforme()(laboratorioDispatch);
        resetLaboParcial()(laboratorioDispatch);
      }
      history.push("/evolucion/lineadetiempo");
    }
    //eslint-disable-next-line
  }, [laboratorioState.laboratorio.error]);

  useEffect(() => {
    if (diagnosticoState.diagnostico.error !== null) {
      showToaster(
        {
          texto: diagnosticoState.diagnostico.error.error.errorMessage,
          tipo: "danger",
        },
        "centroArriba"
      )(toasterDispatch);
      history.push("/evolucion/lineadetiempo");
    }
    //eslint-disable-next-line
  }, [diagnosticoState.diagnostico.error]);

  useEffect(() => {
    if (pacienteState.paciente.error !== null) {
      showToaster(
        {
          texto: pacienteState.paciente.error.error.errorMessage,
          tipo: "danger",
        },
        "centroArriba"
      )(toasterDispatch);
      history.push("/evolucion/lineadetiempo");
    }
    //eslint-disable-next-line
  }, [pacienteState.paciente.error]);

  useEffect(() => {
    if (vademecumState.vademecum.error !== null) {
      showToaster(
        {
          texto: vademecumState.vademecum.error.error.errorMessage,
          tipo: "danger",
        },
        "centroArriba"
      )(toasterDispatch);
      history.push("/evolucion/lineadetiempo");
    }
    //eslint-disable-next-line
  }, [vademecumState.vademecum.error]);

  useEffect(() => {
    if (examenState.examen.error !== null) {
      showToaster(
        {
          texto: examenState.examen.error.error.errorMessage,
          tipo: "danger",
        },
        "centroArriba"
      )(toasterDispatch);
      history.push("/evolucion/lineadetiempo");
    }
    //eslint-disable-next-line
  }, [vademecumState.vademecum.error]);

  //--fin manejo de errores

  //--Nueva Logica Evolucion
  const agregarEnfItem = () => {
    showModal(
      <ModalEnfAnt
        dissmiss={dissmissEstPrev}
        setEnfermedadesAntecedentesLista={setEnfermedadesAntecedentesLista}
        enfermedadesAntecedentesLista={enfermedadesAntecedentesLista}
      />,
      "Enfermedades o Antecedentes",
      dissmissEstPrev,
      false,
      {},
      "centro",
      true
    )(modalDispatch);
  };

  const eliminarElementoAntecedente = (e) => {
    let concatAntYEnf = [];
    if (enfermedadesAntecedentesLista !== undefined) {
      let delNotSnomed = enfermedadesAntecedentesLista.filter(
        (item) => item.idSnomed === undefined && item.idsnomed === undefined
      );
      let delSnomed = enfermedadesAntecedentesLista.filter(
        (item) =>
          item.idKeySnomed !== e.idKeySnomed && item.idSnomed !== undefined
      );
      let delNewSnomed = enfermedadesAntecedentesLista.filter(
        (item) => item.idsnomed !== undefined
      );
      //primero concateno los que no necesitan mas logica
      concatAntYEnf = delNotSnomed.concat(delSnomed);
      let auxDelNewSnomed = [];
      if (delNewSnomed.length > 0) {
        auxDelNewSnomed = delNewSnomed.filter(
          (item) => item.idsnomed !== e.idsnomed
        );
        concatAntYEnf = concatAntYEnf.concat(auxDelNewSnomed);
      }
      let rsmAntYEnf = {
        ...itemInfo,
        lAntecedentes: concatAntYEnf,
      };
      localStorage.setItem("itemInfo", JSON.stringify(rsmAntYEnf));
    }
    setEnfermedadesAntecedentesLista(concatAntYEnf);
    // //revisaria si fue una nuevo de snomed agregado.
    // // si fue uno nuevo lo saco de la lista, y listo
    // // si es uno que ya venia, tengo que modificar el dto como aca abjo
    if (e.newItem === undefined && e.idSnomed !== "") {
      let dtoBaja = {
        id: e.idKeySnomed,
        idpaciente: pacienteState.paciente.buscarPac.value[0].id,
        idpaciente_desc: pacienteState.paciente.buscarPac.value[0].nombre,
        idsnomed: e.idSnomed,
        descripcion: e.descripcion,
        idevolucion: itemInfo.proceso === "edita" ? itemInfo.id : 0,
        presuntivo: false,
        idevolucionbaja: itemInfo.id,
        idusuarioctrl: authState.auth.data.value.usuario,
        idusuarioctrl_desc: `${authState.auth.data.value.nombre} ${authState.auth.data.value.apellido}`,
        fechactrl:
          itemInfo.proceso === "edita"
            ? itemInfo.fechaTurno
            : fechaTurnoFormat(),
        texto: "",
        darBaja: true,
      };
      setBajasDiag([...bajasDiag, dtoBaja]);
    }
  };

  const dissmissEstPrev = () => {
    hideModal()(modalDispatch);
    resetLaboParcial()(laboratorioDispatch);
  };

  const onClickEstPrev = (item) => {
    let modalName = "";
    if (item.tipos === "Informes") {
      modalName = `${item.strEstudio} (${formatFechaTimeLine(item.fecha)})`;
    } else {
      return onClickLaboInforme(item);
    }
    showModal(
      <AdicionarInformeCmp
        dissmiss={dissmissEstPrev}
        informe={item}
        informeName={modalName}
        fechaEstudio={item.fecha}
        tipoEstudio={item.tipos}
        setOtrosEstudiosEvo={setOtrosEstudiosEvo}
      />,
      modalName,
      dissmissEstPrev,
      false,
      {},
      "centro",
      true
    )(modalDispatch);
  };

  const onClickLaboInforme = (item) => {
    let modalName = "";
    modalName = `LABORATORIO (${formatFechaTimeLine(item.fecha)})`;
    setLaboPrev({
      item: item,
      informeStr: null,
      modalName: modalName,
      tipoEstudio: "Labo",
      fechaEstudio: item.fecha,
      idCentro: item.idCentro,
    });
    setFlgOpenLaboInf(true);
    wsGetInformeLab(item.codigo)(laboratorioDispatch);
  };

  useEffect(() => {
    if (laboratorioState.laboratorio.labInforme !== null && flgOpenLaboInf) {
      showModal(
        <AdicionarInformeCmp
          dissmiss={dissmissEstPrev}
          informe={laboratorioState.laboratorio.labInforme}
          informeName={laboPrev.modalName}
          tipoEstudio={laboPrev.tipoEstudio}
          fechaEstudio={laboPrev.fechaEstudio}
          setLaboratoriosEvo={setLaboratoriosEvo}
          idCentro={laboPrev.idCentro}
          codigoInformeLabo={laboPrev.item.codigo}
        />,
        laboPrev.modalName,
        dissmissEstPrev,
        false,
        {},
        "centro",
        true
      )(modalDispatch);
      setFlgOpenLaboInf(false);
    }
  }, [laboratorioState]);

  const showDiagnosticos = () => {
    showModal(
      <ModalDiagnosticos
        diagnosticos={diagPresArr}
        eliminarItem={removeDiagPres}
      />,
      "Lista de Diagnósticos",
      dissmissEstPrev,
      false,
      {},
      "centro",
      true
    )(modalDispatch);
  };

  const onChangeDiagPres = (item) => {
    //logica diags con snomed - tomo tipo como prop para diferenciarlos
    if (item !== "" && typeof item === "object") {
      if (diagPresArr?.length === 6) {
        showToaster(
          {
            texto: "No se pueden agregar más de 6 diagnósticos",
            tipo: "danger",
          },
          "centroArriba"
        )(toasterDispatch);
        hideModal()(modalDispatch);
        resetSnomed()(snomedDispatch);
        return;
      } else {
        let itemInfo = JSON.parse(localStorage.getItem("itemInfo"));
        let diagPresDto = {
          id: -1,
          idpaciente: pacienteState.paciente.buscarPac.value[0].id,
          idpaciente_desc: pacienteState.paciente.buscarPac.value[0].nombre,
          idsnomed: item.tipo !== undefined ? "" : item.concept.conceptId,
          descripcion: item.term,
          idevolucion: itemInfo.proceso === "edita" ? itemInfo.id : 0,
          presuntivo: true,
          idevolucionbaja: 0,
          idusuarioctrl: authState.auth.data.value.usuario,
          idusuarioctrl_desc: `${authState.auth.data.value.nombre} ${authState.auth.data.value.apellido}`,
          fechactrl:
            itemInfo.proceso === "edita"
              ? itemInfo.fechaTurno
              : fechaTurnoFormat(),
          texto: item.term,
          darBaja: false,
        };
        //filtro para no tener duplicados con el array de checks
        let auxArray;
        auxArray = diagPresArr.filter(
          (e) => e.texto.trim() === item.term.trim()
        );
        if (auxArray.length > 0) {
          showToaster(
            {
              texto:
                "La determinación seleccionada ya se encuentra en la orden digital",
              tipo: "danger",
            },
            "centroArriba"
          )(toasterDispatch);
          hideModal()(modalDispatch);
          resetSnomed()(snomedDispatch);
        } else {
          if (
            diagPresArr.length > 0 &&
            diagPresArr[0].idsnomed !== undefined &&
            diagPresArr[0].idsnomed !== ""
          ) {
            let snomedAuxDto = diagPresDto;
            snomedAuxDto = {
              ...snomedAuxDto,
              id: -1,
            };
            let arrxDiag = [...diagPresArr, snomedAuxDto];
            setDiagPresArr(arrxDiag);
            asyncUpdEdicionIDB(5, "diagPreSnomed", arrxDiag);
            hideModal()(modalDispatch);
            resetSnomed()(snomedDispatch);
          } else {
            if (
              itemInfo.proceso === "edita" &&
              lastDiagSnomedDeleted.length > 0
            ) {
              diagPresDto.id = lastDiagSnomedDeleted[0].id;
            }
            setDiagPresArr([diagPresDto]);
            asyncUpdEdicionIDB(5, "diagPreSnomed", [diagPresDto]);
            hideModal()(modalDispatch);
            resetSnomed()(snomedDispatch);
          }
        }
      }
    }
  };

  const newItemDiagPres = (item) => {
    let diagPresNew = {
      descripcion: item,
      id: -1,
      idDiagnostico: null,
      idEvolucion: 0,
      manual: null,
      nuevo: null,
      texto: item,
    };
    setDiagPresArr([diagPresNew]);
    asyncUpdEdicionIDB(5, "diagPreSnomed", [diagPresNew]);
  };

  const removeDiagPres = (item, listDiag) => {
    //solo para items de la lista - los nuevos se manejan distinto
    if (item !== "" && typeof item === "object") {
      if (listDiag) {
        setDiagPresArr(listDiag);
        asyncUpdEdicionIDB(5, "diagPreSnomed", listDiag);
      } else {
        let newList = diagPresArr.filter((e) => e.idsnomed !== item.idsnomed);
        setDiagPresArr(newList);
        asyncUpdEdicionIDB(5, "diagPreSnomed", newList);
      }
      let lastDiagDeletedList = [...lastDiagSnomedDeleted];
      let deletedItem = diagPresArr.filter((e) => e.idsnomed === item.idsnomed);
      if (item.id !== -1) {
        lastDiagDeletedList.push(...deletedItem);
      }

      // Solo lo agrego a la lista de eliminados si es distinto de -1
      // si es -1 no lo agrego porque es un nuevo item y no existe en la base para eliminarlo
      if (itemInfo.proceso === "edita" && item.id !== -1) {
        setLastDiagSnomedDeleted(lastDiagDeletedList);
        asyncUpdEdicionIDB(5, "lastDiagSnomedDeleted", lastDiagDeletedList);
      }
    }
  };

  // arreglos arr labo y est previos
  useEffect(() => {
    if (
      pacienteState.paciente.laboHisInformes !== null &&
      Array.isArray(pacienteState.paciente.laboHisInformes.value) &&
      pacienteState.paciente.laboHisInformes.value.length > 0
    ) {
      let auxArr = pacienteState.paciente.laboHisInformes.value.sort(
        (a, b) =>
          new Date(formatFechaEvo(b.fecha)) - new Date(formatFechaEvo(a.fecha))
      );
      setLabosArr(auxArr);
    }
  }, [pacienteState.paciente.laboHisInformes]);

  useEffect(() => {
    if (
      pacienteState.paciente.estudiosPac !== null &&
      pacienteState.paciente.informesPac !== null
    ) {
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
            estudioAsoc: null,
          };
        });
      }
      //asocio estudio a informe
      let conAux = [];
      for (let i = 0; i < arrxInformes.length; i++) {
        conAux = arrxEstudios.filter(
          //eslint-disable-next-line
          (item) => item.idTurno === arrxInformes[i].idTurno.toString()
        );
        if (conAux.length > 0) {
          if (arrxInformes[i].estudioAsoc === null) {
            arrxInformes[i].estudioAsoc = conAux;
          }
        }
      }
      arrxInformes = arrxInformes.sort(
        (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
      );
      setEstudiosArr(arrxInformes);
    }
  }, [pacienteState.paciente.estudiosPac, pacienteState.paciente.informesPac]);
  // ---- fin arreglos arr labo y est previos

  //refrescar info
  const refreshDataEvolucion = () => {
    const dataPac = pacienteState.paciente.buscarPac.value[0];
    setLoadingGral(true);
    wsGetLabGrupoEstudiosUsuario(authState.auth.data.value.usuario)(
      laboratorioDispatch
    );
    wsGetLabGrupoEstudios()(laboratorioDispatch);
    wsGetLabGrupoEstudioOrden()(laboratorioDispatch);
    wsGetLabNomencladores()(laboratorioDispatch);
    wsGetDiagnosticos()(diagnosticoDispatch);
    wsGetEstudiosPaciente(dataPac.documento)(pacienteDispatch);
    wsGetVademecum()(vademecumDispatch);
    wsGetMedicamentos(dataPac.id)(medicamentoDispatch);
    wsGetInformesPaciente(dataPac.id, true)(pacienteDispatch);
    wsGetLaboInformeHistorico(dataPac.id)(pacienteDispatch);
    wsEstudioGrupoPrac(true)(ordenPracticaDispatch);
    //a deprecar si queda bien lo nuevo =>
    // if (authState.auth.data.value.idEspecialidad !== null) {
    //   if (authState.auth.data.value.idEspecialidad.length > 4) {
    //     let strToSlice = authState.auth.data.value.idEspecialidad;
    //     strToSlice = strToSlice.slice(0, -1);
    //     wsGetExamen(`${strToSlice}3`)(examenDispatch);
    //   } else {
    //     wsGetExamen(`${authState.auth.data.value.idEspecialidad}3`)(
    //       examenDispatch
    //     );
    //   }
    // } else {
    //   wsGetExamen(`CLI3`)(examenDispatch);
    // }
    wsGetExamen(`GRL3`)(examenDispatch);
    if (
      itemInfo !== null &&
      itemInfo !== undefined &&
      itemInfo.id !== undefined
    ) {
      wsGetDatosEvolucionById(itemInfo.id)(evolucionDispatch);
    } else {
      wsGetAntecedentesByPacId(dataPac.id)(evolucionDispatch);
    }
    // todavia no esta creado el modulo de tablas
    if (authState.auth.data.value.idEspecialidad !== null) {
      wsGetOrdenXEsp(authState.auth.data.value.idEspecialidad)(
        ordenPracticaDispatch
      );
    } else {
      wsGetOrdenXEsp("CLI")(ordenPracticaDispatch);
    }
    if (authState.auth.data.value.idMedico !== null) {
      wsGetOrdenXUser(authState.auth.data.value.idMedico)(
        ordenPracticaDispatch
      );
    }
  };

  const onClickExamenFisico = () => {
    if (openFarmacos || openSlider) {
    } else {
      setOpenExmFisico(!openExmFisico);
    }
  };

  //apartado NewQuill
  const startText = (data) => {
    if (Array.isArray(data)) {
      return data;
    } else {
      data = data.replaceAll("<p>", "");
      data = data.replaceAll("</p>", "");
      data = data.replaceAll("&nbsp;", " ");
      return data;
    }
  };

  useEffect(() => {
    if (
      datosEdicion !== null &&
      datosEdicion.evoHTML !== null &&
      datosEdicion.evoHTML !== undefined
    ) {
      if (datosEdicion.evoHTML.length > editorCaracLimit) {
        showToaster(
          {
            texto: "Alcanzó la cantidad de carácteres permitidos",
            tipo: "danger",
          },
          "centroArriba"
        )(toasterDispatch);
      }
    }
  }, [datosEdicion?.evoHTML]);

  //contemplo los casos de examen fisico
  useEffect(() => {
    if (
      examenState.examen.data !== null &&
      examenState.examen.data !== undefined
    ) {
      if (examenState.examen.data.value.length < 1) {
        showToaster(
          {
            texto: "Error al obtener plantilla de exámen físico",
            tipo: "danger",
          },
          "centroArriba"
        )(toasterDispatch);
        setOpenExmFisico(false);
      }
    }
    //caso de error
    if (
      examenState.examen.error !== null &&
      examenState.examen.error !== undefined
    ) {
      showToaster(
        {
          texto: examenState.examen.error.error.errorMessage,
          tipo: "danger",
        },
        "centroArriba"
      )(toasterDispatch);
      setOpenExmFisico(false);
    }
  }, [examenState.examen]);

  //-- logica abrir tipo de orden
  const seleccionarTipoOrden = () => {
    if (openExmFisico || openFarmacos || openReceta) {
      showModal(
        <Mensaje
          textoNegrita={"Se encuentra trabajando en otro modulo"}
          texto={"Desea continuar con otro modulo?"}
        ></Mensaje>,
        "Modulo en curso",
        dsmMsjCerrarTipoOrden,
        false,
        [
          {
            text: "Cancelar",
            clase: "btn-Mensaje bgc-danger rb16m c-white",
            accion: dsmMsjCerrarTipoOrden,
          },
          {
            text: "Continuar",
            clase: "btn-Mensaje b-latex30 rb16m c-latex30",
            accion: contMsjCerrarTipoOrden,
          },
        ],
        "centro",
        false
      )(modalDispatch);
    } else {
      if (openCirOrdenPrac || openCircOrdenLabo) {
        setOpenCirOrdenLabo(false);
        setOpenCirOrdenPrac(false);
        setOpenSlider(true);
        setOpenSelectorOrden(true);
      } else {
        setOpenSlider(true);
        setOpenSelectorOrden(true);
      }
    }
  };

  const dsmMsjCerrarTipoOrden = () => {
    hideModal()(modalDispatch);
  };
  const contMsjCerrarTipoOrden = () => {
    hideModal()(modalDispatch);
    setOpenExmFisico(false);
    setOpenFarmacos(false);
    setOpenReceta(false);
    if (openCirOrdenPrac || openCircOrdenLabo) {
      setOpenCirOrdenLabo(false);
      setOpenCirOrdenPrac(false);
      setOpenSlider(true);
      setOpenSelectorOrden(true);
    } else {
      setOpenSlider(true);
      setOpenSelectorOrden(true);
    }
  };

  // logica orden prac
  const abrirOrdenPractica = (item, modifica, index) => {
    if (
      //falta el modulo de tablas
      // (ordenPracticaState.ordenPractica.practicasXEsp !== null ||
      //   ordenPracticaState.ordenPractica.practicasXUser !== null) &&
      ordenPracticaState.ordenPractica.estudioGrupo !== null &&
      ordenPracticaState.ordenPractica.estudioGrupo.value !== null &&
      ordenPracticaState.ordenPractica.estudioGrupo.value.length > 0
    ) {
      if (
        item !== null &&
        item !== undefined &&
        modifica !== null &&
        modifica !== undefined &&
        index !== null &&
        index !== undefined
      ) {
        setEditaOrdPrac({
          ...editaOrdPrac,
          item: item,
          modifica: modifica,
          index: index,
        });
        setOpenSlider(true);
        setOpenSelectorOrden(false);
        setOpenCirOrdenPrac(true);
      } else {
        setOpenSelectorOrden(false);
        setOpenCirOrdenPrac(true);
      }
    } else {
      showToaster(
        {
          texto: "No posee los datos necesarios para continuar",
          tipo: "danger",
        },
        "centroArriba"
      )(toasterDispatch);
    }
  };

  useEffect(() => {
    if (
      ordenPracticaState?.ordenPractica?.error !== null &&
      ordenPracticaState?.ordenPractica?.error !== undefined
    ) {
      //agregar los mensajes correspondientes desde ws.
      showToaster(
        {
          texto: ordenPracticaState?.ordenPractica?.error.error.errorMessage,
          tipo: "danger",
        },
        "centroArriba"
      )(toasterDispatch);
      resetErrorOrdenPrac()(ordenPracticaDispatch);
    }
  }, [ordenPracticaState?.ordenPractica?.error]);
  //-- fin logica orden practica

  //nuevo cir orden labo
  const [deterOrdenLabo, setDeterOrdenLabo] = useState();
  const [openCircOrdenLabo, setOpenCirOrdenLabo] = useState(false);
  const [editaOrdenLabo, setEditaOrdenLabo] = useState({
    item: null,
    modifica: false,
    index: null,
  });

  const abrirOrdenLabo = () => {
    let auxOrdenUser = laboratorioState.laboratorio.grupoEstudiosUsuario.value;
    let auxOrdenDeters = laboratorioState.laboratorio.grupoEstudios.value;
    auxOrdenDeters = auxOrdenDeters.map((obj) => ({ ...obj, checked: false }));
    let arrAux = null;
    for (let i = 0; i < auxOrdenUser.length; i++) {
      arrAux = auxOrdenDeters.filter(
        (item) => item.idgrupoestudio === auxOrdenUser[i].id
      );
      arrAux = arrAux.map((obj) => ({ ...obj, checked: true }));
      auxOrdenUser[i].items = arrAux;
    }
    setDeterOrdenLabo(auxOrdenUser);
    setOpenSelectorOrden(false);
    setOpenCirOrdenLabo(true);
  };

  const seleccionaOrdenLabo = (item, modifica, index) => {
    setOpenSlider(true);
    abrirOrdenLabo();
    setEditaOrdenLabo({
      ...editaOrdenLabo,
      item: item,
      modifica: modifica,
      index: index,
    });
  };

  const dissmissSegundo = () => {
    hideSegundoModal()(segundoModalDispatch);
  };
  const mensajeVerMas = (items) => {
    showSegundoModal(
      <ModalVerMas determinaciones={items}></ModalVerMas>,
      "Listado completo",
      dissmissSegundo,
      false,
      [
        {
          text: "Volver",
          clase: "btn-Mensaje bgc-latex30 rb16m c-white",
          accion: dissmissSegundo,
        },
      ],
      "centro",
      true
    )(segundoModalDispatch);
  };

  const delOrdenFr = (index) => {
    let auxLocalOrden = ordenDigital;
    const filteredList = auxLocalOrden.filter((_, i) => i !== index);
    asyncUpdEdicionIDB(5, "ordenDigital", filteredList);
    setOrdenDigital(filteredList);
    showToaster(
      {
        texto: "Orden eliminada correctamente",
        tipo: "success",
      },
      "centroArriba"
    )(toasterDispatch);
  };

  const borrarOrden = (item, index) => {
    if (itemInfo.proceso !== "edita") {
      //temporal: item se guardo en la base en una evolucion pero que aun no se asigno
      if (
        item.pendienteAsignacion !== undefined &&
        item.pendienteAsignacion === true
      ) {
        delOrdenFr(index);
      } else {
        delOrdenFr(index);
        //aca deberia llamar a un modal que verifique si queres eliminar una ya hecha, luego ws y finalmente cerrar todo
      }
    } else {
      delOrdenFr(index);
    }
  };

  const borrarOrdenEdit = (item) => {
    //setear el cancelar y luego enviar al servicio.
    let aux = ordenDigital;
    const auxArr = aux.map((e) => {
      if (e.id === item.id) {
        e.cancelar = true;
      }
      return e;
    });
    //mantengo array de canceladas
    setOrdenDigital(auxArr);
    asyncUpdEdicionIDB(5, "ordenDigital", auxArr);
    showToaster(
      {
        texto: "Orden eliminada correctamente",
        tipo: "success",
      },
      "centroArriba"
    )(toasterDispatch);
  };
  //-- fin cir orden labo

  //-- circ farmaco
  const dissmissFarmaco = () => {
    hideModal()(modalDispatch);
  };

  const agregarMedicamento = () => {
    showModal(
      <Medicamento
        setOpenFarmacos={setOpenFarmacos}
        indicacionFarmacologica={indicacionFarmacologica}
        setIndicacionFarmacologica={setIndicacionFarmacologica}
        dissmiss={dissmissFarmaco}
      />,
      "Indicaciones Farmacologicas",
      dissmissFarmaco,
      false,
      {},
      "centro",
      true
    )(modalDispatch);
  };

  const indicarMedicamento = (e) => {
    //Valido siempre primero el tipo de base y el medicamento a /agregar
    if (
      (vademecumState.vademecum.tipoVademecum === "kairos" &&
        e.id.includes("K")) ||
      (vademecumState.vademecum.tipoVademecum === "alfa" && e.id.includes("V"))
    ) {
      let buscarIguales = indicacionFarmacologica.filter(
        (item) => item.idProducto === e.idProducto
      );
      if (buscarIguales.length > 0 && buscarIguales[0].activo === "1") {
        showToaster(
          {
            texto:
              "El medicamento ya se encuentra indicado en la evolución actual",
            tipo: "danger",
          },
          "centroArriba"
        )(toasterDispatch);
      } else {
        let estaActivo = medicamentoState.medicamento.data.value.filter(
          (item) => item.id === e.id
        );
        if (estaActivo[0].activo === "0") {
          editarMedicamento(estaActivo[0], true);
        } else {
          let farmacosList = [];
          if (indicacionFarmacologica !== undefined) {
            // Elimino el que existe con activo === "0" y pongo el mismo con activo === "1"
            const filteredIndicaciones = indicacionFarmacologica.filter(
              (indicacion) => indicacion.id !== e.id
            );
            farmacosList = [...filteredIndicaciones];
          }
          e.activo = "1";
          e.medDescripcion =
            e.producto +
            " | " +
            e.dosis +
            " " +
            e.tipoDosisDescripcion +
            " Cada " +
            descCada(e.cadaNoHoras, e.cadaXHoras) +
            " | " +
            "Durante: " +
            descDurante(e.durante, e.tipoDurante);
          farmacosList.push(e);
          // Tengo que setearlo nuevamente en 0 porque se me modifica la lista
          // de medicamentos
          asyncUpdEdicionIDB(5, "indicacionFarmacologica", farmacosList);
          setIndicacionFarmacologica(farmacosList);
          showToaster(
            {
              texto: "Indicación generada correctamente",
              tipo: "success",
            },
            "centroArriba"
          )(toasterDispatch);
        }
      }
    } else if (
      (vademecumState.vademecum.tipoVademecum === "kairos" &&
        e.id.includes("V")) ||
      (vademecumState.vademecum.tipoVademecum === "alfa" && e.id.includes("K"))
    ) {
      showModal(
        <Mensaje
          textoNegrita={
            "Actualmente se encuentra trabajando en una base en la que no puede modificar la indicación seleccionada"
          }
          texto={"Realice una nueva indicación farmacológica en la base actual"}
        ></Mensaje>,
        "Indación Farmacológica",
        dismissAvisoBaseFarmaco,
        false,
        [
          {
            text: "Volver",
            clase: "btn-Mensaje bgc-danger rb16m c-white",
            accion: dismissAvisoBaseFarmaco,
          },
        ],
        "centro",
        false
      )(modalDispatch);
    }
  };

  const dismissAvisoBaseFarmaco = () => {
    hideModal()(modalDispatch);
  };

  const descCada = (noHoras, xHoras) => {
    if (noHoras !== "") {
      if (noHoras === "S") {
        return "Semanal";
      } else {
        return "Mensual";
      }
    } else if (xHoras !== "") {
      return xHoras + " hs";
    }
  };

  const descDurante = (durante, tDurante) => {
    if (durante === 0 && tDurante === "V") {
      return "Única Vez";
    } else if (tDurante === "P") {
      return "Permanente";
    } else if (tDurante === "D") {
      return durante + " Día/s";
    } else if (tDurante === "S") {
      return durante + " Semana/s";
    } else {
      return durante + " Mes/es";
    }
  };

  const borrarMedicamento = (e) => {
    if (typeof e.activo === "boolean" && e.nuevo === "0") {
      //elimino la edicion y regenero el item
      let arrFilter = indicacionFarmacologica.filter(
        (indicacion) => indicacion.producto === e.producto
      );
      if (arrFilter.length > 0) {
        let arrFinal = arrFilter.filter(
          (item) =>
            item.nuevo === "0" && item.activo === "0" && item.activoNoEditable
        );
        delete arrFinal[0].nuevo;
        arrFinal[0].activo = "1";

        let arrFaltantes = indicacionFarmacologica.filter(
          (indicacion) => indicacion.producto !== e.producto
        );

        arrFinal = arrFinal.concat(arrFaltantes);
        //carga indexDB
        asyncUpdEdicionIDB(5, "indicacionFarmacologica", arrFinal);
        setIndicacionFarmacologica(arrFinal);
      }
    } else {
      let buscarMedicamento = medicamentoState.medicamento.data.value.filter(
        (item) => item.id === e.id
      );
      if (buscarMedicamento.length > 0 && buscarMedicamento[0].activo === "1") {
        let farmacosList = [];
        if (indicacionFarmacologica !== undefined) {
          // Elimino el que existe con activo === "1" y pongo el mismo con activo === "0"
          let filteredIndicaciones = indicacionFarmacologica.filter(
            (indicacion) => indicacion.id !== e.id
          );
          farmacosList = [...filteredIndicaciones];
        }
        e.activo = "0";
        e.nuevo = "0";
        e.activoNoEditable = true;
        e.idMedicamentoModificado = parseInt(e.id.slice(2));
        //fix alfabeta ..checkkairos
        e.idMedicamentoModificado = parseInt(e.id.slice(2));
        farmacosList.push(e);
        //carga indexDB
        asyncUpdEdicionIDB(5, "indicacionFarmacologica", farmacosList);
        setIndicacionFarmacologica(farmacosList);
      } else {
        const filteredIndicaciones = indicacionFarmacologica.filter(
          (indicacion) => indicacion.id !== e.id
        );
        //cargaIndexDB
        asyncUpdEdicionIDB(5, "indicacionFarmacologica", filteredIndicaciones);
        setIndicacionFarmacologica(filteredIndicaciones);
      }
      showToaster(
        {
          texto: "Indicación eliminada correctamente",
          tipo: "success",
        },
        "centroArriba"
      )(toasterDispatch);
    }
  };

  const editarMedicamento = (e, edicion) => {
    showModal(
      <MedicamentoPaso3
        setOpenFarmacos={setOpenFarmacos}
        medicamentoSelected={e}
        indicacionFarmacologica={indicacionFarmacologica}
        setIndicacionFarmacologica={setIndicacionFarmacologica}
        dissmiss={dissmissFarmaco}
        editar={edicion}
      />,
      "Indicaciones Farmacologicas",
      dissmissFarmaco,
      false,
      {},
      "centro",
      true
    )(modalDispatch);
  };

  const onClickFarmacos = () => {
    if (openExmFisico || openSlider || openReceta) {
      showModal(
        <Mensaje
          textoNegrita={"Se encuentra trabajando en otro modulo"}
          texto={"Desea cancelar?"}
        ></Mensaje>,
        "Modulo en curso",
        dsmMsjCerrarFarmCirc,
        false,
        [
          {
            text: "Cancelar",
            clase: "btn-Mensaje bgc-danger rb16m c-white",
            accion: dsmMsjCerrarFarmCirc,
          },
          {
            text: "Continuar",
            clase: "btn-Mensaje b-latex30 rb16m c-latex30",
            accion: contMsjCerrarFarmCirc,
          },
        ],
        "centro",
        false
      )(modalDispatch);
    } else {
      setOpenFarmacos(!openFarmacos);
    }
  };

  const dissmissReceta = () => {
    setOpenReceta(false);
  };

  const dsmMsjCerrarFarmCirc = () => {
    hideModal()(modalDispatch);
  };
  const contMsjCerrarFarmCirc = () => {
    hideModal()(modalDispatch);
    setOpenExmFisico(false);
    setOpenSlider(false);
    setOpenReceta(false);
    setOpenFarmacos(true);
  };

  //--fin circ farmaco

  const hideReceta = () => {
    hideModal()(modalDispatch);
  };

  //seguimiento
  const dissmissS1 = () => {
    resetEventXIdSegCtx()(seguimientoDispatch);
    resetSegXIdPacCtx()(seguimientoDispatch);
    hideModal()(modalDispatch);
  };

  const clkSeguimiento = () => {
    showModal(
      <SeguimientoE1
        gralEdited={editedSeg}
        dissmiss={dissmissS1}
        setEditedSeg={setEditedSeg}
        editedSeg={editedSeg}
        pacName={camelize(pacienteState.paciente?.buscarPac?.value[0].nombre)}
      />,
      `Seguimientos de paciente: ${camelize(
        pacienteState.paciente?.buscarPac?.value[0].nombre
      )}`,
      dissmissS1,
      false,
      {},
      "centro",
      true
    )(modalDispatch);
  };

  const modalTutorialDictado = () => {
    showModal(
      <ModalDictado dissmiss={dissmissDictado} />,
      `¿Como utilizar el dictado por voz?`,
      dissmissEstPrev,
      false,
      {},
      "centro",
      true
    )(modalDispatch);
  };

  const onClickDictado = () => {
    if (!dictado) {
      setDictado(true);
      startListening();
    } else {
      setCambiosVoz(true);
      stopListening();
    }
  };

  const dissmissDictado = () => {
    hideModal()(modalDispatch);
  };

  const guardarStringTags = () => {
    let doc1 = document.querySelector(".ql-editor");
    doc1 = doc1.outerHTML.toString();
    doc1 = doc1.replaceAll('contenteditable="true"', "");
    doc1 = doc1.replaceAll('class="ql-editor"', "");
    doc1 = doc1.replaceAll('data-gramm="false"', "");
    doc1 = doc1.replaceAll("<div   >", "");
    doc1 = doc1.replaceAll("</div>", "");
    return doc1;
  };

  const onClickCambiosDictado = (guardar) => {
    if (guardar) {
      const editor = quillState?.current?.getEditor();
      if (textoDictado !== null) {
        // Crear un Delta para el nuevo texto
        let insertDelta = {};
        if (quillPointerIndex && quillPointerIndex > 0) {
          insertDelta = {
            ops: [
              { retain: quillPointerIndex },
              { insert: textoDictado },
              { retain: editor.getLength() - quillPointerIndex },
            ],
          };
        } else {
          insertDelta = {
            ops: [{ insert: textoDictado }],
          };
        }
        // Aplicar el Delta al editor
        editor.updateContents(insertDelta, "api");
        // Guardar el contenido en el localStorage
        localStorage.setItem(
          "editandoEvo",
          JSON.stringify({
            motivoConsulta: valueBuscador,
            evolucion: editor?.editor.delta.ops,
            evoHTML: guardarStringTags(),
          })
        );
        setTextoDictado(null);
      }
    } else {
      setTextInput(datosEdicion.evoHTML);
    }
    setDictado(false);
    setCambiosVoz(false);
  };

  const onClickPreImpresion = () => {
    // Abrir el slider de visualización previa
    setOpenSliderPreview(true);
    // Ejecutar la pre-impresión para obtener los datos
    onCLickGuardaEvo(true);
  };

  const dissmissPreImpresion = () => {
    resetPreImpresion()(evolucionDispatch);
    hideModal()(modalDispatch);
  };

  // Función para manejar el guardado desde el slider de visualización previa
  const handleGuardarDesdePreview = () => {
    // Cerrar el slider
    setOpenSliderPreview(false);
    // Ejecutar el guardado normal (con verificación de examen físico)
    onCLickGuardaEvo(false);
  };

  // Función para manejar el cierre del slider de visualización previa
  const handleCerrarPreview = () => {
    setOpenSliderPreview(false);
    setDatosPreviewEvolucion(null);
    resetPreImpresion()(evolucionDispatch);
  };

  useEffect(() => {
    if (evolucionState.evolucion.preImpresion !== null) {
      if (evolucionState.evolucion.preImpresion.value !== null) {
        // Actualizar los datos del slider de visualización previa
        setDatosPreviewEvolucion(evolucionState.evolucion.preImpresion.value);

        // Modal original comentado - por si se quiere volver a usar
        // showModal(
        //   <ModalPreImpresion
        //     dissmiss={dissmissPreImpresion}
        //     datos={evolucionState.evolucion.preImpresion.value}
        //   />,
        //   `Visualización Previa`,
        //   dissmissPreImpresion,
        //   false,
        //   {},
        //   "centro",
        //   true
        // )(modalDispatch);
      } else if (
        evolucionState.evolucion.preImpresion.value === null &&
        evolucionState.evolucion.preImpresion.error !== null
      ) {
        // Cerrar el slider si hay error
        setOpenSliderPreview(false);
        showToaster(
          {
            texto:
              evolucionState.evolucion.preImpresion.error.error.errorMessage,
            tipo: "danger",
          },
          "centroArriba"
        )(toasterDispatch);
      }
    }
  }, [evolucionState.evolucion.preImpresion]);

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
      {segundoModalState.segundoModal?.show && <SegundoModal />}
      {toasterState.toaster.show && <Toaster />}
      <Loading
        dataLoading={
          evolucionState?.evolucion?.loading ||
          ordenPracticaState?.ordenPractica?.loading ||
          laboratorioState?.laboratorio?.loading ||
          medicamentoState?.medicamento?.loading ||
          loadingMedicamentos ||
          loadingReceta ||
          loadingDeleteRcta ||
          loadingGral
          // snomedState?.snomed?.loading ||
          // vademecumState?.vademecum?.loading ||
        }
        color="c-white"
        descripcion={
          (evolucionState?.evolucion?.loading && "Cargando evolución...") ||
          (evolucionState?.evolucion?.loading &&
            grabarEvoLoading &&
            "Guardando evolución...") ||
          ((vademecumState?.vademecum?.loading ||
            medicamentoState?.medicamento?.loading) &&
            "Cargando medicamentos...") ||
          (ordenPracticaState?.ordenPractica?.loading &&
            "Cargando grupos de estudio...") ||
          (laboratorioState?.laboratorio?.loading &&
            "Cargando datos de laboratorio...") ||
          (loadingMedicamentos && "Cargando medicamentos...") ||
          (loadingReceta && "Generando receta...") ||
          (loadingDeleteRcta && "Anulando receta...") ||
          (loadingGral && "Cargando datos...")
        }
      />
      <HeaderbarHome />
      <NavTabBar refreshNavTab={() => refreshDataEvolucion()} />

      <ContainerBody
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{
          opacity: 1,
          filter: "blur(0px)",
          transition: { duration: 0.2 },
        }}
        exit={{
          opacity: 0,
          filter: "blur(10px)",
          transition: { duration: 0.2 },
        }}
      >
        {opcExamenFisico && (
          <ContainerExamenFisico
            initial={{ opacity: 0, x: +100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 0 }}
            transition={{ duration: 0.4 }}
            sliderOrden={openSlider}
          >
            <ExamenFisicoBtn
              className="bgc-primary c-white rb16m pointer ts_evolucion_exFisico-btn"
              onClick={onClickExamenFisico}
            >
              Exámen Fisico
            </ExamenFisicoBtn>
          </ContainerExamenFisico>
        )}
        <ContainerLeftColumn>
          <ContainerDatosPac>
            {pacienteState.paciente.buscarPac !== null ? (
              <DatosPacEvo
                datosPac={pacienteState.paciente?.buscarPac?.value[0]}
              />
            ) : (
              <IonSpinner name="lines-small" />
            )}
          </ContainerDatosPac>
          {opcEnfermedadesyAntecedentes === true ? (
            <EnfermedadesCmp
              agregarEnfItem={agregarEnfItem}
              loading={false}
              antecedentesEnf={enfermedadesAntecedentesLista}
              eliminarElemento={eliminarElementoAntecedente}
            />
          ) : (
            ""
          )}
          {opcEstudiosPrevios === true ? (
            <EstudioPrevCmp
              estudiosArr={estudiosArr}
              labosArr={labosArr}
              onClickEstPrev={onClickEstPrev}
            />
          ) : (
            ""
          )}
          <ContainerOrdenes>
            {opcOrdenesDigitales === true ? (
              <OrdenLaboCmp
                ordenDigital={ordenDigital}
                seleccionaOrdenLabo={seleccionaOrdenLabo}
                seleccionaOrdenPractica={abrirOrdenPractica}
                seleccionarTipoOrden={seleccionarTipoOrden}
                borrarOrden={borrarOrden}
                borrarOrdenEdit={borrarOrdenEdit}
                mensajeVerItems={mensajeVerMas}
              />
            ) : (
              ""
            )}
            {opcIndicacionFarmaco === true ? (
              <IndicaFarmacoCmp
                indicacionFarmacologica={indicacionFarmacologica}
                abrirSlider={onClickFarmacos}
                borrarMedicamento={borrarMedicamento}
                editarMedicamento={editarMedicamento}
                opcRecetaDigital={opcRecetasEvo === true}
              />
            ) : (
              ""
            )}
            {opcRecetasEvo === true ? (
              <RecetaDigitalBtn
                clickRecetaDigital={() => setOpenReceta(true)}
              />
            ) : (
              ""
            )}
          </ContainerOrdenes>
          {/* fix 22/8 */}
          <LeftContainerLine />
        </ContainerLeftColumn>
        <ContainerRightColumn>
          <SlidingComponent open={openExmFisico}>
            {openExmFisico && (
              <ExamenFisico
                setOpen={setOpenExmFisico}
                type={itemInfo.examenFisico}
                setExamenFisico={setExamenFisico}
              />
            )}
          </SlidingComponent>
          <SlidingReceta open={openReceta}>
            {openReceta && (
              <RecetaDigital
                cerrarSlider={dissmissReceta}
                datosPac={pacienteState.paciente?.buscarPac?.value[0]}
                setLoadingMedicamentos={setLoadingMedicamentos}
                setLoadingReceta={setLoadingReceta}
                setLoadingGral={setLoadingGral}
                setOpenReceta={setOpenReceta}
                setLoadingDeleteRcta={setLoadingDeleteRcta}
                recetaDigital={recetaDigital}
                setRecetaDigital={setRecetaDigital}
                empresaLogoUrl={empresaLogoUrl}
              />
            )}
          </SlidingReceta>
          <SlidingFarmacos open={openFarmacos}>
            {openFarmacos && (
              <Farmacos
                cerrarSlider={onClickFarmacos}
                agregarMedicamento={agregarMedicamento}
                listaMedicamentos={vademecumState.vademecum.data.value}
                indicacionFarmacologica={
                  indicacionFarmacologica !== null &&
                  indicacionFarmacologica.length > 0
                    ? indicacionFarmacologica
                    : []
                }
                indicarMedicamento={indicarMedicamento}
                editarMedicamento={editarMedicamento}
                borrarMedicamento={borrarMedicamento}
              />
            )}
          </SlidingFarmacos>
          <SliderEvoOrden
            openSlider={openSlider}
            setOpenSlider={setOpenSlider}
            detersOrdenPrac={
              ordenPracticaState.ordenPractica?.estudioGrupo?.value
            }
            openSelectorOrden={openSelectorOrden}
            setOpenSelectorOrden={setOpenSelectorOrden}
            openCirOrdenPrac={openCirOrdenPrac}
            setOpenCirOrdenPrac={setOpenCirOrdenPrac}
            seleccionaOrdenPractica={abrirOrdenPractica}
            datosPaso2Prac={datosPaso2Prac}
            setDatosPaso2Prac={setDatosPaso2Prac}
            ordenDigital={ordenDigital}
            setOrdenDigital={setOrdenDigital}
            itemEditar={editaOrdPrac.item ? editaOrdPrac.item : null}
            edicion={editaOrdPrac.modifica === "edita" ? true : false}
            setEditaOrdPrac={setEditaOrdPrac}
            editaOrdPrac={editaOrdPrac}
            seleccionaoOrdenLabo={abrirOrdenLabo}
            openCircOrdenLabo={openCircOrdenLabo}
            setOpenCirOrdenLabo={setOpenCirOrdenLabo}
            abrirOrdenLabo={abrirOrdenLabo}
            ordenItems={deterOrdenLabo}
            mensajeVerMas={mensajeVerMas}
            datosPac={pacienteState.paciente?.buscarPac?.value[0]}
            editaOrdenLabo={editaOrdenLabo}
            setEditaOrdenLabo={setEditaOrdenLabo}
            procesoOrdenPrac={procesoOrdenPrac}
            itemsOrdenHc={laboratorioState.laboratorio.itemsOrdenHc}
            itemsLabNom={laboratorioState.laboratorio.labNomenclador}
          />

          {/* Slider de Visualización Previa */}
          <SliderVisualizacionPrevia
            open={openSliderPreview}
            datosEvolucion={datosPreviewEvolucion}
            onGuardar={handleGuardarDesdePreview}
            onCerrar={handleCerrarPreview}
            loading={grabarEvoLoading}
          />

          <ContainerMotCons>
            <ContainerMotConsItems>
              <ContainerMotConsTitleBox>
                <div className="busqPaciente-avatar">
                  <ConsultaIcon color={"var(--color-latex30)"}></ConsultaIcon>
                </div>
                <div className="busqPaciente-title rb16b c-latex30">
                  {" "}
                  Motivo de consulta
                </div>
                <div
                  style={{ paddingTop: 2, paddingLeft: 7 }}
                  className="pointer"
                >
                  <TooltipV2
                    csBoxWidth={289}
                    csRadius={16}
                    children={<AskMarkLitIcon color={"var(--color-latex30)"} />}
                    detalle={
                      <p
                        className="rb12tl"
                        style={{ textAlign: "left", padding: 5 }}
                      >
                        Indicar cual es el motivo de la consulta según lo indica
                        el paciente
                      </p>
                    }
                  />
                </div>
              </ContainerMotConsTitleBox>
              <ContainerMotConsDropBox className="ts_evolucion_motCons-input">
                <InputV1
                  inputType="text"
                  name="txtMotConsPac"
                  placeholderText="Adenoitis..."
                  errorStr="Ingrese al menos 3 caracteres."
                  onChange={onChangeMotCons}
                  onKeyPress={preventKeyOnlyTextandLetters}
                  maxLength="50"
                  className="rb16m"
                  isRequired={true}
                  value={valueBuscador}
                />
              </ContainerMotConsDropBox>
            </ContainerMotConsItems>
          </ContainerMotCons>
          <ContainerEvolucion>
            <ContainerEvolucionItems>
              <ContainerEvolucionTitleBox>
                <div className="busqPaciente-avatar">
                  <LaboratorioIcon color={"var(--color-latex30)"} />
                </div>
                <div className="busqPaciente-title rb16b c-latex30">
                  {" "}
                  Evolución
                </div>
                <div
                  style={{ paddingTop: 7, paddingLeft: 7 }}
                  className="pointer"
                >
                  {" "}
                  <AskMarkLitIcon color={"var(--color-latex30)"} />
                </div>
                <ContainerBtnPreImpresionBox>
                  {cambiosVoz ? (
                    <>
                      <BtnDictado
                        onClick={() => onClickCambiosDictado(true)}
                        className="c-white bgc-broccoli pointer"
                      >
                        <TildeIcon color={"white"} />
                        <span>Guardar</span>
                      </BtnDictado>
                      <BtnDictado
                        onClick={() => onClickCambiosDictado(false)}
                        className="c-white bgc-danger pointer"
                      >
                        <CruzCloseBurguer size={"14"} />
                        <span>Cancelar</span>
                      </BtnDictado>
                    </>
                  ) : dictado && !cambiosVoz ? (
                    <BtnDictado
                      onClick={onClickDictado}
                      className="c-white bgc-danger pointer"
                    >
                      <StopIcon />
                      <span>Parar</span>
                    </BtnDictado>
                  ) : (
                    opcDictadoVoz && (
                      <BtnDictado
                        onClick={onClickDictado}
                        className="c-white bgc-latex30 pointer"
                      >
                        <PlayIcon />
                        <span>Dictado</span>
                      </BtnDictado>
                    )
                  )}
                  {dictado && !cambiosVoz && (
                    <RECButton>
                      <div className="blinking-circle">
                        <div className="blinking-border"></div>
                      </div>
                    </RECButton>
                  )}
                  {opcDictadoVoz && (
                    <DictadoTutorialBox
                      onClick={modalTutorialDictado}
                      className={"pointer"}
                    >
                      <AskMarkLitIcon color={"var(--color-latex30)"} />
                    </DictadoTutorialBox>
                  )}

                  <BtnPreImpresion
                    onClick={onClickPreImpresion}
                    className="pointer c-white bgc-latex30"
                  >
                    <LupaIcon />
                    <span>Visualización Previa</span>
                  </BtnPreImpresion>
                </ContainerBtnPreImpresionBox>
              </ContainerEvolucionTitleBox>
              <ContainerEvolucionDropBox className="ts_evolucion_editor">
                <Quill
                  editorName={"editor1"}
                  heightCustom={400}
                  startText={
                    datosEdicion &&
                    datosEdicion.evolucion !== "" &&
                    datosEdicion.evolucion !== null &&
                    datosEdicion.evolucion !== undefined
                      ? startText(datosEdicion.evolucion)
                      : ""
                  }
                  updateText={updateTxtQuill}
                  valueBuscador={valueBuscador}
                  setContadorCarac={setContadorCarac}
                  contadorCarac={contadorCarac}
                  contadorLimite={editorCaracLimit}
                  setQuillState={setQuillState}
                  setTextInput={setTextInput}
                  dictado={dictado}
                  setQuillPointerIndex={setQuillPointerIndex}
                  quillPointerIndex={quillPointerIndex}
                />
                <div
                  style={{
                    display: dictado ? "block" : "none",
                    width: "100%",
                    height: window.innerWidth <= 1366 ? "242px" : "436px",
                    padding: "10px 10px",
                    border: "1px solid #ccc",
                    transition: "border-color 0.3s ease",
                    resize: "none",
                    color: "#333",
                    fontSize: "13px",
                  }}
                  className="evolucion_editor"
                  dangerouslySetInnerHTML={{ __html: textInput }}
                ></div>
              </ContainerEvolucionDropBox>
              <ContainerContadorCarac>
                <BarContainer>
                  <ProgressBar
                    progress={(contadorCarac / editorCaracLimit) * 100}
                    editorCaracLimit={editorCaracLimit}
                  ></ProgressBar>
                </BarContainer>
              </ContainerContadorCarac>
            </ContainerEvolucionItems>
          </ContainerEvolucion>

          {opcSnomed === true ? (
            <DiagSnomed
              onChangeDiagPres={onChangeDiagPres}
              diagPresArr={diagPresArr}
              setDiagPresArr={setDiagPresArr}
              removeDeterAdc={removeDiagPres}
              diagLista={
                diagnosticoState.diagnostico.data !== null
                  ? diagnosticoState.diagnostico.data.value
                  : []
              }
              flgDiagFBack={flgDiagFBack}
              setFlgDiagFBack={setFlgDiagFBack}
              addNewItem={newItemDiagPres}
              enfermedadesAntecedentesLista={enfermedadesAntecedentesLista}
              setEnfermedadesAntecedentesLista={
                setEnfermedadesAntecedentesLista
              }
              flgEnfYAntcBack={flgEnfYAntcBack}
              showDiagnosticos={showDiagnosticos}
              setFlgEnfYAntcBack={setFlgEnfYAntcBack}
            />
          ) : (
            ""
          )}
          <ContainerEvoBtn>
            <ButtonEvActSave
              onClick={onClickPreImpresion}
              disabled={grabarEvoLoading || evolucionState.evolucion.loading}
              className="pointer rb18l c-white ts_evolucion_save-btn"
            >
              {grabarEvoLoading || evolucionState.evolucion.loading ? (
                <IonSpinner name="lines-small" />
              ) : (
                "Guardar Evolución"
              )}
            </ButtonEvActSave>
            {opcSeguimiento ? (
              <ContainerSegBtn className="pointer" onClick={clkSeguimiento}>
                {editedSeg.length > 0 ? (
                  <ContainerCircleSeg className="rb16l">
                    {editedSeg.length}
                  </ContainerCircleSeg>
                ) : (
                  ""
                )}
                <ButtonNuevoSeg className="pointer rb18l c-primary ts_evolucion_save-btn">
                  Seguimientos
                </ButtonNuevoSeg>
              </ContainerSegBtn>
            ) : (
              ""
            )}

            <ButtonEvActCancelar
              onClick={onClickCancelarEvo}
              className="pointer rb18l c-white ts_evolucion_cancel-btn"
            >
              Cancelar
            </ButtonEvActCancelar>
          </ContainerEvoBtn>
        </ContainerRightColumn>
      </ContainerBody>
    </>
  );
};

export default Evolucion;
