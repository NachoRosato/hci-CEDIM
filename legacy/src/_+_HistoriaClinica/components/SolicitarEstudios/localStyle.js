import styled from "styled-components";

export const ContainerBox = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  /* padding: 28px 86px 23px 86px; */
  align-items: center;
`;

export const ContainerQst = styled.div`
  margin-bottom: 70px;
  width: 70%;
  text-align: center;
`;
export const ContainerTitle = styled.div`
  margin-top: 27px;
  margin-bottom: 40px;
`;

export const ContainerOrden = styled.div`
  display: flex;
  flex-direction: row;
  gap: 58px;
  div span {
    margin-top: 15px;
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

export const IconSelecTitle = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;
