import styled from "styled-components";
export const CircleButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--color-latex30);
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: -40px;
  left: 0;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

export const ArrowIcon = styled.span`
  display: block;
  width: 12px;
  height: 12px;
  margin-top: 1px;
  border-top: 2px solid var(--color-white);
  border-right: 2px solid var(--color-white);
  transition: scale 0.3s ease-in-out;
  transform: rotate(-45deg) ;
  &:hover {
    transform: rotate(-45deg),  scale(1.1);
  }
`;