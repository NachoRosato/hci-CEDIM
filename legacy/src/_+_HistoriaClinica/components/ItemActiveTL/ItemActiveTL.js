import { IonSpinner } from "@ionic/react";
import { ContainerItemActive } from "./localStyle";
import TurnoNoEncontrado from "global/components/genericos/TurnoNoEcontrado/TurnoNoEncontrado";

const ItemActiveTL = ({ pdfPaciente, showItemTL, timeline }) => {
  return (
    <>
      <ContainerItemActive
        flgTest={
          pdfPaciente === null &&
          showItemTL !== null &&
          showItemTL.tipos !== "Evolución"
            ? true
            : false
        }
        id="evolucionActiva"
        timeline={timeline}
      >
        {showItemTL !== null ? (
          showItemTL.tipos === "Evolución" ? (
            <div
              dangerouslySetInnerHTML={{
                __html: showItemTL.evolucionHtml,
              }}
            ></div>
          ) : (showItemTL.tipos === "Informes" ||
              showItemTL.tipos === "Laboratorio" ||
              (showItemTL.tipos === "Estudios" &&
                showItemTL.informeAsoc !== null)) &&
            pdfPaciente === null ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <IonSpinner name="lines-small" />
            </div>
          ) : showItemTL.tipos === "Informes" && pdfPaciente !== null ? (
            <iframe
              title="informe"
              className="documentoPdf"
              src={pdfPaciente}
              type="application/octet-stream"
            />
          ) : showItemTL.tipos === "Laboratorio" && pdfPaciente !== null ? (
            <iframe
              title="informe"
              className="documentoPdf"
              src={pdfPaciente}
              type="application/octet-stream"
            />
          ) : showItemTL.tipos === "Estudios" &&
            showItemTL.informeAsoc !== null &&
            pdfPaciente !== null ? (
            <iframe
              title="informe"
              className="documentoPdf"
              src={pdfPaciente}
              type="application/octet-stream"
            />
          ) : (
            <TurnoNoEncontrado
              textoNegrita={"Lo sentimos, no hay informe asociado"}
              texto={"No posee un Pdf asignado al item seleccionado"}
              sinSeleccionar={pdfPaciente === null ? true : false}
              sinSeleccionarMsj={"Seleccione un item de la Línea de Tiempo"}
            />
          )
        ) : (
          <TurnoNoEncontrado
            textoNegrita={"Lo sentimos, no hay informe asociado"}
            texto={"No posee un Pdf asignado al item seleccionado"}
            sinSeleccionar={pdfPaciente === null ? false : true}
            sinSeleccionarMsj={"Seleccione un item de la Línea de tiempo"}
          />
        )}
      </ContainerItemActive>
    </>
  );
};

export default ItemActiveTL;
