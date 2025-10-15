import { createContext, useEffect, useReducer } from "react";

import { authInitialState } from "./initialStates/authInitialState";
import textosInitialState from "./initialStates/textosInitialState";
import { modeInitialState } from "./initialStates/modeInitialState";
import toasterInitialState from "./initialStates/toasterInitialState";
import modalInitialState from "./initialStates/modalInitialState";
import configInitialState from "./initialStates/configInitialState";
import { usuarioRolInitialState } from "./initialStates/usuarioRolInitialState";
import tokenInitialState from "./initialStates/tokenInitialState";
import { segundoModalInitialState } from "./initialStates/segundoModalInitialState";
import versionPublicadaInitialState from "./initialStates/versionInitialState";

import auth from "./reducers/auth";
import textos from "./reducers/textos";
import mode from "./reducers/mode";
import toaster from "./reducers/toaster";
import modal from "./reducers/modal";
import config from "./reducers/config";
import usuarioRol from "./reducers/usuarioRol";
import token from "./reducers/token";
import segundoModal from "./reducers/segundoModal";
import versionPublicada from "./reducers/versionPublicada";

import { RESET_GLOBAL_CONTEXT } from "./ActionTypes";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  // Prueba de autenticación fake
  const [authState, authDispatch] = useReducer(auth, [], () => {
    const localData = sessionStorage.auth;
    return localData ? JSON.parse(localData) : authInitialState;
  });
  const [textosState, textosDispatch] = useReducer(textos, textosInitialState);
  const [modeState, modeDispatch] = useReducer(mode, modeInitialState);
  const [toasterState, toasterDispatch] = useReducer(
    toaster,
    toasterInitialState
  );
  const [modalState, modalDispatch] = useReducer(modal, modalInitialState);
  const [configState, configDispatch] = useReducer(config, configInitialState);
  const [usuarioRolState, usuarioRolDispatch] = useReducer(
    usuarioRol,
    [],
    () => {
      const localData = sessionStorage.usuarioRol;
      return localData ? JSON.parse(localData) : usuarioRolInitialState;
    }
  );
  const [tokenState, tokenDispatch] = useReducer(token, tokenInitialState);
  const [segundoModalState, segundoModalDispatch] = useReducer(
    segundoModal,
    segundoModalInitialState
  );
  const [versionPublicadaState, versionPublicadaDispatch] = useReducer(
    versionPublicada,
    versionPublicadaInitialState
  );

  useEffect(() => {
    sessionStorage.auth = JSON.stringify(authState);
    sessionStorage.usuarioRol = JSON.stringify(usuarioRolState);
  }, [authState, usuarioRolState]);

  //RESET GLOBAL CONTEXT
  const arrayDispatch = [
    authDispatch,
    toasterDispatch,
    modalDispatch,
    usuarioRolDispatch,
    tokenDispatch,
    segundoModalDispatch,
  ];

  const resetGlobalContext = (index) => {
    if (Array.isArray(arrayDispatch)) {
      if (index >= arrayDispatch.length) {
        return;
      }
      const dispatch = arrayDispatch[index];
      dispatch({ type: RESET_GLOBAL_CONTEXT });
      resetGlobalContext(index + 1);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        authState,
        authDispatch,
        textosState,
        textosDispatch,
        modeState,
        modeDispatch,
        toasterState,
        toasterDispatch,
        modalState,
        modalDispatch,
        configState,
        configDispatch,
        usuarioRolState,
        usuarioRolDispatch,
        tokenState,
        tokenDispatch,
        segundoModalState,
        segundoModalDispatch,
        versionPublicadaState,
        versionPublicadaDispatch,
        resetGlobalContext,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
