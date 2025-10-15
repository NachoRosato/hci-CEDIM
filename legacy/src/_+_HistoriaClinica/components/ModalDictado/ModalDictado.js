import { useEffect, useState } from "react";
import {
  ContainerBox,
  ContainerGrabar,
  ContainerButtons,
  BtnAceptar,
  PasoTitle,
  GIFContainer,
  FlechaBtn,
  FlechasBox,
  PuntosBox,
  FloatFlechaDer,
  FloatFlechaIzq,
} from "./localStyle";
import Paso1GIF from "./assets/Paso1.gif";
import Paso2GIF from "./assets/Paso2.gif";
import Paso3Save from "./assets/Paso3G.gif";
import Paso3Cancel from "./assets/Paso3C.gif";

const ModalDictado = ({ dissmiss }) => {
  const [paso, setPaso] = useState(1);
  const steps = [1, 2, 3, 4];

  const cambiarPaso = (suma) => {
    if (suma) {
      if (paso === 4) return;
      setPaso(paso + 1);
    } else {
      if (paso === 1) return;
      setPaso(paso - 1);
    }
  };

  const cerrarTutorial = () => {
    dissmiss();
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        cambiarPaso(true);
      } else if (event.key === "ArrowLeft") {
        cambiarPaso(false);
      }
      if (event.key === "Escape") {
        dissmiss(false);
      }
      if (event.key === "Enter" && paso === 4) {
        cerrarTutorial();
      }
    };

    // Agrega el evento keydown
    window.addEventListener("keydown", handleKeyDown);

    // Limpia el evento cuando el componente se desmonte o el efecto cambie
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [paso]);

  return (
    <>
      <FloatFlechaIzq
        className={`${
          paso === 1 ? "bgc-grey65" : "bgc-latex30 pointer"
        } c-white rb24t`}
        onClick={() => cambiarPaso(false)}
      >
        {"<"}
      </FloatFlechaIzq>
      <ContainerBox>
        <ContainerGrabar>
          {paso === 1 && (
            <>
              <PasoTitle>Paso 1: Posiciona el cursor</PasoTitle>
              <p>
                Antes de comenzar a hablar, debes asegurarte de que el cursor
                esté ubicado en el lugar exacto donde deseas que se inserte el
                texto dictado. Esto se hace utilizando el mouse:
              </p>
              <ul>
                <li>
                  Abre el campo de entrada o el editor de texto donde deseas
                  insertar el dictado.
                </li>
                <li>
                  Haz clic en el punto exacto donde quieres que se pegue el
                  texto que vayas a dictar.
                </li>
              </ul>
              <img src={Paso1GIF} width={400} alt="gifPaso" />
            </>
          )}

          {paso === 2 && (
            <>
              <PasoTitle>Paso 2: Comienza a hablar</PasoTitle>
              <p>
                Una vez que el cursor esté en la posición correcta, pulsa el
                botón "Grabar" para comenzar a dictar. La herramienta de dictado
                por voz convertirá tus palabras en texto en tiempo real y lo
                insertará en el lugar que has seleccionado.
              </p>
              <img src={Paso2GIF} width={400} alt="gifPaso" />
            </>
          )}

          {paso === 3 && (
            <>
              <PasoTitle>Paso 3: Guardar o Cancelar los cambios</PasoTitle>
              <p>
                Después de que hayas terminado de dictar, tienes dos opciones:
              </p>
              <ul>
                <li>
                  <span className="rb16b">Guardar Cambios:</span> Esta opción
                  confirmará el texto dictado y lo dejará tal como lo ves en el
                  campo de entrada. El texto se quedará en su lugar y se
                  considerará definitivo.
                </li>
                <li>
                  <span className="rb16b">Cancelar:</span> Si decides que no te
                  gusta cómo quedó el texto dictado o si cometiste algún error,
                  puedes optar por cancelar. Esto revertirá los cambios y el
                  texto volverá a su estado anterior, eliminando todo lo que
                  hayas dictado.
                </li>
              </ul>
              <GIFContainer>
                <div className="titleBox">
                  <p className="rb16m c-latex30">Guardar</p>
                  <img src={Paso3Save} width={400} alt="gifPaso" />
                </div>
                <div className="titleBox">
                  <p className="rb16m c-latex30">Cancelar</p>
                  <img src={Paso3Cancel} width={400} alt="gifPaso" />
                </div>
              </GIFContainer>
            </>
          )}

          {paso === 4 && (
            <>
              <PasoTitle>Consejos Finales</PasoTitle>
              <div>
                <ul>
                  <li>
                    Asegúrate de estar en un ambiente silencioso para evitar que
                    ruidos de fondo interfieran con la precisión del dictado.
                  </li>
                  <li>
                    Habla de manera clara y pausada para obtener los mejores
                    resultados.
                  </li>
                  <li>
                    Revisa el texto dictado antes de guardar los cambios para
                    asegurarte de que se haya capturado correctamente.
                  </li>
                </ul>
              </div>
            </>
          )}
        </ContainerGrabar>
        <ContainerButtons>
          {paso === 4 && (
            <BtnAceptar
              onClick={() => cerrarTutorial()}
              className="rb18m c-white"
            >
              Aceptar
            </BtnAceptar>
          )}
          <PuntosBox>
            {steps.map((step) => (
              <div
                key={step}
                className={`puntos pointer ${
                  paso === step ? "bgc-latex30" : "bgc-grey65"
                }`}
                onClick={() => setPaso(step)}
              ></div>
            ))}
          </PuntosBox>
          <FlechasBox>
            <FlechaBtn
              className={`${
                paso === 1 ? "bgc-grey65" : "bgc-latex30 pointer"
              } c-white rb24t`}
              onClick={() => cambiarPaso(false)}
            >
              {"<"}
            </FlechaBtn>
            <FlechaBtn
              className={`${
                paso === 4 ? "bgc-grey65" : "bgc-latex30 pointer"
              } c-white rb24t`}
              onClick={() => cambiarPaso(true)}
            >
              {">"}
            </FlechaBtn>
          </FlechasBox>
        </ContainerButtons>
      </ContainerBox>
      <FloatFlechaDer
        className={`${
          paso === 4 ? "bgc-grey65" : "bgc-latex30 pointer"
        } c-white rb24t`}
        onClick={() => cambiarPaso(true)}
      >
        {">"}
      </FloatFlechaDer>
    </>
  );
};

export default ModalDictado;
