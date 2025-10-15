import camelize from "global/utils/camelize";
import React from "react";
import {
  BtnSeleccionar,
  ContainerBody,
  ContainerBox,
  ContainerButton,
  ContainerItems,
  ContainerTitle,
  ContainerVerMas,
} from "./localStyle";

const CardOrdenLabo = ({
  arrayDeter,
  itemName,
  seleccionaOrden,
  mensajeVerMas,
}) => {
  return (
    <>
      <ContainerBox>
        <ContainerTitle className="bgcG-latex30">
          <span className="rb16b c-white">{camelize(itemName)}</span>
        </ContainerTitle>
        <ContainerBody>
          <ContainerItems>
            {arrayDeter.items.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <div>
                    <span className="rb12l c-latex30">
                      {item.idlabnomenclador_desc}
                    </span>
                  </div>
                </React.Fragment>
              );
            })}
          </ContainerItems>
          <ContainerVerMas>
            <div
              className="rb12b c-latex30 pointer"
              onClick={() => mensajeVerMas(arrayDeter.items)}
            >
              ...ver más
            </div>
          </ContainerVerMas>
          <ContainerButton>
            <BtnSeleccionar
              className="bgc-primary rb16m c-white pointer"
              onClick={() => seleccionaOrden(arrayDeter)}
            >
              Seleccionar
            </BtnSeleccionar>
          </ContainerButton>
        </ContainerBody>
      </ContainerBox>
    </>
  );
};

export default CardOrdenLabo;
