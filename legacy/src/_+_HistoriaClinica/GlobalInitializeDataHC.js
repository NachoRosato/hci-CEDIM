import { useContext, useEffect } from "react";
import { GlobalContext } from "../global/context/Provider";
import { guardarJsonConfig } from "global/context/action/config/config";
import { wsGetVersionPublicadaHc } from "global/context/action/versionPublicada/versionPublicado";

const GlobalInitializeDataHC = ({ children }) => {
  // Cambio de contexto
  const { configDispatch, configState, versionPublicadaDispatch } =
    useContext(GlobalContext);

  useEffect(() => {
    fetch(`/config.json?v=${new Date().getTime()}`)
      .then((response) => {
        return response.json();
      })
      .then((jsondata) => {
        guardarJsonConfig(jsondata)(configDispatch);
      });
  }, []);

  //obtener version
  useEffect(() => {
    if (configState.config.data !== null) {
      wsGetVersionPublicadaHc()(versionPublicadaDispatch);
    }
  }, [configState.config]);

  return <>{children}</>;
};

export default GlobalInitializeDataHC;
