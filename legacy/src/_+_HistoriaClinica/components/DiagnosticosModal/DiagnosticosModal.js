import React from "react";
import {
  DiagBox,
  EnfermedadesItem,
  EnfermedadesItems,
  EnfermedadesVacio,
} from "./localStyle";
const DiagnosticosModal = ({ diagnosticos }) => {
  return (
    <>
      <DiagBox>
        <EnfermedadesItems>
          {diagnosticos !== null && diagnosticos.length > 0 ? (
            diagnosticos.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <EnfermedadesItem className="rb16b c-white">
                    <div className="txtCruz">
                      <div />
                      <span>{item.display}</span>
                    </div>
                  </EnfermedadesItem>
                </React.Fragment>
              );
            })
          ) : (
            <EnfermedadesVacio className="rb16b c-latex30">
              No posee diagnósticos
            </EnfermedadesVacio>
          )}
        </EnfermedadesItems>
      </DiagBox>
    </>
  );
};

export default DiagnosticosModal;
