import styled from "styled-components";

export const ContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 750px;
  padding-left: 66px;
  padding-right: 66px;
  position: relative;
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
    /* top: 100px; */
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

export const BtnUrgenciaNomenc = styled.button`
  width: 180px;
  height: 30px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: var(--color-latex30);
  color: white;
  font-size: 16px;
  font-weight: 500;
  margin-left: 12px;
  transition: background 0.2s;
  position: relative;

  &:hover {
    background: var(--color-latex10);
  }
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
  width: 70%;
  text-align: center;
  margin-bottom: 52px;
  @media (max-width: 1366px) {
    margin-bottom: 30px;
    span {
      font-size: 16px !important;
    }
  }
`;

export const ContainerOrden = styled.div`
  display: flex;
  flex-direction: row;
  gap: 45px;
  @media (max-width: 1366px) {
    gap: 10px;
  }
`;

export const ContainerOrdenBox = styled.div`
  width: 428px;
  height: 337px;
  background: var(--color-white);
  box-shadow: 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
    0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725),
    0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  @media (max-width: 1366px) {
    width: 300px;
    height: 270px;
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
    height: 25px;
    span {
      font-size: 14px !important;
    }
  }
`;
export const ContainerOrdenBody = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 17px 30px 18px 30px;
  @media (max-width: 1366px) {
    height: 100%;
    padding: 10px 20px 10px 20px;
  }
`;

export const ContainerOrdenItems = styled.div`
  display: grid;
  /* grid-auto-flow: column; //not working */
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(3, 103px);
  grid-auto-rows: 18px;
  grid-column-gap: 28px;
  text-align: left;
  overflow-y: scroll;
  overflow-x: hidden;
  div {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  @media (max-width: 1366px) {
    height: 100%;
    grid-template-columns: repeat(2, 103px);
    grid-auto-rows: 18px;
    grid-column-gap: 28px;
  }
`;
export const ContainerModifButton = styled.div`
  display: flex;
  justify-content: center;
`;
export const BtnModificar = styled.button`
  width: 146px;
  height: 30px;
  box-shadow: 0px 90.2394px 72.1915px rgba(0, 0, 0, 0.07),
    0px 37.6999px 30.1599px rgba(0, 0, 0, 0.0503198),
    0px 20.1562px 16.1249px rgba(0, 0, 0, 0.0417275),
    0px 11.2994px 9.0395px rgba(0, 0, 0, 0.035),
    0px 6.00101px 4.80081px rgba(0, 0, 0, 0.0282725),
    0px 2.49716px 1.99772px rgba(0, 0, 0, 0.0196802);
  border-radius: 8px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    padding-left: 10px;
    padding-top: 3px;
  }
  @media (max-width: 1366px) {
    height: 25px;
    font-size: 14px !important;
  }
`;

export const BoxDatosPac = styled.div`
  width: 330px;
  height: 98px;
  border-radius: 16px;
  padding: 11px 0px 11px 15px;
  text-align: left;
  margin-bottom: 55px;
  p {
    padding-bottom: 2px;
  }
  @media (max-width: 1366px) {
    margin-bottom: 25px;
  }
`;
export const BoxDiagnostico = styled.div`
  width: 95%;
  display: flex;
  height: 13%;
  margin-top: 22px;
  @media (max-width: 1366px) {
    margin-top: 15px;
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
    margin-top: 5px;
  }
`;
export const BoxDiagnosticoInput = styled.div`
  width: 215px;
`;
export const BoxFecha = styled.div`
  width: 100%;
  display: flex;
  margin-top: 18px;
  @media (max-width: 1366px) {
    margin-top: 15px;
  }
`;
export const BoxUrgencia = styled.div`
  width: 95%;
  display: flex;
  justify-content: flex-end;
  margin-right: 10px;
  margin-top: 18px;
  @media (max-width: 1366px) {
    margin-top: 15px;
  }
`;
export const BoxFechaTitle = styled.div`
  display: flex;
  align-items: center;
  margin-right: 6px;
  p {
    margin-right: 3px;
  }
`;
export const BoxFechaInput = styled.div`
  @media (max-width: 1366px) {
    .hc-modifOrdenLabo-datepicker {
      top: -50vh;
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
