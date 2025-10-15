import styled from "styled-components";

export const Input = styled.input`
  width: ${({ width }) => (width ? `${width}%` : "100%")};
  height: ${({ height }) => (height ? `${height}px` : "50px")};
  margin: 0;
  padding: 0;
  background-color: var(--color-white);
  border: 1px solid var(--color-grey90);
  border-radius: 4px;
  padding-left: 10px;
  &::placeholder {
    color: var(--color-grey45);
  }
`;

export const ContainerInput = styled.div`
  width: ${({ width }) => (width ? `${width}%` : "100%")};
  height: ${({ height }) => (height ? `${height}px` : "50px")};
  display: ${({ display }) => (display ? `${display}` : "flex")};
  flex-direction: ${({ flexDirection }) =>
    flexDirection ? `${flexDirection}` : "column"};
  ${({ error }) => {
    if (error) {
      return `
             input {
                border: 1px solid var(--color-danger);
                
             }
             p {
                visibility: visible;
             }
            `;
    }
  }}
`;

export const MsjError = styled.p`
  color: var(--color-danger);
  visibility: hidden;
`;
export const TitleMsj = styled.span``;
