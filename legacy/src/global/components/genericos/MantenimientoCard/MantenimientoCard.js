import { useContext } from "react";
import { GlobalContext } from "../../../context/Provider";
import "./localStyle";
import {
  BodyMantenimiento,
  ContainerMantenimiento,
  HeaderMantenimiento,
} from "./localStyle";
import { mantenimientoDescripcion, mantenimientoTitulo } from "./MantenimientoTxt";

const MantenimientoCard = () => {
  const { textosState } = useContext(GlobalContext);

  return (
    <ContainerMantenimiento>
      <HeaderMantenimiento className="bgcG-latex30">
        <span className="rb24b c-white">
          {textosState.textos.data
            ? textosState.textos.data.msjPortalMantenimiento.nombre
            : mantenimientoTitulo}
        </span>
      </HeaderMantenimiento>
      <BodyMantenimiento>
        {textosState.textos.data ? (
          <span
            className="ptur-mantenimientoCard-bodyTxtSuperior rb24t"
            dangerouslySetInnerHTML={{
              __html:
                textosState.textos.data.msjPortalMantenimiento.descripcion,
            }}
          ></span>
        ) : (
          <span className="ptur-mantenimientoCard-bodyTxtSuperior rb24t">
            {mantenimientoDescripcion}
          </span>
        )}
      </BodyMantenimiento>
    </ContainerMantenimiento>
  );
};

export default MantenimientoCard;
