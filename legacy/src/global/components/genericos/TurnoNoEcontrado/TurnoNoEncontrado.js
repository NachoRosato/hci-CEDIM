import InformacionIcon from "global/assets/generico/InformacionIcon";

import "./TurnoNoEncontrado.css";

const TurnoNoEncontrado = ({
  texto,
  textoNegrita,
  sinSeleccionar,
  sinSeleccionarMsj
}) => {
  
  return (
    <>
      <div className={"ptur-turnoNoEncontrado-noEcontrados-container"}>
        <div className="ptur-turnoNoEncontrado-noEcontrados-icono">
          <InformacionIcon />
        </div>
        <div className="ptur-turnoNoEncontrado-noEcontrados-texto">
          <div className="ptur-turnoNoEncontrado-noEcontrados-texto">
            {sinSeleccionar ? (
              <span>
                <p className="rb18b">
                 {textoNegrita}
                </p>
                <p
                  className="rb16l"
                >{texto}</p>
              </span>
            ) : (
              <span>
                <p className="rb18b">{sinSeleccionarMsj}</p>
                <p
                  className="rb16l"
                >{texto}</p>
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TurnoNoEncontrado;
