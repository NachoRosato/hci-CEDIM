import ItemCheckBoxGroup from "./ItemCheckBoxGroup/ItemCheckBoxGroup";
import "./CheckBoxGroup.css";
import React from "react";

const CheckBoxGroup = ({ data, onChange }) => {
  return (
    <div className="ptur-checkBoxGroup-container">
      {data?.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <div
              className={`ptur-checkBoxGroup-container-column ${
                index === 0 ? "margin-10px" : ""
              }`}
            >
              <ItemCheckBoxGroup
                id={item.id}
                checked={item.checked}
                onChange={onChange}
                type={index === 0 ? "MENOS" : ""}
                descripcion={item.descripcion}
              />
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default CheckBoxGroup;
