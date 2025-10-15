import styled from "styled-components";

export const InputCheckContainer = styled.div`
  display: flex;
  align-items: center;
  /* width: 100%; */
`;

export const Input = styled.input`
  display: inline-block;
  cursor: pointer;
  /* float: left; */
  height: ${({ checboxHeight }) => checboxHeight ? `${checboxHeight}px` : `28px`};
  width: ${({ checboxHeight }) => checboxHeight ? `${checboxHeight}px` : `28px`};
`;

export const Label = styled.label``;
