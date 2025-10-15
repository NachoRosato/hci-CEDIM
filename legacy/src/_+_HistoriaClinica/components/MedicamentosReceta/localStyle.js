import styled from "styled-components";

export const ContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 110vh;
  padding: 20px 20px;
  gap: 20px;
  .inputMedicamentos {
    width: 96%;
    height: 40px;
    border: 1px solid var(--color-grey65);
    border-right: none;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    padding: 0px 10px;
    font-size: 16px;
    color: var(--color-latex30);
    &::placeholder {
      color: var(--color-grey65);
    }
  }
  .searchBox {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 4%;
    background-color: var(--color-latex30);
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    cursor: pointer;
  }
  @media (max-width: 1366px) {
    overflow-y: auto;
    padding: 10px 20px;
    .inputMedicamentos {
      width: 94%;
    }
    .searchBox {
      width: 6%;
    }
  }
`;

export const SearchContainer = styled.div`
  display: flex;
`;

export const MedicamentoBox = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  height: 60vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 14px;
`;

export const BtnMasResultados = styled.div`
  width: 150px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin: auto;
`;

export const MedicamentoCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 30vh;
  height: 90px;
  padding: 10px;
  border: 2px solid var(--color-grey85);
  border-radius: 8px;
  text-align: left;
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
  @media (max-width: 1366px) {
    height: auto;
  }
`;
