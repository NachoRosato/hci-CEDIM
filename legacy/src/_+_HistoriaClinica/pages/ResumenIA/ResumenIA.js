import { useContext, useEffect, useState, useRef } from "react";
import { useHistory } from "react-router";
import ReactMarkdown from "react-markdown";
import { GlobalContext } from "../../../global/context/Provider";
import { HistoriaClinicaContext } from "_+_HistoriaClinica/context/Provider";
import HeaderbarHome from "../../../global/components/genericos/HeaderbarHome/HeaderbarHome";
import Loading from "global/components/genericos/Loading/Loading";
import Toaster from "global/components/genericos/Toaster/Toaster";
import { showToaster } from "global/context/action/toaster/toaster";
import NavTabBar from "_+_HistoriaClinica/components/NavTabBar/NavTabBar";
import TooltipV2 from "global/components/genericos/TooltipV2/TooltipV2";
import AskMarkLitIcon from "global/assets/generico/AskMarkLitIcon";
import {
  wsGetResumenIA,
  resetResumenIA,
} from "_+_HistoriaClinica/context/action/resumenIA/resumenIA";
import {
  ContainerBody,
  ContainerResumen,
  ContainerResumenTitle,
  ContainerResumenContent,
  ContainerResumenEmpty,
  ContainerResumenError,
  ResponsiveStyles,
} from "./localStyle";

const ResumenIA = () => {
  const { toasterState, toasterDispatch } = useContext(GlobalContext);

  const { pacienteState, resumenIAState, resumenIADispatch } = useContext(
    HistoriaClinicaContext
  );

  const history = useHistory();
  const [idPaciente, setIdPaciente] = useState(null);
  const resumenContentRef = useRef(null);

  // Función para prevenir la copia del contenido
  const preventCopy = (e) => {
    e.preventDefault();
    showToaster(
      {
        texto: "La copia del contenido no está permitida",
        tipo: "warning",
      },
      "centroArriba"
    )(toasterDispatch);
    return false;
  };

  // Función para prevenir clic derecho
  const preventContextMenu = (e) => {
    e.preventDefault();
    showToaster(
      {
        texto: "El menú contextual está deshabilitado",
        tipo: "warning",
      },
      "centroArriba"
    )(toasterDispatch);
    return false;
  };

  // Función para prevenir atajos de teclado de copia
  const preventKeyboardShortcuts = (e) => {
    // Prevenir Ctrl+C, Ctrl+X, Ctrl+A, Ctrl+V, Ctrl+Z, Ctrl+Y
    if (
      (e.ctrlKey || e.metaKey) &&
      (e.key === "c" ||
        e.key === "C" ||
        e.key === "x" ||
        e.key === "X" ||
        e.key === "a" ||
        e.key === "A" ||
        e.key === "v" ||
        e.key === "V" ||
        e.key === "z" ||
        e.key === "Z" ||
        e.key === "y" ||
        e.key === "Y")
    ) {
      e.preventDefault();
      showToaster(
        {
          texto: "Los atajos de teclado están deshabilitados",
          tipo: "warning",
        },
        "centroArriba"
      )(toasterDispatch);
      return false;
    }

    // Prevenir F12 (herramientas de desarrollador)
    if (e.key === "F12") {
      e.preventDefault();
      showToaster(
        {
          texto: "Las herramientas de desarrollador están deshabilitadas",
          tipo: "warning",
        },
        "centroArriba"
      )(toasterDispatch);
      return false;
    }

    // Prevenir Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
    if (
      (e.ctrlKey || e.metaKey) &&
      e.shiftKey &&
      (e.key === "i" ||
        e.key === "I" ||
        e.key === "j" ||
        e.key === "J" ||
        e.key === "c" ||
        e.key === "C")
    ) {
      e.preventDefault();
      showToaster(
        {
          texto: "Las herramientas de desarrollador están deshabilitadas",
          tipo: "warning",
        },
        "centroArriba"
      )(toasterDispatch);
      return false;
    }

    // Prevenir Ctrl+U (ver código fuente)
    if ((e.ctrlKey || e.metaKey) && (e.key === "u" || e.key === "U")) {
      e.preventDefault();
      showToaster(
        {
          texto: "Ver código fuente no está permitido",
          tipo: "warning",
        },
        "centroArriba"
      )(toasterDispatch);
      return false;
    }

    // Prevenir Ctrl+Shift+U
    if (
      (e.ctrlKey || e.metaKey) &&
      e.shiftKey &&
      (e.key === "u" || e.key === "U")
    ) {
      e.preventDefault();
      showToaster(
        {
          texto: "Ver código fuente no está permitido",
          tipo: "warning",
        },
        "centroArriba"
      )(toasterDispatch);
      return false;
    }
  };

  // Función para prevenir arrastrar texto
  const preventDrag = (e) => {
    e.preventDefault();
    return false;
  };

  // Función para prevenir selección de texto
  const preventSelection = (e) => {
    e.preventDefault();
    return false;
  };

  useEffect(() => {
    // Verificar si hay un paciente seleccionado
    if (
      pacienteState.paciente.buscarPac &&
      pacienteState.paciente.buscarPac.value &&
      pacienteState.paciente.buscarPac.value.length > 0
    ) {
      const paciente = pacienteState.paciente.buscarPac.value[0];
      setIdPaciente(paciente.id);

      // Llamar al endpoint para obtener el resumen IA
      wsGetResumenIA(paciente.id)(resumenIADispatch);
    } else {
      // Si no hay paciente seleccionado, redirigir a buscar paciente
      history.push("/buscarpaciente");
    }
  }, []);

  useEffect(() => {
    // Manejar errores del resumen IA
    if (
      resumenIAState.resumenIA.error &&
      resumenIAState.resumenIA.error !== null
    ) {
      showToaster(
        {
          texto:
            resumenIAState.resumenIA.error.error?.errorMessage ||
            "Error al cargar el resumen IA",
          tipo: "danger",
        },
        "centroArriba"
      )(toasterDispatch);
    }
  }, [resumenIAState.resumenIA.error]);

  // Efecto para agregar eventos de protección cuando el contenido se carga
  useEffect(() => {
    if (resumenContentRef.current) {
      const contentElement = resumenContentRef.current;

      // Agregar eventos de protección
      contentElement.addEventListener("copy", preventCopy);
      contentElement.addEventListener("cut", preventCopy);
      contentElement.addEventListener("contextmenu", preventContextMenu);
      contentElement.addEventListener("keydown", preventKeyboardShortcuts);
      contentElement.addEventListener("dragstart", preventDrag);
      contentElement.addEventListener("selectstart", preventSelection);
      contentElement.addEventListener("mousedown", preventSelection);

      // Protección adicional para el documento completo
      const handleDocumentKeyDown = (e) => {
        // Solo aplicar protección cuando el foco está en el contenido del resumen
        if (contentElement.contains(document.activeElement)) {
          preventKeyboardShortcuts(e);
        }
      };

      // Protección adicional a nivel de documento
      const handleDocumentCopy = (e) => {
        // Verificar si el contenido copiado proviene del resumen
        const selection = window.getSelection();
        if (selection && contentElement.contains(selection.anchorNode)) {
          preventCopy(e);
        }
      };

      const handleDocumentContextMenu = (e) => {
        // Verificar si el clic derecho es dentro del resumen
        if (contentElement.contains(e.target)) {
          preventContextMenu(e);
        }
      };

      // Protección contra Print Screen
      const handleKeyDown = (e) => {
        // Prevenir Print Screen
        if (e.key === "PrintScreen" || e.keyCode === 44) {
          e.preventDefault();
          showToaster(
            {
              texto: "La captura de pantalla no está permitida",
              tipo: "warning",
            },
            "centroArriba"
          )(toasterDispatch);
          return false;
        }
      };

      document.addEventListener("keydown", handleDocumentKeyDown);
      document.addEventListener("copy", handleDocumentCopy);
      document.addEventListener("contextmenu", handleDocumentContextMenu);
      document.addEventListener("keydown", handleKeyDown);

      // Cleanup function
      return () => {
        contentElement.removeEventListener("copy", preventCopy);
        contentElement.removeEventListener("cut", preventCopy);
        contentElement.removeEventListener("contextmenu", preventContextMenu);
        contentElement.removeEventListener("keydown", preventKeyboardShortcuts);
        contentElement.removeEventListener("dragstart", preventDrag);
        contentElement.removeEventListener("selectstart", preventSelection);
        contentElement.removeEventListener("mousedown", preventSelection);
        document.removeEventListener("keydown", handleDocumentKeyDown);
        document.removeEventListener("copy", handleDocumentCopy);
        document.removeEventListener("contextmenu", handleDocumentContextMenu);
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [resumenIAState.resumenIA.data]);

  const handleVolver = () => {
    resetResumenIA()(resumenIADispatch);
    history.push("/evolucion");
  };

  const refreshSeg = () => {
    // Función para refrescar el NavTabBar si es necesario
  };

  //funcion para limpiar datos paciente. Pedido Ivan 15/08/2025
  const cleanPatientInfo = (text) => {
    if (!text) return "";

    // Expresión regular que busca desde IDENTIFICACIÓN DEL PACIENTE hasta ALERTAS CLÍNICAS IMPORTANTES
    const regex =
      /IDENTIFICACIÓN DEL PACIENTE:[\s\S]*?ALERTAS CLÍNICAS IMPORTANTES:/g;

    // Reemplaza ese bloque por "ALERTAS CLÍNICAS IMPORTANTES:" (lo conserva para no romper el resto del texto)
    return text.replace(regex, "ALERTAS CLÍNICAS IMPORTANTES:");
  };

  const renderContent = () => {
    if (resumenIAState.resumenIA.loading) {
      return (
        <ContainerResumenEmpty>
          <span className="rb16m c-latex30">Cargando resumen IA...</span>
        </ContainerResumenEmpty>
      );
    }

    if (resumenIAState.resumenIA.error) {
      return (
        <ContainerResumenError>
          <span className="rb16m c-latex30">
            Error al cargar el resumen IA. Intente nuevamente.
          </span>
        </ContainerResumenError>
      );
    }

    if (
      !resumenIAState.resumenIA.data ||
      !resumenIAState.resumenIA.data.value
    ) {
      return (
        <ContainerResumenEmpty>
          <span className="rb16m c-latex30">
            No se encontró información del resumen IA para este paciente.
          </span>
        </ContainerResumenEmpty>
      );
    }

    const resumenData = resumenIAState.resumenIA.data.value;

    return (
      <ContainerResumenContent ref={resumenContentRef}>
        <div className="resumen-content">
          {resumenData.summary_content && (
            <div className="resumen-section mb-4">
              <h4 className="rb16b c-latex30 mb-2">Resumen General</h4>
              <div className="markdown-content">
                <ReactMarkdown>
                  {cleanPatientInfo(resumenData.summary_content)}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </ContainerResumenContent>
    );
  };

  return (
    <>
      {toasterState.toaster.show && <Toaster />}
      <Loading
        dataLoading={resumenIAState.resumenIA.loading}
        color="c-white"
        descripcion="Cargando resumen IA..."
      />
      <HeaderbarHome />
      <NavTabBar refreshNavTab={() => refreshSeg(false)} />
      <ContainerBody
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <ContainerResumen>
          <ContainerResumenTitle>
            <span className="resumen-title rb24b c-white">
              Resumen IA del Paciente
            </span>
            {resumenIAState.resumenIA.data?.value?.created_at && (
              <div className="resumen-date-container">
                <span className="resumen-date rb14m c-white">
                  Generado el día:{" "}
                  {new Date(
                    resumenIAState.resumenIA.data.value.created_at
                  ).toLocaleDateString("es-ES")}
                </span>
                <span className="resumen-separator rb14m c-white">|</span>
                <div className="resumen-info-icon">
                  <TooltipV2
                    csBoxWidth={300}
                    csRadius={16}
                    children={<AskMarkLitIcon color={"white"} />}
                    detalle={
                      <p
                        className="rb12tl"
                        style={{ textAlign: "left", padding: 5 }}
                      >
                        El resumen fue generado la noche anterior al primer
                        turno del paciente.
                      </p>
                    }
                  />
                </div>
              </div>
            )}
          </ContainerResumenTitle>

          {renderContent()}
        </ContainerResumen>
      </ContainerBody>
      <ResponsiveStyles />
    </>
  );
};

export default ResumenIA;
