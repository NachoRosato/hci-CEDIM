import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../global/context/Provider";
import { HistoriaClinicaContext } from "_+_HistoriaClinica/context/Provider";
import HeaderbarHome from "../../../global/components/genericos/HeaderbarHome/HeaderbarHome";
import Loading from "global/components/genericos/Loading/Loading";
import Toaster from "global/components/genericos/Toaster/Toaster";
import NavTabBar from "_+_HistoriaClinica/components/NavTabBar/NavTabBar";
import { ContainerBody, ResponsiveStyles } from "./localStyle";

// Componentes específicos de laboratorio
import TablaLaboratorio from "./components/TablaLaboratorio/TablaLaboratorio";
import VisorPDF from "./components/VisorPDF/VisorPDF";
import ListaEstudios from "./components/ListaEstudios/ListaEstudios";
import GraficoLaboratorio from "./components/GraficoLaboratorio/GraficoLaboratorio";

// Acciones de laboratorio
import {
  wsGetLabHistorico,
  wsGetLabPdf,
  wsGetLaboratorioGrafico,
} from "_+_HistoriaClinica/context/action/laboratorio/laboratorio";

const Laboratorio = () => {
  const { toasterState } = useContext(GlobalContext);
  const { laboratorioState, laboratorioDispatch, pacienteState } = useContext(
    HistoriaClinicaContext
  );

  // Estados locales para la funcionalidad de laboratorio
  const [mostrarPDF, setMostrarPDF] = useState(false);
  const [mostrarGrafico, setMostrarGrafico] = useState(false);
  const [estudiosSeleccionados, setEstudiosSeleccionados] = useState([]);
  const [pdfPaciente, setPdfPaciente] = useState(null);

  // Función para refrescar el NavTabBar si es necesario
  const refreshSeg = () => {
    // Función para refrescar el NavTabBar si es necesario
  };

  // Cargar datos iniciales
  useEffect(() => {
    // Función para obtener el ID del paciente
    const obtenerIdPaciente = () => {
      if (pacienteState.paciente.buscarPac?.value?.[0]?.id) {
        return pacienteState.paciente.buscarPac.value[0].id;
      }
      return null;
    };

    const idPac = obtenerIdPaciente();
    if (idPac) {
      // Cargar laboratorios del paciente (usando endpoint existente)
      wsGetLabHistorico(idPac, "")(laboratorioDispatch);

      // Cargar datos para el gráfico de laboratorio
      wsGetLaboratorioGrafico(idPac)(laboratorioDispatch);
    }
  }, [pacienteState.paciente.buscarPac, laboratorioDispatch]);

  // useEffect profesional para manejar la conversión del PDF del laboratorio
  useEffect(() => {
    const laboPdf = laboratorioState.laboratorio.laboPdf;

    // Validación robusta de los datos del PDF
    if (
      laboPdf &&
      laboPdf.value &&
      laboPdf.value !== "" &&
      laboPdf.isSuccess === true
    ) {
      try {
        // Función para convertir base64 a blob
        const base64ToBlob = (base64, type = "application/octet-stream") => {
          const binStr = atob(base64);
          const len = binStr.length;
          const arr = new Uint8Array(len);
          for (let i = 0; i < len; i++) {
            arr[i] = binStr.charCodeAt(i);
          }
          return new Blob([arr], { type: type, title: "Informe" });
        };

        // Convertir el PDF base64 a blob y crear URL
        const blob = base64ToBlob(laboPdf.value, "application/pdf");
        const pdfUrl = URL.createObjectURL(blob);

        // Actualizar estados
        setPdfPaciente(pdfUrl);
        setMostrarPDF(true);
      } catch (error) {
        console.error("Error al procesar el PDF del laboratorio:", error);
        setPdfPaciente(null);
        setMostrarPDF(false);
      }
    }
  }, [laboratorioState.laboratorio.laboPdf]);

  // Función para manejar la selección de un laboratorio
  const handleSeleccionarLaboratorio = (laboratorio) => {
    // Limpiar PDF anterior
    setMostrarPDF(false);
    setPdfPaciente(null);

    // Cargar PDF del laboratorio seleccionado
    if (
      laboratorio.codigo &&
      pacienteState.paciente.buscarPac?.value?.[0]?.documento
    ) {
      wsGetLabPdf(
        laboratorio.codigo,
        pacienteState.paciente.buscarPac.value[0].documento
      )(laboratorioDispatch);
    }
  };

  // Función para mostrar/ocultar gráfico
  const toggleGrafico = () => {
    setMostrarGrafico(!mostrarGrafico);
  };

  // Función para manejar la selección de estudios para el gráfico
  const handleEstudioSeleccionado = (
    estudio,
    seleccionado,
    todosSeleccionados
  ) => {
    setEstudiosSeleccionados(todosSeleccionados);
  };

  // Función para cerrar el visor de PDF
  const cerrarPDF = () => {
    setMostrarPDF(false);
    setPdfPaciente(null);
  };

  // Obtener datos del estado
  const laboratorios =
    laboratorioState.laboratorio.historico?.value ||
    laboratorioState.laboratorio.historico ||
    [];
  const datosGrafico = laboratorioState.laboratorio.datosGrafico;
  const filasGrafico = laboratorioState.laboratorio.datosGrafico?.filas || [];
  const columnasGrafico =
    laboratorioState.laboratorio.datosGrafico?.columnas || [];

  return (
    <>
      {toasterState.toaster.show && <Toaster />}
      <Loading
        dataLoading={
          laboratorioState.laboratorio.loading &&
          !laboratorioState.laboratorio.historico?.value
        }
        color="c-white"
        descripcion="Cargando laboratorios..."
      />
      <HeaderbarHome />
      <NavTabBar refreshNavTab={() => refreshSeg(false)} />

      <ContainerBody
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Primera fila: Tabla de laboratorios y Visor de PDF */}
        <div className="fila-contenido">
          {/* Columna izquierda: Tabla de laboratorios */}
          <div className="columna-izquierda">
            <h4 className="titulo-seccion">Resultados de estudios</h4>
            <TablaLaboratorio
              data={laboratorios}
              onSelectItem={handleSeleccionarLaboratorio}
              loading={laboratorioState.laboratorio.loading}
            />
            <button
              onClick={toggleGrafico}
              className="boton-primario"
              style={{ marginTop: "16px" }}
            >
              Ir al gráfico
            </button>
          </div>

          {/* Columna derecha: Visor de PDF */}
          <div className="columna-derecha">
            <VisorPDF
              pdfUrl={pdfPaciente}
              titulo="Resultados de laboratorio"
              onClose={cerrarPDF}
              visible={mostrarPDF && !!pdfPaciente}
            />
          </div>
        </div>

        {/* Segunda fila: Lista de estudios y Gráfico */}
        <div className="fila-contenido">
          {/* Columna izquierda: Lista de estudios */}
          <div className="columna-izquierda">
            <ListaEstudios
              estudios={filasGrafico}
              onEstudioSeleccionado={handleEstudioSeleccionado}
              maxSelecciones={3}
            />
          </div>

          {/* Columna derecha: Gráfico */}
          <div className="columna-derecha">
            <GraficoLaboratorio
              datosGrafico={datosGrafico}
              columnas={columnasGrafico}
              estudiosSeleccionados={estudiosSeleccionados}
              visible={mostrarGrafico}
              onToggleVisibility={toggleGrafico}
            />
          </div>
        </div>
      </ContainerBody>

      <ResponsiveStyles />
    </>
  );
};

export default Laboratorio;
