import { useEffect, useRef, useState } from "react";
import { TooltipContainer, TooltipContent } from "./localStyle";

const TooltipDropdownV2 = ({ detalle, children, showUp }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipHeight, setTooltipHeight] = useState(0);
  const tooltipRef = useRef(null);

  const handleMouseEnter = (e) => {
    setShowTooltip(true);
    setTooltipPosition({ x: e.clientX, y: e.clientY });
    setTooltipHeight(tooltipRef.current.offsetHeight);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  useEffect(() => {
    setTooltipHeight(tooltipRef.current.offsetHeight);
  }, [showTooltip]); // Actualizar el height cuando showTooltip cambie

  return (
    <TooltipContainer
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      showUp={showUp}
    >
      {children}
      <TooltipContent
        visible={showTooltip}
        x={tooltipPosition.x}
        y={tooltipPosition.y}
        height={tooltipHeight}
        ref={tooltipRef}
      >
        {detalle}
      </TooltipContent>
    </TooltipContainer>
  );
};

export default TooltipDropdownV2;
