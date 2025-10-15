import camelize from "global/utils/camelize";
import React, { useEffect } from "react";
import {
  ContainerBox,
  ContainerEstudios,
  ContainerButtons,
  BtnCerrar,
  CardEstudio,
} from "./localStyle";

const ModalListaEstudios = ({
  visor,
  verImagenPacs,
  listaEstudios,
  dissmiss,
  flgPacsAnterior,
  abrirVisorImagen,
}) => {
  return (
    <>
      <ContainerBox>
        <ContainerEstudios>
          {Array.isArray(listaEstudios) &&
            listaEstudios.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <CardEstudio
                    onClick={
                      flgPacsAnterior
                      ? () => abrirVisorImagen(item, visor)
                      : () => verImagenPacs(item, visor)
                    }
                  >
                    <p className="rb18l c-latex30">
                      {camelize(item.descripcion)}
                    </p>
                  </CardEstudio>
                </React.Fragment>
              );
            })}
        </ContainerEstudios>
        <ContainerButtons>
          <BtnCerrar onClick={dissmiss} className="rb18m c-white">
            Cerrar
          </BtnCerrar>
        </ContainerButtons>
      </ContainerBox>
    </>
  );
};

export default ModalListaEstudios;
