import styled from "styled-components";
import { motion } from "framer-motion";

export const ContainerBody = styled(motion.div)`
  display: flex;
  flex-direction: row;
  overflow-y: scroll;
  gap: 35px;
  @media (max-width: 1366px) {
    gap: 25px;
    overflow-x: hidden;
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

export const ContainerMotCons = styled.div`
  width: 763px;
  height: 70px;
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 17px;
  padding-bottom: 17px;
  position: relative;
  background: var(--color-white);
  box-shadow: 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
    0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725),
    0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
  border-radius: 16px;

  margin-right: 50px;
  margin-top: 22px;
  @media (max-width: 1366px) {
    margin-top: 12px;
    width: 571px;
    height: 47px;
    padding-top: 1px;
  }
`;

export const ContainerMotConsItems = styled.div`
  display: flex;
`;

export const ContainerMotConsTitleBox = styled.div`
  display: flex;
  align-items: center;
  width: 33%;
  .busqPaciente-avatar {
    margin-right: 18px;
  }
  @media (max-width: 1366px) {
    width: 555px;
    .busqPaciente-title {
      font-size: 14px !important;
    }
  }
`;
export const ContainerMotConsDropBox = styled.div`
  width: 71%;
  height: 46px;
  @media (max-width: 1366px) {
    width: 700px;
  }
`;

export const ContainerLeftColumn = styled(motion.div)`
  width: 50.2%;
  height: 1080px;
  background: linear-gradient(78.86deg, #004b75 11.42%, #0085d0 85.64%);
  padding-left: 33px;
  padding-right: 28px;
  position: relative;
  @media (max-width: 1366px) {
    padding-left: 23px;
    width: 52.5%;
  }
`;

export const LeftContainerLine = styled.div`
  width: 100%;
  background: var(--color-white);
  height: 2px;
  position: absolute;
  top: 90px;
  left: 0px;
  @media (max-width: 1366px) {
    top: 75px;
  }
`;

export const ContainerRightColumn = styled(motion.div)`
  width: 50%;
  padding-bottom: 50px;
  height: fit-content;
  padding-right: 20px;
  position: relative;
`;

export const ContainerExamenFisico = styled(motion.div)`
  width: 122px;
  height: 57px;
  position: absolute;
  right: 0;
  margin-top: 32px;
  z-index: 10;
  @media (max-width: 1366px) {
    width: 87px;
    height: 43px;
    margin-top: 15px;
    right: -16px;
  }
`;

export const SlidingComponent = styled.div`
  position: fixed;
  top: 0px;
  right: ${({ open }) => (open === true ? "-4px" : "-50%")};
  width: 50%;
  height: 840px;
  background-color: var(--color-white);
  transition: right 0.5s ease-in-out;
  z-index: ${({ open }) => (open ? "11" : "9")};
  -webkit-box-shadow: inset 0px 5px 10px -8px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: inset 0px 5px 10px -8px rgba(0, 0, 0, 0.75);
  box-shadow: inset 0px 5px 10px -8px rgba(0, 0, 0, 0.75);
  @media (max-width: 1366px) {
    top: 0px;
  }
`;

export const SlidingOrdenes = styled.div`
  position: fixed;
  top: 120px;
  right: ${({ open }) => (open ? "3px" : "-50%")};
  width: 50%;
  height: 830px;
  background-color: #f1f1f1;
  transition: right 0.5s ease-in-out;
  z-index: 10;
`;

export const SlidingFarmacos = styled.div`
  position: fixed;
  top: 0px;
  right: ${({ open }) => (open === true ? "-4px" : "-50%")};
  width: 50%;
  height: 840px;
  background-color: var(--color-white);
  transition: right 0.5s ease-in-out;
  z-index: ${({ open }) => (open ? "11" : "9")};
  -webkit-box-shadow: inset 0px 5px 10px -8px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: inset 0px 5px 10px -8px rgba(0, 0, 0, 0.75);
  box-shadow: inset 0px 5px 10px -8px rgba(0, 0, 0, 0.75);
  @media (max-width: 1366px) {
    top: 0px;
    height: 576px;
  }
`;

export const SlidingReceta = styled(SlidingFarmacos)``;

export const ExamenFisicoBtn = styled.button`
  width: 122px;
  height: 57px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.25);
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  border: none;
  padding-left: 8px;
  padding-right: 8px;
  @media (max-width: 1366px) {
    width: 87px;
    height: 43px;
    font-size: 14px !important;
    text-align: left;
  }
`;

export const ContainerEvolucion = styled.div`
  width: 100%;
  height: 532px;
  padding-left: 33px;
  padding-right: 35px;
  padding-top: 14px;
  padding-bottom: 17px;
  position: relative;
  background: var(--color-white);
  box-shadow: 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
    0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725),
    0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
  border-radius: 16px;
  margin-top: 16px;
  @media (max-width: 1366px) {
    padding-left: 21px;
    padding-right: 21px;
    width: 639px;
    height: 319px;
    transition: 0.5s all;
    margin-top: 10px;
  }
`;
export const GripContainer = styled.div`
  height: 54px;
  position: absolute;
  left: 14px;
  top: 50%;
  border: 3px solid var(--color-latex30);
  border-radius: 8px;
  /* background-color: var(--color-latex30); */
`;

export const ContainerEvolucionItems = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const ContainerEvolucionTitleBox = styled.div`
  display: flex;
  align-items: center;
  .busqPaciente-avatar {
    margin-right: 22px;
  }
  .busqPaciente-title {
    margin-bottom: 0px;
  }
  @media (max-width: 1366px) {
    .busqPaciente-title {
      font-size: 14px !important;
    }
  }
`;

export const ContainerBtnPreImpresionBox = styled.div`
  display: flex;
  align-items: center;
`;

export const DictadoTutorialBox = styled.div`
  padding-top: 2px;
  padding-left: 10px;
`;

export const RECButton = styled.div`
  padding-left: 10px;
  .blinking-circle {
    width: 16px;
    height: 16px;
    background-color: var(--color-danger);
    border-radius: 50%;
    animation: blink 1s infinite;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .blinking-border {
    border: 2px solid white;
    width: 14px;
    height: 14px;
    border-radius: 50%;
  }
  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
`;
export const BtnPreImpresion = styled.button`
  width: 160px;
  height: 24px;
  margin-left: 18px;
  color: var(--color-white);
  background-color: var(--color-latex30);
  border: none;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  span {
    padding-left: 3px;
  }
`;
export const BtnDictado = styled(BtnPreImpresion)`
  width: 100px;
  span {
    padding-left: 10px;
  }
`;

export const ContainerEvolucionDropBox = styled.div`
  padding-bottom: 20px;
  padding-top: 5px;
  width: 100%;
  .evolucion_editor {
    ul {
      padding-left: 50px;
      list-style: disc;
    }
    ul li::marker {
      font-size: 10px; /* Cambia el tamaño del punto */
    }
  }
  @media (max-width: 1366px) {
    padding-bottom: 8px;
    padding-top: 0px;
  }
`;

export const ContainerEvoBtn = styled.div`
  width: 100%;
  height: 90px;
  position: relative;
  @media (max-width: 1366px) {
    height: 55px;
  }
`;

export const ContainerSegBtn = styled.div`
  position: absolute;
  right: 200px;
  bottom: 25px;
  @media (max-width: 1366px) {
    right: 190px;
  }
`;

export const ContainerCircleSeg = styled.div`
  width: 24px; // Size of the circle
  height: 24px;
  background-color: var(--color-primary); // Background color
  border-radius: 50%; // Make it a circle
  display: flex;
  align-items: center; // Center content vertically
  justify-content: center; // Center content horizontally
  color: white; // Text color
  position: absolute;
  left: -5px;
  top: -5px;
`;

export const ButtonEvActSave = styled.button`
  width: 178px;
  height: 44px;
  background-color: var(--color-broccoli);
  position: absolute;
  border: none;
  border-radius: 10px;
  bottom: 25px;
  right: 0px;
  @media (max-width: 1366px) {
    height: 26px;
    font-size: 14px !important;
  }
`;

export const ButtonNuevoSeg = styled.button`
  width: 178px;
  height: 44px;
  background-color: var(--color-white);
  border: 2px solid var(--color-primary) !important;
  border: none;
  border-radius: 10px;
  @media (max-width: 1366px) {
    height: 26px;
    font-size: 14px !important;
  }
`;
export const ButtonEvActCancelar = styled.button`
  width: 178px;
  height: 44px;
  background-color: var(--color-danger);
  position: absolute;
  border: none;
  border-radius: 10px;
  bottom: 25px;
  left: 0px;
  @media (max-width: 1366px) {
    height: 26px;
    font-size: 14px !important;
    bottom: 24px;
  }
`;

export const ContainerOrdenes = styled.div`
  width: 100%;
  height: 221px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 17px;
  margin-top: 20px;
  align-items: center;
  position: relative;
  @media (max-width: 1366px) {
    margin-top: 10px;
  }
`;

//agregados left column
export const ContainerDatosPac = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
  padding-left: 28px;
  margin-top: 15px;
  margin-bottom: 0px;
  gap: 8px;
  margin-bottom: 23px;
  .iconAdjust {
    display: flex;
    align-items: center;
  }
  .iconAdjust > .icon {
    margin-left: 20px;
    margin-top: 2px;
  }
  @media (max-width: 1366px) {
    padding-left: 0px;
    margin-bottom: 13px;
  }
`;

export const ContainerContadorCarac = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 3;
`;

export const BarContainer = styled.div`
  width: 104px;
  height: 10px;
  background-color: var(--color-grey85);
  border-radius: 5px;
`;

export const ProgressBar = styled.div`
  height: 100%;
  background-color: var(--color-latex30);
  border-radius: 5px;
  ${({ progress }) => {
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
// export const ContadorCaracSpan = styled.span`
//   ${({ contadorCarac }) => {
//     if (contadorCarac <= 1000) {
//       return `

//      color: var(--color-danger);
//      `;
//     } else if (contadorCarac < 600 && contadorCarac > 200) {
//       return `

//             color: var(--color-primary);
//             `;
//     } else if (contadorCarac < 200) {
//       return `
//       color: var(--color-latex30);
//             `;
//     }
//   }}
// `;
