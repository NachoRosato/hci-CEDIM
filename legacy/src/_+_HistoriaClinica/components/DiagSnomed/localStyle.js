import styled from "styled-components";

export const ContainerDiagPres = styled.div`
  width: 100%;
  height: 75px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 15px;
  padding-bottom: 15px;
  position: relative;
  background: var(--color-white);
  box-shadow: 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
    0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725),
    0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
  border-radius: 16px;
  margin-top: 15px;
  margin-bottom: 10px;
  @media (max-width: 1366px) {
    margin-top: 6px;
    width: 639px;
    height: 90px;
    padding-right: 20px;
    padding-top: 8px;
    padding-bottom: 8px;
    margin-bottom: 6px;
  }
`;

export const ContainerDiagPresItems = styled.div`
  display: flex;
  align-items: center;
  /* flex-wrap: wrap; */
  width: 100%;
  gap: 10px;
  @media (max-width: 1366px) {
    flex-wrap: wrap;
    gap: 0px;
    justify-content: flex-end;
    .rspWidth {
      width: 335px;
      margin-left: 4px;
    }
  }
`;

export const DiagPresTitleBox = styled.div`
  display: flex;
  /* width: 265px; */
  /* width: 100%; */
  justify-content: center;
  align-items: center;
  .busqPaciente-avatar {
    margin-right: 13px;
  }
  .busqPaciente-title {
    margin-right: 10px;
  }
  @media (max-width: 1366px) {
    margin-right: 4vh;
    .busqPaciente-title {
      font-size: 14px !important;
    }
  }
`;
export const DiagPresInputBox = styled.div`
  width: 35%;
  height: 46px;
`;

export const DiagnosticosBox = styled.div`
  display: flex;
  gap: 20px;
  /* width: 50%; */
  overflow-x: scroll;
  margin-left: 10px;
  flex-wrap: wrap;
  /* &::-webkit-scrollbar {
    height: 5px;
    border: none;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--color-latex30);
    border-radius: 8px;
  }
  &::-webkit-scrollbar-thumb:hover {
    cursor: pointer;
  } */
`;

export const DiagPresSelectBox = styled.div`
  width: ${(props) => (props.oneElement ? "237px" : "178px")};
  height: 32px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #008ddd;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  /* margin-left: 36px; */
  margin-left: 8px;
  margin-bottom: 4px;
  padding-left: 6px;
  position: relative;
  .diagPresSelectBox-ajusteX {
    position: absolute;
    right: 0;
    margin-right: 8px;
  }
  .diagPresSelectBox-desc {
    width: 89%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-align: center;
  }
  @media (max-width: 1366px) {
    width: 218px;
    height: 25px;
    /* position: absolute;
    top: 57px;
    right: 20px; */
  }
`;

export const DiagMasBtn = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  background-color: #008ddd;
  margin-bottom: 4px;
  @media (max-width: 1366px) {
    margin-left: 8px;
  }
`;

export const ContainerDiagPresUltimo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

export const DiagPresUltimoTitleBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: 42px;
`;

export const DiagPresSelectedBox = styled.div`
  /* width: 237px; */
  width: 190px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-grey65);
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  margin-left: 86px;
  span {
    width: 85%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-align: center;
  }
`;

export const ContainerBuscadorDropBox = styled.div`
  width: 300px;
`;
