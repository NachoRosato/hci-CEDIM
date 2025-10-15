import styled from "styled-components";

export const ContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 191px;
  height: 250px;
  max-width: 241px;
  background: var(--color-white);
  box-shadow: 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
    0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725),
    0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
  border-radius: 16px;
`;

export const ContainerBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 10px 18px 15px;
`;

export const ContainerTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;
export const ContainerItems = styled.div`
  /* 
  width: 110px;
  display: grid; */
  display: grid;
  /* grid-auto-flow: column; */
  width: 100%;
  height: 132px;
  grid-template-columns: repeat(1, 150px);
  grid-auto-rows: 18px;
  /* grid-column-gap: 28px; */
  text-align: left;
  overflow: hidden;
  div {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;
export const ContainerVerMas = styled.div`
  display: flex;
  margin-bottom: 9px;
  justify-content: flex-end;
  text-decoration: underline;
  .hc-cardOrdenLabo-verDeter-tooltip {
    width: 200px;
    color: var(--color-white);
    span{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space:nowrap;
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
    left: -130px;
    border: none;
    /* top: -135px; */
  }
`;
export const ContainerButton = styled.div``;
export const BtnSeleccionar = styled.button`
  width: 116px;
  height: 29px;
  box-shadow: 0px 90.2394px 72.1915px rgba(0, 0, 0, 0.07),
    0px 37.6999px 30.1599px rgba(0, 0, 0, 0.0503198),
    0px 20.1562px 16.1249px rgba(0, 0, 0, 0.0417275),
    0px 11.2994px 9.0395px rgba(0, 0, 0, 0.035),
    0px 6.00101px 4.80081px rgba(0, 0, 0, 0.0282725),
    0px 2.49716px 1.99772px rgba(0, 0, 0, 0.0196802);
  border-radius: 8px;
  border: none;
`;
