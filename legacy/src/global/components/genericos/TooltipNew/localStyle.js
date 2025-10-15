import styled from "styled-components";

//por dentro de la caja que se muestra al hacer hover.
export const TooltipBoxContainer = styled.div`
  width: ${({ widthBox }) => (widthBox ? `${widthBox}px` : "200px")};
  height: ${({ heightBox }) => (heightBox ? `${heightBox}px` : "100px")};
  position: absolute;
  z-index: 0;
  top: ${({ posicionY }) => (posicionY ? `${posicionY}px` : "40px")};
  right: ${({ posicionX }) => (posicionX ? `${posicionX}px` : "20px")};
  padding: 3px 10px 3px 10px;
  border-radius: 4px;
  background-color: ${({ backGround }) =>
    backGround ? `${backGround}` : "var(--color-latex30)"};
  display: none;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  span {
    overflow: ${({ overflowSpan }) =>
      overflowSpan ? `${overflowSpan}` : "auto"};
    white-space: ${({ whiteSpaceSpan }) =>
      whiteSpaceSpan ? `${whiteSpaceSpan}` : "pre-wrap"};
    text-overflow: ellipsis;
    word-wrap: break-word;
  }
`;

export const TooltipBoxAdjustArrow = styled.div`
  width: ${({ widthBox }) => (widthBox ? `${widthBox}px` : "200px")};
  height: ${({ heightBox }) => (heightBox ? `${heightBox}px` : "100px")};
  position: absolute;
  top: ${({ posicionY }) => (posicionY ? `${posicionY}px` : "40px")};
  right: ${({ posicionX }) => (posicionX ? `${posicionX}px` : "20px")};
  border-radius: 4px;
  background-color: transparent;
  display: none;
  z-index: 0;
`;

export const TooltipBoxText = styled.span``;

export const TooltipContainerArrow = styled.div`
  width: ${({ widthBox }) => (widthBox ? `${widthBox}px` : "200px")};
  height: ${({ heightBox }) => (heightBox ? `${heightBox}px` : "100px")};
  position: relative;
  padding: 3px 3px 3px 3px;
  border-radius: 4px;
`;

export const TooltipBoxArrow = styled.div`
  position: absolute;
  top: -14px;
  left: calc(50% - 5px);
  transform: rotate(90deg);
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid
    ${({ backGround }) =>
      backGround ? `${backGround}` : "var(--color-latex30)"};
`;

//lo que se muestra en pantalla a lo que queremos hacer hover
export const TooltipContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

export const TooltipText = styled.span`
 &:hover ~ ${TooltipBoxContainer}{
  display:flex;
  z-index: 3;
  transition: all 0.2s ease-in-out;
 }
 &:hover ~ ${TooltipBoxAdjustArrow}{
  display: flex;
  z-index: 3;
  transition: all 0.2s ease-in-out;
 }

`;
