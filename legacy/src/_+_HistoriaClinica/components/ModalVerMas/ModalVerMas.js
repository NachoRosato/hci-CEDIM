import React from "react";
import { ContainerBox, ContainerItems } from "./localStyle";

const ModalVerMas = ({ determinaciones }) => {
  return (
    <>
      <ContainerBox>
        <ContainerItems>
          {Array.isArray(determinaciones) &&
            determinaciones.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <div className="rb16b c-latex30">
                    {item.idlabnomenclador_desc !== undefined
                      ? item.idlabnomenclador_desc
                      : item.idgrupoestudiO_Desc}
                  </div>
                </React.Fragment>
              );
            })}
        </ContainerItems>
      </ContainerBox>
    </>
  );
};

export default ModalVerMas;
