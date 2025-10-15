import styled from "styled-components";

export const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const TooltipContent = styled.div.attrs((props) => ({
  id: "myTooltipContent",
  // Otros atributos personalizados que desees agregar
}))`
  visibility: ${(props) => (props.visible ? "visible" : "hidden")};
  position: fixed;
  top: ${(props) => props.y + props.height}px;
  left: ${(props) => props.x}px;
  transform: translate(-50%, calc(-100% + 20px));
  background-color: #333;
  color: #fff;
  padding: 8px;
  border-radius: 4px;
  font-size: 14px;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.3s;
  z-index: 10;
  &::before {
    content: "";
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%) rotate(180deg);
    border-width: 8px 8px 0;
    border-style: solid;
    border-color: #333 transparent transparent;
  }
`;
