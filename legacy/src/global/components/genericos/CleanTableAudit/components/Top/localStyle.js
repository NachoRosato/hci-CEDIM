import styled from "styled-components";

export const ContainerTop = styled.div`
  height: 37px;
  width: 100%;
  background-color: var(--color-latexAbmRgb);
  color: var(--color-white);
  display: flex;
  flex-direction: column;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
`;

export const SearcherZone = styled.div`
  width: 100%;
  height: 54px;
  display: flex;
  .drag-and-drop-columns {
    width: 80%;
    display: flex;
    align-items: center;
    padding-left: 20px;
    gap: 10px;
  }
  .searcher {
    width: 20%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 400px;
    gap: 20px;
    padding-right: 10px;
  }
  .acordeon-col {
    position: relative;
    width: max-content;
    padding: 8px 20px;
    border: 1px solid var(--color-white);
    background-color: transparent;
  }
  .cruz {
    width: max-content;
    height: max-content;
    position: absolute;
    /* background-color: red; */
    top: 1px;
    right: 4px;
    font-size: 14px;
  }
`;

export const ColumnTopZone = styled.div`
  width: max-content;
  height: 38px;
  /* border-top: 1px solid var(--color-white); */
  position: relative;
  display: flex;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  .view {
    border-top: 1px solid var(--color-white);
    display: flex;
    width: max-content;
    height: 38px;
    position: absolute;
    left: 0;
    ${({ borderActive }) => (borderActive ? `z-index:1` : "z-index:2")}
  }
  .border-view {
    display: flex;
    width: max-content;
    height: 38px;
    position: absolute;
    left: 0;
    ${({ borderActive }) => (borderActive ? `z-index:2` : "z-index:1")}
  }
`;

export const Column = styled.div`
  position: relative;
  width: ${({ width, name }) => (width && !name ? `${width}px` : "50px")};
  /* max-width: ${({ maxWidth }) => (maxWidth ? `${maxWidth}px` : "")}; */
  min-width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-left: 5px;
  padding-right: 5px;
  border-right: ${({ noBorder }) =>
    noBorder ? `0px solid var(--color-white)` : "1px solid var(--color-white)"};
  text-transform: capitalize;
  cursor: ${({ noFilter }) => (noFilter ? `pointer` : "default")};
  /* cursor: pointer; */
  input {
    cursor: pointer;
  }

  ${({ second, mouseLive }) => {
    return second && mouseLive
      ? `
      border-right: 1px solid var(--color-danger);
      height: 538px; 
      `
      : second === false
      ? "border-right: 1px solid transparent;"
      : "";
  }}
  .border {
    position: absolute;
    width: 10px;
    height: 100%;
    /* background-color: red; */
    right: 0;
    cursor: col-resize;

    ${({ mouseLive }) =>
      mouseLive
        ? `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 1;
            background-color:transparent; 
            `
        : ""}
  }
  .content-border {
    height: 100%;
    width: 100%;
  }
  .border-new {
    position: absolute;
    width: 40px;
    height: 100%;
    /* background-color: rgba(0,0,0,0.1); */
    right: -20px;
  }
  .icon-arrow {
    position: absolute;
    right: 10px;
    animation-duration: 3s;
    /* opacity: 0; */
    transition: opacity 1s;
    svg {
      width: 14px;
      height: 14px;
    }
  }
  .active {
    position: absolute;
    right: 10px;
    transform: rotate(180deg);
    /* opacity: 0; */
    transition: opacity 1s;
    svg {
      width: 14px;
      height: 14px;
    }
  }

  .arrowDown {
    padding-left: 2px;
    padding-bottom: 5px;
    display: none;
  }
  .arrowUp {
    padding-left: 2px;
    padding-bottom: 10px;
  }

  span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  @media (max-width: 1366px) {
    width: ${({ widthQuery }) => `${widthQuery}px`};
  }

  .filter-class {
    margin-right: -50px;
    svg {
      width: 17px;
      height: 17px;
    }
  }
  gap: 10px;
`;

export const FilterContainer = styled.div`
  width: 300px;
  height: 300px;
  ${({ active }) => (!active ? "display:none;" : "")}
  position: absolute;
  bottom: -300px;
`;

export const ColumnMoveBorder = styled.div`
  width: ${({ width }) => (width ? `${width}px` : "50px")};
  height: 100%;
  position: relative;
  border-right: 1px solid transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  /* cursor: pointer; */

  .content-border {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ${({ mouseLive }) =>
    mouseLive
      ? `
           border-right: 1px solid var(--color-danger); 
           height: 536px;
            `
      : ""}

  .border {
    position: absolute;
    width: 3px;
    height: 100%;
    background-color: transparent;
    right: 0;
    cursor: col-resize;

    ${({ mouseLive }) =>
      mouseLive
        ? `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 1;
            background-color:transparent; 
            `
        : ""}
  }
`;

export const ItemBar = styled.div`
  width: 20%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 400px;
  gap: 20px;
  padding-right: 10px;
  gap: 10px;
`;

export const ItemBarSearch = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const ContainerItemSearch = styled.div`
  border: none;
  cursor: pointer;
  position: relative;
  left: 58%;
  top: 1px;
  z-index: 3;
  opacity: ${({ isOpen }) => (isOpen ? "0" : "1")};
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: transparent;
  transition: all 0.2s ease-in-out;
  .iconAdjust {
    position: absolute;
    left: 6px;
    top: 5px;
  }
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    background-color: var(--color-latexAbm-grey95);
  }
`;

export const InputContainer1 = styled.div`
  position: relative;
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "hidden")};
`;

export const Input1 = styled.input`
  border: none;
  border-radius: 5px;
  padding: 0.5rem 0.5rem 0.5rem 2rem;
  width: ${({ isOpen }) => (isOpen ? "200px" : "0")};
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  transition: all 0.3s ease-in-out;
  position: relative;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0.75rem;
    transform: translateY(-50%);
    font-size: 1rem;
    color: #ccc;
    transition: all 0.3s ease-in-out;
  }

  ${({ isOpen }) =>
    isOpen &&
    `
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0.75rem;
      transform: translateY(-50%);
      font-size: 1rem;
      color: #007bff;
    }
  `}
`;

export const IconConainter = styled.div`
  position: absolute;
  top: 60%;
  left: 0.65rem;
  transform: translateY(-50%);
  font-size: 1rem;
  color: #ccc;
  z-index: 5;
`;

export const ContainerItemFilter = styled.div`
  border: none;
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: transparent;
  transition: all 0.2s ease-in-out;
  position: relative;
  z-index: 3;
  .iconAdjust {
    position: absolute;
    left: 6px;
    top: 7px;
  }
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    background-color: var(--color-latexAbm-grey95);
  }
`;

export const ContainerItemColumn = styled.div`
  border: none;
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: transparent;
  transition: all 0.2s ease-in-out;
  position: relative;
  z-index: 3;
  .iconAdjust {
    position: absolute;
    left: 5.5px;
    top: 5px;
  }
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    background-color: var(--color-latexAbm-grey95);
  }
`;
export const ContainerItemExport = styled.div`
  border: none;
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: transparent;
  transition: all 0.2s ease-in-out;
  position: relative;
  z-index: 3;
  .iconAdjust {
    position: absolute;
    left: 5px;
    top: 5px;
  }
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    background-color: var(--color-latexAbm-grey95);
  }
`;
