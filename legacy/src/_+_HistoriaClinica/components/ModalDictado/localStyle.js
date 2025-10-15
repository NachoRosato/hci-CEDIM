import styled from "styled-components";

export const ContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px 20px;
  height: 70vh;
  justify-content: space-between;
  @media (max-width: 1366px) {
    overflow-y: auto;
    padding: 0px 50px;
    height: 78vh;
  }
`;

export const FloatFlechaIzq = styled.div`
  display: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 40vh;
  margin-left: 10px;
  @media (max-width: 1366px) {
    display: block;
  }
`;

export const FloatFlechaDer = styled(FloatFlechaIzq)`
  right: 16px;
`;

export const ContainerGrabar = styled.div`
  display: flex;
  text-align: left;
  flex-direction: column;
  width: 90vh;
  padding: 20px 20px;
  align-items: center;
  gap: 20px;
  @media (max-width: 1366px) {
    width: 140vh;
  }
`;

export const PasoTitle = styled.p`
  font-size: 18px;
  font-weight: 500;
  text-align: center;
`;

export const GIFContainer = styled.div`
  display: flex;
  gap: 40px;
  .titleBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

export const FlechasBox = styled.div`
  display: flex;
  gap: 40px;
  @media (max-width: 1366px) {
    display: none;
  }
`;

export const FlechaBtn = styled.div`
  border-radius: 50%;
  width: 30px;
  height: 30px;
`;

export const PuntosBox = styled.div`
  display: flex;
  gap: 18px;
  .puntos {
    width: 10px;
    height: 10px;
    border-radius: 50%;
  }
  @media (max-width: 1366px) {
    display: none;
  }
`;

export const ContainerButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 25px;
`;

export const BtnAceptar = styled.button`
  width: 150px;
  height: 44px;
  box-shadow: 3px 7px 11px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 16px;
  bottom: 16px;
  background: var(--color-latex30);
  justify-content: flex-end;
`;
