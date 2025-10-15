import CheckboxFlecha from "global/assets/generico/CheckboxFlecha";
import CheckboxFlechaMenos from "global/assets/generico/CheckboxFlechaMenos";
import { useEffect, useState } from "react";
import "./ItemCheckBoxGroup.css";

const ItemCheckBoxGroup = ({ type, onChange, checked, id, descripcion }) => {
  const [state, setState] = useState(false);

  // Hace que se setee el checked
  useEffect(() => {
    if (typeof checked === "boolean") {
      setState(checked);
    }
  }, [checked]);

  // Es el handleClick
  const handleClick = () => {
    if (typeof checked === "boolean") {
      // setState(checked)
      onChange({
        target: {
          id,
          checked: !state,
        },
      });
    } else {
      onChange({
        target: {
          id,
          checked: !state,
        },
      });
      setState(!state);
    }
  };

  return (
    <div
      className="ptur-ItemCheckBoxGroup-container ts_dropdownCheck_itemCheck-item"
      onClick={handleClick}
    >
      {!state && type !== "MENOS" ? (
        <div className="adjustDesc2">
          <div>
            <span>{descripcion}</span>
          </div>
        </div>
      ) : !state ? (
        <div className="adjustDesc">
          <div>
            <CheckboxFlechaMenos color="var(--color-white)" />
          </div>
          <div className="adjustDescON">
            <span>{descripcion}</span>
          </div>
        </div>
      ) : (
        <div className="adjustDesc">
          <div>
            <CheckboxFlecha color="var(--color-white)" />
          </div>
          <div className="adjustDescON">
            <span>{descripcion}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemCheckBoxGroup;
