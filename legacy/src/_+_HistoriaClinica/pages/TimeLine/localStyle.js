import styled, { keyframes, css } from "styled-components";
import { motion } from "framer-motion";

export const ContainerBody = styled(motion.div)`
  display: flex;
  flex-direction: row;
  padding-top: 45px;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 45px;
  height: 190%;
  @media (max-width: 1366px) {
    padding-top: 30px;
    padding-left: 15px;
    padding-right: 15px;
  }
`;

export const ContainerMotCons = styled.div`
  width: 100%;
  height: 115px;
  padding-left: 35px;
  padding-right: 35px;
  padding-top: 17px;
  padding-bottom: 20px;
  position: relative;
  background: var(--color-white);
  box-shadow: 0px 100px 80px rgba(0, 0, 0, 0.07),
    0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198),
    0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275),
    0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
    0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725),
    0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
  border-radius: 10px;
  /* border-right: 10px solid var(--color-latex30); */
  border-left: 10px solid var(--color-latex30);
  margin-right: 50px;
`;

export const ContainerMotConsItems = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContainerMotConsTitleBox = styled.div`
  display: flex;
  align-items: center;
  .busqPaciente-avatar {
    margin-right: 9px;
  }
  .busqPaciente-title {
    margin-bottom: 4px;
  }
`;
export const ContainerMotConsDropBox = styled.div``;

export const ContainerLeftColumn = styled.div`
  width: 28%;
  margin-right: 35px;
  height: calc(100% - 0px);
  @media (max-width: 1366px) {
    margin-right: 15px;
  }
`;
export const ContainerRightColumn = styled.div`
  width: 38%;
  height: calc(100% - 0px);
  @media (max-width: 1366px) {
    width: 38%;
  }
`;
export const ContainerCenterColumn = styled.div`
  width: 34%;
  margin-right: 35px;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  .inputTimeLine {
    padding: 6px 10px;
    border-radius: 8px;
    border: 2px solid var(--color-grey85);
    height: 33px;
  }
  .inputTimeLine:focus {
    border: 2px solid var(--color-latex30);
  }
  @media (max-width: 1366px) {
    margin-right: 15px;
  }
`;

export const ContainerData = styled.div`
  display: flex;
  flex-direction: column;

  .perfilImg-box {
    margin-top: 0px;
  }

  .perfilImg-box {
    display: flex;
    align-items: center;
  }

  .perfilImg-box .perfilImg-img {
    border-radius: 100px;
    width: 96px;
    height: 96px;
  }

  @media (max-width: 1366px) {
    .perfilImg-box .perfilImg-img {
      width: 46px;
      height: 46px;
    }
  }
`;

export const ContainerEvolucion = styled.div`
  width: 100%;
  height: 60%;
  padding-left: 35px;
  padding-right: 35px;
  padding-top: 17px;
  padding-bottom: 20px;
  position: relative;
  background: var(--color-white);
  box-shadow: 0px 100px 80px rgba(0, 0, 0, 0.07),
    0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198),
    0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275),
    0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
    0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725),
    0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
  border-radius: 10px;
  border-left: 10px solid var(--color-latex30);
  margin-right: 50px;
  margin-top: 22px;
`;

export const ContainerEvolucionItems = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContainerEvolucionTitleBox = styled.div`
  display: flex;
  align-items: center;
  .busqPaciente-avatar {
    margin-right: 9px;
  }
  .busqPaciente-title {
    margin-bottom: 4px;
  }
`;
export const ContainerEvolucionDropBox = styled.div`
  width: max-content;
  height: max-content;
`;
export const ContainerDatosPaciente = styled.div`
  width: 100%;
  height: 80px;
  border-radius: 16px;
  margin-bottom: 24px;
  display: none;
  padding-left: 30px;
  padding-right: 10px;
  padding-top: 15px;
  padding-bottom: 0px;
  /* @media (max-width: 1366px) {
    display: flex;
  } */
`;
export const ContainerDatPacLeft = styled.div`
  width: 66%;
  display: flex;
  flex-direction: column;
  .marginAdjust {
    margin-bottom: 10px;
  }
`;
export const ContainerDatPacRight = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  .marginAdjust {
    margin-bottom: 10px;
  }
`;

export const ContainerItemShown = styled.div`
  width: 100%;
  height: 41%;
  padding-left: 39px;
  padding-top: 22px;
  padding-right: 38px;
  margin-top: 40px;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  box-shadow: 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
    0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725),
    0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
  border-radius: 10px;
  border-right: 10px solid var(--color-latex30);
  @media (max-width: 1366px) {
    height: 42.5%;
  }
`;

export const ContainerEvActItem = styled.div`
  margin-bottom: 15px;
  .itemTitle {
    margin-bottom: 20px;
  }
  .itemPar {
    margin-bottom: 10px;
    margin-left: 30px;
  }
`;
export const ButtonEvActSave = styled.button`
  width: 178px;
  height: 44px;
  background-color: var(--color-latex30);
  position: absolute;
  border: none;
  border-radius: 10px;
  bottom: 20px;
  right: 40px;
`;

export const Box1 = styled.div`
  width: 100%;
  height: 37%;
  overflow: auto;
  overflow-x: hidden;
  border-left: 10px solid var(--color-latex30);
  border-radius: 8px;
  padding: 10px 30px;
  box-shadow: 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
    0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725),
    0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);

  /* @media (max-width: 1366px) {
    padding: 0 0 0 0;
  } */
  &::-webkit-scrollbar {
    width: 6px;
    border: none;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--color-greyScrollBar);
    border-radius: 8px;
  }
  position: relative;
  @media (max-width: 1366px) {
    padding: 10px 10px;
  }
`;

export const ContainerNombrePac = styled.div`
  margin-left: 20px;
  @media (max-width: 1366px) {
    margin-left: 15px;
    span {
      font-size: 20px !important;
    }
  }
`;
export const ContainerPacDatos = styled.div`
  display: flex;
  flex-direction: column;

  & > :first-child {
    margin-top: 26px;
    margin-left: 20px;
  }
  & > p {
    margin-top: 8px;
    margin-left: 20px;
  }
  & > p:last-child {
    margin-bottom: 41px;
  }
  @media (max-width: 1366px) {
    & > :first-child {
      margin-top: 16px;
      margin-left: 20px;
      font-size: 14px !important;
      span {
        font-size: 14px !important;
      }
    }
    & > p {
      margin-top: 4px;
      margin-left: 20px;
      font-size: 14px !important;
      span {
        font-size: 14px !important;
      }
    }
    & > p:last-child {
      margin-bottom: 0px;
      font-size: 14px !important;
      span {
        font-size: 14px !important;
      }
    }
  }
`;

export const BoxDatos = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  width: 100%;
  min-height: 100px;
  padding-left: 20px;
  margin-bottom: 40px;
`;

export const BoxDatosHeader = styled.div`
  background: var(--color-latex30-gradient);
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  /* gap: 60px; */
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
`;
export const ContainerBoxDatosBody = styled.div`
  width: 100%;
  box-shadow: 0px 100px 80px rgba(0, 0, 0, 0.07),
    0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198),
    0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275),
    0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
    0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725),
    0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
  border-radius: 16px;
  padding: 20px;
  .bodyBoxDatosConf {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
export const HeaderEstudiosPrev = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;
  user-select: none;
  & > span {
    padding-right: 5px;
  }
  .ptur-headerBarFiltros-centroCheck-box .ptur-dropdownCheck-selectBox {
    width: 209px;
    height: 39px;
  }
  .ptur-headerBarFiltros-centroCheck-box .ptur-dropdownCheck-selectBody {
    width: 209px;
    height: 39px;
    justify-content: space-between;
  }
  @media (max-width: 1366px) {
    gap: 10px;
  }
`;

export const FilterBox = styled.div`
  border: 2px solid var(--color-latex30);
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 10px;
  gap: 11px;
  cursor: pointer;
  .txtFilter {
    font-weight: 500;
    font-size: 16px;
  }
  @media (max-width: 1366px) {
    padding: 3px 7px;
    .txtFilter {
      font-size: 12px;
    }
  }
`;

export const CheckMark = styled.svg`
  width: 20px;
  height: 20px;
  stroke: white;
  stroke-width: 4;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 24;
  stroke-dashoffset: ${({ active }) => (active ? "0" : "24")};
  transition: opacity 0.1s ease-in-out;
  border: ${({ active }) => (active ? "2px solid white" : "2px solid var(--color-latex30)")};
  border-radius: 100%;
  @media (max-width: 1366px) {
    padding: 1px;
  }
  ${({ active }) =>
    active
      ? css`
          animation: ${drawCheck} 0.3s ease-out forwards;
        `
      : css`
          animation: ${eraseCheck} 0.3s ease-out forwards;
        `}
`;

// Animación del tilde (se dibuja progresivamente)
const drawCheck = keyframes`
  from {
    stroke-dashoffset: 24;
  }
  to {
    stroke-dashoffset: 0;
  }
`;

// Animación para borrar el tilde
const eraseCheck = keyframes`
  from {
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset: 24;
  }
`;

export const HeadEstudiosMobile = styled.div`
  display: none;
  align-items: left;
  width: 100%;
  height: 100px;
  /* margin-bottom: 25px; */
  & > span {
    padding-right: 5px;
  }
  .marginTitleFilter {
    margin-bottom: 16px;
  }
  /* @media (max-width: 1366px) {
    display: flex;
    flex-direction: column;
  } */
`;
export const IconContainer = styled.div`
  display: flex;
  position: relative;
`;
export const FechaContainer = styled.div`
  position: absolute;

  ${({ index }) => {
    if (index % 2 === 0) {
      return `
      bottom: 22px;
      right: 48px;
  }
                `;
    } else
      return `
      bottom: 22px;
      left: 48px;
                `;
  }}
`;

export const BtnFilter = styled.button`
  width: 119px;
  height: 33px;

  border: none;
  border-radius: 10px;
  margin-right: 12px;
  ${({ active }) => {
    if (active) {
      return `
      background-color: var(--color-latex30);
      color: var(--color-white);
  }
                `;
    } else
      return `
      background-color: var(--color-white);
      color: var(--color-latex30);
      border: 2px solid var(--color-latex30);
                `;
  }}
`;

export const DescripcionItem = styled.div`
  display: flex;
  width: 126px;
  /* text-align: center; */
  justify-content: center;
  flex-direction: column;
  margin-left: 40px;
  .diagnosticoPresuntivo {
    width: 124px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media (max-width: 1366px) {
    width: 125px;
  }
`;

export const ContainerItemShownTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const ContainerButtonsItemShown = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonEditarEv = styled.button`
  width: 100px;
  height: 30px;
  background-color: var(--color-latex30);
  border: none;
  border-radius: 10px;
`;

export const ButtonVerImg = styled.button`
  width: 83px;
  height: 20px;
  background-color: var(--color-latex30);
  border: 1px solid var(--color-primary);
  border-radius: 10px;
  margin-right: 6px;
`;

export const ContainerItemTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContainerIfEvo = styled.div`
  display: flex;
  width: 600px;
`;

export const EstudiosPreviosBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 14px;
  gap: 20px;
  /* height: 100%; */
  .sinEstudiosTxt {
    text-align: center;
    margin-top: 50px;
  }
  .txtSinEstudiosPrev {
    text-align: center;
    margin-top: 20px;
  }
  /* @media (max-width: 1366px) {
    padding: 14px 20px 14px 20px;
  } */
`;

export const CronologiaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  /* height: 100%; */
  position: relative;
`;

export const LineaHorizontal = styled.div`
  width: 78px;
  height: 2px;

  background: var(--color-latex30);
`;
export const LineaHorizontal2 = styled.div`
  width: 94px;
  height: 6px;
  border-radius: 16px;
  background: var(--color-latex30);
`;

export const IconoLinea = styled.div`
  border-radius: 50%;
  height: 40px;
  width: 40px;
  margin-bottom: -6px;
  margin-right: 4px;
  color: var(--color-latex30);
  &:hover {
    transform: scale(1.2, 1.2);
    transition: transform 200ms;
    color: var(--color-primary);
    /* border: 2px solid var(--color-primary); */
    margin-right: 3px;
    cursor: pointer;
    ${LineaHorizontal} {
      background: var(--color-primary);
    }
    ${LineaHorizontal2} {
      background: var(--color-primary);
    }
  }

  ${({ index }) => {
    if (index % 2 === 0) {
      return `
                .linea1{
    margin-top: -30px;
    margin-left: 36px;
  }
  .linea2{
    margin-top: -4px;
  }
  .estudio{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 160px;
    margin-top: -23px;
    gap: 4px;
  }
                `;
    } else
      return `
      .estudio{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: -280px;
    margin-top: -23px;
    gap: 4px;
  }
      .linea1{
    margin-top: -30px;
    margin-left: -76px;
  }
  .linea2{
    
    margin-top: -4px;
  }
                `;
  }}
  position: relative;

  @media (max-width: 1366px) {
    ${({ index }) => {
      if (index % 2 === 0) {
        return `
                .linea1{
    margin-top: -30px;
    margin-left: 36px;
  }
  .linea2{
    margin-top: -4px;
  }
  .estudio{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 122px;
    margin-top: -23px;
    gap: 4px;
  }
                `;
      } else
        return `
      .estudio{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: -230px;
    margin-top: -23px;
    gap: 4px;
  }
      .linea1{
    margin-top: -30px;
    margin-left: -76px;
  }
  .linea2{
    
    margin-top: -4px;
  }
                `;
    }}
  }
`;

export const LineaVertical = styled.div`
  width: 10px;
  height: 60px;
  margin-right: 3px;
  background: var(--color-latex30);
  ${({ ultimoItem }) => {
    if (ultimoItem === false) {
      return `
      height: 50px;
                `;
    } else
      return `
      height: 100%;
                `;
  }}
`;

export const BtnImagen = styled.button`
  border: none;
  border-radius: 16px;
  padding: 4px 6px;
  cursor: pointer;
  width: 100px;
  border: 2px solid var(--color-primary);
`;

export const DocumentosBox = styled.div`
  display: flex;
  width: 65%;
  flex-direction: column;
  gap: 20px;
  /* @media (max-width: 1366px) {
    width: 60%;
  } */
`;
export const DescripcionEstudio = styled.div`
  width: 100%;
  height: 20%;
  border-right: 8px solid var(--color-latex30);
  border-radius: 8px;
  padding: 10px 150px 10px 40px;
  box-shadow: 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
    0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725),
    0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
  .datosBox {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 120%;
  }
  .textSizeTitle {
    font-weight: normal;
    font-size: 16px;
  }
  .textSizeDatos {
    font-weight: bold;
    font-size: 16px;
  }
  /* @media (max-width: 1366px) {
    .datosBox {
      gap: 6px;
    }
    .textSizeDatos {
      font-weight: bold;
      font-size: 14px;
    }
    .textSizeTitle {
      font-size: 14px;
    }
  } */
`;
export const VisualizadorEstudio = styled.div`
  width: 100%;
  height: 100%;
  border-right: 8px solid var(--color-latex30);
  border-radius: 8px;
  padding: 10px 40px 10px 40px;
  box-shadow: 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
    0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725),
    0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
  justify-content: center;
  .documentoDropdown {
    display: flex;
    align-items: center;
    gap: 16px;
    justify-content: center;
  }
  .widthDocDropdown {
    width: 366px;
  }
  .verInformePdf {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .documentoPdf {
    margin-top: 20px;
    width: 100%;
    height: 86%;
  }
  /* @media (max-width: 1366px) {
    padding: 10px 16px 0px 16px;

    .widthDocDropdown {
      width: 258px;
    }
    .documentoPdf {
      height: 80%;
      width: 425px;
      margin-top: 8px;
    }
  } */
`;

export const PDFImagenBox = styled.div`
  display: flex;
  width: 65%;
  padding: 0 40px 0 0;
  flex-direction: column;
  gap: 20px;
  .cerrarBtn {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    background: none;
    border: none;
  }
  /* @media (max-width: 1800px) {
    width: 66%;
    padding: 0 10px 0 0;
  }
  @media (max-width: 1366px) {
    padding: 0 0 0 0;
    width: 84%;
  } */
`;

export const LineaVerticalMas = styled.div`
  width: 10px;
  height: 60px;
  margin-right: 3px;
  background: var(--color-latex30);
  height: 50px;
`;

export const IconoLineaMas = styled.div`
  border-radius: 50%;
  height: 40px;
  width: 40px;
  margin-right: 4px;
  margin-top: -1px;
  color: var(--color-latex30);
  .iconoMas {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 40px;
    height: 40px;
    background-color: var(--color-latex30);
    border-radius: 100%;
    border: none;
  }
`;

export const CircleButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--color-latex30);
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 5px;
  left: 5px;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

export const ArrowIcon = styled.span`
  display: block;
  width: 12px;
  height: 12px;
  margin-top: 1px;
  border-top: 2px solid var(--color-white);
  border-right: 2px solid var(--color-white);
  transition: scale 0.3s ease-in-out;
  transform: rotate(-45deg);
  &:hover {
    transform: rotate(-45deg), scale(1.1);
  }
`;
