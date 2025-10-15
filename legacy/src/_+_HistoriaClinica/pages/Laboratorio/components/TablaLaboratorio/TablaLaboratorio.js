import React, { useState, useEffect } from "react";
import {
  ContainerTabla,
  TablaHeader,
  TablaBody,
  TablaRow,
  TablaCell,
  EmptyMessage,
} from "./localStyle";

/**
 * Componente de tabla para mostrar resultados de laboratorio
 * Muestra fecha, estado de validación y médico solicitante
 */
const TablaLaboratorio = ({ data = [], onSelectItem, loading = false }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  // Función para formatear fecha
  const formatFecha = (fecha) => {
    if (!fecha) return "-";
    const date = new Date(fecha);
    return date.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Función para obtener el estado de validación
  const getEstadoValidacion = (validado) => {
    return validado ? "Validado" : "Pendiente de validación";
  };

  // Función para manejar la selección de un item
  const handleSelectItem = (item) => {
    setSelectedItem(item);
    if (onSelectItem) {
      onSelectItem(item);
    }
  };

  // Si está cargando, mostrar mensaje
  if (loading) {
    return (
      <ContainerTabla>
        <EmptyMessage>Cargando laboratorios...</EmptyMessage>
      </ContainerTabla>
    );
  }

  // Si no hay datos, mostrar mensaje
  if (!data || data.length === 0) {
    return (
      <ContainerTabla>
        <EmptyMessage>No tiene estudios de laboratorio</EmptyMessage>
      </ContainerTabla>
    );
  }

  return (
    <ContainerTabla>
      <TablaHeader>
        <TablaCell width="100px">Fecha</TablaCell>
        <TablaCell width="150px">Validado</TablaCell>
        <TablaCell>Solicitante</TablaCell>
      </TablaHeader>

      <TablaBody>
        {data.map((item, index) => (
          <TablaRow
            key={index}
            selected={selectedItem?.codigo === item.codigo}
            onClick={() => handleSelectItem(item)}
          >
            <TablaCell width="100px">{formatFecha(item.fecha)}</TablaCell>
            <TablaCell width="150px">
              <span className={item.validado ? "validado" : "pendiente"}>
                {getEstadoValidacion(item.validado)}
              </span>
            </TablaCell>
            <TablaCell>{item.medico || "-"}</TablaCell>
          </TablaRow>
        ))}
      </TablaBody>
    </ContainerTabla>
  );
};

export default TablaLaboratorio;
