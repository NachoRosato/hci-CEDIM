import styled from "styled-components";

export const ContainerTableGlobal = styled.div`
  width: ${({ width }) => `${width}px`};
  height: 185px;
  @media (max-width: 1366px) {
    width: ${({ widthQuery, width }) => `${widthQuery ? widthQuery : width}px`};
  }
`;
