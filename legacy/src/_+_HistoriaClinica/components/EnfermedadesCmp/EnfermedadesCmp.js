import React from "react";
import {
  ContainerEnfermedades,
  EnfermedadesBox,
  EnfermedadesBtnBox,
  EnfermedadesItem,
  EnfermedadesItems,
  EnfermedadesTitle,
  EnfermedadesVacio,
} from "./localStyle";
import ProfileIcon from "global/assets/generico/ProfileIcon";
import CircleMasMini from "global/assets/generico/CircleMasMini";
import { IonSpinner } from "@ionic/react";
import TooltipV2 from "global/components/genericos/TooltipV2/TooltipV2";
import AskMarkLitIcon from "global/assets/generico/AskMarkLitIcon";
import XLitleIcon from "global/assets/generico/XLitleIcon";

const EnfermedadesCmp = ({
  agregarEnfItem,
  loading,
  antecedentesEnf,
  eliminarElemento,
}) => {
  const validarEliminarDiag = (item) => {
    if (item.tipo !== undefined && item.tipo === "S") {
      return true;
    } else if (
      (item.idSnomed !== undefined || item.idsnomed !== undefined) &&
      item.idsnomed !== ""
    ) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <>
      <ContainerEnfermedades>
        <EnfermedadesTitle className="rb16b c-white">
          <div className="iconAdjust">
            <ProfileIcon />
          </div>
          <div className="titleEdit"> Enfermedades y antecedentes</div>
          <div className="qMarkClass pointer">
            <TooltipV2
              csBoxWidth={289}
              csRadius={16}
              children={<AskMarkLitIcon color={"var(--color-white)"} />}
              detalle={
                <p className="rb12tl" style={{ textAlign: "left", padding: 5 }}>
                  Aqui se listan todas las enfermedades y alergias que se
                  atribuyen al paciente. Es posible agregar un registro nuevo
                  presionando el botón <b>“Agregar”</b> y buscando lo que se
                  desea agregar en la ventana que se abre
                </p>
              }
            />
          </div>
        </EnfermedadesTitle>
        <EnfermedadesBox>
          {loading ? (
            <div className="loadingBox">
              <IonSpinner name="lines" />
            </div>
          ) : (
            <>
              <EnfermedadesItems>
                {antecedentesEnf.length > 0 ? (
                  antecedentesEnf.map((item, index) => {
                    return (
                      <React.Fragment key={index}>
                        <EnfermedadesItem className="rb16b c-white">
                          <div className="txtCruz">
                            <TooltipV2
                              children={
                                <span style={{ paddingBottom: 4 }}>
                                  {item.display !== undefined
                                    ? item.display
                                    : item.texto !== undefined
                                    ? item.texto
                                    : item.descripcion}
                                </span>
                              }
                              detalle={
                                item.display !== undefined
                                  ? item.display
                                  : item.texto !== undefined
                                  ? item.texto
                                  : item.descripcion
                              }
                            />
                            {validarEliminarDiag(item) && (
                              <div
                                className="padAdjust pointer ts_enfAntc_del-item adjustLitleX"
                                onClick={() => eliminarElemento(item)}
                              >
                                <XLitleIcon color={"var(--color-white)"} />
                              </div>
                            )}
                          </div>
                        </EnfermedadesItem>
                      </React.Fragment>
                    );
                  })
                ) : (
                  <EnfermedadesVacio className="rb16b c-latex30">
                    No posee Enfermedades o Antecedentes
                  </EnfermedadesVacio>
                )}
              </EnfermedadesItems>
              <EnfermedadesBtnBox>
                <div
                  className="adjustEnfBtnBox pointer ts_enfAntc-btn"
                  onClick={agregarEnfItem}
                >
                  <span className="busqPaciente-avatar">
                    <CircleMasMini />
                  </span>
                  <span className="busqPaciente-title rb14l c-latex30">
                    {" "}
                    Agregar
                  </span>
                </div>
              </EnfermedadesBtnBox>
            </>
          )}
        </EnfermedadesBox>
      </ContainerEnfermedades>
    </>
  );
};

export default EnfermedadesCmp;
