import styled from "styled-components";

export const ContainerBody = styled.div`
  width: 100%;
  ${({ bodyHeight }) =>
    bodyHeight
      ? `
       height:${bodyHeight}px;
            `
      : `
       height:144px;
            `}
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  box-shadow: 1px 4px 8px rgba(0, 0, 0, 0.15);
`;

export const Item = styled.div`
  width: 100%;
  height: 34px;
  border-bottom: 1px solid #c9c9c9;
  display: flex;
  color: var(--color-latex30);
  font-weight: 400;
  font-size: 12px;
  line-height: 32px;
  position: relative;
  &:hover {
    background-color: rgba(0, 163, 255, 0.2);
    cursor: pointer;
  }
  ${({ selected }) =>
    selected ? "background-color:rgba(0, 163, 255, 0.2);" : ""}
`;

export const SubItem = styled.div`
  width: 0px;
  min-width: ${({ width }) => (width ? `${width}px` : "50px")};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  span {
    width: 90%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
    justify-content: left;
  }
  ${({ mouseLive }) =>
    mouseLive
      ? `
        border-right: 1px solid #C9C9C9;

            `
      : ""}
  .resize-col {
    position: absolute;
    background-color: #c9c9c9;
    width: 2px;
    height: 100px;
    right: 0px;
    top: 0;
    /* border-right: 1px solid #C9C9C9; */
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

  input {
    cursor: pointer;
  }

  @media (max-width: 1366px) {
    min-width: ${({ widthQuery }) => `${widthQuery}px`};
  }
`;
