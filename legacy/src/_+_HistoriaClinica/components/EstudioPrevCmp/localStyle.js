import styled from "styled-components";

export const ContainerEstPrev = styled.div`
  width: 100%;
  height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .iconAdjust {
    margin-right: 15px;
  }
  @media (max-width: 1366px) {
    height: 150px;
    margin-top: 0px;
  }
`;
export const EstPrevTitle = styled.div`
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
  padding-bottom: 10px;
  @media (max-width: 1366px) {
    padding-bottom: 0px;
    .titleEdit {
      font-size: 14px;
    }
  }
`;

export const EstPrevBox = styled.div`
  width: 100%;
  height: 233px;
  position: relative;
  display: flex;
  gap: 10px;
  padding: 10px 15px 26px 21px;
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
  @media (max-width: 1366px) {
    height: 102px;
    width: 631px;
    padding: 10px 15px 26px 16px;
  }
`;

export const EstPrevItems = styled.div`
  width: 100%;
  max-height: 150px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar-thumb {
    background: var(--color-dropdown-grey77);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-grey65);
  }
  @media (max-width: 1366px) {
    max-height: 55px;
  }
`;

export const EstPrevItem = styled.div`
  width: 398px;
  min-height: 22px;
  display: flex;
  align-items: center;
  justify-content: left;
  padding-left: 35px;
  padding-right: 10px;
  margin-bottom: 7px;
  margin-right: 5px;
  background: #008ddd;
  color: var(--color-white);
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  @media (max-width: 1366px) {
    width: 279px;
    padding-left: 15px;
    span {
      font-size: 14px;
    }
  }
`;

export const EstPrevBoxTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  @media (max-width: 1366px) {
    span {
      font-size: 14px !important;
    }
    margin-bottom: 5px;
  }
`;

export const DivisorEstPrev = styled.div`
  width: 50%;
`;

export const LaboratorioVacio = styled.div`
  width: 398px;
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 16px;
  margin-right: 5px;
`;
