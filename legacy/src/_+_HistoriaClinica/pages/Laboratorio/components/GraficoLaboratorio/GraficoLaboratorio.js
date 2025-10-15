import React, { useEffect, useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  ContainerGrafico,
  TituloGrafico,
  MensajeSinDatos,
  BotonVerGrafico,
} from "./localStyle";

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

/**
 * Componente para mostrar gráfico de evolución de estudios de laboratorio
 * Utiliza Chart.js para renderizar gráficos de líneas
 */
const GraficoLaboratorio = ({
  datosGrafico = null,
  columnas = [],
  estudiosSeleccionados = [],
  visible = false,
  onToggleVisibility,
}) => {
  // Colores para diferentes estudios
  const colores = ["#2196f3", "#4caf50", "#ff9800", "#f44336", "#9c27b0"];

  // Procesar datos para Chart.js
  const chartData = useMemo(() => {
    if (
      !datosGrafico ||
      !datosGrafico.filas ||
      estudiosSeleccionados.length === 0
    ) {
      return {
        labels: [],
        datasets: [],
      };
    }

    // Obtener fechas únicas y ordenarlas
    const fechas = [
      ...new Set(datosGrafico.filas.map((fila) => fila.fecha)),
    ].sort();

    if (fechas.length === 0) {
      return {
        labels: [],
        datasets: [],
      };
    }

    // Crear labels (fechas formateadas)
    const labels = fechas.map((fecha) =>
      new Date(fecha).toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "2-digit",
      })
    );

    // Crear datasets para cada estudio seleccionado
    const datasets = estudiosSeleccionados.map((estudio, index) => {
      const color = colores[index % colores.length];
      const nombreEstudio = estudio.nombre || estudio.descripcion || "Estudio";

      // Obtener datos para este estudio
      const data = fechas.map((fecha) => {
        const dato = datosGrafico.filas.find(
          (fila) =>
            fila.fecha === fecha &&
            (fila.estudio === estudio.nombre ||
              fila.estudio === estudio.descripcion)
        );
        return dato ? parseFloat(dato.valor) || 0 : null;
      });

      return {
        label: nombreEstudio,
        data: data,
        borderColor: color,
        backgroundColor: color + "20", // Agregar transparencia
        borderWidth: 2,
        fill: false,
        tension: 0.1,
        pointBackgroundColor: color,
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      };
    });

    return {
      labels,
      datasets,
    };
  }, [datosGrafico, estudiosSeleccionados, colores]);

  // Opciones del gráfico
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        titleColor: "#333",
        bodyColor: "#333",
        borderColor: "#ccc",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Fechas",
        },
        grid: {
          color: "#f0f0f0",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Valores",
        },
        grid: {
          color: "#f0f0f0",
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
  };

  // Debug
  useEffect(() => {
    console.log("🔍 Debug GraficoLaboratorio:", {
      datosGrafico,
      estudiosSeleccionados,
      filas: datosGrafico?.filas?.length || 0,
      chartData,
    });
  }, [datosGrafico, estudiosSeleccionados, chartData]);

  // Si no está visible, mostrar botón para ver gráfico
  if (!visible) {
    return (
      <ContainerGrafico>
        <BotonVerGrafico onClick={onToggleVisibility}>
          Ir al gráfico
        </BotonVerGrafico>
      </ContainerGrafico>
    );
  }

  // Si no hay estudios seleccionados, mostrar mensaje
  if (estudiosSeleccionados.length === 0) {
    return (
      <ContainerGrafico>
        <TituloGrafico>Evolución de Estudios</TituloGrafico>
        <MensajeSinDatos>
          Seleccione estudios de la lista para visualizar su evolución
        </MensajeSinDatos>
      </ContainerGrafico>
    );
  }

  return (
    <ContainerGrafico>
      <TituloGrafico>Evolución de Estudios</TituloGrafico>
      <div style={{ width: "100%", height: "400px" }}>
        <Line data={chartData} options={options} />
      </div>
    </ContainerGrafico>
  );
};

export default GraficoLaboratorio;
