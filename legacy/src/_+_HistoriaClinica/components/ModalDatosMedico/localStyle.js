import styled from "styled-components";

export const ContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 680px;
  /* height: 210px; */
  gap: 16px;
  padding: 22px 30px;
`;
export const InformacionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

export const DatosMedicoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: flex-start;
`;

export const OptionBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  .inputModifiedHeight {
    height: auto;
  }
`;

export const RadioContainer = styled.div`
  display: flex;
  gap: 20px;
  .inputContainer {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .radioCheck {
    width: 20px;
    height: 20px;
  }
`;

export const ContainerButtons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 23px;
`;

export const BtnCerrar = styled.button`
  width: 150px;
  height: 30px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border: none;
`;
