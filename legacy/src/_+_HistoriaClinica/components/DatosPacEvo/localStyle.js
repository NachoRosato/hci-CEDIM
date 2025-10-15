import styled from "styled-components";

export const ContainerName = styled.div`
display: flex;
justify-content: space-between;
  @media (max-width: 1366px) {
    .ctTextDtoPacEvo {
      font-size: 20px !important;
    }
  }
`;
export const BoxName = styled.div``;

export const BoxDatosComp = styled.div`
  display: flex;
  gap: 15px;
`;

export const BoxFechaNac = styled.div`
  /* width: 45%; */
  display: flex;
  gap: 4px;
  margin-left: 15px;
  div {
    /* min-width: 167px; */
  }
  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
  }
  @media (max-width: 1366px) {
    /* width: 54%; */
    div {
      /* min-width: 150px; */
      font-size: 14px;
    }
    .ctTextFN {
      font-size: 14px !important;
    }
  }
`;
export const BoxObraSoc = styled.div`
  width: 30%;
  display: flex;
  div {
    min-width: 90px;
  }
  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
  }
  @media (max-width: 1366px) {
    div {
      min-width: 80px;
      font-size: 14px;
    }
    .ctTextFN {
      font-size: 14px !important;
    }
  }
`;
export const BoxPlan = styled.div`
  width: 30%;
  display: flex;
  div {
    min-width: 40px;
  }
  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
  }
  @media (max-width: 1366px) {
    div {
      min-width: 40px;
      font-size: 14px;
    }
    .ctTextFN {
      font-size: 14px !important;
    }
  }
`;

export const BoxAfiliado = styled.div`
  width: 30%;
  display: flex;
  div {
    min-width: 60px;
  }
  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
  }
  @media (max-width: 1366px) {
    div {
      min-width: 60px;
      font-size: 14px;
    }
    .ctTextFN {
      font-size: 14px !important;
    }
  }
`;
