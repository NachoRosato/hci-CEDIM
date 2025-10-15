import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../../global/context/Provider";
import { useHistory } from "react-router";
import { getStrDate } from "../../../../global/utils/diasData";
import { logoutAuth } from "global/context/action/auth/auth";
import { resetPaciente } from "_+_HistoriaClinica/context/action/paciente/paciente";
import { HistoriaClinicaContext } from "_+_HistoriaClinica/context/Provider";
import { ItemXRoll } from "./HeaderBarItems";
import { editaRoll } from "global/context/action/usuarioRol/usuarioRol";
import camelize from "../../../../global/utils/camelize";
import HeaderTimer from "../HeaderTimer/HeaderTimer";
import Hamburguer from "global/assets/generico/Hamburguer";
import "./HeaderbarHome.css";
import {
  resetEvo,
  resetHistoricas,
} from "_+_HistoriaClinica/context/action/evolucion/evolucion";
import {
  resetLabo,
  resetLaboParcial,
} from "_+_HistoriaClinica/context/action/laboratorio/laboratorio";
import { resetEstudio } from "_+_HistoriaClinica/context/action/estudio/estudio";
import { resetInforme } from "_+_HistoriaClinica/context/action/informe/informe";
import { loginTokenReset } from "global/context/action/token/loginToken";
import {
  deleteIndexDB,
  setEvoInitialData,
} from "_+_HistoriaClinica/pages/Evolucion/EvolucionFun";
import Navbar from "../Navbar/Navbar";

const HeaderbarHome = () => {
  const history = useHistory();
  const {
    authState,
    authDispatch,
    usuarioRolState,
    usuarioRolDispatch,
    tokenDispatch,
    resetGlobalContext,
  } = useContext(GlobalContext);
  const {
    pacienteDispatch,
    evolucionDispatch,
    laboratorioDispatch,
    estudioDispatch,
    informeDispatch,
    resetHcContext,
    pacienteState,
  } = useContext(HistoriaClinicaContext);
  const [showDropPerfil, setShowDropPerfil] = useState(false);
  const [flgItems, setFlgItems] = useState(false);
  const [itemsNav, setItemsNav] = useState(null);
  let config = localStorage.getItem("config");
  let itemInfo = localStorage.getItem("itemInfo");
  let opcResetContext = JSON.parse(config).opcResetContext;
  let opcRecetaDigital = JSON.parse(config).opcRecetaDigital;
  let opcSeguimiento = JSON.parse(config).opcSeguimiento;
  let opcResumenIA = JSON.parse(config).opcResumenIA;
  let opcLaboratorio = JSON.parse(config).opcLaboratorio;

  const nameCamelized = () => {
    let name =
      authState?.auth?.data?.value?.nombre +
      " " +
      authState?.auth?.data?.value?.apellido;
    return camelize(name);
  };

  const onHandleClickAvatar = () => {
    if (!showDropPerfil) {
      setShowDropPerfil(true);
    } else {
      setShowDropPerfil(false);
    }
  };

  const onClickItem = (path) => {
    if (path === "/") {
      if (opcResetContext) {
        resetHcContext(0);
        resetGlobalContext(0);
        deleteIndexDB();
      } else {
        resetEvo()(evolucionDispatch);
        resetPaciente()(pacienteDispatch);
        resetLabo()(laboratorioDispatch);
        resetEstudio()(estudioDispatch);
        resetInforme()(informeDispatch);
        loginTokenReset()(tokenDispatch);
        logoutAuth()(authDispatch);
        localStorage.removeItem("editandoEvo");
        localStorage.removeItem("itemInfo");
        localStorage.removeItem("idUsuario");
        deleteIndexDB();
      }
      //y todos los contextos necesarios
    } else if (path === "/buscarpaciente") {
      resetPaciente()(pacienteDispatch);
      resetLaboParcial()(laboratorioDispatch);
      resetEstudio()(estudioDispatch);
      resetInforme()(informeDispatch);
      resetHistoricas()(evolucionDispatch);
      setEvoInitialData();
      deleteIndexDB();
    } else if (path === "/grillahistorica") {
      resetHistoricas()(evolucionDispatch);
    }
    history.push(path);
  };

  useEffect(() => {
    //logica items Desplegables x Roll
    if (usuarioRolState.usuarioRol.data !== null) {
      editaRoll(ItemXRoll(usuarioRolState.usuarioRol.data.value))(
        usuarioRolDispatch
      );
      setFlgItems(true);
    }
  }, [usuarioRolState.usuarioRol.data, itemInfo]);

  useEffect(() => {
    //logica items Desplegables x Roll
    if (flgItems) {
      // Lógica adicional para inicializar el componente
      // uso el array completo como paso inicial
      let auxItems = usuarioRolState.usuarioRol.arrayEditado;
      if (!opcRecetaDigital) {
        auxItems = auxItems.filter((item) => item.id !== 4);
      }
      if (!opcSeguimiento) {
        auxItems = auxItems.filter((item) => item.id !== 3);
      }
      if (!opcResumenIA) {
        auxItems = auxItems.filter((item) => item.id !== 8);
      }
      if (!opcLaboratorio) {
        auxItems = auxItems.filter((item) => item.id !== 9);
      }
      // guardo si estoy editando una evolucion
      let auxEnEdicion = localStorage.getItem("itemInfo");
      auxEnEdicion = JSON.parse(auxEnEdicion);
      //para verificar si sumo o no linea de tiempo
      let boolTL =
        pacienteState.paciente.buscarPac !== null &&
        pacienteState.paciente.buscarPac !== null &&
        pacienteState.paciente.buscarPac.value.length > 0;
      // Primero valido los derechos actuales del usuario
      if (
        usuarioRolState.usuarioRol.data !== null &&
        usuarioRolState.usuarioRol.data.value.length > 0
      ) {
        const idsToFilter = []; // IDs de los elementos a filtrar
        if (auxEnEdicion) {
          // Si estoy editando una evolución, filtro los elementos que no necesito
          setItemsNav(auxItems);
        } else {
          if (!boolTL) {
            idsToFilter.push(4);
            idsToFilter.push(5);
            idsToFilter.push(6);
            idsToFilter.push(7);
            idsToFilter.push(8);
            idsToFilter.push(9);
          }
          idsToFilter.push(5);
          auxItems = auxItems.filter((item) => !idsToFilter.includes(item.id));
          setItemsNav(auxItems);
        }
      } else if (
        usuarioRolState.usuarioRol.data !== null &&
        usuarioRolState.usuarioRol.data.value.length === 0
      ) {
        // uso el array sin modulos extra
        const idsToFilter = []; // IDs de los elementos a filtrar
        if (pacienteState.paciente.buscarPac === null) {
          idsToFilter.push(4);
          idsToFilter.push(5);
          idsToFilter.push(7);
          idsToFilter.push(8);
          idsToFilter.push(9);
        }
        if (auxEnEdicion) {
          // Si estoy editando una evolución, filtro los elementos que no necesito
          setItemsNav(auxItems);
        } else {
          if (!boolTL) {
            idsToFilter.push(6);
          }
          idsToFilter.push(5);
          auxItems = auxItems.filter((item) => !idsToFilter.includes(item.id));
          setItemsNav(auxItems);
        }
      }
      setFlgItems(false);
    }
  }, [flgItems]);

  return (
    <React.Fragment>
      <div className="ptur-HeaderbarDiv c-white">
        {/* <Link to="/inicio"> */}
        <div className="logoHeader">
          <img
            className="ptur-logoHeader"
            src={process.env.PUBLIC_URL + "/assets/images/empresa/IsoLogo.png"}
            alt="logo"
          ></img>
        </div>
        {/* </Link> */}
        <div className="ptur-RightMenu">
          <div className="ptur-headerBarHome-txtDiaHora">
            <p id="ptur-DiaResponsive" className="rb18m">
              {getStrDate(new Date())}
              <span className="ptur-timer">
                <HeaderTimer />
              </span>
            </p>
          </div>

          <div className="ptur-perfilMenu">
            <p id="ptur-userNameRpv" className="rb18b">
              {nameCamelized()}
            </p>
            <div className="ptur-flechaAvatar-box">
              <div
                className="ptur-perfilMenu-perfilImg-box pointer"
                onClick={onHandleClickAvatar}
              >
                <Hamburguer
                  color={
                    showDropPerfil
                      ? "var(--color-primary)"
                      : "var(--color-white)"
                  }
                ></Hamburguer>
              </div>

              <Navbar
                showDropPerfil={showDropPerfil}
                setShowDropPerfil={setShowDropPerfil}
                itemList={itemsNav}
                userName={nameCamelized()}
                userEsp={camelize(
                  authState?.auth?.data?.value?.especialidad_desc
                )}
                onClickItem={onClickItem}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HeaderbarHome;
