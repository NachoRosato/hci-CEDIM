import { useContext, useEffect, useState } from "react";
import HeaderbarHome from "../../../global/components/genericos/HeaderbarHome/HeaderbarHome";
import Modal from "../../../global/components/genericos/Modal/Modal";
import { GlobalContext } from "../../../global/context/Provider";
import {
  ContainerBody,
  ContainerBuscador,
  ContainerBuscadorItems,
  ContainerBuscadorTitleBox,
  ContainerBuscadorDropBox,
  ContainerBuscadorTabla,
  BtnAsignar,
} from "./localStyle";
import AvatarBuscador from "../../../global/assets/generico/AvatarBuscador.png";
import InputV1 from "global/components/genericos/InputV1/InputV1";
import {
  resetPaciente,
  wsGetBuscarPacienteDni,
  wsGetBuscarPacienteNombre,
} from "_+_HistoriaClinica/context/action/paciente/paciente";
import {
  regexNombre,
  regexNumero,
  regexNumeroLetras,
} from "global/utils/expresionesRegulares";
import { HistoriaClinicaContext } from "_+_HistoriaClinica/context/Provider";
import { useHistory } from "react-router";
import { showToaster } from "global/context/action/toaster/toaster";
import Toaster from "global/components/genericos/Toaster/Toaster";
import Loading from "global/components/genericos/Loading/Loading";
import TablaCartilla from "_+_HistoriaClinica/components/TablaCartilla/TablaCartilla";
import { hideModal, showModal } from "global/context/action/modal/modal";
import Mensaje from "global/components/genericos/Mensaje/Mensaje";
import {
  checkIfDBExists,
  checkIfObjectStoreExists,
  createIndexDB,
  deleteItemIndexDB,
  openDBAndCreateStoreHC,
  openDBAndEnsureStoreHC,
  setEvoInitialData,
} from "../Evolucion/EvolucionFun";
import ModalDatosMedico from "_+_HistoriaClinica/components/ModalDatosMedico/ModalDatosMedico";
import {
  hideSegundoModal,
  showSegundoModal,
} from "global/context/action/segundoModal/segundoModal";
import SegundoModal from "global/components/genericos/SegundoModal/SegundoModal";
import { resetEvoActual } from "_+_HistoriaClinica/context/action/evolucion/evolucion";

const BuscarPaciente = () => {
  const {
    modalState,
    segundoModalState,
    toasterState,
    toasterDispatch,
    authState,
    modalDispatch,
    tokenState,
    segundoModalDispatch,
  } = useContext(GlobalContext);

  let config = localStorage.getItem("config");
  let opcRecetaDigital = JSON.parse(config).opcRecetaDigital;

  const { pacienteDispatch, pacienteState, evolucionDispatch } = useContext(
    HistoriaClinicaContext
  );
  const history = useHistory();

  const [valueBuscador, setValueBuscador] = useState("");
  const [habilitoTabla, setHabilitoTabla] = useState(false);
  const [flgIngresarEvo, setFlgIngresarEvo] = useState(false);

  const onChangeBuscador = (e) => {
    if (e !== undefined && e !== null) {
      setValueBuscador(e.target.value);
    }
  };

  const preventKeyOnlyTextandLetters = (e) => {
    if (!regexNumeroLetras.test(e.key)) {
      e.preventDefault();
    }
    if (e.key === "Enter") {
      if (regexNombre.test(valueBuscador)) {
        let aux = valueBuscador.replaceAll(" ", "%20");
        setHabilitoTabla(false);
        resetPaciente()(pacienteDispatch);
        wsGetBuscarPacienteNombre(aux)(pacienteDispatch);
      } else if (regexNumero.test(valueBuscador)) {
        wsGetBuscarPacienteDni(valueBuscador)(pacienteDispatch);
      } else {
        showToaster(
          {
            texto: "Complete el campo solo con letras o solo con números",
            tipo: "danger",
          },
          "centroArriba"
        )(toasterDispatch);
      }
    }
  };

  const onClickSelecPac = (pacSeleccionado) => {
    wsGetBuscarPacienteDni(pacSeleccionado.documento)(pacienteDispatch);
  };

  const continuaEvo = () => {
    hideModal()(modalDispatch);
    history.push("/evolucion");
  };

  const dissmissEdicion = () => {
    //fix temporal - en lugar de remover lo mantengo
    let auxEditNew = {
      motivoConsulta: "",
      evoHTML: "",
      evolucion: "",
    };
    localStorage.setItem("editandoEvo", JSON.stringify(auxEditNew));
    localStorage.removeItem("itemInfo");
    localStorage.removeItem("ordenPractica");
    setFlgIngresarEvo(true);
    //eliminar contexto evo actual
    resetEvoActual()(evolucionDispatch);
    hideModal()(modalDispatch);
  };

  async function asyncDelItemTLIndexDB() {
    try {
      const response = await deleteItemIndexDB(1);
      if (response) {
        asyncDelItemEVOTLIndexDB();
      }
    } catch (error) {
      //agregar toaster de error
      console.log(error);
    }
  }

  async function asyncDelItemEVOTLIndexDB() {
    try {
      const response = await deleteItemIndexDB(2);
      if (response) {
        asyncDelItemEvoEditIndexDB();
      }
    } catch (error) {
      //agregar toaster de error
      console.log(error);
    }
  }

  async function asyncDelItemEvoEditIndexDB() {
    try {
      const response = await deleteItemIndexDB(5);
      if (response) {
        dissmissEdicion();
      }
    } catch (error) {
      //agregar toaster de error
      console.log(error);
    }
  }

  const showModalContinuarEvo = () => {
    showModal(
      <Mensaje
        textoNegrita={"Usted posee edición de evolución en curso"}
        texto={"¿Desea continuar la evolución?"}
      ></Mensaje>,
      "Edición en curso",
      asyncDelItemTLIndexDB,
      false,
      [
        {
          text: "Cancelar edición",
          clase: "btn-Mensaje bgc-danger rb16m c-white",
          accion: asyncDelItemTLIndexDB,
        },
        {
          text: "Continuar",
          clase: "btn-Mensaje b-latex30 rb16m c-latex30",
          accion: continuaEvo,
        },
      ],
      "centro",
      true
    )(modalDispatch);
  };

  const showModalDatosNecesarios = () => {
    showSegundoModal(
      <ModalDatosMedico
        datosMedico={authState.auth.data.value}
        continuarEvo={dissmiss}
      />,
      "Datos Médicos",
      () => {},
      false,
      [],
      "centro",
      true
    )(segundoModalDispatch);
  };

  const dissmiss = () => {
    hideSegundoModal()(segundoModalDispatch);
    validacionContinuaEvo();
  };

  //DEJO PENDIENTE LO VIEJO POR SI LAS DUDAS
  // const validacionContinuaEvo = () => {
  //   createIndexDB();
  //   //validacion indexDB Existente
  //   let auxUsuario = localStorage.getItem("idUsuario");
  //   if (typeof auxUsuario !== "string") {
  //     auxUsuario = JSON.parse(localStorage.getItem("idUsuario"));
  //   }
  //   let auxEvo = JSON.parse(localStorage.getItem("editandoEvo"));
  //   let auxItemInfo = JSON.parse(localStorage.getItem("itemInfo"));
  //   //si queremos comenzar a que pregunte si quiere cancelar la edicion abriendo multiples ventanas, es eliminar lo de tokenstate
  //   if (
  //     auxUsuario &&
  //     authState.auth.data.value.usuario === auxUsuario.toString() &&
  //     auxEvo !== null &&
  //     auxItemInfo !== null &&
  //     tokenState.token.data === null
  //   ) {
  //     showModalContinuarEvo();
  //   } else {
  //     asyncDelItemTLIndexDB();
  //     setEvoInitialData();
  //   }
  // };

  const continuaCircuitoEvo = () => {
    // si existen ambos, dejo continuar y probamos
    let auxUsuario = JSON.parse(localStorage.getItem("idUsuario"));
    if (typeof auxUsuario !== "string") {
      auxUsuario = JSON.parse(localStorage.getItem("idUsuario"));
    }
    let auxEvo = JSON.parse(localStorage.getItem("editandoEvo"));
    let auxItemInfo = JSON.parse(localStorage.getItem("itemInfo"));

    // Si queremos comenzar a que pregunte si quiere cancelar la edición abriendo múltiples ventanas, es eliminar lo de tokenState
    if (
      auxUsuario &&
      authState.auth.data.value.usuario === auxUsuario.toString() &&
      auxEvo !== null &&
      auxItemInfo !== null &&
      tokenState.token.data === null
    ) {
      showModalContinuarEvo();
    } else {
      asyncDelItemTLIndexDB();
      setEvoInitialData();
    }
  };

  const validacionContinuaEvo = () => {
    // Validación de IndexDB Existente
    checkIfDBExists("dbHC")
      .then(() => {
        //si la base existe verifico si tiene objeto
        checkIfObjectStoreExists("dbHC", "storeHC")
          .then(() => {
            continuaCircuitoEvo();
          })
          .catch(() => {
            //si no existe el objeto, lo creo y dejo continuar.
            openDBAndEnsureStoreHC("dbHC")
              .then(() => {
                continuaCircuitoEvo();
              })
              .catch(() => {
                showToaster(
                  {
                    texto: "Ocurrió un problema al inicializar index local",
                    tipo: "danger",
                  },
                  "centroArriba"
                )(toasterDispatch);
              });
          });
      })
      .catch(() => {
        //forma tradicional de iniciar
        createIndexDB();
      });
  };

  useEffect(() => {
    if (
      authState.auth.data !== null &&
      opcRecetaDigital &&
      (authState.auth.data.value.sexo === null ||
        authState.auth.data.value.sexo === "" ||
        authState.auth.data.value.documento === "" ||
        authState.auth.data.value.fechaNacimiento === "0001-01-01T00:00:00")
    ) {
      showModalDatosNecesarios();
    } else {
      validacionContinuaEvo();
    }
  }, []);

  useEffect(() => {
    if (
      pacienteState.paciente.buscarPac &&
      pacienteState.paciente.buscarPac !== null &&
      flgIngresarEvo
    ) {
      if (
        pacienteState.paciente.buscarPac.isSuccess &&
        pacienteState.paciente.buscarPac.value.length === 1
      ) {
        if (
          tokenState.token.data !== null &&
          tokenState.token.data.value.idTurno !== 0
        ) {
          history.push("/evolucion");
        } else {
          localStorage.removeItem("editandoEvo");
          history.push("/evolucion/lineadetiempo");
        }
      } else if (
        pacienteState.paciente.buscarPac.isSuccess &&
        pacienteState.paciente.buscarPac.value.length > 1
      ) {
        setHabilitoTabla(true);
      } else if (
        !pacienteState.paciente.buscarPac.isSuccess &&
        pacienteState.paciente.buscarPac.value === null
      ) {
        setHabilitoTabla(false);
        resetPaciente()(pacienteDispatch);
        showToaster(
          {
            texto: pacienteState.paciente.buscarPac.error.errorMessage,
            tipo: "danger",
          },
          "centroArriba"
        )(toasterDispatch);
      }
    } else if (
      pacienteState.paciente.error &&
      pacienteState.paciente.error !== null
    ) {
      showToaster(
        {
          texto: pacienteState.paciente.error.error.errorMessage,
          tipo: "danger",
        },
        "centroArriba"
      )(toasterDispatch);
    }
  }, [pacienteState, flgIngresarEvo]);

  return (
    <>
      {modalState.modal.show && <Modal />}
      {segundoModalState.segundoModal.show && <SegundoModal />}
      {toasterState.toaster.show && <Toaster />}
      <Loading
        dataLoading={pacienteState.paciente.loading && flgIngresarEvo}
        color="c-white"
        descripcion={
          pacienteState.paciente.loading &&
          "Cargando datos del paciente..." &&
          flgIngresarEvo &&
          "Preparando Ingreso..."
        }
      />
      <HeaderbarHome />
      <ContainerBody
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <ContainerBuscador>
          <ContainerBuscadorItems>
            <ContainerBuscadorTitleBox>
              <span className="busqPaciente-avatar">
                <img src={AvatarBuscador} alt="avatarBusq"></img>
              </span>
              <span className="busqPaciente-title rb16b c-latex30">
                {" "}
                Ingrese DNI o Apellido y Nombre
              </span>
            </ContainerBuscadorTitleBox>
            <ContainerBuscadorDropBox>
              <InputV1
                inputType="text"
                name="txtBuscadorPac"
                placeholderText="65468732, John Doe..."
                errorStr="Ingrese al menos 3 caracteres."
                onChange={onChangeBuscador}
                onKeyPress={preventKeyOnlyTextandLetters}
                maxLength="100"
                className="rb16m ts_searchPax_search-input"
                isRequired={true}
              />
            </ContainerBuscadorDropBox>
          </ContainerBuscadorItems>
        </ContainerBuscador>
        {pacienteState.paciente.buscarPac && habilitoTabla && (
          <ContainerBuscadorTabla>
            <TablaCartilla
              items={pacienteState.paciente.buscarPac.value}
              onClickSelecPac={onClickSelecPac}
            />
          </ContainerBuscadorTabla>
        )}
      </ContainerBody>
    </>
  );
};

export default BuscarPaciente;
