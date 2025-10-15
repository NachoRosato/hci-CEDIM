import styled from "styled-components";

export const ContainerGrafico = styled.div`
  width: 100%;
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
`;

export const TituloGrafico = styled.h3`
  margin: 0 0 20px 0;
  color: #333;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
`;

export const MensajeSinDatos = styled.div`
  padding: 60px 20px;
  text-align: center;
  color: #6c757d;
  font-style: italic;
  background: #f8f9fa;
  border-radius: 4px;
  border: 1px dashed #dee2e6;
`;

export const BotonVerGrafico = styled.button`
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  width: 100%;

  &:hover {
    background: #0056b3;
  }

  &:active {
    transform: translateY(1px);
  }
`;
