import styled from "styled-components";

export const ContainerForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar-thumb {
    background: var(--color-dropdown-grey77);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-grey65);
  }
  width: 100%;
  padding: 30px 30px 0 30px;
  height: 690px;
  .flexi {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 100px;
  }
  position: relative;
  @media (max-width: 1366px) {
    height: 410px;
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

export const ContainerBoxFila = styled.div`
  display: flex;
  flex-direction: column;
  ${({ opcion }) => {
    if (!opcion) {
      return `width: 100%;
      border-radius: 16px;
      background: var(--color-white);
      box-shadow: 0px 2.767256498336792px 2.2138051986694336px 0px
      rgba(0, 0, 0, 0.02),
       0px 6.650102138519287px 5.32008171081543px 0px rgba(0, 0, 0, 0.03),
       0px 12.521552085876465px 10.017241477966309px 0px rgba(0, 0, 0, 0.04);
      margin-bottom: 20px;
      padding-left: 50px;
      padding-bottom: 20px;
      `;
    }
  }}

  .parent {
    display: flex;
    align-items: center;
    justify-content: center;
    /* Estilos del padre */
  }
`;

export const ContainerItems = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  /* ${({ input }) => {
    if (input) {
      return `  align-items: flex-start;`;
    } else {
      return `  align-items: center;`;
    }
  }} */
  ${({ hijo }) => {
    if (hijo) {
      return `flex-direction: row;`;
    } else {
      return `flex-direction: column;`;
    }
  }} /* Estilos de los children */

  .opciones {
  }
`;
export const Abreviatura = styled.div`
  .titulo {
    margin-bottom: 20px;
    margin-top: 20px;
  }
  .subtitulo {
    width: 170px;
  }
`;
export const ContainerHijo = styled.div``;

export const ContainerInput = styled.div`
  display: flex;
  gap: 10px;
  width: max-content;
  align-items: center;
  .widthDrop {
    width: 100px;
  }
  .incWidth {
    width: 200px;
  }
`;
export const BtnGuardar = styled.div`
  width: 150px;
  height: 30px;
  border: none;
  box-shadow: 0px 90.2394px 72.1915px rgba(0, 0, 0, 0.07),
    0px 37.6999px 30.1599px rgba(0, 0, 0, 0.0503198),
    0px 20.1562px 16.1249px rgba(0, 0, 0, 0.0417275),
    0px 11.2994px 9.0395px rgba(0, 0, 0, 0.035),
    0px 6.00101px 4.80081px rgba(0, 0, 0, 0.0282725),
    0px 2.49716px 1.99772px rgba(0, 0, 0, 0.0196802);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-top: 30px;
`;

export const ContainerButtons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 65px;
  padding-right: 65px;
  position: absolute;
  bottom: 44px;
  right: -37%;
  @media (max-width: 1366px) {
    bottom: 316px;
    right: -32%;
  }
`;

export const ContainerExFisicoQuill = styled.div`
  width: 770px;
  height: 100%;
  position: relative;
  @media (max-width: 1366px) {
    width: 490px;
  }
`;

export const ContainerContadorCaracEF = styled.div`
  position: absolute;
  bottom: 0px;
  right: 0;
  z-index: 3;
`;

export const BarContainerEF = styled.div`
  width: 104px;
  height: 10px;
  background-color: var(--color-grey85);
  border-radius: 5px;
`;

export const ProgressBarEF = styled.div`
  height: 100%;
  background-color: var(--color-latex30);
  border-radius: 5px;
  ${({ progress }) => {
    // console.log(progress);
    if (progress < 0) {
      return `
            width: 100%;
            `;
    } else if (progress > 0) {
      return `
            width: ${100 - progress}%;
            `;
    } else {
      return `
            width: 0%;
            `;
    }
  }}
`;
