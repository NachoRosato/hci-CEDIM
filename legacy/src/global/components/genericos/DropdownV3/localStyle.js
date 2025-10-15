import styled from "styled-components";

export const DropdownV2Container = styled.div`
  width: ${(props) => (props.width ? `${props.width}px` : `100%`)};
  display: flex;
  flex-direction: column;
  gap: 2px;
  border-radius: 4px;
  border: 1px solid
    ${(props) => (props.focus ? `var(--color-latex30)` : `none`)};
`;
export const DropdownV2Header = styled.div`
  font-size: 14px;
  font-weight: bold;
`;
export const DropdownV2Body = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid
    ${(props) =>
      props.error
        ? `var(--color-danger)`
        : props.focus
        ? `var(--color-latex30)`
        : `var(--color-grey85)`};
  background-color: #f1f3f4;
  border-radius: ${(props) =>
    props.showSuggestions && props.dropdownDisabled ? "4px 4px 0 0 " : "4px"};
  padding: 0 8px;
  height: ${(props) => (props.height ? `${props.height}px` : "32px")};
  transition: height 0.3s ease;
  user-select: none;
  .DropdownV2InputSimulado {
    display: flex;
    align-items: center;
    padding-left: 12px;
    margin-left: -8px;
    margin-right: -30px;
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    flex: 1;
    font-size: 16px;
    color: var(--color-latex30);
    ::placeholder {
      font-size: 14px;
    }
  }
`;

export const DropdownV2Icon = styled.div`
  display: flex;
  justify-content: center;
  margin-right: 8px;
  transform: ${(props) => props.rotate && `rotate(180deg)`};
  transition: 0.2s ease;
`;

export const DropdownV2Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background: none;
  flex: 1;
  font-size: 14px;
  color: var(--color-latex30);

  ::placeholder {
    font-size: ${(props) =>
      props.fontSize &&
      `${props.fontSize}px`}; /* Cambia el tamaño de la fuente del marcador de posición */
  }
`;
export const DropdownV2InputSimulado = styled.div`
  width: 100%;
  border: none;
  outline: none;
  background: none;
  flex: 1;
  font-size: 16px;
  color: var(--color-latex30);

  ::placeholder {
    font-size: 14px; /* Cambia el tamaño de la fuente del marcador de posición */
  }
`;

export const DropdownV2Button = styled.button`
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  border: none;
  background: none;
  font-size: 16px;
  color: #70757a;
  cursor: pointer;
  outline: none;
`;

export const MenuDesplegableDropdownV2Container = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #f1f3f4;
  outline: 1px solid var(--color-grey85);
  border-top: 0;
  border-radius: 0 0 4px 4px;
  padding: 0 4px;
  z-index: 10;
  max-height: ${(props) =>
    props.cantidadItems
      ? `calc(26px * ${props.cantidadItems})`
      : `calc(26px * 4)`};
  overflow-y: auto;
  overflow-x: hidden;

  ${({ showAbove }) =>
    showAbove ? `top: 37px; border-radius: 4px 4px 0 0 ;` : ""};

  .masBuscados {
    display: flex;
    gap: 8px;
    padding: 6px 0;
    align-items: baseline;
  }
  .otrosResulados {
    display: flex;
    gap: 8px;
    padding: 6px 20px;
    align-items: baseline;
  }
`;

export const MenuDesplegableDropdownV2ItemContainer = styled.div``;
export const MenuDesplegableDropdownV2Item = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 4px 28px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  background-color: ${(props) =>
    props.selected
      ? "var(--color-latex30); color: var(--color-white); border-radius: 4px;"
      : ""};

  &:hover {
    border-radius: 4px;
    background-color: var(--color-latex30);
    color: var(--color-white);
  }
  .dropdown-item-tooltip {
    width: 100%;
    display: flex;
    justify-content: start;
  }
`;
export const MenuDesplegableDropdownV2SinCoincidencia = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  width: 100%;
  color: #333;
  font-style: italic;
  cursor: default;
  height: ${(props) => (props.height ? "48px" : "28px")};
`;

export const DropdownV2Footer = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: var(--color-danger);
  padding-left: 2px;
`;
