import styled from "styled-components";

export const ContainerCardOrden = styled.div`
  width: 435px;
  height: 174px;
  padding-left: 23px;
  padding-right: 15px;
  padding-top: 17px;
  padding-bottom: 21px;
  position: relative;
  background: var(--color-white);
  box-shadow: 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
    0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725),
    0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
  border-radius: 16px;
  //cambiar una vez este listo el componente definitivo
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .shareAdjust {
    position: absolute;
    bottom: 10px;
    right: 12px;
  }
  @media (max-width: 1366px) {
    width: 304px;
    height: 101px;
    margin-top: 0px;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 13px;
    padding-bottom: 0px;
  }
`;

export const BtnAsignar = styled.button`
  width: 138px;
  height: 30px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border: none;
  margin-left: 10px;
  @media (max-width: 1366px) {
    display: none;
  }
`;

export const BtnRctaDigital = styled.button`
  display: none;
  width: 30px;
  height: 30px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border: none;
  margin-left: 10px;
  @media (max-width: 1366px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const ContainerCardOrdenTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding-bottom: 5px; */
  .ordenTitleClass {
    margin-left: 20px;
  }
  .qMarkClass {
    margin-left: 10px;
  }
  ${({ opcRecetaDigital }) =>
    opcRecetaDigital &&
    `
    justify-content: flex-start;
  `}

  @media (max-width: 1366px) {
    .ordenTitleClass {
      font-size: 14px !important;
    }
  }
`;

export const FarmacoBtn = styled.button`
  width: 178px;
  height: 44px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border: none;
`;

export const ContainerCardOrdenItems = styled.div`
  width: 100%;
  height: 94px;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar-thumb {
    background: var(--color-dropdown-grey77);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-grey65);
  }
`;

export const ContainerCardOrdenCrear = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  .busqPaciente-avatar {
    margin-right: 9px;
  }
  .busqPaciente-title {
    margin-bottom: 4px;
  }
  @media (max-width: 1366px) {
    margin-top: 0px;
    height: 60px;
    .busqPaciente-title {
      font-size: 12px !important;
    }
  }
`;
export const ContainerCardOrdenItem = styled.div`
  width: 388px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  padding-left: 30px;
  padding-right: 10px;
  ${({ nuevoItem }) => {
    if (nuevoItem) {
      return `
      background: #008DDD;
            `;
    }
  }}
  ${({ activoNoEditable }) => {
    if (activoNoEditable) {
      return `
            background: #3D994A;
            `;
    }
  }}
  ${({ aSuspender }) => {
    if (aSuspender) {
      return `
            background: #C10C00;
            `;
    }
  }}
  .padAdjust {
    padding-top: 3px;
    margin-left: 6px;
  }
  .textAdjust {
    width: 270px;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  @media (max-width: 1366px) {
    width: 265px;
    .textAdjust {
      width: 210px;
      text-align: center;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: left;
      font-size: 14px;
    }
  }
`;
