import styled from "styled-components";

export const ContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px 20px;
`;

export const ContainerEstudios = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

export const ContainerButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  margin-top: 25px;
`;

export const CardEstudio = styled.div`
  border: 2px solid var(--color-latex30);
  border-radius: 8px;
  box-shadow: 3px 7px 11px rgba(0, 0, 0, 0.25);
  padding: 20px;
  width: 60%;
  &:hover{
    background: var(--color-grey85);
    cursor: pointer;
  }
`;

export const BtnCerrar = styled.button`
  width: 206px;
  height: 44px;
  box-shadow: 3px 7px 11px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: var(--color-latex30);
`;
