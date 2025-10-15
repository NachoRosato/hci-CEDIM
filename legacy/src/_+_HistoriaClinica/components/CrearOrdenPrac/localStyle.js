import styled from "styled-components";

export const ContainerBox = styled.div`
  width: 100%;
  height: 750px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 38px;
  padding-right: 38px;
  position: relative;
  @media (max-width: 1366px) {
    padding-left: 2px;
    padding-right: 0px;
  }
`;

export const ContainerButtons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 65px;
  padding-right: 65px;
  position: absolute;
  bottom: 33px;
  @media (max-width: 1366px) {
    height: 50px;
    bottom: 0px;
    top: 450px;
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

export const ContainerBuscador = styled.div`
  background-color: var(--color-white);
  width: 100%;
  ${({ paso }) => {
    if (paso === 2) {
      return `height: auto;`;
    } else {
      return `height: 75px;`;
    }
  }}
  display: flex;
  justify-content: center;
  margin-bottom: 57px;
  box-shadow: 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
    0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725),
    0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
  border-radius: 16px;
  @media (max-width: 1366px) {
    width: 97%;
    margin-bottom: 20px;
  }
`;
export const BoxBuscador = styled.div`
  width: 100%;
  height: 75px;
  display: flex;
  align-items: center;
  padding: 22px;
  @media (max-width: 1366px) {
    height: 55px;
    padding: 15px;
    padding-top: 22px;
    div:first-child {
      font-size: 14px;
    }
  }
`;
export const BoxBuscadorPaso2 = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 22px 10px 22px;
  @media (max-width: 1366px) {
    padding: 0px 15px 10px 22px;
  }
`;

export const OrdenBox = styled.div`
  width: 100%;
  display: flex;
  padding-top: 8px;
`;
export const PrestacionesBox = styled.div`
  width: 510px;
  display: flex;
  gap: 15px;
`;
export const ListaPrestaciones = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: left;
`;

export const PresentacionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const PresentacionItem = styled.div`
  display: flex;
`;
export const PresentacionTitle = styled.div`
  width: 225px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
export const PresentacionRadios = styled.div`
  display: flex;
  padding-left: 10px;
  width: 42%;
`;
export const PrsRadItem = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 5px;
`;
export const PrsRadTitle = styled.div``;
export const PrsRadInput = styled.div``;
export const PresentacionTxtAd = styled.div`
  display: flex;
  align-items: center;
`;
export const PrsTxtAdTitle = styled.div``;
export const PrsTxtAdBoxInput = styled.div`
  height: 38px;
  padding-left: 10px;
  .prsTxtAdBoxInput-customcss {
    height: 30px !important;
  }
`;

export const BoxBuscadorItem = styled.div`
  width: 75%;
  margin-left: 29px;
  @media (max-width: 1366px) {
    width: 72%;
    margin-left: 15px;
  }
`;

export const BtnGenerarOrden = styled.button`
  width: 138px;
  height: 30px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border: none;
  ${({ habilitado }) => {
    if (habilitado) {
      return `cursor: pointer;`;
    } else {
      return `cursor: initial;`;
    }
  }}
`;

export const ContainerBody = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  ${({ paso }) => {
    if (paso === 2) {
      return `flex-direction: column; gap: 6px; padding: 0 3px;
      overflow-y: auto;
      overflow-x: hidden;
      ::-webkit-scrollbar-thumb {
          background: var(--color-dropdown-grey77);
          border-radius: 10px;
       }
     ::-webkit-scrollbar-thumb:hover {
           background: var(--color-grey65);
        }
      `;
    } else {
      return `flex-direction: row; gap: 25px; padding-right: 20px;`;
    }
  }}

  @media (max-width: 1366px) {
    ${({ paso }) => {
      if (paso === 2) {
        return `flex-direction: column; gap: 6px; padding: 0 3px;
      overflow-y: auto;
      overflow-x: hidden;
      ::-webkit-scrollbar-thumb {
          background: var(--color-dropdown-grey77);
          border-radius: 10px;
       }
     ::-webkit-scrollbar-thumb:hover {
           background: var(--color-grey65);
        }
           height: 260px;
      `;
      } else {
        return `flex-direction: row; gap: 10px; padding-right: 20px;`;
      }
    }}
  }
`;

export const ContainerMasUsados = styled.div`
  width: 33.3%;
  height: 310px;
  overflow-y: auto;
  padding: 0px 4px;
  ::-webkit-scrollbar-thumb {
    background: var(--color-dropdown-grey77);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-grey65);
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 1366px) {
    height: 213px;
  }
`;
export const MasUsadosTitle = styled.div`
  margin-bottom: 15px;
  @media (max-width: 1366px) {
    margin-bottom: 10px;
    margin-bottom: 10px;
    font-size: 14px !important;
    margin-top: 0px;
  }
`;

export const MasUsadosBoxItem = styled.div`
  width: 100%;
  height: 310px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MasUsadosItem = styled.div`
  width: 100%;
  max-width: 260px;
  height: 26px;
  min-height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 0px 19px 0px 19px;
  div:first-child {
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .iconAdjust {
    margin-left: 5px;
  }
  ${({ agregado }) => {
    if (agregado) {
      return `background-color: var(--color-latex10);`;
    } else {
      return `  background-color: var(--color-latex30);`;
    }
  }}
  @media (max-width: 1366px) {
    margin-bottom: 5px;
  }
`;

export const SinMasUsadosItem = styled.div`
  width: 100%;
  max-width: 260px;
  height: 60px;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  text-align: center;
  padding: 0px 19px 0px 19px;
  @media (max-width: 1366px) {
    div {
      font-size: 12px !important;
    }
  }
`;

export const ContainerRecomendados = styled.div`
  width: 33.3%;
  height: 310px;
  padding: 0px 4px;
  overflow-y: auto;
  overflow-x: hidden;
  ::-webkit-scrollbar-thumb {
    background: var(--color-dropdown-grey77);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-grey65);
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 1366px) {
    height: 223px;
  }
`;

export const RecomendadosTitle = styled.div`
  margin-bottom: 15px;
  width: max-content;
  @media (max-width: 1366px) {
    margin-bottom: 5px;
    font-size: 14px !important;
    width: 123px;
    margin-top: 0px;
  }
`;

export const RecomendadosBoxItem = styled.div`
  width: 100%;
  height: 310px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RecomendadosItem = styled.div`
  width: 100%;
  max-width: 260px;
  min-height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding: 0px 19px 0px 19px;
  div:first-child {
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .iconAdjust {
    margin-left: 5px;
  }
  ${({ agregado }) => {
    if (agregado) {
      return `background-color: var(--color-latex10);`;
    } else {
      return `  background-color: var(--color-latex30);`;
    }
  }}
  @media (max-width: 1366px) {
    margin-bottom: 5px;
    padding: 0px 11px 0px 11px;
  }
`;

export const ContainerResumen = styled.div`
  width: 33.3%;
  height: 300px;
  display: flex;
  flex-direction: column;
  @media (max-width: 1366px) {
    position: relative;
  }
`;

export const ResumenCard = styled.div`
  width: 301px;
  height: 233px;
  display: flex;
  flex-direction: column;
  background-color: var(--color-white);
  box-shadow: 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
    0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725),
    0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
  border-radius: 16px;
  min-height: 209px;
  margin-bottom: 16px;
  @media (max-width: 1366px) {
    width: 220px;
    margin-bottom: 5px;
  }
`;

export const ResumenCardTitle = styled.div`
  width: 100%;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-latex30);
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  span {
    margin-right: 5px;
  }
  @media (max-width: 1366px) {
    span:first-child {
      font-size: 14px !important;
    }
  }
`;

export const ResumenCardBody = styled.div`
  width: 100%;
  height: 156px;
  display: flex;
  flex-direction: column;
  padding-left: 15px;
  margin-top: 20px;
  background-color: var(--color-white);
  overflow-x: hidden;
  overflow-y: scroll;
  ::-webkit-scrollbar-thumb {
    background: var(--color-dropdown-grey77);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-grey65);
  }
  @media (max-width: 1366px) {
    margin-top: 10px;
    padding-left: 5px;
  }
`;

export const ResumenCardItem = styled.div`
  width: 100%;
  max-width: 250px;
  height: 16px;
  max-height: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 11px;
  div {
    width: 207px;
    min-width: 207px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-left: 7px;
  }
  span {
    margin-top: 4px;
  }
  @media (max-width: 1366px) {
    div {
      width: 207px;
      min-width: 157px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-left: 5px;
    }
  }
`;

export const ResumenDiagBox = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 11px;
`;

export const ResumenFechaBox = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BoxDiagnostico = styled.div`
  width: 103%;
  display: flex;
  height: 13%;
`;
export const BoxUnicoDiagnostico = styled.div`
  width: 62%;
  display: flex;
  justify-content: center;
  align-items: baseline;
`;
export const BoxUnicoDiagnosticoOrden = styled.div`
  width: 62%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 12px;
  @media (max-width: 1366px) {
    align-items: left;
    flex-direction: column;
    padding-bottom: 0px;
    .boxUnicoDiagnosticoOrden-customcssInput {
      width: 2%;
    }
  }
`;

export const BoxDiagnosticoTitle = styled.div`
  display: flex;
  align-items: center;
  margin-right: 6px;
  p {
    margin-right: 3px;
  }
  @media (max-width: 1366px) {
    p {
      font-size: 14px !important;
    }
  }
`;

export const BoxDiagnosticoInput = styled.div`
  width: 215px;
  padding-top: 32px;
  @media (max-width: 1366px) {
    width: 130px;
    padding-top: 0px;
  }
`;
export const BoxUnicoDiagnosticoInput = styled.div`
  width: 188px;
  @media (max-width: 1366px) {
    height: 62px;
  }
`;

export const BoxFecha = styled.div`
  width: 103%;
  display: flex;
  margin-top: 11px;
  @media (max-width: 1366px) {
    margin-top: 5px;
    position: absolute;
    right: 30px;
    bottom: 20px;
  }
`;
export const BoxFechaTitle = styled.div`
  display: flex;
  align-items: center;
  margin-right: 3px;
  p {
    width: max-content;
    margin-right: 3px;
  }
  @media (max-width: 1366px) {
    p {
      font-size: 14px !important;
    }
  }
`;
export const BoxFechaInput = styled.div`
  margin-left: 36px;
  .hc-ordenPrac-DatePickerCustom {
    gap: 7px;
    svg {
      margin-bottom: 2px;
    }
  }
  @media (max-width: 1366px) {
    margin-left: 10px;
    .hc-ordenPrac-DatePickerCustom {
      gap: 7px;
      svg {
        margin-bottom: 2px;
      }
    }
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

export const ContainerQst = styled.div`
  margin-bottom: 46px;
  width: 80%;
  text-align: center;
  @media (max-width: 1366px) {
    margin-bottom: 5px;
    span {
      font-size: 14px !important;
    }
  }
`;
export const ContainerQstP2 = styled.div`
  margin-bottom: 39px;
  width: 80%;
  text-align: center;
  @media (max-width: 1366px) {
    margin-bottom: 20px;
    span {
      font-size: 14px !important;
    }
  }
`;
export const ContainerTitle = styled.div`
  margin-top: 33px;
  margin-bottom: 28px;
  @media (max-width: 1366px) {
    margin-top: 5px;
    margin-bottom: 10px;
    span {
      font-size: 20px !important;
    }
  }
`;

export const ContainerBuscadorP1 = styled.div`
  background-color: var(--color-white);
  width: 90%;
  ${({ paso }) => {
    if (paso === 2) {
      return `height: auto;`;
    } else {
      return `height: 75px;`;
    }
  }}
  display: flex;
  justify-content: center;
  margin-bottom: 57px;
  box-shadow: 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
    0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725),
    0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
  border-radius: 16px;
  @media (max-width: 1366px) {
    height: 55px;
    margin-bottom: 30px;
  }
`;
