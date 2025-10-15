import React, { useState, useContext, useEffect } from "react";
import {
  hideSegundoModal,
  showSegundoModal,
} from "global/context/action/segundoModal/segundoModal";
import { GlobalContext } from "global/context/Provider";
import { wsDeleteRecetaDig } from "_+_HistoriaClinica/context/action/recetaDigital/recetaDigital";
import { HistoriaClinicaContext } from "_+_HistoriaClinica/context/Provider";
import { showToaster } from "global/context/action/toaster/toaster";
import Mensaje from "global/components/genericos/Mensaje/Mensaje";
import ViewIcon from "global/assets/generico/ViewIcon";
import TrashIcon from "global/assets/generico/TrashIcon";
import {
  RecetaPDFContainer,
  RecetaItem,
  RecetaHeader,
  RecetaTitle,
  RecetaMedicamentos,
  RecetaActions,
  BtnVerPDF,
  BtnAnular,
  BtnContainer,
  BtnConfirmar,
  EmptyState,
  PDFContainer,
  PDFIframe,
  ExpandButton,
  RecetaContent,
  RecetaBadge,
  RecetaInfo,
  RecetaGrid,
  RecetaCard,
  RecetaCardHeader,
  RecetaCardBody,
  RecetaCardActions,
  RecetaStatus,
  RecetaDate,
  RecetaMedicamentosList,
  RecetaMedicamentoItem,
  RecetaMedicamentoName,
  RecetaMedicamentoDetails,
  RecetaMedicamentoDosage,
  RecetaMedicamentoDiagnosis,
  RecetaMedicamentoObservations,
  RecetaInfoGeneral,
  PDFViewerContainer,
  PDFViewerHeader,
  PDFViewerTitle,
  PDFViewerClose,
  PDFViewerContent,
  BtnVerInformacion,
  RecetaInfoCollapsible,
} from "./localstyle";

/**
 * Componente RecetaPDF
 *
 * @param {Function} dissmiss - Función para cerrar el modal
 * @param {Object} dataReceta - Datos de la receta individual
 * @param {string} pdf - URL del PDF de la receta
 * @param {Function} obtenerRecetas - Función para refrescar las recetas
 * @param {Function} setLoadingDeleteRcta - Función para manejar el estado de carga
 * @param {Function} updateArrRecetas - Función para actualizar el array de recetas
 * @param {Array} recetas - Array de recetas para mostrar múltiples recetas
 * @param {boolean} isCreationContext - Indica si estamos en contexto de creación (true) o visualización (false)
 *
 * Nota: Cuando isCreationContext es true, se asume que el usuario actual es el creador de la receta
 * y puede anularla sin necesidad de validar el idMedico. Cuando es false, se valida que el
 * idMedico del usuario coincida con el idMedico de la receta.
 */
const RecetaPDF = ({
  dissmiss,
  dataReceta,
  pdf,
  obtenerRecetas,
  setLoadingDeleteRcta,
  updateArrRecetas,
  recetas, // Nuevo prop para manejar múltiples recetas
  isCreationContext = false, // Nuevo prop para indicar si estamos en contexto de creación
}) => {
  const { segundoModalDispatch, toasterDispatch, authState } =
    useContext(GlobalContext);
  const { recetaDigitalDispatch } = useContext(HistoriaClinicaContext);
  const [expandedPDF, setExpandedPDF] = useState(null);
  const [selectedReceta, setSelectedReceta] = useState(null);
  const [expandedInfo, setExpandedInfo] = useState({});
  const [localRecetas, setLocalRecetas] = useState([]);
  const [errorShown, setErrorShown] = useState(false); // Estado para evitar múltiples mensajes de error

  // Determinar si es una sola receta o múltiples
  const isMultipleRecetas = Array.isArray(recetas) && recetas.length > 1;

  // Inicializar las recetas locales
  useEffect(() => {
    const initialRecetas = isMultipleRecetas ? recetas : [dataReceta];
    setLocalRecetas(initialRecetas);
    // Resetear el estado de error cuando cambien las recetas
    setErrorShown(false);
  }, [recetas, dataReceta, isMultipleRecetas]);

  const recetasToShow = localRecetas;

  // Función para obtener el idMedico del usuario logueado de forma segura
  const getCurrentUserMedicoId = () => {
    try {
      return authState?.auth?.data?.value?.idMedico;
    } catch (error) {
      console.error("Error al obtener idMedico del usuario:", error);
      return null;
    }
  };

  // Función para obtener el idMedico de la receta de forma segura
  const getRecetaMedicoId = (receta) => {
    try {
      // Buscar el campo idMedico en diferentes posibles nombres
      const possibleFields = [
        "idMedico",
        "idmedico",
        "id_medico",
        "medicoId",
        "medico_id",
        "idMedicO",
        "idmedicO",
      ];

      for (const field of possibleFields) {
        if (receta && receta[field] !== undefined && receta[field] !== null) {
          return receta[field];
        }
      }

      return null;
    } catch (error) {
      console.error("Error al obtener idMedico de la receta:", error);
      return null;
    }
  };

  // Función para obtener el ID único de la receta de forma segura
  const getRecetaUniqueId = (receta) => {
    try {
      // Priorizar idRcta (formato de creación), luego idexterno (formato de visualización)
      return receta.idRcta || receta.idexterno || receta.id || null;
    } catch (error) {
      console.error("Error al obtener ID único de la receta:", error);
      return null;
    }
  };

  // Función para obtener el link del PDF de forma segura
  const getRecetaPdfLink = (receta) => {
    try {
      // Priorizar linkPdf (formato de creación), luego linkpdf (formato de visualización)
      return receta.linkPdf || receta.linkpdf || null;
    } catch (error) {
      console.error("Error al obtener link del PDF:", error);
      return null;
    }
  };

  // Función para obtener los medicamentos de forma segura
  const getRecetaMedicamentos = (receta) => {
    try {
      return receta.medicamentos || [];
    } catch (error) {
      console.error("Error al obtener medicamentos:", error);
      return [];
    }
  };

  // Función para obtener la fecha de creación de forma segura
  const getRecetaFechaCreacion = (receta) => {
    try {
      // Priorizar fechaCreacion (formato de creación), luego fechaaalta (formato de visualización)
      return receta.fechaCreacion || receta.fechaalta || new Date();
    } catch (error) {
      console.error("Error al obtener fecha de creación:", error);
      return new Date();
    }
  };

  // Función para verificar si el usuario actual puede anular la receta
  const canUserAnularReceta = (receta) => {
    // Si estamos en contexto de creación, el usuario actual puede anular la receta
    if (isCreationContext) {
      return true;
    }

    const currentUserMedicoId = getCurrentUserMedicoId();
    const recetaMedicoId = getRecetaMedicoId(receta);

    // Validaciones de seguridad
    if (!currentUserMedicoId) {
      if (!errorShown) {
        showToaster(
          {
            texto:
              "Error: No se pudo obtener la información del usuario logueado.",
            tipo: "danger",
          },
          "centroArriba"
        )(toasterDispatch);
        setErrorShown(true);
      }
      return false;
    }

    if (!recetaMedicoId) {
      if (!errorShown) {
        showToaster(
          {
            texto:
              "Error: No se pudo obtener la información del médico que creó la receta.",
            tipo: "danger",
          },
          "centroArriba"
        )(toasterDispatch);
        setErrorShown(true);
      }
      return false;
    }

    // Comparar los IDs
    return currentUserMedicoId === recetaMedicoId;
  };

  const handleVerPDF = (receta) => {
    // Usar el ID correcto según el contexto para el estado expandedPDF
    let uniqueId;
    if (isCreationContext) {
      uniqueId = receta.idRcta;
    } else {
      uniqueId = receta.idexterno || receta.id;
    }

    if (expandedPDF === uniqueId) {
      setExpandedPDF(null);
      setSelectedReceta(null);
    } else {
      setExpandedPDF(uniqueId);
      setSelectedReceta(receta);
    }
  };

  const handleOpenPDFNewTab = (receta) => {
    const pdfLink = getRecetaPdfLink(receta);
    if (pdfLink) {
      window.open(pdfLink, "_blank");
    } else {
      showToaster(
        {
          texto: "No se encontró el enlace del PDF.",
          tipo: "danger",
        },
        "centroArriba"
      )(toasterDispatch);
    }
  };

  const handleVerInformacion = (recetaId) => {
    setExpandedInfo((prev) => ({
      ...prev,
      [recetaId]: !prev[recetaId],
    }));
  };

  const confirmacionAnular = (receta) => {
    // Verificar si el usuario puede anular la receta
    if (!canUserAnularReceta(receta)) {
      if (!errorShown) {
        showToaster(
          {
            texto: "Solo el médico que creó la receta puede anularla.",
            tipo: "danger",
          },
          "centroArriba"
        )(toasterDispatch);
        setErrorShown(true);
      }
      return;
    }

    const uniqueId = getRecetaUniqueId(receta);
    showSegundoModal(
      <Mensaje
        textoNegrita={`¿Desea anular la receta #${
          receta.numeroReceta || uniqueId || 1
        }?`}
      />,
      "Atención",
      dissmissSeg,
      false,
      [
        {
          text: "Cerrar",
          clase: "btn-Mensaje b-latex30 rb16m c-latex30",
          accion: dissmissSeg,
        },
        {
          text: "Anular receta",
          clase: "btn-Mensaje bgc-danger rb16m c-white",
          accion: () => anularReceta(receta),
        },
      ],
      "centro",
      false
    )(segundoModalDispatch);
  };

  const dissmissSeg = () => {
    hideSegundoModal()(segundoModalDispatch);
  };

  const anularReceta = (receta) => {
    // Verificación adicional antes de anular
    if (!canUserAnularReceta(receta)) {
      if (!errorShown) {
        showToaster(
          {
            texto: "No tiene permisos para anular esta receta.",
            tipo: "danger",
          },
          "centroArriba"
        )(toasterDispatch);
        setErrorShown(true);
      }
      return;
    }

    setLoadingDeleteRcta(true);

    // Determinar los IDs según el contexto
    let uniqueId, recetaId;

    if (isCreationContext) {
      // Contexto de creación (desde Evolución): usar idRcta como uniqueId e id como recetaId
      uniqueId = receta.idRcta;
      recetaId = receta.id;
    } else {
      // Contexto de visualización (desde RecetasPaciente): usar idexterno como uniqueId e id como recetaId
      uniqueId = receta.idexterno;
      recetaId = receta.id;
    }

    // Validar que tengamos los IDs necesarios
    if (!uniqueId || !recetaId) {
      showToaster(
        {
          texto:
            "Error: No se pudieron obtener los identificadores de la receta.",
          tipo: "danger",
        },
        "centroArriba"
      )(toasterDispatch);
      setLoadingDeleteRcta(false);
      return;
    }

    wsDeleteRecetaDig(uniqueId, recetaId, (isCorrect, idReceta) =>
      nextStep(isCorrect, idReceta, receta)
    )(recetaDigitalDispatch);
  };

  const nextStep = (isCorrect, idReceta, receta) => {
    dissmissSeg();
    if (isCorrect) {
      const uniqueId = getRecetaUniqueId(receta);
      showToaster(
        {
          texto: `Receta #${
            receta.numeroReceta || uniqueId || 1
          } anulada correctamente.`,
          tipo: "success",
        },
        "centroArriba"
      )(toasterDispatch);

      // Actualizar el estado global
      updateArrRecetas(idReceta);
      obtenerRecetas();

      // Remover la receta de la vista actual usando el ID correcto según el contexto
      let recetaIdToRemove;
      if (isCreationContext) {
        // En contexto de creación, usar idRcta para filtrar
        recetaIdToRemove = receta.idRcta;
        const updatedRecetas = localRecetas.filter(
          (r) => r.idRcta !== recetaIdToRemove
        );

        // Si no quedan recetas para mostrar, cerrar el modal
        if (updatedRecetas.length === 0) {
          dissmiss();
        } else {
          // Actualizar el estado local para remover la receta anulada
          setLocalRecetas(updatedRecetas);
        }
      } else {
        // En contexto de visualización, usar idexterno para filtrar
        recetaIdToRemove = receta.idexterno;
        const updatedRecetas = localRecetas.filter(
          (r) => r.idexterno !== recetaIdToRemove
        );

        // Si no quedan recetas para mostrar, cerrar el modal
        if (updatedRecetas.length === 0) {
          dissmiss();
        } else {
          // Actualizar el estado local para remover la receta anulada
          setLocalRecetas(updatedRecetas);
        }
      }
    } else {
      showToaster(
        {
          texto: "Error al anular la receta.",
          tipo: "danger",
        },
        "centroArriba"
      )(toasterDispatch);
    }
    setLoadingDeleteRcta(false);
  };

  const getMedicamentosResumen = (receta) => {
    const medicamentos = getRecetaMedicamentos(receta);
    if (!medicamentos || medicamentos.length === 0) return "Sin medicamentos";

    const nombres = medicamentos.map(
      (med) => med.nombreProducto || med.nombreDroga
    );
    if (nombres.length <= 2) {
      return nombres.join(", ");
    }
    return `${nombres.slice(0, 2).join(", ")} y ${medicamentos.length - 2} más`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!recetasToShow || recetasToShow.length === 0) {
    return (
      <RecetaPDFContainer>
        <EmptyState>
          <p>No hay recetas para mostrar</p>
        </EmptyState>
      </RecetaPDFContainer>
    );
  }

  return (
    <RecetaPDFContainer>
      <RecetaGrid>
        {recetasToShow.map((receta, index) => {
          // Usar el ID correcto según el contexto para las keys y estados
          let uniqueId;
          if (isCreationContext) {
            uniqueId = receta.idRcta;
          } else {
            uniqueId = receta.idexterno || receta.id;
          }

          return (
            <RecetaCard key={uniqueId || index}>
              <RecetaCardHeader>
                <RecetaTitle>
                  <RecetaBadge>#{receta.numeroReceta || index + 1}</RecetaBadge>
                  Receta Digital
                </RecetaTitle>
                <RecetaStatus>
                  <BtnVerInformacion
                    onClick={() => handleVerInformacion(uniqueId || index)}
                    className={`bgc-latex30 c-white rb14m ${
                      expandedInfo[uniqueId || index] ? "expanded" : ""
                    }`}
                  >
                    {expandedInfo[uniqueId || index]
                      ? "Ocultar Información"
                      : "Ver Información"}
                  </BtnVerInformacion>
                </RecetaStatus>
              </RecetaCardHeader>

              <RecetaCardBody>
                <RecetaInfo>
                  <RecetaDate>
                    {formatDate(getRecetaFechaCreacion(receta))}
                  </RecetaDate>

                  {expandedInfo[uniqueId || index] && (
                    <RecetaInfoCollapsible>
                      <RecetaMedicamentosList>
                        <strong>
                          Medicamentos ({getRecetaMedicamentos(receta).length}):
                        </strong>
                        {getRecetaMedicamentos(receta).length > 0 ? (
                          getRecetaMedicamentos(receta).map((med, medIndex) => (
                            <RecetaMedicamentoItem key={medIndex}>
                              <RecetaMedicamentoName>
                                {med.nombreProducto || med.nombreDroga}
                              </RecetaMedicamentoName>
                              <RecetaMedicamentoDetails>
                                <RecetaMedicamentoDosage>
                                  <strong>Posología:</strong>{" "}
                                  {med.posologia || "No especificada"}
                                </RecetaMedicamentoDosage>
                                <RecetaMedicamentoDiagnosis>
                                  <strong>Diagnóstico:</strong>{" "}
                                  {med.diagnostico || "No especificado"}
                                </RecetaMedicamentoDiagnosis>
                                {med.observaciones && (
                                  <RecetaMedicamentoObservations>
                                    <strong>Observaciones:</strong>{" "}
                                    {med.observaciones}
                                  </RecetaMedicamentoObservations>
                                )}
                              </RecetaMedicamentoDetails>
                            </RecetaMedicamentoItem>
                          ))
                        ) : (
                          <RecetaInfoGeneral>
                            <p>
                              <strong>Diagnóstico General:</strong>{" "}
                              {receta.diagnosticogeneral || "No especificado"}
                            </p>
                            <p>
                              <strong>Observaciones Generales:</strong>{" "}
                              {receta.observaciongeneral || "No especificadas"}
                            </p>
                            <p>
                              <strong>Especialidad:</strong>{" "}
                              {receta.idespecialidaD_Desc || "No especificada"}
                            </p>
                            <p>
                              <strong>Médico:</strong>{" "}
                              {receta.idmedicO_Desc || "No especificado"}
                            </p>
                            <p>
                              <strong>Centro:</strong>{" "}
                              {receta.idcentrO_Desc || "No especificado"}
                            </p>
                          </RecetaInfoGeneral>
                        )}
                      </RecetaMedicamentosList>
                    </RecetaInfoCollapsible>
                  )}
                </RecetaInfo>

                {expandedPDF === uniqueId && (
                  <PDFViewerContainer>
                    <PDFViewerHeader>
                      <PDFViewerTitle>
                        Vista previa - Receta #
                        {receta.numeroReceta || index + 1}
                      </PDFViewerTitle>
                      <PDFViewerClose onClick={() => handleVerPDF(receta)}>
                        ×
                      </PDFViewerClose>
                    </PDFViewerHeader>
                    <PDFViewerContent>
                      <PDFIframe
                        title={`Receta ${receta.numeroReceta || index + 1}`}
                        src={getRecetaPdfLink(receta)}
                        type="application/pdf"
                      />
                    </PDFViewerContent>
                  </PDFViewerContainer>
                )}
              </RecetaCardBody>

              <RecetaCardActions>
                <BtnVerPDF
                  className="bgc-latex30 c-white rb16m"
                  onClick={() => handleVerPDF(receta)}
                >
                  {expandedPDF === uniqueId ? "Ocultar PDF" : "Ver PDF"}
                </BtnVerPDF>
                <BtnVerPDF
                  className="bgc-primary c-white rb16m"
                  onClick={() => handleOpenPDFNewTab(receta)}
                >
                  <ViewIcon />
                  Abrir en nueva pestaña
                </BtnVerPDF>
                <BtnAnular
                  className={`${
                    canUserAnularReceta(receta)
                      ? "bgc-danger c-white"
                      : "bgc-gray c-gray-dark"
                  } rb16m ${
                    canUserAnularReceta(receta) ? "pointer" : "not-allowed"
                  }`}
                  onClick={() =>
                    canUserAnularReceta(receta) && confirmacionAnular(receta)
                  }
                  title={
                    canUserAnularReceta(receta)
                      ? "Anular receta"
                      : "Solo el médico que creó la receta puede anularla"
                  }
                >
                  <TrashIcon />
                  Anular
                </BtnAnular>
              </RecetaCardActions>
            </RecetaCard>
          );
        })}
      </RecetaGrid>

      <BtnContainer>
        <BtnConfirmar className="bgc-latex30 c-white rb18l" onClick={dissmiss}>
          Cerrar
        </BtnConfirmar>
      </BtnContainer>
    </RecetaPDFContainer>
  );
};

export default RecetaPDF;
