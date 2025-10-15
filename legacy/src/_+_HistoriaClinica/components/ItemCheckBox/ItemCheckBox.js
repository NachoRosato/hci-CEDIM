import CheckboxFlecha from "global/assets/generico/CheckboxFlecha";
import { useEffect, useState } from "react";
import { BoxChecksDescItem, BoxContainer, ContainerChecks } from "./localStyle";

const ItemCheckBox = ({ onChange, checked, id, descripcion }) => {
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
          descripcion,
          checked: !state,
        },
      });
    } else {
      onChange({
        target: {
          id,
          descripcion,
          checked: !state,
        },
      });
      setState(!state);
    }
  };

  return (
    <>
      <BoxContainer onClick={handleClick}>
        <ContainerChecks>
          {!state ? "" : <CheckboxFlecha color="var(--color-white)" />}
        </ContainerChecks>
        <BoxChecksDescItem>
          <span className="c-latex30 rb12l">{descripcion}</span>
        </BoxChecksDescItem>
      </BoxContainer>
    </>
  );
};

export default ItemCheckBox;
