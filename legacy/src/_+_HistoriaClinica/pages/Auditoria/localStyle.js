import styled from "styled-components";
import { motion } from "framer-motion";

export const ContainerBody = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 14px;
  padding-left: 34px;
  padding-right: 50px;
  padding-bottom: 39px;
  height: 190%;
  @media (max-width: 1366px) {
    padding-top: 20px;
  }
`;
export const ContainerOpcBar = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 50px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
`;
export const ContainerOpcItems = styled.button`
  width: max-content;
  height: 53px;
  margin-right: 44px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  border: none;
  background-color: transparent;
  &::after {
    content: "";
    width: 100%;
    height: 6px;
    background: var(--color-latex30);
    position: absolute;
    bottom: 3px;
    opacity: 0;
    transition: 0.5s all;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    ${({ active }) => {
      if (active) {
        return `opacity: 1`;
      } else {
        return `opacity: 0`;
      }
    }}
  }
`;
export const ContainerOpcIcon = styled.div`
  margin-right: 15px;
`;
export const ContainerOpcText = styled.div``;

export const AuditoriaContainer = styled(motion.div)``;

export const ContainerTitleFilters = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px 80px 0px 52px;
`;
export const ContainerTitle = styled.div``;

export const ContainerAudCboFecha = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ContainerAudFechaDesde = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
`;
export const ContainerAudFechaHasta = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  margin-left: 30px;
`;
export const ContainerAudFechaTitle = styled.div`
  min-width: 100px;
`;
export const ContainerAudFechaDrop = styled.div`
  width: 135px;
  margin-left: 5px;
  .hc-previsualizarCmp-fixedbottom {
    bottom: 140px;
  }
`;

export const ContainerRefresh = styled.div`
  width: 160px;
  height: 60px;
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  margin-right: 44px;
`;

export const RefreshButton = styled.button`
  background: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  -webkit-animation: spin 4s linear infinite;
  -moz-animation: spin 4s linear infinite;
  animation: spin 3s linear infinite;

  @-moz-keyframes spin {
    100% {
      -moz-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

export const BtnRDiag = styled.button`
  width: 95px;
  height: 25px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: var(--color-primary);
  margin-right: 5px;
`;

export const BtnCDiag = styled.button`
  width: 95px;
  height: 25px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: var(--color-primary);
  margin-right: 5px;
`;

export const BtnODiag = styled.button`
  width: 33px;
  height: 25px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border: 2px solid var(--color-primary);
  cursor: pointer;
  background: var(--color-white);
  margin-top: 6px;
  span {
    margin-left: 4px;
  }
`;
