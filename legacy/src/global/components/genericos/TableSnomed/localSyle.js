import styled from "styled-components";

export const ContainerTableGlobal = styled.div`
  width: ${({ width }) => `${width}px`};
  height: 330px;
  @media (max-width: 1366px) {
    width: ${({ widthQuery }) => `${widthQuery}px`};
  }
`;
