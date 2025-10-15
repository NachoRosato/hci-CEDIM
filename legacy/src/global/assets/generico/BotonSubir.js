import "./BotonSubir.css";
import { FaArrowCircleUp } from "react-icons/fa";
import { useEffect, useState } from "react";

const BotonSubir = ({ body }) => {
  const [showScroll, setShowScroll] = useState(false);

  let ventana = document.documentElement.getElementsByClassName(body);

  useEffect(() => {
    ventana[0].addEventListener("scroll", checkScrollTop);
    return () => {
      if (ventana[0]) {
        ventana[0].removeEventListener("scroll", checkScrollTop);
      }
    };
  });

  const checkScrollTop = () => {
    if (!showScroll && ventana[0].scrollHeight > 800) {
      setShowScroll(true);
    } else if (showScroll && ventana[0].scrollHeight <= 800) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    ventana[0].scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="scrollTop-container">
      <button
        className="scrollTop rb18l bgc-latex30 c-white"
        onClick={scrollTop}
        style={{ height: 40, display: showScroll ? "flex" : "none" }}
      >
        <FaArrowCircleUp /> Subir
      </button>
    </div>
  );
};
export default BotonSubir;
