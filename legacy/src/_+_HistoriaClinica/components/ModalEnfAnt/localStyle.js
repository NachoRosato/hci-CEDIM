import styled from "styled-components";

export const ContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 680px;
  height: 210px;
  gap: 16px;
  padding: 22px 46px 33px 45px;
`;
export const MedicamentosBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  @media (max-width: 1366px) {
    .dropdownHC-itemsBox-customHeight {
      max-height: 235px;
    }
  }
`;
export const BuscadorBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 820px;
  border-radius: 16px;
  box-shadow: 0px 2.767256498336792px 2.2138051986694336px 0px
      rgba(0, 0, 0, 0.02),
    0px 6.650102138519287px 5.32008171081543px 0px rgba(0, 0, 0, 0.03),
    0px 12.521552085876465px 10.017241477966309px 0px rgba(0, 0, 0, 0.04);
  gap: 16px;
  padding: 10px 30px;
  .farmacologia-lista-container {
    width: 80%;
    padding: 6px 8px;
    border-radius: 4px;
    border: 1px solid #dedede;
    background: #fff;
  }
  .farmacologia-lista-container::placeholder {
    font-family: Rubik;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: var(--color-grey65);
  }
  .txtBuscador {
    width: 180px;
  }
  .widthSearch {
    width: 80%;
  }
`;

export const ContainerButtons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 23px;
`;

export const BtnCerrar = styled.button`
  width: 150px;
  height: 30px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border: none;
  ${({ inactivo }) => {
    if (inactivo) {
      return `cursor: initial;`;
    } else {
      return `cursor: pointer;`;
    }
  }}
`;
