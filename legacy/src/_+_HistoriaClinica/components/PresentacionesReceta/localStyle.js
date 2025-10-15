import styled from "styled-components";

export const ContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 40vh;
  padding: 20px 20px;
  gap: 20px;
  @media (max-width: 1366px) {
    overflow-y: auto;
    margin: auto;
    height: 40vh;
    justify-content: center;
  }
`;

export const PresentacionesBox = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  overflow-y: auto;
  padding-bottom: 14px;
`;

export const PresentacionesCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30vh;
  height: 50px;
  padding: 10px;
  border: 2px solid var(--color-grey85);
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.07),
    0px 1.778px 13.422px 0px rgba(0, 0, 0, 0.05),
    0px 2.336px 17.869px 0px rgba(0, 0, 0, 0.04),
    0px 2.522px 30.017px 0px rgba(0, 0, 0, 0.04),
    0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.03),
    0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.02);
  &:hover {
    transition: 0.2s;
    border: 2px solid var(--color-latex30);
  }
`;
