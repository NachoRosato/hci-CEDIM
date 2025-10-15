import { useState } from "react";

import FlechaDropdown from "global/assets/generico/FlechaDropdown";
import CheckBoxGroup from "../CheckBoxGroup/CheckBoxGroup";

import "./DropdownCheck.css";

const DropdownCheck = ({
  customWh,
  boxCheckArrowed,
  placeholder,
  longitud,
  datos,
  handleChangeFiltros,
}) => {
  const [mostrar, setMostrar] = useState(false);
  const [blockedCss, setBlockedCss] = useState();
  const [active, setActive] = useState();

  const showCheckboxes = () => {
    if (!mostrar) {
      setBlockedCss("ptur-dropdownCheck-checkboxes-blocked");
      setActive("ptur-dropdownCheck-selectBox-active");
      setMostrar(true);
    } else {
      setBlockedCss("ptur-dropdownCheck-checkboxes-unBlocked");
      setActive("");
      setMostrar(false);
    }
  };

  const ocultarClickFondo = () => {
    setMostrar(false);
  };

  return (
    <div className={`ptur-dropdownCheck-container ${customWh} ${active}`}>
      {mostrar && (
        <div
          className="ptur-dropdownCheck-fondo ts_dropdownCheck_closeBox-box"
          onClick={ocultarClickFondo}
        ></div>
      )}
      <div
        className={`ptur-dropdownCheck-selectBox ts_dropdownCheck_showBox-box`}
        onClick={showCheckboxes}
      >
        <div className="ptur-dropdownCheck-selectBody">
          <span className="rb16mh">
            {placeholder} ({longitud})
          </span>
          <div
            className={
              mostrar
                ? "ptur-dropdownCheck-flecha-show pointer"
                : "ptur-dropdownCheck-flecha-hide pointer"
            }
          >
            <FlechaDropdown color={"var(--color-latex30)"} />
          </div>
        </div>
        <div className="ptur-dropdownCheck-overSelect"></div>
      </div>
      {mostrar && (
        <div className={`ptur-dropdownCheck-checkboxes ${blockedCss}`}>
          {boxCheckArrowed ? (
            <div className="ptur-dropdownCheck-checkboxes-arrow"></div>
          ) : (
            // Cambios sebastián
            <CheckBoxGroup data={datos} onChange={handleChangeFiltros} />
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownCheck;
