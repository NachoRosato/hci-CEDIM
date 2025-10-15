import "./localStyle";
import {
  TooltipBoxAdjustArrow,
  TooltipBoxArrow,
  TooltipBoxContainer,
  TooltipBoxText,
  TooltipContainer,
  TooltipContainerArrow,
  TooltipText,
} from "./localStyle";

const TooltipNew = ({ icon, texto, textoBox, extraProperty, onclick}) => {
  return (


    <TooltipContainer  onClick={onclick}>
      <TooltipText className={extraProperty.textStyle}>{texto}{icon}</TooltipText>
      <TooltipBoxContainer
        widthBox={extraProperty.widthBox}
        heightBox={extraProperty.heightBox}
        backGround={extraProperty.backGround}
        posicionX={extraProperty.posicionX}
        posicionY={extraProperty.posicionY}
        overflowSpan={extraProperty.overflowSpan}
        whiteSpaceSpan={extraProperty.whiteSpaceSpan}
        className="test"
      >
        <TooltipBoxText className={extraProperty.textBoxStyle}>
          {textoBox}
        </TooltipBoxText>
      </TooltipBoxContainer>
      <TooltipBoxAdjustArrow
        widthBox={extraProperty.widthBox}
        heightBox={extraProperty.heightBox}
        posicionX={extraProperty.posicionX}
        posicionY={extraProperty.posicionY}
      >
        <TooltipContainerArrow
          widthBox={extraProperty.widthBox}
          heightBox={extraProperty.heightBox}
        >
          <TooltipBoxArrow
            className="hoverMe"
            backGround={extraProperty.backGround}
            widthBox={extraProperty.widthBox}
            heightBox={extraProperty.heightBox}
          />
        </TooltipContainerArrow>
      </TooltipBoxAdjustArrow>
    </TooltipContainer>
   
  );
};

export default TooltipNew;