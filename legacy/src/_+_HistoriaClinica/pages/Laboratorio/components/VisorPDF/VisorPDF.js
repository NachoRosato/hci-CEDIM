import React from "react";
import { ContainerVisor, TituloPDF, CloseButton } from "./localStyle";

/**
 * Componente para visualizar PDFs de resultados de laboratorio
 * Muestra el PDF en base64 y permite cerrarlo
 */
const VisorPDF = ({
  pdfUrl,
  titulo = "Resultados de laboratorio",
  onClose,
  visible = false,
}) => {
  // Si no está visible o no hay URL del PDF, no mostrar nada
  if (!visible || !pdfUrl) {
    return null;
  }

  // Función para obtener la fecha actual formateada
  const getFechaActual = () => {
    const fecha = new Date();
    return fecha.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <ContainerVisor>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
        }}
      >
        <TituloPDF>
          {titulo} - {getFechaActual()}
        </TituloPDF>
        {onClose && <CloseButton onClick={onClose}>✕</CloseButton>}
      </div>

      <iframe
        title="informe"
        className="documentoPdf"
        src={pdfUrl}
        type="application/octet-stream"
      />
    </ContainerVisor>
  );
};

export default VisorPDF;
