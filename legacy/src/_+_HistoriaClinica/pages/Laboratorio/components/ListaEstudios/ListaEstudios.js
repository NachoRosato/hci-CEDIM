import React, { useState, useEffect } from "react";
import {
  ContainerLista,
  ListaHeader,
  ListaBody,
  EstudioItem,
  CheckboxContainer,
  EstudioNombre,
  Separador,
  AlertaContainer,
} from "./localStyle";

/**
 * Componente para mostrar lista de estudios con checkboxes
 * Permite seleccionar estudios para mostrar en el gráfico
 */
const ListaEstudios = ({
  estudios = [],
  onEstudioSeleccionado,
  maxSelecciones = 3,
}) => {
  const [estudiosSeleccionados, setEstudiosSeleccionados] = useState([]);

  // Función para manejar la selección/deselección de un estudio
  const handleEstudioChange = (estudio) => {
    const isSelected = estudiosSeleccionados.some((e) => e.id === estudio.id);

    if (isSelected) {
      // Deseleccionar estudio
      const nuevosSeleccionados = estudiosSeleccionados.filter(
        (e) => e.id !== estudio.id
      );
      setEstudiosSeleccionados(nuevosSeleccionados);
      if (onEstudioSeleccionado) {
        onEstudioSeleccionado(estudio, false, nuevosSeleccionados);
      }
    } else {
      // Verificar límite de selecciones
      if (estudiosSeleccionados.length >= maxSelecciones) {
        return; // No permitir más selecciones
      }

      // Seleccionar estudio
      const nuevosSeleccionados = [...estudiosSeleccionados, estudio];
      setEstudiosSeleccionados(nuevosSeleccionados);
      if (onEstudioSeleccionado) {
        onEstudioSeleccionado(estudio, true, nuevosSeleccionados);
      }
    }
  };

  // Función para verificar si un estudio está seleccionado
  const isEstudioSeleccionado = (estudio) => {
    return estudiosSeleccionados.some((e) => e.id === estudio.id);
  };

  // Función para verificar si se puede seleccionar más estudios
  const puedeSeleccionarMas = () => {
    return estudiosSeleccionados.length < maxSelecciones;
  };

  // Si no hay estudios, mostrar mensaje
  if (!estudios || estudios.length === 0) {
    return (
      <ContainerLista>
        <ListaHeader>
          <h4>Estudios disponibles</h4>
        </ListaHeader>
        <ListaBody>
          <div
            style={{ padding: "20px", textAlign: "center", color: "#6c757d" }}
          >
            No hay estudios disponibles
          </div>
        </ListaBody>
      </ContainerLista>
    );
  }

  return (
    <ContainerLista>
      <ListaHeader>
        <h4>Estudios disponibles</h4>
        <AlertaContainer>
          <strong>¡Atención!</strong>
          <span>
            Los resultados de laboratorio son los realizados en nuestros centros
            de Dim.
          </span>
        </AlertaContainer>
      </ListaHeader>

      <ListaBody>
        {estudios.map((estudio, index) => (
          <div key={estudio.id || index}>
            <EstudioItem>
              <CheckboxContainer>
                <input
                  type="checkbox"
                  id={`estudio-${estudio.id || index}`}
                  checked={isEstudioSeleccionado(estudio)}
                  onChange={() => handleEstudioChange(estudio)}
                  disabled={
                    !isEstudioSeleccionado(estudio) && !puedeSeleccionarMas()
                  }
                />
                <label htmlFor={`estudio-${estudio.id || index}`}>
                  <span className="checkmark"></span>
                </label>
              </CheckboxContainer>

              <EstudioNombre>
                {estudio.nombre || estudio.descripcion || "Estudio sin nombre"}
              </EstudioNombre>
            </EstudioItem>

            {index < estudios.length - 1 && <Separador />}
          </div>
        ))}
      </ListaBody>
    </ContainerLista>
  );
};

export default ListaEstudios;
