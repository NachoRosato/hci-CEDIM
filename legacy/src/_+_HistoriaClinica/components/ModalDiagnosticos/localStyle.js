import styled from "styled-components";
// Estilos
export const Container = styled.div`
  /* height: 300px; */
  width: 100%;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

export const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #1a365d;
  padding: 20px;
`;

export const ItemBox = styled.div`
  display: flex;
  align-items: center;
  background-color: #008ddd;
  border: 2px solid #008ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
  border-radius: 8px;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    border: 2px solid #005f8c;
  }
  .diagnostico-accion {
    padding: 12px 16px 12px 16px;
    /* position: absolute; */
    /* right: 11vh; */
    transition: all 0.2s ease-in-out;
    color: var(--color-grey77);
    border-left: 2px solid #005f8c;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    :hover {
      color: white;
      cursor: pointer;
      background-color: #005f8c;
    }
  }
  @media (max-width: 1366px) {
    .diagnostico-accion {
      right: 20vh;
    }
  }
`;

export const BodyDiagnosticos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;
  padding-bottom: 20px;
  width: 68%;
  .diagnostico-item {
    padding: 12px;
    width: 100%;
  }
  .diagnostico-text {
    font-size: 16px;
    margin: 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 360px;
    overflow: hidden;
  }
  @media (max-width: 1366px) {
    width: 68vh;
    .diagnostico-text {
      width: 420px;
    }
  }
`;
