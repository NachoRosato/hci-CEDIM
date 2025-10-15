import styled from "styled-components";

export const ContainerEnfermedades = styled.div`
  width: 100%;
  height: 188px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .iconAdjust {
    margin-right: 11px;
  }
  @media (max-width: 1366px) {
    height: 145px;
  }
`;
export const EnfermedadesTitle = styled.div`
  width: 100%;
  display: flex;
  padding-bottom: 5px;
  justify-content: center;
  align-items: center;
  .titleEdit {
    margin-bottom: 5px;
  }
  .qMarkClass {
    margin-left: 10px;
    margin-top: -3px;
  }
  position: relative;
  @media (max-width: 1366px) {
    padding-bottom: 0px;
    .titleEdit {
      font-size: 14px;
    }
  }
`;
export const DiagContainer = styled.div`
  width: 150px;
  height: 50px;
  background-color: var(--color-primary);
  position: absolute;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 13px;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
`;

export const EnfermedadesBox = styled.div`
  width: 900px;
  height: 116px;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 16px 23px 11px 26px;
  background: var(--color-white);
  border-radius: 16px;
  box-shadow: 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
    0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725),
    0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
  .shareAdjust {
    position: absolute;
    bottom: 10px;
    right: 12px;
  }
  .loadingBox {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  @media (max-width: 1366px) {
    width: 631px;
    height: 108px;
  }
`;

export const EnfermedadesItems = styled.div`
  width: 860px;
  height: 55px;
  overflow-y: scroll;
  display: flex;
  flex-wrap: wrap;
  column-gap: 26px;
  ::-webkit-scrollbar-thumb {
    background: var(--color-dropdown-grey77);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-grey65);
  }
  @media (max-width: 1366px) {
    width: 580px;
    height: 55px;
  }
`;

export const EnfermedadesVacio = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const EnfermedadesItem = styled.div`
  width: 264px;
  height: 22px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 8px;
  padding-bottom: 5px;
  margin-bottom: 7px;
  background: #3d994a;
  color: var(--color-white);
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  .txtCruz {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .adjustLitleX {
    padding-top: 2px;
  }
  @media (max-width: 1366px) {
    .txtCruz {
      font-size: 14px;
    }
  }
`;

export const EnfermedadesBtnBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 26px;
  .busqPaciente-avatar {
    margin-right: 9px;
  }
  .busqPaciente-title {
    margin-bottom: 4px;
  }
  .adjustEnfBtnBox {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }
  @media (max-width: 1366px) {
    height: 17px;
  }
`;
