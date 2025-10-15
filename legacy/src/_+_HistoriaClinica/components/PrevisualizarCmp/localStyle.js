import styled from "styled-components";

export const ContainerPreImpr = styled.div`
  margin-top: 140px;
  width: 100%;
  display: flex;
  justify-content: left;
  flex-direction: column;
  position: relative;
  @media (max-width: 1366px) {
    margin-top: 97px;
    width: 100%;
  }
`;

export const ContainerPITitle = styled.div`
  margin-bottom: 15px;
  @media (max-width: 1366px) {
    font-size: 14px !important;
    margin-bottom: 5px;
  }
`;

export const ContainerPICentro = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  margin-bottom: 12px;
  @media (max-width: 1366px) {
    margin-bottom: 6px;
  }
`;
export const ContainerPICentroTitle = styled.div`
  @media (max-width: 1366px) {
    font-size: 14px !important;
  }
`;
export const ContainerPICentroDrop = styled.div`
  width: 100%;
  margin-left: 9.75px;
  @media (max-width: 1366px) {
    width: 80%;
    .rspWidth {
      width: 315px;
    }
  }
`;

export const ContainerPICbo = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 12px;
`;

export const ContainerPICboFecha = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

export const ContainerPIMed = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  margin-bottom: 12px;
  @media (max-width: 1366px) {
    margin-bottom: 6px;
  }
`;
export const ContainerPIMedTitle = styled.div`
  @media (max-width: 1366px) {
    font-size: 14px !important;
  }
`;
export const ContainerPIMedDrop = styled.div`
  margin-left: 6.75px;
  @media (max-width: 1366px) {
    width: 80%;
    .rspWidth {
      width: 315px;
    }
  }
`;

export const ContainerPIEsp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  margin-bottom: 12px;
  @media (max-width: 1366px) {
    margin-bottom: 1px;
  }
`;
export const ContainerPIEspTitle = styled.div`
  @media (max-width: 1366px) {
    font-size: 14px !important;
  }
`;
export const ContainerPIEspDrop = styled.div`
  margin-left: 6.75px;
  @media (max-width: 1366px) {
    width: 80%;
    .rspWidth {
      width: 315px;
    }
  }
`;

export const ContainerPIFechaDesde = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
`;
export const ContainerPIFechaHasta = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  margin-left: 30px;
  @media (max-width: 1366px) {
    margin-left: 10px;
  }
`;
export const ContainerPIFechaTitle = styled.div`
  min-width: 100px;
  @media (max-width: 1366px) {
    font-size: 14px !important;
    min-width: 40px;
    padding-top: 3px;
  }
`;
export const ContainerPIFechaDrop = styled.div`
  width: 135px;
  margin-left: 5px;
  .hc-previsualizarCmp-fixedbottom {
    bottom: 140px;
  }
  @media (max-width: 1366px) {
    .hc-previsualizarCmp-fixedbottom {
      bottom: 220px;
    }
  }
`;

export const ContainerPIBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  .talonCheckContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    label {
      padding-left: 10px;
    }
  }
`;
export const PIBtn = styled.button`
  width: 150px;
  height: 36px;
  color: var(--color-white);
  background-color: var(--color-primary);
  border: none;
  border-radius: 8px;
`;
