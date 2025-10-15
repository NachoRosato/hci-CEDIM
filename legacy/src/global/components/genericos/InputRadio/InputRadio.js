import { useEffect, useState } from "react";
import { Input, InputCheckContainer, Label } from "./localStyle";

const InputRadio = ({
  onClick,
  name,
  onChange,
  checkboxStr,
  checked,
  radioHeight,
  errorString,
}) => {
  return (
    <InputCheckContainer>
      <Input
        type="radio"
        className="radio"
        radioHeight={radioHeight}
        onChange={onChange}
        id={"radio" + name}
        checked={checked}
        onClick={onClick}
        name={name}
        autoComplete="off"
      />{" "}
      <Label className="rb14l" htmlFor={"radio" + name}>
        {checkboxStr}
      </Label>
    </InputCheckContainer>
  );
};

export default InputRadio;
