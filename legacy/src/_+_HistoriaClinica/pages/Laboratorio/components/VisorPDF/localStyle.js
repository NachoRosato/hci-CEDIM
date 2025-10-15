import styled from "styled-components";

export const ContainerVisor = styled.div`
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;

  /* Estilos profesionales para el iframe del PDF */
  .documentoPdf {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    background: #f8f9fa;
    flex: 1;
    min-height: 400px;
    max-height: calc(100vh - 200px);

    /* Laptops y pantallas grandes */
    @media (min-width: 1366px) {
      min-height: 500px;
      max-height: calc(100vh - 180px);
    }

    /* Tablets */
    @media (min-width: 769px) and (max-width: 1365px) {
      min-height: 450px;
      max-height: calc(100vh - 220px);
    }

    /* Móviles */
    @media (max-width: 768px) {
      min-height: 300px;
      max-height: calc(100vh - 250px);
    }
  }
`;

export const TituloPDF = styled.h3`
  margin: 0;
  color: #333;
  font-size: 18px;
  font-weight: 600;
`;

export const CloseButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transition: background-color 0.2s ease;

  &:hover {
    background: #c82333;
  }
`;
