import styled from "styled-components";

export const ContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 750px;
  padding-left: 75px;
  padding-right: 75px;
  position: relative;
  @media (max-width: 1366px) {
    padding-left: 35px;
    padding-right: 35px;
  }
`;

export const ContainerButtons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 80px;
  padding-right: 80px;
  position: absolute;
  bottom: 33px;
  @media (max-width: 1366px) {
    bottom: 270px;
  }
`;

export const BtnCerrar = styled.button`
  width: 150px;
  height: 30px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: var(--color-latex30);
`;

export const BtnGenerarOrden = styled.button`
  width: 138px;
  height: 30px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: var(--color-primary);
`;

export const ContainerTitle = styled.div`
  margin-top: 23px;
  margin-bottom: 40px;
  @media (max-width: 1366px) {
    margin-top: 5px;
    margin-bottom: 5px;
    span {
      font-size: 20px !important;
    }
  }
`;
export const ContainerQst = styled.div`
  text-align: center;
  margin-bottom: 39px;
  @media (max-width: 1366px) {
    margin-bottom: 10px;
    span {
      font-size: 16px !important;
    }
  }
`;

export const ContainerOrden = styled.div`
  margin-bottom: 22px;
  @media (max-width: 1366px) {
    margin-bottom: 12px;
  }
`;

export const ContainerOrdenBox = styled.div`
  width: 812px;
  height: 323px;
  background: var(--color-white);
  box-shadow: 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
    0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725),
    0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  @media (max-width: 1366px) {
    width: 612px;
    height: 165px;
  }
`;

export const ContainerDatosOrden = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: flex-start;
`;
export const ContainerOrdenTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  @media (max-width: 1366px) {
    span {
      font-size: 15px !important;
    }
  }
`;
export const ContainerOrdenBody = styled.div`
  display: flex;
  flex-direction: column;
  height: 89%;
  padding: 11px 0px 10px 17px;
`;

export const ContainerOrdenItems = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(4, 171px);
  grid-auto-rows: 35px;
  grid-column-gap: 15px;
  text-align: left;
  overflow-y: scroll;
  overflow-x: hidden;
  div {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  @media (max-width: 1366px) {
    grid-template-columns: repeat(3, 171px);
    grid-auto-rows: 30px;
    grid-column-gap: 15px;
  }
`;

export const ContainerAdicionales = styled.div`
  width: 100%;
  height: 173px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  @media (max-width: 1366px) {
    height: 180px;
  }
`;
export const ContainerBuscador = styled.div`
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 13px;
  @media (max-width: 1366px) {
    margin-bottom: 0px;
    margin-left: 16px;
  }
`;
export const BoxBuscador = styled.div`
  width: 95%;
  height: 100%;
  display: flex;
  margin-bottom: 13px;
  @media (max-width: 1366px) {
    margin-bottom: 7px;
  }
`;
export const BoxBuscadorTitle = styled.div`
  display: flex;
  align-items: center;
  margin-right: 16px;
  width: 24%;
  @media (max-width: 1366px) {
    width: 32%;
    p {
      font-size: 14px !important;
    }
  }
`;
export const BoxBuscadorInput = styled.div`
  width: 100%;
`;

export const BoxFecha = styled.div`
  width: 100%;
  display: flex;
  margin-top: 18px;
`;
export const BoxFechaTitle = styled.div`
  display: flex;
  align-items: center;
  margin-right: 6px;
  p {
    margin-right: 3px;
  }
`;
export const BoxFechaInput = styled.div``;
export const ContainerCantDeter = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
  @media (max-width: 1366px) {
    margin-left: 16px;
    p {
      font-size: 14px !important;
    }
  }
`;
export const ContainerAdicionalesItems = styled.div`
  width: 798px;
  height: 150px;
  display: flex;
  overflow-x: hidden;
  overflow-y: scroll;
  flex-wrap: wrap;
  padding: 2px 0px 0px 6px;
  @media (max-width: 1366px) {
    width: 598px;
    margin-left: 70px;
  }
`;

export const BtnAdicionales = styled.button`
  width: 100%;
  max-width: 216px;
  height: 25px;
  max-height: 25px;
  margin: 0px 8px 8px 0px;
  padding: 0px 8px 0px 8px;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  background: #f2f2f2;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .btnAdicional-span {
    width: 90%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;

    /* display: flex;
    margin-bottom: 9px;
    justify-content: flex-end;
    text-decoration: underline; */
    .hc-cardOrdenLabo-verDeter-tooltip {
      width: 200px;
      color: var(--color-white);
      span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: left;
      }
    }
    .hc-cardOrdenLabo-verDeter-tooltip::before {
      top: calc(100% - 10px);
      background-color: var(--color-latex30);
      border: none;
      left: 100px;
    }
    .hc-cardOrdenLabo-verDeter-tooltip > span {
      color: var(--color-white);
    }
    .wrapper .icon .tooltip {
      background-color: var(--color-latex30);
      left: 0ppx;
      border: none;
      /* top: -135px; */
    }
  }
  .btnAdcional-padAdjust {
    padding-top: 5px;
  }
`;

export const ContainerChecks = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  cursor: pointer;
`;

export const BoxChecksDescItem = styled.div`
  width: 74%;
  span {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

export const CerrarCmp = styled.div`
  width: max-content;
  cursor: pointer;
  margin-top: 28px;
  margin-left: 31px;
  display: flex;
  align-items: center;
  gap: 6px;
  div {
    transform: rotate(180deg);
  }
  span {
    padding-top: 3px;
  }
  @media (max-width: 1366px) {
    margin-top: 13px;
    margin-left: 16px;
  }
`;
