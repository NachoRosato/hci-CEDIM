import {
  BtnPrimary,
  ContainerLogin,
  ContainerLogo,
  ContainerBase,
  ContainerSignIn,
  DivideLineSection,
  InputsContainer,
  BtnContainer,
  ShowPassword,
} from "./localStyle";
import { useContext, useEffect, useState } from "react";
import {
  login,
  logoutAuth,
  setUserByToken,
} from "../../../global/context/action/auth/auth";
import { GlobalContext } from "../../../global/context/Provider";
import { regexUserLogin } from "../../../global/utils/expresionesRegulares";
import { useHistory, useLocation } from "react-router";
import { showToaster } from "../../../global/context/action/toaster/toaster";
import { IonSpinner } from "@ionic/react";
import InputV1 from "../../../global/components/genericos/InputV1/InputV1";
import MantenimientoCard from "../../../global/components/genericos/MantenimientoCard/MantenimientoCard";
import HidePassIcon from "../../../global/assets/generico/HidePassIcon";
import ShowPassIcon from "../../../global/assets/generico/ShowPassIcon";
import Modal from "../../../global/components/genericos/Modal/Modal";
import LoginIcon from "../../../global/assets/generico/LoginIcon";
import {
  hideModal,
  showModal,
} from "../../../global/context/action/modal/modal";
import Mensaje from "../../../global/components/genericos/Mensaje/Mensaje";
import { wsGetRolUsuario } from "global/context/action/usuarioRol/usuarioRol";
import Toaster from "global/components/genericos/Toaster/Toaster";
import GetToken from "global/utils/getToken";
import {
  loginTokenReset,
  wsPostTokenEncriptadoNew,
} from "global/context/action/token/loginToken";
import Loading from "global/components/genericos/Loading/Loading";
import { setDatosPac } from "_+_HistoriaClinica/context/action/paciente/paciente";
import { HistoriaClinicaContext } from "_+_HistoriaClinica/context/Provider";
import { setEvoInitialData } from "../Evolucion/EvolucionFun";
import GetParams from "global/utils/getParams";

const Login = () => {
  const {
    authDispatch,
    authState,
    toasterState,
    toasterDispatch,
    modalDispatch,
    modalState,
    usuarioRolDispatch,
    usuarioRolState,
    tokenState,
    tokenDispatch,
    resetGlobalContext,
  } = useContext(GlobalContext);
  const { pacienteDispatch, resetHcContext } = useContext(
    HistoriaClinicaContext
  );

  // --- login desde agenda
  const search = useLocation().search;
  const history = useHistory();
  let config = localStorage.getItem("config");
  let versionApk = JSON.parse(config).version;
  let mantenimiento = JSON.parse(config).mantenimiento;
  let salirHC = JSON.parse(localStorage.getItem("salir"));

  const [passwordShown, setPasswordShown] = useState(false);
  const [userForm, setUserForm] = useState(true);
  const [passForm, setPassForm] = useState(true);
  const [userErrForm, setUserErrForm] = useState(false);
  const [passErrForm, setPassErrForm] = useState(false);
  const [formLogin, setFormLogin] = useState({
    txtUsuario: "",
    txtPassword: "",
  });
  const [token, setToken] = useState("");

  const nextStep = (isCorrect, data) => {
    if (isCorrect) {
      if (data !== null && data !== undefined) {
        sessionStorage.setItem("token", data.value.usuarioDto.token);
        // empiezo a setear las cosas para armar el camino por token.
        let auxDtoUser = {
          value: data.value.usuarioDto,
          token: token,
          message: data.value.message,
          versionVademecum: data.value.versionVademecum,
          isSuccess: data.value.success,
        };
        setFormLogin({
          ...formLogin,
          txtUsuario: data.value.usuarioDto.usuario,
        });
        let auxDtoPac = {
          value: [data.value.pacienteDto],
          isSuccess: data.value.success,
          token: token,
          message: data.value.message,
        };
        setUserByToken(auxDtoUser)(authDispatch);
        setDatosPac(auxDtoPac)(pacienteDispatch);
        if (data.value.idTurno !== 0) {
          let evoAux = {
            motivoConsulta: "",
            evolucion: "",
            evoHTML: "",
          };
          localStorage.setItem("editandoEvo", JSON.stringify(evoAux));
          localStorage.removeItem("itemInfo");
        }
      }
    } else {
      showModal(
        <Mensaje
          textoNegrita={
            data?.error?.errorMessage
              ? data?.error?.errorMessage
              : "Error al ingresar"
          }
        ></Mensaje>,
        "Ingreso por token",
        closeModal,
        true,
        [
          {
            text: "Volver",
            clase: "btn b-latex30 rb16m c-latex30",
            accion: closeModal,
          },
        ],
        "centro",
        false
      )(modalDispatch);
    }
  };

  useEffect(() => {
    let token = GetToken(search);
    if (token === null) {
      token = GetParams(search);
    }
    if (token !== null && token !== undefined) {
      let dtoCadena = { cadena: token };
      setToken(token);
      wsPostTokenEncriptadoNew(dtoCadena, nextStep)(tokenDispatch);
    }
  }, []);

  const onChangeUsuario = (e) => {
    if (e.target.value === "") {
      setUserErrForm(false);
      setUserForm(true);
    } else {
      if (regexUserLogin.test(e.target.value)) {
        setFormLogin({
          ...formLogin,
          txtUsuario: e.target.value.toUpperCase(),
        });
        if (e.target.value.length >= 3 && e.target.value.length <= 10) {
          setUserForm(false);
          setUserErrForm(false);
        } else {
          setUserForm(true);
          setUserErrForm(true);
        }
      } else {
        //me aseguro que no se llene nada que no valide la exp regular.
        setUserForm(true);
        setUserErrForm(true);
      }
    }
  };

  const onChangePass = (e) => {
    if (e.target.value === "") {
      setPassErrForm(false);
      setPassForm(true);
    } else {
      if (regexUserLogin.test(e.target.value)) {
        setFormLogin({
          ...formLogin,
          txtPassword: e.target.value,
        });
        if (e.target.value.length >= 2 && e.target.value.length <= 10) {
          setPassForm(false);
          setPassErrForm(false);
        } else {
          setPassForm(true);
          setPassErrForm(true);
        }
      } else {
        //me aseguro que no se llene nada que no valide la exp regular.
        setPassForm(true);
        setPassErrForm(true);
      }
    }
  };

  const onKeyPress = (e) => {
    if (!regexUserLogin.test(e.key)) {
      e.preventDefault();
    }
    if (e.target.name === "txtPassword") {
      if (e.key === "Enter") {
        userLogin();
      }
    } else if (e.key === "Enter") {
      document.getElementsByName("txtPassword")[0].focus();
    }
  };

  const showPassword = () => {
    setPasswordShown(true);
  };
  const hidePassword = () => {
    setPasswordShown(false);
  };

  const userLogin = () => {
    if (
      regexUserLogin.test(formLogin.txtUsuario) &&
      regexUserLogin.test(formLogin.txtPassword)
    ) {
      login(formLogin)(authDispatch);
    } else {
      showToaster(
        {
          texto: "Los campos son inválidos",
          tipo: "danger",
        },
        "centroArriba"
      )(toasterDispatch);
    }
  };

  const closeModal = () => {
    hideModal()(modalDispatch);
  };

  useEffect(() => {
    if (
      authState.auth.data &&
      authState.auth.data.isSuccess &&
      authState.auth.data.value !== null
    ) {
      //rol de usuario
      wsGetRolUsuario(formLogin.txtUsuario)(usuarioRolDispatch);
      //inicializo el storage local para la data de evolucion.
      setEvoInitialData();
      localStorage.setItem(
        "idUsuario",
        JSON.stringify(authState.auth.data.value.usuario)
      );
      history.push("/buscarpaciente");
    } else if (authState.auth.error && !authState.auth.error.isSuccess) {
      showModal(
        <Mensaje
          textoNegrita={authState.auth.error.error.errorMessage}
        ></Mensaje>,
        "Clave o usuario incorrecto",
        closeModal,
        true,
        [
          {
            text: "Volver",
            clase: "btn b-latex30 rb16m c-latex30",
            accion: closeModal,
          },
        ],
        "centro",
        false
      )(modalDispatch);
      logoutAuth()(authDispatch);
      // Reseteo contexto token - Error al ingresar desde Agenda
      loginTokenReset()(tokenDispatch);
    }
  }, [authState.auth.data, authState.auth.error]);

  useEffect(() => {
    if (
      usuarioRolState.usuarioRol.error &&
      usuarioRolState.usuarioRol.error !== null
    ) {
      showToaster(
        {
          texto: usuarioRolState.usuarioRol.error.error.errorMessage,
          tipo: "danger",
        },
        "centroArriba"
      )(toasterDispatch);
    }
  }, [usuarioRolState.usuarioRol]);

  //salir cuando guarde bien una evo
  useEffect(() => {
    if (salirHC !== null && salirHC !== undefined) {
      if (salirHC === true) {
        showToaster(
          {
            texto: "Evolución guardada correctamente",
            tipo: "success ",
          },
          "centroArriba"
        )(toasterDispatch);
        resetHcContext(0);
        resetGlobalContext(0);
      }
    }
  }, [salirHC]);

  return (
    <>
      {modalState.modal.show && <Modal></Modal>}
      {toasterState.toaster.show && <Toaster></Toaster>}
      <Loading
        dataLoading={tokenState.token.loading}
        color="c-white"
        descripcion={
          tokenState.token.loading && "Cargando datos del usuario..."
        }
      />
      <ContainerBase>
        <ContainerLogin
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
            opacity: [0, 0.3, 0.7, 1],
            times: [0, 0.3, 0.7, 1],
          }}
        >
          <ContainerLogo>
            <div>
              <img
                className="ag-login-logotype"
                src={
                  process.env.PUBLIC_URL + "/assets/images/empresa/IsoLogo.png"
                }
                alt="logo"
              ></img>
            </div>
          </ContainerLogo>
          {mantenimiento ? (
            <MantenimientoCard />
          ) : (
            <ContainerSignIn>
              <div className="rb24b">
                <p>Hola! Bienvenido :)</p>
                <span className="rb16m">Ingresá tus datos</span>
              </div>
              <DivideLineSection></DivideLineSection>
              <InputsContainer>
                <InputV1
                  inputType="text"
                  name="txtUsuario"
                  headerStr="Usuario"
                  placeholderText={"DAMAN, 123456"}
                  errorStr="El usuario es inválido"
                  onChange={onChangeUsuario}
                  onKeyPress={onKeyPress}
                  maxLength="10"
                  className="rb16m ts_login_userName-input"
                  checkError={userErrForm}
                  isRequired={true}
                  tabIndex="2"
                />
                <InputV1
                  headerStr="Contraseña"
                  inputType="text"
                  name="txtPassword"
                  placeholderText={"*****"}
                  errorStr="La contraseña es inválida."
                  checkError={passErrForm}
                  onChange={onChangePass}
                  onKeyPress={onKeyPress}
                  className={
                    passwordShown
                      ? "inputNumericShow inputNonScroll rb16m ts_login_userPw-input"
                      : "inputNumeric inputNonScroll rb16m ts_login_userPw-input"
                  }
                  maxLength="10"
                  isRequired={true}
                />
              </InputsContainer>
              <ShowPassword>
                {passwordShown === false ? (
                  <>
                    <button
                      className="ptur-loginBox-show-hideBtn"
                      onClick={() => showPassword()}
                    >
                      <HidePassIcon color="var(--color-latex30)" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="ptur-loginBox-show-hideBtn"
                      onClick={() => hidePassword()}
                    >
                      <ShowPassIcon color="var(--color-latex30)" />
                    </button>
                  </>
                )}
              </ShowPassword>
              <BtnContainer>
                <BtnPrimary
                  disabled={userForm || passForm || authState.auth.loading}
                  className={
                    userForm || passForm ? "bgc-grey65" : "pointer bgc-primary"
                  }
                  onClick={userLogin}
                >
                  <LoginIcon />
                  <span className="ag-login-spanBtnPrimary rb18m">
                    {authState.auth.loading ? "Ingresando" : "Ingresar"}
                  </span>
                  {authState.auth.loading ? (
                    <span className="ag-login-spinner">
                      <IonSpinner name="lines" />
                    </span>
                  ) : (
                    ""
                  )}
                </BtnPrimary>
                <div>{versionApk}</div>
              </BtnContainer>
            </ContainerSignIn>
          )}
        </ContainerLogin>
      </ContainerBase>
    </>
  );
};

export default Login;
