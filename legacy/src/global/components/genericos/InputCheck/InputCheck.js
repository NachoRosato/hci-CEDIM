import { useEffect, useState } from "react";
import { Input, InputCheckContainer, Label } from "./localStyle";

const InputCheck = ({
  onClick,
  name,
  headerStr,
  onChange,
  checkboxStr,
  checked,
  checboxHeight
}) => {

  return (
    <InputCheckContainer>
      <Input
        type="checkbox"
        className="checkBox"
        checboxHeight={checboxHeight}
        onChange={onChange}
        id={"check" + name}
        checked={checked}
        onClick={onClick}
        name={name}
        autoComplete="off"
      />{" "}
      <Label className="ptur-label-checkbox rb16t" htmlFor={"check" + name}>
        {checkboxStr}
      </Label>
    </InputCheckContainer>
  );
};

export default InputCheck;
