import styled from "styled-components";

// Contenedor principal
export const RecetaPDFContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  padding: 24px;
  background: #f8f9fa;
  border-radius: 12px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 16px;
    max-height: 85vh;
  }
`;

// Grid para múltiples recetas
export const RecetaGrid = styled.div`
  display: grid;
  gap: 24px;
  margin-bottom: 24px;
  width: 100%;
  max-width: 100%;

  @media (max-width: 768px) {
    gap: 16px;
  }
`;

// Tarjeta de receta individual
export const RecetaCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e9ecef;
  overflow: hidden;
  transition: all 0.3s ease;
  max-width: 100%;
  min-width: 0;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }
`;

// Header de la tarjeta
export const RecetaCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background: linear-gradient(135deg, #6c757d 0%, #495057 100%);
  color: white;
`;

export const RecetaTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 12px;

  svg {
    width: 24px;
    height: 24px;
    fill: currentColor;
  }
`;

export const RecetaBadge = styled.span`
  background: rgba(255, 255, 255, 0.2);
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
`;

export const RecetaStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

// Botón para ver información
export const BtnVerInformacion = styled.button`
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s ease;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  gap: 6px;

  &::before {
    content: "▼";
    font-size: 10px;
    transition: transform 0.2s ease;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &.expanded::before {
    transform: rotate(180deg);
  }
`;

// Cuerpo de la tarjeta
export const RecetaCardBody = styled.div`
  padding: 24px;
  max-width: 100%;
  min-width: 0;
  overflow: hidden;
`;

export const RecetaInfo = styled.div`
  margin-bottom: 20px;
  max-width: 100%;
  min-width: 0;
  overflow: hidden;
`;

export const RecetaDate = styled.div`
  color: #6c757d;
  font-size: 14px;
  margin-bottom: 16px;
  padding: 8px 12px;
  background: #f8f9fa;
  border-radius: 6px;
  border-left: 4px solid #667eea;
`;

// Información colapsible
export const RecetaInfoCollapsible = styled.div`
  animation: slideDown 0.3s ease-out;
  max-width: 100%;
  min-width: 0;
  overflow: hidden;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Lista de medicamentos
export const RecetaMedicamentosList = styled.div`
  strong {
    color: #495057;
    font-size: 16px;
    margin-bottom: 12px;
    display: block;
  }

  p {
    word-wrap: break-word;
    overflow-wrap: break-word;
    max-width: 100%;
    margin: 8px 0;
    line-height: 1.4;
  }
`;

export const RecetaMedicamentoItem = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  border-left: 4px solid #28a745;
  max-width: 100%;
  min-width: 0;
  overflow: hidden;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const RecetaMedicamentoName = styled.div`
  font-weight: 600;
  color: #212529;
  font-size: 16px;
  margin-bottom: 8px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
`;

export const RecetaMedicamentoDetails = styled.div`
  display: grid;
  gap: 8px;
  font-size: 14px;
  color: #6c757d;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
`;

export const RecetaMedicamentoDosage = styled.div`
  strong {
    color: #495057;
  }
`;

export const RecetaMedicamentoDiagnosis = styled.div`
  strong {
    color: #495057;
  }
`;

export const RecetaMedicamentoObservations = styled.div`
  strong {
    color: #495057;
  }
  font-style: italic;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
`;

// Estilo para el contenedor de información general cuando no hay medicamentos
export const RecetaInfoGeneral = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  border-left: 4px solid #007bff;
  max-width: 100%;
  min-width: 0;
  overflow: hidden;

  p {
    word-wrap: break-word;
    overflow-wrap: break-word;
    max-width: 100%;
    margin: 8px 0;
    line-height: 1.4;
    color: #6c757d;

    strong {
      color: #495057;
      font-weight: 600;
    }
  }
`;

// Contenedor del visor de PDF
export const PDFViewerContainer = styled.div`
  margin-top: 20px;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  overflow: hidden;
  background: white;
`;

export const PDFViewerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
`;

export const PDFViewerTitle = styled.h4`
  margin: 0;
  font-size: 16px;
  color: #495057;
  font-weight: 600;
`;

export const PDFViewerClose = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  color: #6c757d;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: #e9ecef;
    color: #495057;
  }
`;

export const PDFViewerContent = styled.div`
  height: 400px;
  overflow: hidden;
`;

export const PDFIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

// Acciones de la tarjeta
export const RecetaCardActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding: 20px 24px;
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
    padding: 16px;
  }
`;

// Botones
export const BtnVerPDF = styled.button`
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
    filter: brightness(1.2);
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const BtnAnular = styled(BtnVerPDF)``;

// Contenedor de botones principales
export const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0 0 0;
  border-top: 1px solid #e9ecef;
  margin-top: 20px;
`;

export const BtnConfirmar = styled.button`
  border: none;
  padding: 12px 32px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;

// Estado vacío
export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6c757d;
  font-size: 18px;

  p {
    margin: 0;
    font-weight: 500;
  }
`;

// Estilos legacy para compatibilidad (mantener los originales)
export const RecetaPDFListContainer = styled.div`
  max-width: 800px;
  max-height: 70vh;
  overflow-y: auto;
  padding: 20px;
`;

export const RecetaItem = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  background-color: #fafafa;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-color: #ccc;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const RecetaHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const RecetaMedicamentos = styled.div`
  color: #666;
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 16px;
`;

export const RecetaActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

export const PDFContainer = styled.div``;

export const ExpandButton = styled.button``;

export const RecetaContent = styled.div``;

// Estilos legacy del CSS original
export const InformePDFContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const InformePDFPDF = styled.div`
  max-height: calc(70vh - 0px);
  width: 850px;
  height: 630px;
  left: 146px;
  top: 118px;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
`;
