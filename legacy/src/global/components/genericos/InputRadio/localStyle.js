import styled from "styled-components";

export const InputCheckContainer = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  width: max-content;
`;

export const Input = styled.input`
  display: inline-block;
  cursor: pointer;
  /* float: left; */
  height: ${({ radioHeight }) => (radioHeight ? `${radioHeight}px` : `28px`)};
  width: ${({ radioHeight }) => (radioHeight ? `${radioHeight}px` : `28px`)};
`;

export const Label = styled.label``;
