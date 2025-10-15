import styled from "styled-components";

export const ContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 1156px;
  ${({ editando, cerrados, nuevos }) => {
    if (editando || cerrados || nuevos) {
      return `
            height: 452px;
            `;
    } else {
      return `
            height: 310px;
            `;
    }
  }}
  /* ${({ editando, cerrados }) => {
    if (cerrados) {
      return `
            height: 452px;
            `;
    } else {
      return `
            height: 310px;
            `;
    }
  }} */
  gap: 33px;
  padding: 24px 35px 32px 40px;
`;

export const ContainerBoxS2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 1156px;
  height: 452px;
  gap: 33px;
  padding: 24px 35px 32px 40px;
`;
export const MedicamentosBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const BuscadorBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 820px;
  border-radius: 16px;
  box-shadow: 0px 2.767256498336792px 2.2138051986694336px 0px
      rgba(0, 0, 0, 0.02),
    0px 6.650102138519287px 5.32008171081543px 0px rgba(0, 0, 0, 0.03),
    0px 12.521552085876465px 10.017241477966309px 0px rgba(0, 0, 0, 0.04);
  gap: 16px;
  padding: 10px 30px;
  .farmacologia-lista-container {
    width: 80%;
    padding: 6px 8px;
    border-radius: 4px;
    border: 1px solid #dedede;
    background: #fff;
  }
  .farmacologia-lista-container::placeholder {
    font-family: Rubik;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: var(--color-grey65);
  }
  .txtBuscador {
    width: 180px;
  }
  .widthSearch {
    width: 80%;
  }
`;

export const ContainerInfoSeg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
export const ContainerTitleS2 = styled.div`
  //
  margin-bottom: 10px;
`;
export const ContainerPacFilterS2 = styled.div`
  //
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 15px;
`;
export const ContainerFilterS2 = styled.div`
  //
  display: flex;
  flex-direction: row;
`;
export const PacFilterName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  span {
    padding-left: 13px;
  }
  //
`;
export const PacFilterTipo = styled.div`
  //
  display: flex;
  flex-direction: row;
  align-items: center;
  span {
    padding-right: 10px;
  }
`;
export const PacFilterAccion = styled.div`
  //
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 30px;
  span {
    padding-right: 10px;
  }
`;

export const ContainerComentarioS2 = styled.div`
  //
`;

export const ContainerButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const BtnCerrar = styled.button`
  width: 160px;
  height: 36px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: var(--color-latex30);
`;

export const BtnEditSeg = styled.button`
  width: 174px;
  height: 36px;
  box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border: 2px solid var(--color-primary);
  cursor: pointer;
  background: var(--color-white);
`;

export const BtnDelSeg = styled.button`
  width: 174px;
  height: 36px;
  box-shadow: 1px 2px 5px 0px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border: 2px solid var(--color-primary);
  cursor: pointer;
  background: var(--color-white);
  margin-right: 15px;
`;

export const BtnNewSeg = styled.button`
  width: 174px;
  height: 36px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border: none;
  cursor: pointer;
  margin-left: 16px;
  background: var(--color-primary);
`;

export const BtnConfirmar = styled.button`
  width: 174px;
  height: 36px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border: none;
  cursor: pointer;
  margin-left: 16px;
  background: var(--color-primary);
`;

export const ContainerInfoPacSeg = styled.div`
  //
  display: flex;
  flex-direction: row;
  padding-left: 26px;
  width: 100%;
  gap: 32px;
`;
export const ContainerInfoPacS3 = styled.div`
  //
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 10px;
  div {
    margin-bottom: 6px;
  }
`;

export const ContainerAccionInfo = styled.div`
  //
  width: 779px;
  height: 107px;
  border-radius: 8px;
  background: var(--color-white);
  box-shadow: 0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.02),
    0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.03),
    0px 12.522px 10.017px 0px rgba(0, 0, 0, 0.04);
  padding: 10px 16px 16px 21px;
  display: flex;
  flex-direction: row;
  gap: 30px;
`;

export const ContainerAccionTitles = styled.div`
  //
  width: 21%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const ContainerAccionData = styled.div`
  width: 78%;
  padding-top: 28px;
  text-align: left;
`;

export const ContainerFechaAccion = styled.div`
  //
  width: 80%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const ContainerBoxS4 = styled.div`
  display: flex;
  flex-direction: column;
  width: 1156px;
  height: 270px;
  gap: 24px;
  padding: 31px 38px 30px 31px;
`;

export const ContainerDataS4 = styled.div`
  display: flex;
  flex-direction: row;
  gap: 62px;
`;

export const ContainerDataPacS4 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 24.5%;
`;

export const ContainerDPacLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
export const ContainerDPacLineElp = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  div {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

export const ContainerAccPacS4 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ContainerAccPacInfoS4 = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  div:first-child {
    display: flex;
    flex-direction: column;
    width: 28%;
    align-items: flex-start;
  }
  .horasStyle {
    width: 85%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: right;
    padding-top: 6px;
    padding-right: 6px;
  }
  .spanS4 {
    padding-left: 8px;
  }
`;
export const ContainerAccPacComentario = styled.div`
  width: 759px;
  height: 79px;
  .xd {
    width: 759px;
    height: 79px;
    /* margin: 8px; */
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid var(--color-grey85);
    border-radius: 8px;
    background-color: var(--color-grey95);
    resize: none;
    color: var(--color-latex30);
  }
`;
