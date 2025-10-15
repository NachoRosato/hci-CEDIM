import styled from "styled-components";

export const Slider = styled.div`
  position: fixed;
  top: 0px;
  right: ${({ open }) => (open === true ? "-4px" : "-50%")};
  width: 50%;
  height: 840px;
  background-color: var(--color-white);
  transition: right 0.5s ease-in-out;
  z-index: ${({ open }) => (open ? "11" : "9")};
  -webkit-box-shadow: inset 0px 5px 10px -8px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: inset 0px 5px 10px -8px rgba(0, 0, 0, 0.75);
  box-shadow: inset 0px 5px 10px -8px rgba(0, 0, 0, 0.75);
  @media (max-width: 1366px) {
    top: 0px;
  }
`;
