import React from "react";
import "./Tooltip.css";

const Tooltip = ({ descripcion, data, customCss, array }) => {
  return (
    <div className="wrapper">
      <div className="icon">
        <div className={"tooltip noSeleccionable " + customCss}>
          {!descripcion ? (
            array.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <span className="tooltip-txt c-latex10 rb14m">
                    {item.idlabnomenclador_desc}
                  </span>
                </React.Fragment>
              );
            })
          ) : (
            <span className="tooltip-txt c-latex10 rb14m">{descripcion}</span>
          )}
        </div>
        <div className="tooltip-data" data-tooltip={descripcion}>
          {data}
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
