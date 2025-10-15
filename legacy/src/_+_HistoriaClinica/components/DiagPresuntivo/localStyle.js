import styled from "styled-components";

export const ContainerDiagPres = styled.div`
  width: 100%;
  height: 75px;
  padding-left: 35px;
  padding-right: 35px;
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
`;

export const ContainerDiagPresItems = styled.div`
  display: flex;
  align-items: center;
`;

export const DiagPresTitleBox = styled.div`
  display: flex;
  align-items: center;
  .busqPaciente-avatar {
    margin-right: 18px;
  }
  .busqPaciente-title {
    margin-right: 30px;
  }
`;
export const DiagPresInputBox = styled.div`
  width: 35%;
  height: 46px;
`;

export const DiagPresSelectBox = styled.div`
  width: 237px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #008ddd;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  margin-left: 36px;
  margin-bottom: 4px;
  position: relative;
  .diagPresSelectBox-ajusteX {
    position: absolute;
    right: 0;
    margin-right: 8px;
  }
  .diagPresSelectBox-desc {
    width: 85%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-align: center;
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
  width: 237px;
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
