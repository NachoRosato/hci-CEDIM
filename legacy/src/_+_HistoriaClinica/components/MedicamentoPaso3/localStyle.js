import styled from "styled-components";

export const ContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 894px;
  height: 620px;
  gap: 20px;
  padding: 22px 46px 33px 45px;
  @media (max-width: 1366px) {
    width: 894px;
    height: 520px;
    padding: 5px 46px 33px 45px;
    gap: 10px;
  }
`;
export const MedicamentosBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 1366px) {
    gap: 5px;
  }
`;
export const PresentacionesBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  .inputDosis {
    width: 84px;
    border-radius: 4px;
    border: 1px solid #dedede;
    background: #fff;
    height: 30px;
    padding: 10px;
  }
  .inputDosis::placeholder {
    color: #b6b6b6;
    font-family: Rubik;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
  }
  .textoBox {
    text-align: left;
  }
  .checkbox-style {
    width: 50px;
    cursor: pointer;
    margin-right: -10px;
  }
`;
export const DosisBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  .input-check-box {
    display: flex;
  }
`;
export const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 200px;
  gap: 10px;
  .radio-text-container {
    display: flex;
    gap: 8px;
  }
`;
export const CadaBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const DuranteBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
export const UnidadesBox = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 20px; */
  .inputDosis {
    width: 84px;
    border-radius: 4px;
    border: 1px solid #dedede;
    background: #fff;
    height: 30px;
    padding: 10px;
  }
  .inputDosis::placeholder {
    color: #b6b6b6;
    font-family: Rubik;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
  }
`;
export const UnidadesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  /* gap: 20px; */
  .radio-text-container {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

export const ContainerButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
  width: auto;
`;

export const BtnCerrar = styled.button`
  width: 150px;
  height: 30px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: var(--color-latex30);
`;

export const BtnAsignar = styled.button`
  width: 138px;
  height: 30px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border: none;
  ${({ activo }) => {
    if (activo) {
      return `
        cursor: pointer;
      `;
    }
  }}
`;
