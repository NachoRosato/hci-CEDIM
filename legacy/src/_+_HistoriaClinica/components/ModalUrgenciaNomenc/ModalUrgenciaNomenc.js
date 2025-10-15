import React, { useState } from "react";
import {
  ContainerModal,
  ContainerHeader,
  ContainerDescription,
  ContainerList,
  ContainerItem,
  CheckboxInput,
  ItemText,
  ContainerButtons,
  BtnVolver,
  BtnGuardar,
} from "./localStyle";

const ModalUrgenciaNomenc = ({
  grupoEstudioItems,
  modifica,
  onGuardar,
  onVolver,
}) => {
  // Usar directamente la lista que recibimos (ya viene con las configuraciones de urgencia)
  const [itemsConUrgencia, setItemsConUrgencia] = useState(grupoEstudioItems);

  const handleCheckboxChange = (index) => {
    const nuevosItems = [...itemsConUrgencia];
    nuevosItems[index].urgencia = !nuevosItems[index].urgencia;
    setItemsConUrgencia(nuevosItems);
    modifica = true;
  };

  const handleGuardar = () => {
    onGuardar(itemsConUrgencia, modifica);
  };

  return (
    <ContainerModal>
      <ContainerHeader>
        <ContainerDescription>
          Seleccione qué determinación debe realizarse con urgencia
        </ContainerDescription>
      </ContainerHeader>

      <ContainerList>
        {itemsConUrgencia.map((item, index) => (
          <ContainerItem
            key={index}
            isLast={index === itemsConUrgencia.length - 1}
            onClick={() => handleCheckboxChange(index)}
          >
            <CheckboxInput
              type="checkbox"
              checked={item.urgencia}
              onChange={() => handleCheckboxChange(index)}
            />
            <ItemText>{item.idlabnomenclador_desc}</ItemText>
          </ContainerItem>
        ))}
      </ContainerList>

      <ContainerButtons>
        <BtnVolver onClick={onVolver}>Volver</BtnVolver>
        <BtnGuardar onClick={handleGuardar}>Guardar</BtnGuardar>
      </ContainerButtons>
    </ContainerModal>
  );
};

export default ModalUrgenciaNomenc;
