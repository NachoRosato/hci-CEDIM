import { useEffect, useState } from "react";

import {
  Container,
  MsjError,
  Placeholder,
  SelectDropdown,
  Title,
  ViewValue,
  ItemBox,
} from "./localStyle";
import camelize from "global/utils/camelize";
import FlechaDropdown from "global/assets/generico/FlechaDropdown";

const DropdownAdm = ({
  extraProperty,
  headerStr,
  placeholder,
  isRequired,
  setState,
  state,
  property,
  propertyTwo,
  value,
}) => {
  //ejemplo de como utilizar por fuera.
  //   <DropdownAdm
  //   extraProperty={{
  //     data: recepcionState.recepcion.data.data,
  //     code: "id",
  //     value: "descripcion",
  //     errorForced: stateRequired.recepcion,
  //     setErrorForced: setStateRequired,
  //     stateRequired: stateRequired,
  //     titleStyle: "rb14l c-latexAbm",
  //     heightContainer: 75,
  //     widthContainer: 100,
  //     heightValue: 34,
  //     widthValue: 70,
  //     textValueStyle: "rb14l",
  //     arrowPadding: 6,
  //     itemStyle: "rb14l c-latex30"
  //   }}
  //   headerStr={"Recepción"}
  //   placeholder={"Seleccione una Recepción"}
  //   property={"idrecepcion"}
  //   propertyTwo={"idrecepcion_desc"}
  //   state={localForm}
  //   setState={setLocalForm}
  //   value={type === "PUT" ? form.idrecepcion : false}
  //   isRequired={true}
  // />

  const targetContainer = document.getElementById(extraProperty.idUnique);

  // abre el dropDown
  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
  };

  // selecciona un elemento
  const [selected, setSelected] = useState({ code: false, value: false });

  const handleClickItem = (e) => {
    const id = e[extraProperty.code];
    const value = e[extraProperty.value];

    setState({
      ...state,
      [property]: id,
      [propertyTwo]: propertyTwo && value,
    });
    extraProperty.setErrorForced({
      ...extraProperty.stateRequired,
      [property]: false,
    });
    setSelected({ code: Number(e[extraProperty.code]), value });
    setActive(false);

    // targetContainer.style.overflow = "scroll";
  };

  // Eliminar item Dropdown
  const [select, setSelect] = useState(0);
  window.onkeydown = (e) => {
    if (active) {
      if(e.key.toLowerCase() === "delete"){
        setSelected({ code: false, value: false });
        setActive(false);
      }
    };
  };

  // Verificar los values
  useEffect(() => {
    if (value) {
      const resul = extraProperty.data.filter(
        (e) => Number(e.id) === Number(value)
      );
      setSelected({
        code: Number(value),
        value: resul[0][extraProperty.value],
      });
    }
  }, []);

  return (
    <Container
      height={extraProperty.heightContainer}
      width={extraProperty.widthContainer}
      active={active}
      error={extraProperty.errorForced && isRequired}
      className="div"
    >
      <Title className={extraProperty.titleStyle}>
        {headerStr + (isRequired ? " *" : "")}
      </Title>
      <div className="background-click" onClick={handleClick} />
      <ViewValue
        height={extraProperty.heightValue}
        width={extraProperty.widthValue}
        arrowPadding={extraProperty.arrowPadding}
        onClick={handleClick}
        className="viewValue"
      >
        {!selected.value ? (
          <>
            <Placeholder className={extraProperty.textValueStyle}>
              {placeholder}
            </Placeholder>
            <span className={active ? "active" : ""}>
              <FlechaDropdown color={"var(--color-latex30)"} />
            </span>
          </>
        ) : (
          <>
            <span className={`${extraProperty.itemStyle} overflowValue`}>
              {camelize(selected.value)}
            </span>{" "}
            <span className={active ? "active" : ""}>
              <FlechaDropdown color={"var(--color-latex30)"} />
            </span>
          </>
        )}
      </ViewValue>

      {extraProperty.errorForced && isRequired ? (
        <MsjError className="rb12m c-danger">Este campo es requerido</MsjError>
      ) : (
        ""
      )}

      <SelectDropdown
        width={extraProperty.widthValue}
        errorPlacement={extraProperty.errorForced && isRequired}
        className={"select-dropdown"}
        id={`ptur-selectDropDown-abm0306${property}`}
      >
        {extraProperty.data.map((element, index) => {
          return (
            <ItemBox
              width={extraProperty.widthValue}
              key={index}
              selected={select === index ? true : false}
              id={element[extraProperty.code]}
              onClick={() => handleClickItem(element)}
            >
              <span className={extraProperty.itemStyle}>
                {camelize(element[extraProperty.value])}
              </span>
            </ItemBox>
          );
        })}
      </SelectDropdown>
    </Container>
  );
};

export default DropdownAdm;
