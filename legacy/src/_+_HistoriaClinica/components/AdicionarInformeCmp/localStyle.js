import styled from "styled-components";

// Estilos para preservar el formato del informe de laboratorio
export const LaboratorioStyles = styled.div`
  .analisis-compuesto {
    font-weight: bold;
    font-size: 14px;
    margin: 15px 0 10px 0;
    color: #333;
  }
  .analisis-simple {
    font-weight: bold;
    font-size: 12px;
    margin: 10px 0;
    color: #333;
  }
  .estado {
    font-weight: bold;
    font-size: 12px;
    color: #d32f2f;
    margin: 0px 0;
  }
  .analisis-nombre {
    font-size: 12px;
    margin: 8px 0;
  }
  .resultado-valor {
    font-weight: bold;
    font-size: 12px;
    color: #1976d2;
  }
  .valores-referencia {
    font-size: 11px;
    color: #666;
    margin: 0px 5px;
  }
  .metodo {
    font-style: italic;
    font-size: 11px;
    color: #666;
    margin: 5px 0;
  }
  .fecha-muestra {
    font-weight: bold;
    font-size: 11px;
    color: #666;
    margin: 5px 0;
  }
  .nota {
    font-size: 11px;
    color: #666;
    margin: 5px 0;
    font-style: italic;
  }
  /*   .contenedor-resultados {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  } */
  .columna-analisis {
    flex: 2;
  }
  .columna-resultado {
    flex: 1;
    text-align: right;
  }
  .columna-referencia {
    flex: 2;
  }
  .hora-extraccion {
    font-size: 11px;
    color: #666;
    margin: 15px 0;
    text-align: center;
  }
  .footer {
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid #ccc;
    font-size: 11px;
    color: #666;
  }
  .vista-preliminar {
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    margin: 20px 0;
    color: #d32f2f;
  }
`;

export const ContainerAdcInformeCmp = styled.div`
  width: 1400px;
  height: 750px;
  display: flex;
  flex-direction: column;
  @media (max-width: 1366px) {
    width: 1260px;
    height: 500px;
  }
`;

export const ContainerDesc = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 24px;
  margin-bottom: 16px;
  user-select: none;
`;

export const ContainerAdicionar = styled.div`
  width: 100%;
  height: 623px;
  display: flex;
  gap: 10px;
  padding-left: 15px;
  padding-right: 10px;
  margin-bottom: 30px;
  @media (max-width: 1366px) {
    height: 368px;
  }
`;

export const ContainerInforme = styled.div`
  width: 700px;
  height: 640px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: var(--color-white);
  box-shadow: 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
    0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725),
    0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
  border-radius: 16px;
  padding: 19px 10px 10px 10px;
  position: relative;
  @media (max-width: 1366px) {
    height: 380px;
  }
`;

export const BoxTitle = styled.div`
  margin-bottom: 15px;
  margin-top: 5px;
  padding-left: 13px;
  user-select: none;
`;

export const BoxBtnImagen = styled.div`
  position: absolute;
  right: 30px;
`;

export const ButtonImagen = styled.button`
  width: 102px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 9px;
  background-color: var(--color-latex30);
  span {
    margin-left: 9px;
    user-select: none;
  }
`;

export const BoxInforme = styled.div`
  width: 660px;
  height: 570px;
  background: var(--color-grey95);
  border: 1px solid var(--color-grey85);
  border-radius: 8px;
  padding: 10px 20px 10px 20px;
  text-align: left;
  color: var(--color-grey45);
  white-space: 1px;
  line-height: 27px;
  overflow-y: scroll;
  @media (max-width: 1366px) {
    height: 310px;
  }
`;

export const ContainerCopiarTxt = styled.div`
  width: 73px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const CopiarTxtBox = styled.div`
  width: 73px;
  height: 49px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-latex30);
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  margin-bottom: 5px;
  user-select: none;
`;

export const ContainerEvoQuill = styled.div`
  width: 600px;
  height: 640px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  background: var(--color-white);
  box-shadow: 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
    0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725),
    0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
  border-radius: 16px;
  padding: 18px 10px 10px 10px;
  position: relative;
  @media (max-width: 1366px) {
    height: 380px;
    padding: 18px 10px 10px 10px;
  }
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
  margin-bottom: 10px;
  user-select: none;
`;

export const ContainerEvolucionDropBox = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  @media (max-width: 1366px) {
    #editor2-responsiveHCst {
      height: 350px;
    }
  }
`;

export const ContainerButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 45px;
  padding-right: 45px;
`;

export const BtnCerrar = styled.button`
  width: 150px;
  height: 30px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: var(--color-latex30);
  user-select: none;
`;

export const BtnGenerarOrden = styled.button`
  width: 138px;
  height: 30px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: var(--color-primary);
  user-select: none;
`;

export const ContainerContadorCarac = styled.div`
  position: absolute;
  bottom: 7px;
  right: 35px;
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
