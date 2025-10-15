import styled from "styled-components";

export const ContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100% - 10px);
  overflow: auto;
  padding: 28px 86px 40px 86px;
  @media (max-width: 1366px) {
    padding: 5px 46px 20px 46px;
    height: calc(100% - 80px);
    overflow-x: hidden;
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
export const ContainerTitle = styled.div`
  margin-bottom: 27px;
  @media (max-width: 1366px) {
    margin-bottom: 0px;
    span {
      font-size: 20px !important;
    }
  }
`;

export const ContainerOrden = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  gap: 120px;
  @media (max-width: 1366px) {
    margin-top: 5px;
    width: 620px;
  }
`;
export const ActivosContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  @media (max-width: 1366px) {
    p {
      font-size: 14px !important;
    }
  }
`;
export const InactivosContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  @media (max-width: 1366px) {
    p {
      font-size: 14px !important;
    }
    p span {
      font-size: 12px !important;
    }
    gap: 5px;
  }
`;
export const BoxMedicamentos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  ${({ item }) => {
    if (item && item.length > 0) {
      return `
          height: auto;
          padding: 0px 4px 4px 0;  
        `;
    } else {
      return `height: auto;`;
    }
  }}
  overflow: auto;
  overflow-x: hidden;
  ::-webkit-scrollbar-thumb {
    background: var(--color-dropdown-grey77);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-grey65);
  }
  @media (max-width: 1366px) {
    gap: 5px;
  }
`;

export const MedicamentoContainer = styled.div`
  display: flex;
  ${({ activo }) => {
    if (activo) {
      return `background: #3D994A;`;
    } else {
      return `background: #C10C00;`;
    }
  }}
  padding: 10px 44px;
  border-radius: 8px;
  width: 900px;
  justify-content: space-around;
  p {
    width: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .prod {
    width: 30%;
    display: flex;
    justify-content: flex-start;
  }
  .btnAgregar {
    cursor: pointer;
    display: flex;
    align-items: center;
    width: auto;
  }
  .btnEditar {
    cursor: pointer;
    display: flex;
    align-items: center;
    width: auto;
    margin-left: 10px;
    margin-right: 10px;
  }

  @media (max-width: 1366px) {
    padding: 10px 10px;
    width: 620px;
    p {
      width: 7%;
    }
  }
`;

export const ContainerCardOrdenCrear = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
  .busqPaciente-avatar {
    margin-right: 9px;
  }
  .busqPaciente-title {
    margin-bottom: 4px;
  }
  @media (max-width: 1366px) {
    .busqPaciente-title {
      font-size: 14px !important;
    }
  }
`;
