import { useState, useEffect, useContext } from "react";
import "./Toaster.css";
import { hideToaster } from "../../../context/action/toaster/toaster";
import { GlobalContext } from "../../../context/Provider";
import ToasterSuccess from "../../../assets/generico/ToasterSuccess";
import ToasterDanger from "../../../assets/generico/ToasterDanger";
import { AnimatePresence } from "framer-motion";
import { ToasterBody, ToasterContainer, ToasterText } from "./localstyle";
import { motion } from "framer-motion";

const Toaster = () => {
  const { toasterState, toasterDispatch } = useContext(GlobalContext);
  const [animation, setAnimation] = useState("");
  const [params, setParams] = useState("");
  const [posicion, setPosicion] = useState(["ptur-toaster-centrar"]);
  const [tipo, setTipo] = useState("");
  const [tipoIcon, setTipoIcon] = useState(null);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (
      toasterState.toaster.data !== undefined &&
      toasterState.toaster.data !== null
    ) {
      if (
        toasterState.toaster.data.posicion !== undefined &&
        toasterState.toaster.data.posicion !== null &&
        toasterState.toaster.data.posicion !== ""
      ) {
        setPosicion("ptur-toaster-centrar");
      }
      setAnimation("ptur-toaster-desplazarCentroArriba");

      // Verificar que params existe y es válido
      if (
        toasterState.toaster.data.params &&
        typeof toasterState.toaster.data.params === "object"
      ) {
        setParams(toasterState.toaster.data.params);

        switch (toasterState.toaster.data.params.tipo) {
          case "info":
            setTipo("bgc-latex30");
            break;
          case "success":
            setTipo("bgc-broccoli");
            setTipoIcon(true);
            break;
          case "danger":
            setTipo("bgc-danger");
            setTipoIcon(false);
            break;
          default:
            setTipo("bgc-danger");
        }
      }
      const timeout = setTimeout(() => {
        setShow(false); // Activa la animación de salida
        setTimeout(() => {
          hideToaster()(toasterDispatch); // Luego desmonta el toaster después de la animación
        }, 500); // Este tiempo debe coincidir con la duración de la animación de salida
      }, 3500);

      return () => clearTimeout(timeout);
    }
  }, [toasterState.toaster.data]);

  return (
    // <div className={`ptur-toaster ${tipo} ${animation} ${posicion}`}>
    //   <div className="ptur-toaster-content">
    //     {tipoIcon ? <ToasterSuccess /> : <ToasterDanger />}
    //     <span className="rb16m ptur-toaster-texto">{params.texto}</span>
    //   </div>
    // </div>
    <AnimatePresence>
      {show &&
        toasterState.toaster.data &&
        toasterState.toaster.data.params && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.4 }}
            style={{
              position: "relative",
              zIndex: 9999,
            }}
          >
            <ToasterContainer className={`${tipo}`}>
              <ToasterBody>
                {tipoIcon ? <ToasterSuccess /> : <ToasterDanger />}
                <ToasterText className="rb16m ptur-toaster-texto">
                  {params?.texto || "Mensaje"}
                </ToasterText>
              </ToasterBody>
            </ToasterContainer>
          </motion.div>
        )}
    </AnimatePresence>
  );
};

export default Toaster;
