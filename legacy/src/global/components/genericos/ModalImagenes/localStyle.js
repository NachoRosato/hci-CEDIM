import styled from "styled-components";

export const ContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px 20px;
`;
export const BtnContainer = styled.div`
  display: flex;
  margin-top: 10px;
  align-items: center;
  gap: 10px;
  width: auto;
  margin-left: 60px;
  cursor: pointer;
`;
export const LineSeparadora = styled.hr`
  margin-top: 10px;
  width: 60%;
  align-items: center;
  justify-content: center;
  margin-left: 60px;
  height: 2px;
  border-radius: 16px;
  border: none;
  background: var(--color-latex30);
`;

export const ContainerImagenes = styled.div`
  display: flex;
  align-items: left;
  flex-direction: column;
`;

export const ContainerButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 25px;
  margin-bottom: 20px;
`;

export const BtnCerrar = styled.button`
  width: 114px;
  height: 34px;
  box-shadow: 3px 7px 11px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: var(--color-latex30);
`;
