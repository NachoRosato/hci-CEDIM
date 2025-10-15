import styled from "styled-components";

export const BoxContainer = styled.div`
  display: flex;
  align-items: center;
`;
export const ContainerChecks = styled.div`
  width: 18px;
  height: 18px;
  margin: 10px;
  border-radius: 4px;
  background-color: var(--color-grey90);
  cursor: pointer;
`;

export const BoxChecksDescItem = styled.div`
  width: 130px;
  span {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;
