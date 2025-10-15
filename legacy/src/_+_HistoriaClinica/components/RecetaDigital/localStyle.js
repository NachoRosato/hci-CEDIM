import styled from "styled-components";

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

export const RecetaBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px 40px;
  gap: 24px;
  overflow-y: auto;
  padding-bottom: 10vh;
  .title {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  @media (max-width: 1366px) {
    padding-bottom: 16vh;
  }
`;

export const DatosContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
`;

export const CajasContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const BoxPaso1 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  align-items: flex-start;
`;

export const BoxPaso2 = styled(BoxPaso1)`
  align-items: flex-end;
`;

export const ContainerBox = styled.div`
  height: auto;
  width: 100%;
  border: 1px solid var(--color-grey85);
  border-radius: 8px;
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.07),
    0px 1.778px 13.422px 0px rgba(0, 0, 0, 0.05),
    0px 2.336px 17.869px 0px rgba(0, 0, 0, 0.04),
    0px 2.522px 30.017px 0px rgba(0, 0, 0, 0.04),
    0px 6.65px 5.32px 0px rgba(0, 0, 0, 0.03),
    0px 2.767px 2.214px 0px rgba(0, 0, 0, 0.02);
`;

export const ContainerTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid var(--color-grey85);
  .boxAdd {
    display: flex;
  }
`;

export const IconTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const OptionBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MatriculasTxt = styled.div`
  display: flex;
  gap: 10px;
`;

export const DatosConsultorioBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  .matriculaBox {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .iconContainer {
    display: flex;
    gap: 10px;
    align-items: center;
  }
`;

export const IconoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  transition: 0.2s ease all;
  &:hover {
    background: var(--color-grey95);
    border-radius: 100%;
  }
`;

export const MatriculaBox = styled.div`
  display: flex;
  gap: 30px;
  .matriculaRadio {
    display: flex;
    gap: 6px;
  }
  .especialidadRadio {
    display: flex;
    gap: 16px;
  }
  .inputContainer {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

export const ContainerBody = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  .diagnositcoInput {
    width: 80%;
    margin: auto;
    height: 40px;
    border: 1px solid var(--color-grey85);
    border-radius: 8px;
    padding: 10px;
  }
  .nombreInput {
    width: 100%;
    height: 40px;
    border: 1px solid var(--color-grey85);
    border-radius: 8px;
    padding: 10px;
  }
  .indicacionesInput {
    width: 100%;
    resize: none;
    height: 30vh;
    border: 1px solid var(--color-grey85);
    border-radius: 8px;
    padding: 10px;
  }
  .fechaTxt {
    padding: 10px 0;
    width: fit-content;
    margin: auto;
  }
  .coberturaInput {
    border: none;
    border-bottom: 1px solid var(--color-grey85);
    padding: 4px 0;
  }
  .planMedicoBox {
    display: flex;
    gap: 10px;
    align-items: center;
  }
`;

export const MedicamentoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const CantidadBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--color-latex30);
  padding: 0 16px;
  border-radius: 20px;
  width: 120px;
  height: 42px;
  margin: auto;
  user-select: none;
  .number {
    display: flex;
    background: white;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    width: 40px;
    height: 40px;
  }
`;

export const MedicamentoCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  gap: 20px;
  .diagnositcoReceta {
    width: 80%;
    /* margin: auto; */
    height: 40px;
    border: 1px solid var(--color-grey85);
    border-radius: 8px;
    padding: 10px;
  }
  .observacionesTxtArea {
    resize: none;
    width: 80%;
    height: 100px;
    border: 1px solid var(--color-grey85);
    border-radius: 8px;
    padding: 10px;
  }
`;

export const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
  .checkMedicamento {
    cursor: pointer;
    width: 30px;
    :hover {
      border: 1px solid var(--color-latex30);
    }
  }
  .trashBox {
    padding: 0px;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    transition: 0.2s ease all;
    :hover {
      background: var(--color-grey95);
    }
  }
`;

export const OSInputBox = styled.div`
  display: flex;
  gap: 2px;
  cursor: pointer;

  .inputConfig {
    cursor: pointer;
    width: 40px;
  }

  p {
    cursor: pointer;
    user-select: none;
  }
`;

export const FlechaContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 8px;
  rotate: -90deg;
  transform: ${(props) => props.$rotate && `rotate(180deg)`};
  transition: 0.2s ease;
  cursor: pointer;
`;

export const Line = styled.div`
  height: 3px;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    var(--color-grey90),
    rgba(0, 0, 0, 0)
  ); /* Gradiente difuminado */
  width: 100%;
  margin: auto;
  border-radius: 100%;
`;

export const ConfigInput = styled.div`
  display: flex;
  justify-content: space-between;
  .inputConfig {
    cursor: pointer;
    width: 40px;
  }
`;

export const DatosPaciente = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Box1 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const GenerarRecetaBtn = styled.button`
  width: 160px;
  height: 40px;
  border-radius: 8px;
  border: none;
`;

export const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: ${({ $paso }) =>
    $paso === 1 ? "flex-end" : "space-between"};
`;

export const BtnPaso = styled.button`
  width: 140px;
  height: 32px;
  border-radius: 8px;
  border: none;
`;

export const BtnAsignarReceta = styled.button`
  width: 138px;
  height: 30px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border: none;
  margin-left: 10px;
  @media (max-width: 1366px) {
    display: none;
  }
`;

export const BtnRctaDigitalIcon = styled.button`
  display: none;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: none;
  margin-left: 10px;
  @media (max-width: 1366px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const BoxBtnRecetaDigital = styled.div`
  background: transparent;
  border: none;
  position: absolute;
  z-index: 20;
  right: 0px;
  top: -2px;
  @media (max-width: 1366px) {
    top: -3px;
  }
`;
