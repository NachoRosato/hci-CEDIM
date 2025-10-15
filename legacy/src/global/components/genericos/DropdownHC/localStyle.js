import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: ${(props) =>
    props.customContWidth ? `${props.customContWidth}px` : "300px"};
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
`;

export const Dropdown = styled.div`
  position: absolute;
  top: ${(props) => (props.posTop ? "none" : "100%")};
  bottom: ${(props) => (props.posTop ? "100%" : "none")};
  left: 0;
  width: ${(props) =>
    props.customItemWidth
      ? `${props.customItemWidth}px`
      : props.customContWidth
      ? `${props.customContWidth}px`
      : "300px"};
  max-height: ${(props) =>
    props.customHeight ? `${props.customHeight}px` : "400px"};
  border: 1px solid var(--color-grey85);
  border-radius: 4px;
  background: var(--color-white);
  z-index: 1000;
  overflow-y: scroll; /* Enable vertical scrolling */
  overflow-x: hidden;
  cursor: pointer;
  background-color: var(--color-inputV1-grey95);
  .dropdown-item-tooltip {
    width: 100%;
    display: flex;
    justify-content: start;
  }
`;

export const Item = styled.div`
  width: 100%;
  padding: 8px;
  cursor: pointer;
  color: var(--color-latex30);
  white-space: nowrap; /* Prevent text from wrapping */
  overflow: hidden; /* Hide overflow text */
  text-overflow: ellipsis; /* Display ellipsis for overflowing text */
  &:hover {
    border-radius: 4px;
    background-color: var(--color-latex30);
    color: var(--color-white);
  }
  font-size: 14px;
  text-align: left;
`;

export const Loader = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #000;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: LoadingAnimation 1s linear infinite;
  margin: 8px auto;

  @keyframes LoadingAnimation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const ContainerBuscadorDropBox = styled.div`
  width: ${(props) =>
    props.customContWidth ? `${props.customContWidth}px` : "300px"};
`;
