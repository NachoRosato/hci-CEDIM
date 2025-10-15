import styled from "styled-components";

export const ToasterContainer = styled.div`
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translate(-50%, 0);
  transition: transform 0.5s;
  height: max-content;
  width: auto;
  border-radius: 16px;
  z-index: 9999;
  @media (max-width: 1024px) {
    width: auto;
    height: auto;
  }
`;

export const ToasterBody = styled.div`
  text-align: left;
  color: var(--color-white);
  padding: 20px 27px;
  display: flex;
`;

export const ToasterText = styled.div`
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 30px;
  @media (max-width: 1024px) {
    width: 300px;
    padding-right: 0px;
  }
`;
