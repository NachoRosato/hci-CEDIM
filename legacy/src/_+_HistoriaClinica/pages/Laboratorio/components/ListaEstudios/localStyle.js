import styled from "styled-components";

export const ContainerLista = styled.div`
  width: 100%;
  height: 400px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

export const ListaHeader = styled.div`
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
  background: #f8f9fa;

  h4 {
    margin: 0 0 12px 0;
    color: #333;
    font-size: 16px;
    font-weight: 600;
  }
`;

export const ListaBody = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
`;

export const EstudioItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f8f9fa;
  }
`;

export const CheckboxContainer = styled.div`
  position: relative;
  margin-right: 12px;

  input[type="checkbox"] {
    opacity: 0;
    position: absolute;
    cursor: pointer;
  }

  label {
    display: block;
    width: 18px;
    height: 18px;
    border: 2px solid #ddd;
    border-radius: 3px;
    cursor: pointer;
    position: relative;
    transition: all 0.2s ease;

    &:hover {
      border-color: #007bff;
    }
  }

  input[type="checkbox"]:checked + label {
    background-color: #007bff;
    border-color: #007bff;

    .checkmark {
      display: block;
    }
  }

  input[type="checkbox"]:disabled + label {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .checkmark {
    display: none;
    position: absolute;
    top: 2px;
    left: 5px;
    width: 4px;
    height: 8px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;

export const EstudioNombre = styled.span`
  font-size: 12px;
  color: #333;
  font-weight: 500;
  flex: 1;
`;

export const Separador = styled.div`
  height: 1px;
  background: #e0e0e0;
  margin: 0 16px;
`;

export const AlertaContainer = styled.div`
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 12px;

  strong {
    color: #856404;
    margin-right: 4px;
  }

  span {
    color: #6c757d;
  }
`;
