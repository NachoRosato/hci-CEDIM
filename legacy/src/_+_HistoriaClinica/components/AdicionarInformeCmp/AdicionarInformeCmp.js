import { useContext, useEffect, useState } from "react";
import {
  BarContainer,
  BoxBtnImagen,
  BoxInforme,
  BoxTitle,
  BtnCerrar,
  BtnGenerarOrden,
  ButtonImagen,
  ContainerAdcInformeCmp,
  ContainerAdicionar,
  ContainerButtons,
  ContainerContadorCarac,
  ContainerCopiarTxt,
  ContainerDesc,
  ContainerEvoQuill,
  ContainerEvolucionDropBox,
  ContainerEvolucionTitleBox,
  ContainerInforme,
  CopiarTxtBox,
  ProgressBar,
  LaboratorioStyles,
} from "./localStyle";
import { showToaster } from "global/context/action/toaster/toaster";
import { GlobalContext } from "global/context/Provider";
import EsqueletoImagenIcon from "global/assets/generico/EsqueletoImagenIcon";
import { HistoriaClinicaContext } from "_+_HistoriaClinica/context/Provider";
import {
  wsGetVisorImagen,
  wsResetVisorImagen,
} from "_+_HistoriaClinica/context/action/informe/informe";
import {
  wsGetInformeLabAnormales,
  resetLaboParcial,
} from "_+_HistoriaClinica/context/action/laboratorio/laboratorio";
import { IonSpinner } from "@ionic/react";
import FlechaCopiar from "global/assets/generico/FlechaCopiar";
import LaboratorioIcon from "global/assets/generico/LaboratorioIcon";
import QuillEstudios from "../QuillEstudios/QuillEstudios";
import {
  getItemIndexDB,
  updateEvoEditIndexDB,
} from "_+_HistoriaClinica/pages/Evolucion/EvolucionFun";

const AdicionarInformeCmp = ({
  informe,
  dissmiss,
  informeName,
  fechaEstudio,
  tipoEstudio,
  setOtrosEstudiosEvo,
  setLaboratoriosEvo,
  idCentro,
  codigoInformeLabo,
}) => {
  const { toasterDispatch } = useContext(GlobalContext);
  const {
    informeDispatch,
    informeState,
    laboratorioState,
    laboratorioDispatch,
  } = useContext(HistoriaClinicaContext);

  const editorCaracLimit = 40000;
  let config = localStorage.getItem("config");
  let opcEditorTools = JSON.parse(config).opcEditorTextoHerramientas;

  const [txtInfSelected, setTxtInfSelected] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [contadorCarac, setContadorCarac] = useState(0);
  const [alertOnCopy, setAlertOnCopy] = useState(false);
  const [loadingInforme, setLoadingInforme] = useState(false);
  const [txtEditado, setTxtEditado] = useState(null);
  const [textoSinTags, setTextoSinTags] = useState("");

  useEffect(() => {
    //data en indexDB
    async function getDataIndexDB() {
      try {
        const response = await getItemIndexDB(5);
        if (response) {
          if (response.ListEditEvo) {
            setTxtEditado(response.ListEditEvo);
            if (tipoEstudio !== undefined && tipoEstudio === "Informes") {
              setTextoSinTags(
                response.ListEditEvo.resultadosEstInf[0].resultado
              );
            } else {
              setTextoSinTags(response.ListEditEvo.resultadosLabo[0].resultado);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    getDataIndexDB();
    const handleSelection = () => {
      const selection = window.getSelection();
      if (selection.toString() !== "") {
        // Capturar el HTML seleccionado en lugar del texto plano
        const range = selection.getRangeAt(0);
        const container = document.createElement("div");
        container.appendChild(range.cloneContents());

        // Procesar el HTML para mantener el formato pero limpiar estilos innecesarios
        const processedHTML = processSelectedHTML(container.innerHTML);
        setSelectedText(processedHTML);
      }
    };
    document.addEventListener("mouseup", handleSelection);
    return () => {
      document.removeEventListener("mouseup", handleSelection);
    };
  }, []);

  // Función para procesar el HTML seleccionado y mantener el formato
  const processSelectedHTML = (html) => {
    // Si es laboratorio, preservar el HTML con formato (como Ctrl+C + Ctrl+V)
    if (tipoEstudio !== "Informes") {
      return processLaboratorioHTMLWithFormat(html);
    }

    // Si es informes, mantener la lógica actual
    return processInformesHTML(html);
  };

  // Nueva función para procesar HTML de laboratorio
  const processLaboratorioHTML = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    let resultado = "";
    let fechaExtraida = null; // Flag para evitar duplicación del encabezado

    // Si no hay resultados estructurados, intentar extraer información básica
    if (tempDiv.querySelectorAll(".resultado-item").length === 0) {
      // Buscar texto que contenga información de laboratorio
      const textContent = tempDiv.textContent || tempDiv.innerText || "";
      if (
        textContent.includes("Protocolo:") ||
        textContent.includes("Fecha:")
      ) {
        // Extraer fecha si está disponible y no se extrajo antes
        if (!fechaExtraida) {
          const fechaMatch = textContent.match(
            /Fecha:\s*(\d{2}\/\d{2}\/\d{4})/
          );
          if (fechaMatch) {
            fechaExtraida = fechaMatch[1];
            resultado += `LABORATORIO (${fechaExtraida}):\n`;
          }
        }

        // Buscar análisis compuestos
        const analisisCompuestos = tempDiv.querySelectorAll(
          '[class*="analisis-compuesto"]'
        );
        analisisCompuestos.forEach((analisis) => {
          resultado += `${analisis.textContent.trim()}\n`;
        });

        // Buscar análisis nombres y simples (evitar duplicación)
        const analisisNombres = tempDiv.querySelectorAll(
          '[class*="analisis-nombre"], [class*="analisis-simple"]'
        );
        analisisNombres.forEach((analisis) => {
          // Buscar estado (A, B, etc.) antes del análisis
          const estado = analisis.parentElement.querySelector(".estado");
          if (estado) {
            // Preservar el HTML del estado (incluyendo <strong>)
            resultado += `      ${estado.innerHTML.trim()} - `;
          }

          resultado += `${analisis.textContent.trim()}`;

          // Buscar valor del resultado
          const resultadoValor = analisis.parentElement.querySelector(
            '[class*="resultado-valor"]'
          );
          if (resultadoValor) {
            // Limpiar el valor de saltos de línea y espacios extra
            let valorLimpio = resultadoValor.textContent
              .replace(/\s+/g, " ") // Reemplazar múltiples espacios con uno solo
              .replace(/\n/g, "") // Eliminar saltos de línea
              .trim();
            resultado += `: ${valorLimpio}`;
          }

          // Buscar valores de referencia
          const valoresReferencia = analisis.parentElement.querySelector(
            '[class*="valores-referencia"]'
          );
          if (valoresReferencia) {
            // Limpiar la referencia de saltos de línea y espacios extra
            let referenciaLimpia = valoresReferencia.textContent
              .replace(/\s+/g, " ") // Reemplazar múltiples espacios con uno solo
              .replace(/\n/g, "") // Eliminar saltos de línea
              .trim();
            // Separar múltiples valores de referencia con espacios y limpiar espacios extra
            let referenciasSeparadas = referenciaLimpia
              .replace(/([a-zA-Z])([0-9])/g, "$1 $2")
              .replace(/\s+/g, " ") // Reemplazar múltiples espacios con uno solo
              .trim();
            resultado += ` - ${referenciasSeparadas}`;
          }

          resultado += "\n\n";
        });
      } else {
        // Si no hay estructura reconocible, devolver el texto limpio
        return textContent.replace(/\s+/g, " ").trim();
      }
    } else {
      // Procesar cada resultado estructurado
      const resultados = tempDiv.querySelectorAll(".resultado-item");
      resultados.forEach((resultadoItem) => {
        // Buscar análisis compuestos (puede haber más de uno)
        const analisisCompuestos = resultadoItem.querySelectorAll(
          ".analisis-compuesto"
        );
        analisisCompuestos.forEach((analisis) => {
          resultado += `${analisis.textContent.trim()}\n`;
        });

        // Buscar análisis nombre o simple
        const analisisNombre = resultadoItem.querySelector(
          ".analisis-nombre, .analisis-simple"
        );
        if (analisisNombre) {
          // Buscar estado (A, B, etc.) antes del análisis
          const estado = resultadoItem.querySelector(".estado");
          if (estado) {
            // Preservar el HTML del estado (incluyendo <strong>)
            resultado += `      ${estado.innerHTML.trim()} - `;
          }

          resultado += `${analisisNombre.textContent.trim()}`;

          // Buscar valor del resultado
          const resultadoValor =
            resultadoItem.querySelector(".resultado-valor");
          if (resultadoValor) {
            // Limpiar el valor de saltos de línea y espacios extra
            let valorLimpio = resultadoValor.textContent
              .replace(/\s+/g, " ") // Reemplazar múltiples espacios con uno solo
              .replace(/\n/g, "") // Eliminar saltos de línea
              .trim();
            resultado += `: ${valorLimpio}`;
          }

          // Buscar valores de referencia
          const valoresReferencia = resultadoItem.querySelector(
            ".valores-referencia"
          );
          if (valoresReferencia) {
            // Limpiar la referencia de saltos de línea y espacios extra
            let referenciaLimpia = valoresReferencia.textContent
              .replace(/\s+/g, " ") // Reemplazar múltiples espacios con uno solo
              .replace(/\n/g, "") // Eliminar saltos de línea
              .trim();
            // Separar múltiples valores de referencia con espacios y limpiar espacios extra
            let referenciasSeparadas = referenciaLimpia
              .replace(/([a-zA-Z])([0-9])/g, "$1 $2")
              .replace(/\s+/g, " ") // Reemplazar múltiples espacios con uno solo
              .trim();
            resultado += ` - ${referenciasSeparadas}`;
          }

          resultado += "\n\n";
        }
      });
    }

    return resultado.trim();
  };

  // Nueva función para preservar el formato HTML de laboratorio (como Ctrl+C + Ctrl+V)
  const processLaboratorioHTMLWithFormat = (html) => {
    if (!html) return "";

    // Crear un elemento temporal para procesar el HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    // Limpiar solo elementos innecesarios pero preservar el formato HTML
    const elementsToRemove = tempDiv.querySelectorAll(
      "script, style, head, meta, title"
    );
    elementsToRemove.forEach((el) => el.remove());

    // Preservar estilos importantes para laboratorio
    const elementsWithStyle = tempDiv.querySelectorAll("[style]");
    elementsWithStyle.forEach((element) => {
      const style = element.getAttribute("style");

      // Preservar colores importantes para laboratorio
      if (style.includes("color: #d32f2f")) {
        element.style.color = "#d32f2f";
      }
      if (style.includes("color: #1976d2")) {
        element.style.color = "#1976d2";
      }
      if (style.includes("color: #666")) {
        element.style.color = "#666";
      }

      // Preservar tamaños de fuente
      if (style.includes("font-size: 14px")) {
        element.style.fontSize = "14px";
      }
      if (style.includes("font-size: 12px")) {
        element.style.fontSize = "12px";
      }
      if (style.includes("font-size: 11px")) {
        element.style.fontSize = "11px";
      }

      // Preservar márgenes para indentación
      if (style.includes("margin-left: 20px")) {
        element.style.marginLeft = "20px";
      }
      if (style.includes("margin-left: 40px")) {
        element.style.marginLeft = "40px";
      }
    });

    // Preservar la estructura de contenedores importantes
    const contenedores = tempDiv.querySelectorAll(".contenedor-resultados");
    contenedores.forEach((contenedor) => {
      contenedor.style.display = "flex";
      contenedor.style.justifyContent = "space-between";
      contenedor.style.alignItems = "flex-start";
    });

    // Retornar el HTML procesado manteniendo el formato
    return tempDiv.innerHTML;
  };

  // Función para procesar HTML de informes (mantiene la lógica actual)
  const processInformesHTML = (html) => {
    // Crear un elemento temporal para procesar el HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    // Convertir estilos CSS inline a formato compatible con Quill
    const elementsWithStyle = tempDiv.querySelectorAll("[style]");
    elementsWithStyle.forEach((element) => {
      const style = element.getAttribute("style");

      // Convertir estilos específicos a clases o atributos
      if (
        style.includes("font-weight: bold") ||
        style.includes("font-weight:bold")
      ) {
        element.style.fontWeight = "bold";
        element.style.removeProperty("font-weight");
      }

      if (
        style.includes("font-style: italic") ||
        style.includes("font-style:italic")
      ) {
        element.style.fontStyle = "italic";
        element.style.removeProperty("font-style");
      }

      if (
        style.includes("text-align: center") ||
        style.includes("text-align:center")
      ) {
        element.style.textAlign = "center";
        element.style.removeProperty("text-align");
      }

      if (
        style.includes("text-align: right") ||
        style.includes("text-align:right")
      ) {
        element.style.textAlign = "right";
        element.style.removeProperty("text-align");
      }

      // Preservar colores importantes
      if (style.includes("color: #d32f2f")) {
        element.style.color = "#d32f2f";
      }

      if (style.includes("color: #1976d2")) {
        element.style.color = "#1976d2";
      }

      if (style.includes("color: #666")) {
        element.style.color = "#666";
      }

      // Preservar tamaños de fuente
      if (style.includes("font-size: 14px")) {
        element.style.fontSize = "14px";
      }

      if (style.includes("font-size: 12px")) {
        element.style.fontSize = "12px";
      }

      if (style.includes("font-size: 11px")) {
        element.style.fontSize = "11px";
      }

      // Preservar márgenes importantes
      if (style.includes("margin-left: 20px")) {
        element.style.marginLeft = "20px";
      }

      if (style.includes("margin-left: 40px")) {
        element.style.marginLeft = "40px";
      }
    });

    // Limpiar elementos innecesarios pero mantener la estructura
    const elementsToRemove = tempDiv.querySelectorAll(
      "script, style, head, meta, title"
    );
    elementsToRemove.forEach((el) => el.remove());

    // Preservar la estructura de contenedores importantes
    const contenedores = tempDiv.querySelectorAll(".contenedor-resultados");
    contenedores.forEach((contenedor) => {
      contenedor.style.display = "flex";
      contenedor.style.justifyContent = "space-between";
      contenedor.style.alignItems = "flex-start";
    });

    // Preservar columnas
    const columnasAnalisis = tempDiv.querySelectorAll(".columna-analisis");
    columnasAnalisis.forEach((col) => {
      col.style.flex = "2";
    });

    const columnasResultado = tempDiv.querySelectorAll(".columna-resultado");
    columnasResultado.forEach((col) => {
      col.style.flex = "1";
      col.style.textAlign = "right";
    });

    const columnasReferencia = tempDiv.querySelectorAll(".columna-referencia");
    columnasReferencia.forEach((col) => {
      col.style.flex = "2";
    });

    return tempDiv.innerHTML;
  };

  // Función helper para calcular el contenido actual del editor
  const calcularContenidoEditor = () => {
    const contenidoActual = document.querySelector(".ql-editor");
    if (!contenidoActual) return "";

    return contenidoActual.outerHTML
      .toString()
      .replaceAll('contenteditable="true"', "")
      .replaceAll('class="ql-editor"', "")
      .replaceAll('data-gramm="false"', "");
  };

  // Función para validar si el contenido es HTML válido
  const esHTMLValido = (contenido) => {
    if (!contenido || typeof contenido !== "string") {
      return false;
    }

    // Verificar que no sea null, undefined o string vacío
    if (contenido.trim() === "") {
      return false;
    }

    // Verificar que contenga al menos una etiqueta HTML básica
    const tieneEtiquetasHTML = /<[^>]+>/.test(contenido);

    return tieneEtiquetasHTML;
  };

  // Nueva función para copiar informe de laboratorio manteniendo formato HTML completo
  const copiarInformeLabo = () => {
    try {
      let htmlContent = "";

      // Obtener el contenido HTML del informe
      if (informe.value && informe.value !== null && informe.value !== "") {
        htmlContent = informe.value;
      } else if (
        informe.informe &&
        informe.informe !== null &&
        informe.informe !== ""
      ) {
        htmlContent = informe.informe;
      } else if (
        informe.conclusion &&
        informe.conclusion !== null &&
        informe.conclusion !== ""
      ) {
        htmlContent = informe.conclusion;
      } else {
        showToaster(
          {
            texto: "Error al copiar el informe/resultados",
            tipo: "danger",
          },
          "centroArriba"
        )(toasterDispatch);
        return;
      }

      // Procesar el HTML para optimizarlo para Quill
      const processedHTML = formatLaboratorioForQuill(htmlContent);

      // Agregar el nombre del informe al principio del contenido procesado
      let contenidoFinal = processedHTML;
      if (informeName && informeName.trim() !== "") {
        contenidoFinal = `${informeName}\n\n${processedHTML}`;
      }

      // Validar que el contenido no exceda el límite del editor
      const contenidoActualHTML = calcularContenidoEditor();
      const espacioDisponible = editorCaracLimit - contenidoActualHTML.length;
      const contenidoAInsertar = contenidoFinal.length;

      if (contenidoAInsertar > espacioDisponible) {
        showToaster(
          {
            texto: `El contenido excede el límite permitido. Espacio disponible: ${espacioDisponible.toLocaleString()} caracteres, contenido: ${contenidoAInsertar.toLocaleString()} caracteres`,
            tipo: "danger",
          },
          "centroArriba"
        )(toasterDispatch);
        return;
      }

      // Verificación adicional: asegurar que hay suficiente espacio
      if (espacioDisponible <= 0) {
        showToaster(
          {
            texto: "El editor ha alcanzado su límite máximo de caracteres",
            tipo: "danger",
          },
          "centroArriba"
        )(toasterDispatch);
        return;
      }

      // Establecer el contenido procesado para que se inserte en el editor
      setTxtInfSelected(contenidoFinal);
      setSelectedText("");

      showToaster(
        {
          texto: "Informe copiado con formato completo",
          tipo: "success",
        },
        "centroArriba"
      )(toasterDispatch);
    } catch (error) {
      console.error("Error al copiar informe de laboratorio:", error);
      showToaster(
        {
          texto: "Error al copiar el informe con formato",
          tipo: "danger",
        },
        "centroArriba"
      )(toasterDispatch);
    }
  };

  // Nueva función para copiar valores anormales de laboratorio
  const copiarInformeLaboAnormales = async () => {
    try {
      // Verificar que tenemos el código del informe
      if (!codigoInformeLabo) {
        showToaster(
          {
            texto: "No se encontró el código del informe",
            tipo: "danger",
          },
          "centroArriba"
        )(toasterDispatch);
        return;
      }

      // Verificar si ya tenemos los valores anormales en el estado del contexto
      if (
        laboratorioState.laboratorio.labInformeAnormal !== null &&
        laboratorioState.laboratorio.labInformeAnormal !== undefined &&
        laboratorioState.laboratorio.labInformeAnormal.value !== null
      ) {
        // Usar los datos que ya están en el contexto
        const htmlContent =
          laboratorioState.laboratorio.labInformeAnormal.value;

        // Procesar el HTML del contexto
        if (esHTMLValido(htmlContent)) {
          const processedHTML = formatLaboratorioForQuill(htmlContent);

          // Agregar el nombre del informe al principio del contenido procesado
          let contenidoFinal = processedHTML;
          if (informeName && informeName.trim() !== "") {
            contenidoFinal = `${informeName} - Valores Anormales\n\n${processedHTML}`;
          }

          // Validar que el contenido no exceda el límite del editor
          const contenidoActualHTML = calcularContenidoEditor();
          const espacioDisponible =
            editorCaracLimit - contenidoActualHTML.length;
          const contenidoAInsertar = contenidoFinal.length;

          if (contenidoAInsertar > espacioDisponible) {
            showToaster(
              {
                texto: `El contenido excede el límite permitido. Espacio disponible: ${espacioDisponible.toLocaleString()} caracteres, contenido: ${contenidoAInsertar.toLocaleString()} caracteres`,
                tipo: "danger",
              },
              "centroArriba"
            )(toasterDispatch);
            return;
          }

          // Establecer el contenido procesado para que se inserte en el editor
          setTxtInfSelected(contenidoFinal);
          setSelectedText("");

          showToaster(
            {
              texto: "Valores anormales copiados desde contexto",
              tipo: "success",
            },
            "centroArriba"
          )(toasterDispatch);
          return;
        }
      }

      // Si no hay datos en el contexto, hacer el GET
      wsGetInformeLabAnormales(codigoInformeLabo)(laboratorioDispatch);

      showToaster(
        {
          texto: "Obteniendo valores anormales...",
          tipo: "info",
        },
        "centroArriba"
      )(toasterDispatch);
    } catch (error) {
      console.error("Error al obtener valores anormales:", error);
      showToaster(
        {
          texto: "Error al obtener los valores anormales",
          tipo: "danger",
        },
        "centroArriba"
      )(toasterDispatch);
    }
  };

  // Función para limpiar el contexto de laboratorio antes de cerrar
  const limpiarContextoYcerrar = () => {
    // Limpiar el contexto de valores anormales
    resetLaboParcial()(laboratorioDispatch);
    // Pequeño delay para asegurar que se ejecute la limpieza
    setTimeout(() => {
      // Cerrar el modal
      dissmiss();
    }, 100);
  };

  //funcion async para cargar la edicion local
  async function asyncUpdEdicionIDB(key, ref, obj) {
    try {
      const response = await updateEvoEditIndexDB(key, ref, obj);
      if (response !== null) {
        setTextoSinTags("");
        // Limpiar contexto antes de cerrar
        resetLaboParcial()(laboratorioDispatch);
        // Pequeño delay para asegurar que se ejecute la limpieza
        setTimeout(() => {
          dissmiss();
        }, 100);
      }
    } catch (error) {
      //no necesita
    }
  }

  const copiarTexto = (copiarConclusion) => {
    if (!copiarConclusion) {
      if (
        selectedText !== "" &&
        selectedText !== null &&
        selectedText !== undefined
      ) {
        // Para laboratorio, preservar el HTML con formato (como Ctrl+C + Ctrl+V)
        // Para informes, mantener el comportamiento actual
        let processedText = selectedText;
        if (tipoEstudio !== "Informes") {
          // Usar la nueva función que preserva el formato HTML
          processedText = processLaboratorioHTMLWithFormat(selectedText);
        }

        setTxtInfSelected(processedText);
        setSelectedText("");
      } else {
        showToaster(
          {
            texto:
              "Debe seleccionar texto del informe para copiar en la evolución",
            tipo: "danger",
          },
          "centroArriba"
        )(toasterDispatch);
      }
    } else if (informe.conclusion && informe.conclusion !== null) {
      let auxString = informe.conclusion.replace(/<br\/?>/g, "");
      // Si es laboratorio, procesar el HTML de la conclusión
      if (tipoEstudio !== "Informes") {
        auxString = processLaboratorioHTML(auxString);
      }
      setTxtInfSelected(auxString);
      setSelectedText("");
    } else if (
      informe.value &&
      informe.value !== null &&
      informe.value !== ""
    ) {
      let auxString = informe.value.replace(/<br\/?>/g, "");
      // Si es laboratorio, procesar el HTML del valor
      if (tipoEstudio !== "Informes") {
        auxString = processLaboratorioHTML(auxString);
      }
      setTxtInfSelected(auxString);
      setSelectedText("");
    } else {
      showToaster(
        {
          texto: "Error al copiar el informe/resultados",
          tipo: "danger",
        },
        "centroArriba"
      )(toasterDispatch);
    }
  };

  const copiarInforme = () => {
    if (informe.value && informe.value !== null && informe.value !== "") {
      let auxString = informe.value.replace(/<br\/?>/g, "");
      // Si es laboratorio, procesar el HTML del valor
      if (tipoEstudio !== "Informes") {
        auxString = processLaboratorioHTML(auxString);
      }
      setTxtInfSelected(auxString);
      setSelectedText("");
    } else if (
      informe.informe &&
      informe.informe !== null &&
      informe.informe !== ""
    ) {
      let auxString = informe.informe.replace(/<br\/?>/g, "");
      // Si es laboratorio, procesar el HTML del informe
      if (tipoEstudio !== "Informes") {
        auxString = processLaboratorioHTML(auxString);
      }
      setTxtInfSelected(auxString);
      setSelectedText("");
    } else {
      showToaster(
        {
          texto: "Error al copiar el informe/resultados",
          tipo: "danger",
        },
        "centroArriba"
      )(toasterDispatch);
    }
  };

  // Nueva función especializada para formatear laboratorio manteniendo el formato visual
  const formatLaboratorioForQuill = (html) => {
    if (!html) return "";

    // Crear un elemento temporal para procesar el HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    // Eliminar solo elementos del head que no son necesarios
    const elementsToRemove = tempDiv.querySelectorAll("head, meta, title");
    elementsToRemove.forEach((el) => el.remove());

    // Obtener solo el contenido del body o el contenido principal
    const body = tempDiv.querySelector("body");
    if (body) {
      // Si hay body, usar su contenido
      tempDiv.innerHTML = body.innerHTML;
    }

    // Crear un nuevo div para reconstruir el contenido formateado
    const formattedDiv = document.createElement("div");

    /*     // Extraer información del protocolo si está disponible
    const protocoloInfo = tempDiv.querySelector(".protocolo-info");
    if (protocoloInfo) {
      const protocoloDiv = document.createElement("div");
      protocoloDiv.innerHTML = protocoloInfo.innerHTML;
      protocoloDiv.style.textAlign = "center";
      protocoloDiv.style.marginBottom = "20px";
      protocoloDiv.style.fontSize = "14px";
      formattedDiv.appendChild(protocoloDiv);
    } */

    // Procesar cada resultado estructurado
    const resultados = tempDiv.querySelectorAll(".resultado-item");
    if (resultados.length > 0) {
      resultados.forEach((resultadoItem) => {
        // Buscar análisis compuestos (títulos de sección)
        const analisisCompuestos = resultadoItem.querySelectorAll(
          ".analisis-compuesto"
        );
        analisisCompuestos.forEach((analisis) => {
          const tituloDiv = document.createElement("div");
          tituloDiv.innerHTML = `<strong style="font-size: 10px; margin: 15px 0 10px 0; color: #333;">${analisis.textContent.trim()}</strong>`;
          tituloDiv.style.marginBottom = "15px";
          formattedDiv.appendChild(tituloDiv);
        });

        // Buscar análisis nombre o simple
        const analisisNombre = resultadoItem.querySelector(
          ".analisis-nombre, .analisis-simple"
        );
        if (analisisNombre) {
          const itemDiv = document.createElement("div");
          itemDiv.style.marginBottom = "10px";
          itemDiv.style.marginLeft = "20px";
          itemDiv.style.fontSize = "9px";

          let itemContent = "";

          // Buscar estado (A, B, etc.) antes del análisis
          const estado = resultadoItem.querySelector(".estado");
          if (estado) {
            itemContent += `<span style="color: #d32f2f; font-weight: bold; font-size: 9px;">${estado.textContent.trim()}</span> - `;
          }

          // Agregar el nombre del análisis
          itemContent += `${analisisNombre.textContent.trim()}`;

          // Buscar valor del resultado
          const resultadoValor =
            resultadoItem.querySelector(".resultado-valor");
          if (resultadoValor) {
            let valorLimpio = resultadoValor.textContent
              .replace(/\s+/g, " ")
              .replace(/\n/g, "")
              .trim();
            itemContent += `: <span style="color: #1976d2; font-weight: bold; font-size: 9px;">${valorLimpio}</span>`;
          }

          // Buscar valores de referencia
          const valoresReferencia = resultadoItem.querySelector(
            ".valores-referencia"
          );
          if (valoresReferencia) {
            let referenciaLimpia = valoresReferencia.textContent
              .replace(/\s+/g, " ")
              .replace(/\n/g, "")
              .trim();
            itemContent += ` - <span style="color: #666; font-size: 8px;">${referenciaLimpia}</span>`;
          }

          itemDiv.innerHTML = `- ${itemContent}`;
          formattedDiv.appendChild(itemDiv);
        }

        // Buscar método si está disponible
        const metodo = resultadoItem.querySelector(".metodo");
        if (metodo) {
          const metodoDiv = document.createElement("div");
          metodoDiv.innerHTML = `<span style="font-style: italic; font-size: 8px; color: #666; margin: 5px 0;">${metodo.textContent.trim()}</span>`;
          metodoDiv.style.marginLeft = "20px";
          metodoDiv.style.marginBottom = "15px";
          formattedDiv.appendChild(metodoDiv);
        }
      });
    } else {
      // Si no hay estructura reconocible, intentar extraer información básica
      const textContent = tempDiv.textContent || tempDiv.innerText || "";
      if (
        textContent.includes("Protocolo:") ||
        textContent.includes("Fecha:")
      ) {
        // Extraer fecha si está disponible
        const fechaMatch = textContent.match(/Fecha:\s*(\d{2}\/\d{2}\/\d{4})/);
        if (fechaMatch) {
          const fechaDiv = document.createElement("div");
          fechaDiv.innerHTML = `<strong style="text-align: center; margin: 20px 0; font-size: 14px;">LABORATORIO (${fechaMatch[1]})</strong>`;
          fechaDiv.style.textAlign = "center";
          formattedDiv.appendChild(fechaDiv);
        }

        // Buscar análisis compuestos
        const analisisCompuestos = tempDiv.querySelectorAll(
          '[class*="analisis-compuesto"]'
        );
        analisisCompuestos.forEach((analisis) => {
          const tituloDiv = document.createElement("div");
          tituloDiv.innerHTML = `<strong style="font-size: 10px; margin: 15px 0 10px 0; color: #333;">${analisis.textContent.trim()}</strong>`;
          tituloDiv.style.marginBottom = "15px";
          tituloDiv.style.fontSize = "10px";
          formattedDiv.appendChild(tituloDiv);
        });

        // Buscar análisis nombres y simples
        const analisisNombres = tempDiv.querySelectorAll(
          '[class*="analisis-nombre"], [class*="analisis-simple"]'
        );
        analisisNombres.forEach((analisis) => {
          const itemDiv = document.createElement("div");
          itemDiv.style.marginBottom = "10px";
          itemDiv.style.marginLeft = "20px";
          itemDiv.style.fontSize = "9px";
          let itemContent = "";

          // Buscar estado (A, B, etc.) antes del análisis
          const estado = analisis.parentElement.querySelector(".estado");
          if (estado) {
            itemContent += `<span style="color: #d32f2f; font-weight: bold; font-size: 10px;">${estado.textContent.trim()}</span> - `;
          }

          itemContent += `${analisis.textContent.trim()}`;

          // Buscar valor del resultado
          const resultadoValor = analisis.parentElement.querySelector(
            '[class*="resultado-valor"]'
          );
          if (resultadoValor) {
            let valorLimpio = resultadoValor.textContent
              .replace(/\s+/g, " ")
              .replace(/\n/g, "")
              .trim();
            itemContent += `: <span style="color: #1976d2; font-weight: bold; font-size: 9px;">${valorLimpio}</span>`;
          }

          // Buscar valores de referencia
          const valoresReferencia = analisis.parentElement.querySelector(
            '[class*="valores-referencia"]'
          );
          if (valoresReferencia) {
            let referenciaLimpia = valoresReferencia.textContent
              .replace(/\s+/g, " ")
              .replace(/\n/g, "")
              .trim();
            itemContent += ` - <span style="color: #666; font-size: 8px;">${referenciaLimpia}</span>`;
          }

          itemDiv.innerHTML = `- ${itemContent}`;
          formattedDiv.appendChild(itemDiv);
        });
      } else {
        // Si no hay estructura reconocible, devolver el contenido original procesado
        return processHTMLForQuill(html);
      }
    }

    /*     // Agregar hora de extracción si está disponible
    const horaExtraccion = tempDiv.querySelector(".hora-extraccion");
    if (horaExtraccion) {
      const horaDiv = document.createElement("div");
      horaDiv.innerHTML = `<span style="font-size: 11px; color: #666; margin: 15px 0; text-align: center;">${horaExtraccion.textContent.trim()}</span>`;
      horaDiv.style.textAlign = "center";
      horaDiv.style.marginTop = "20px";
      formattedDiv.appendChild(horaDiv);
    } */

    return formattedDiv.innerHTML;
  };

  // Función para procesar HTML y optimizarlo para Quill
  const processHTMLForQuill = (html) => {
    if (!html) return "";

    // Crear un elemento temporal para procesar el HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    // Eliminar solo elementos del head que no son necesarios
    const elementsToRemove = tempDiv.querySelectorAll("head, meta, title");
    elementsToRemove.forEach((el) => el.remove());

    // Obtener solo el contenido del body o el contenido principal
    let content = "";
    const body = tempDiv.querySelector("body");
    if (body) {
      content = body.innerHTML;
    } else {
      content = tempDiv.innerHTML;
    }

    // Preservar estilos inline importantes pero limpiar algunos problemáticos
    // Mantener estilos de fuente, color, alineación, etc.
    content = content.replace(
      /style=['"]([^'"]*font-family[^'"]*)['"]/gi,
      'style="$1"'
    );
    content = content.replace(
      /style=['"]([^'"]*font-size[^'"]*)['"]/gi,
      'style="$1"'
    );
    content = content.replace(
      /style=['"]([^'"]*color[^'"]*)['"]/gi,
      'style="$1"'
    );
    content = content.replace(
      /style=['"]([^'"]*text-align[^'"]*)['"]/gi,
      'style="$1"'
    );
    content = content.replace(
      /style=['"]([^'"]*margin[^'"]*)['"]/gi,
      'style="$1"'
    );
    content = content.replace(
      /style=['"]([^'"]*padding[^'"]*)['"]/gi,
      'style="$1"'
    );

    // Limpiar estilos que pueden causar problemas en Quill
    content = content.replace(/style=['"]([^'"]*display[^'"]*)['"]/gi, "");
    content = content.replace(/style=['"]([^'"]*position[^'"]*)['"]/gi, "");
    content = content.replace(/style=['"]([^'"]*float[^'"]*)['"]/gi, "");

    // Limpiar clases CSS que pueden no estar disponibles en Quill
    content = content.replace(/class=['"][^'"]*['"]/g, "");

    // Mantener etiquetas importantes para el formato
    content = content.replace(/<br\s*\/?>/gi, "<br>");
    content = content.replace(/<p\s*\/?>/gi, "<p>");

    // Preservar etiquetas strong, em, u, etc.
    content = content.replace(/<strong\s*\/?>/gi, "<strong>");
    content = content.replace(/<em\s*\/?>/gi, "<em>");
    content = content.replace(/<u\s*\/?>/gi, "<u>");

    // Asegurar que el contenido esté envuelto en párrafos si no lo está
    if (!content.includes("<p>") && !content.includes("<div>")) {
      content = `<p>${content}</p>`;
    }

    // Limpiar espacios extra y saltos de línea innecesarios, pero preservar estructura
    content = content.replace(/>\s+</g, "><");
    content = content.replace(/\s+/g, " ");

    // Preservar saltos de línea importantes
    content = content.replace(/<br>\s*<br>/gi, "<br><br>");

    return content.trim();
  };

  const guardarOrden = () => {
    let fechaResultado = new Date(fechaEstudio);
    let anio = "" + fechaResultado.getFullYear();
    let mes =
      "" +
      (fechaResultado.getMonth() + 1 < 10
        ? "0" + (fechaResultado.getMonth() + 1)
        : fechaResultado.getMonth() + 1);
    let dia =
      "" +
      (fechaResultado.getDate() < 10
        ? "0" + fechaResultado.getDate()
        : fechaResultado.getDate());
    let itemInfo = JSON.parse(localStorage.getItem("itemInfo"));
    // aca meteremos el save en index y el hide del modal

    //limpar texto con tag vacio <p> <br> </p> </br> y ver si tiene algo de texto
    let aux = "";
    if (textoSinTags !== undefined) {
      aux = textoSinTags.replaceAll("<p>", "");
      aux = aux.replaceAll("</p>", "");
      aux = aux.replaceAll("<br>", "");
      aux = aux.replaceAll("</br>", "");
    }

    let objResultados;
    if (aux !== "") {
      if (tipoEstudio !== undefined && tipoEstudio === "Informes") {
        objResultados = {
          idEvolucion: itemInfo.proceso === "edita" ? itemInfo.id : 0,
          fecha: anio + mes + dia,
          interno: "1", //no especifica func, en angular siempre era 1
          resultado:
            textoSinTags !== ""
              ? textoSinTags
              : txtEditado.resultadosEstInf[0].resultado !== null
              ? txtEditado.resultadosEstInf[0].resultado
              : "",
        };
      } else {
        objResultados = {
          idCentro: idCentro,
          idEvolucion: itemInfo.proceso === "edita" ? itemInfo.id : 0,
          fecha: anio + mes + dia,
          interno: "1", //no especifica func, en angular siempre era 1
          resultado:
            textoSinTags !== ""
              ? textoSinTags
              : txtEditado.resultadosLabo[0].resultado !== null
              ? txtEditado.resultadosLabo[0].resultado
              : "",
        };
      }
      let auxEdicion = txtEditado;
      auxEdicion.resultadosEstInf = [objResultados];
      if (tipoEstudio !== undefined && tipoEstudio === "Informes") {
        setOtrosEstudiosEvo([objResultados]);
        asyncUpdEdicionIDB(5, "resultadosEstInf", [objResultados]);
      } else {
        setLaboratoriosEvo([objResultados]);
        asyncUpdEdicionIDB(5, "resultadosLabo", [objResultados]);
      }
    } else {
      showToaster(
        {
          texto: "Debe ingresar texto para poder guardar",
          tipo: "danger",
        },
        "centroArriba"
      )(toasterDispatch);
    }
  };

  const verImagen = () => {
    if (informe.estudioAsoc !== null && informe.estudioAsoc !== undefined) {
      wsGetVisorImagen(
        "",
        "",
        informe.estudioAsoc[0].accession_number.slice(1)
      )(informeDispatch);
      setLoadingInforme(true);
    } else {
      wsGetVisorImagen(
        informe.tipo,
        informe.estudio,
        informe.idTurno
      )(informeDispatch);
      setLoadingInforme(true);
    }
  };

  useEffect(() => {
    if (
      informeState.informe.visorPacs !== null &&
      informeState.informe.visorPacs !== undefined
    ) {
      if (
        informeState.informe.visorPacs.value !== null &&
        (informeState.informe.visorPacs.value.items !== null ||
          informeState.informe.visorPacs.value.proteus !== null)
      ) {
        showToaster(
          {
            texto: "Abrimos la imágen en una nueva pestaña",
            tipo: "success",
          },
          "centroArriba"
        )(toasterDispatch);
        window.open(informeState.informe.visorPacs.value.proteus);
        wsResetVisorImagen()(informeDispatch);
        setLoadingInforme(false);
      } else {
        showToaster(
          {
            texto: informeState.informe.visorPacs.value.mensaje,
            tipo: "danger",
          },
          "centroArriba"
        )(toasterDispatch);
        wsResetVisorImagen()(informeDispatch);
        setLoadingInforme(false);
      }
    }
  }, [informeState]);

  //manejo errores ver imagen estudios
  useEffect(() => {
    if (
      informeState.informe.error !== null &&
      informeState.informe.error !== undefined
    ) {
      showToaster(
        {
          texto: informeState.informe.error.error.errorMessage,
          tipo: "danger",
        },
        "centroArriba"
      )(toasterDispatch);
      wsResetVisorImagen()(informeDispatch);
      setLoadingInforme(false);
    }
  }, [informeState]);

  //agregado para limitar a la hora de pegar en quill
  useEffect(() => {
    if (alertOnCopy) {
      showToaster(
        {
          texto: "La copia supera la cantidad de caracteres permitidos",
          tipo: "danger",
        },
        "centroArriba"
      )(toasterDispatch);
      setAlertOnCopy(false);
    }
  }, [alertOnCopy]);

  // useEffect para manejar la respuesta del endpoint de valores anormales
  useEffect(() => {
    if (
      laboratorioState.laboratorio.labInformeAnormal !== null &&
      laboratorioState.laboratorio.labInformeAnormal !== undefined
    ) {
      const htmlContent = laboratorioState.laboratorio.labInformeAnormal.value;

      // Validar que el contenido sea HTML válido
      if (esHTMLValido(htmlContent)) {
        // Procesar el HTML para optimizarlo para Quill
        const processedHTML = formatLaboratorioForQuill(htmlContent);

        // Agregar el nombre del informe al principio del contenido procesado
        let contenidoFinal = processedHTML;
        if (informeName && informeName.trim() !== "") {
          contenidoFinal = `${informeName} - Valores Anormales\n\n${processedHTML}`;
        }

        // Validar que el contenido no exceda el límite del editor
        const contenidoActualHTML = calcularContenidoEditor();
        const espacioDisponible = editorCaracLimit - contenidoActualHTML.length;
        const contenidoAInsertar = contenidoFinal.length;

        if (contenidoAInsertar > espacioDisponible) {
          showToaster(
            {
              texto: `El contenido excede el límite permitido. Espacio disponible: ${espacioDisponible.toLocaleString()} caracteres, contenido: ${contenidoAInsertar.toLocaleString()} caracteres`,
              tipo: "danger",
            },
            "centroArriba"
          )(toasterDispatch);
          return;
        }

        // Verificación adicional: asegurar que hay suficiente espacio
        if (espacioDisponible <= 0) {
          showToaster(
            {
              texto: "El editor ha alcanzado su límite máximo de caracteres",
              tipo: "danger",
            },
            "centroArriba"
          )(toasterDispatch);
          return;
        }

        // Establecer el contenido procesado para que se inserte en el editor
        setTxtInfSelected(contenidoFinal);
        setSelectedText("");

        showToaster(
          {
            texto: "Valores anormales copiados con formato completo",
            tipo: "success",
          },
          "centroArriba"
        )(toasterDispatch);
      } else {
        showToaster(
          {
            texto: "El contenido obtenido no es HTML válido",
            tipo: "danger",
          },
          "centroArriba"
        )(toasterDispatch);
      }
    }
  }, [laboratorioState.laboratorio.labInformeAnormal]);

  return (
    <>
      <ContainerAdcInformeCmp>
        <ContainerDesc>
          <span className="c-latex30 rb16l">
            {" "}
            Aqui puede seleccionar texto del informe resaltandolo con el cursor
            y tocar el botón del centro para pegar dicho texto en la evolución
          </span>
        </ContainerDesc>
        <ContainerAdicionar>
          <ContainerInforme>
            <BoxTitle className="rb16b c-latex30">
              {informe.conclusion && informe.conclusion !== null
                ? "Informe"
                : "Resultados de laboratorio"}
            </BoxTitle>
            {informe.conclusion && informe.conclusion !== null ? (
              <BoxBtnImagen>
                <ButtonImagen
                  className="rb16m c-white pointer ts_addInforme_estudio_imagen-btn"
                  onClick={() => verImagen()}
                >
                  <>
                    <EsqueletoImagenIcon
                      color={"var(--color-white)"}
                    ></EsqueletoImagenIcon>
                    {loadingInforme ? (
                      <span style={{ width: "57.438px", height: "27px" }}>
                        <IonSpinner name="lines-small" />{" "}
                      </span>
                    ) : (
                      <span>Imágen</span>
                    )}
                  </>
                </ButtonImagen>
              </BoxBtnImagen>
            ) : (
              ""
            )}

            <LaboratorioStyles>
              <BoxInforme
                className="rb16l"
                dangerouslySetInnerHTML={{
                  __html:
                    informe.informe && informe.informe !== null
                      ? informe.informe
                      : informe.value,
                }}
              ></BoxInforme>
            </LaboratorioStyles>
          </ContainerInforme>
          <ContainerCopiarTxt>
            <CopiarTxtBox
              className="pointer ts_addInforme_copyText-btn"
              onClick={() => copiarTexto(false)}
            >
              <FlechaCopiar></FlechaCopiar>
            </CopiarTxtBox>
            {tipoEstudio === "Informes" && (
              <CopiarTxtBox
                className="pointer ts_addInforme_copyText-btn"
                onClick={() => copiarInforme()}
              >
                <span className="rb14l c-white">Copiar informe</span>
              </CopiarTxtBox>
            )}
            {tipoEstudio !== "Informes" && (
              <CopiarTxtBox
                className="pointer ts_addInforme_copyInformeLabo-btn"
                onClick={() => copiarInformeLabo()}
              >
                <span className="rb12l c-white">Copiar Laboratorio</span>
              </CopiarTxtBox>
            )}
            {tipoEstudio !== "Informes" && (
              <CopiarTxtBox
                className="pointer ts_addInforme_copyInformeLabo-btn"
                onClick={() => copiarInformeLaboAnormales()}
              >
                <span className="rb12l c-white">Copiar Valores Anormales</span>
              </CopiarTxtBox>
            )}
            {tipoEstudio === "Informes" && (
              <CopiarTxtBox
                className="pointer ts_addInforme_copyText-btn"
                onClick={() => copiarTexto(true)}
              >
                <span className="rb12l c-white">Copiar conclusión</span>
              </CopiarTxtBox>
            )}
          </ContainerCopiarTxt>
          <ContainerEvoQuill>
            <ContainerEvolucionTitleBox>
              <span className="busqPaciente-avatar">
                <LaboratorioIcon
                  color={"var(--color-latex30)"}
                ></LaboratorioIcon>
              </span>
              <span className="busqPaciente-title rb16b c-latex30">
                {" "}
                Evolución
              </span>
            </ContainerEvolucionTitleBox>
            <ContainerEvolucionDropBox className="ts_addInforme_editor">
              {txtEditado !== null ? (
                <QuillEstudios
                  editorName={"quillEstudios"}
                  heightCustom={512}
                  opcEditorTools={opcEditorTools}
                  informeName={informeName}
                  startText={
                    txtEditado !== null &&
                    (txtEditado.resultadosEstInf[0].resultado !== "" ||
                      txtEditado.resultadosLabo[0].resultado !== "")
                      ? tipoEstudio === "Informes"
                        ? txtEditado.resultadosEstInf[0].resultado
                        : txtEditado.resultadosLabo[0].resultado
                      : ""
                  }
                  contadorLimite={editorCaracLimit}
                  txtInfSelected={txtInfSelected}
                  setTxtInfSelected={setTxtInfSelected}
                  contadorCarac={contadorCarac}
                  setContadorCarac={setContadorCarac}
                  setAlertOnCopy={setAlertOnCopy}
                  //estos ultimos son para la edicion local propio de este quill
                  tipoEstudio={tipoEstudio}
                  setTextoSinTags={setTextoSinTags}
                  txtEditado={txtEditado}
                />
              ) : (
                ""
              )}
            </ContainerEvolucionDropBox>
            <ContainerContadorCarac>
              <BarContainer>
                <ProgressBar
                  progress={(contadorCarac / editorCaracLimit) * 100}
                ></ProgressBar>
              </BarContainer>
            </ContainerContadorCarac>
          </ContainerEvoQuill>
        </ContainerAdicionar>
        <ContainerButtons>
          <BtnCerrar
            onClick={limpiarContextoYcerrar}
            className="rb16b c-white ts_addInforme_close-btn"
          >
            Volver
          </BtnCerrar>
          <BtnGenerarOrden
            onClick={guardarOrden}
            className="rb16m c-white ts_addInforme_save-btn"
          >
            Guardar
          </BtnGenerarOrden>
        </ContainerButtons>
      </ContainerAdcInformeCmp>
    </>
  );
};

export default AdicionarInformeCmp;
