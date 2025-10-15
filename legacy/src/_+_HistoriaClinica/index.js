import GlobalStyled from "../global/styled/GlobalStyled";
import RouterHistoriaClinica from "./routes/routes";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../global/context/Provider";

const HistoriaClinicaContainer = ({ match }) => {
  const { configState } = useContext(GlobalContext);
  const [appMode, setAppMode] = useState("");

  // useEffect(() => {
  //   // Esta linea resetea el zoom al 100% en caso de que tenga otro valor
  //   document.body.style.zoom = (window.innerWidth / window.outerWidth)

  //   // Esta linea bloquea el zoom con la ruedita del mouse
  //   document.addEventListener(
  //     "wheel",
  //     (event) => {
  //       const { ctrlKey } = event;
  //       if (ctrlKey) {
  //         event.preventDefault();
  //         return;
  //       }
  //     },
  //     { passive: false }
  //   );
  // }, []);

  useEffect(() => {
    if (configState.config.data) {
      setAppMode(configState.config.data.modoEstilo);
    }
  }, [configState.config.data]);

  return (
    <>
      <GlobalStyled mode={appMode} />
      <RouterHistoriaClinica match={match} />
    </>
  );
};

export default HistoriaClinicaContainer;
