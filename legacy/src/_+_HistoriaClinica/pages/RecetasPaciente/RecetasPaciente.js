import { useContext, useEffect, useState } from "react";
import HeaderbarHome from "../../../global/components/genericos/HeaderbarHome/HeaderbarHome";
import Modal from "../../../global/components/genericos/Modal/Modal";
import Loading from "global/components/genericos/Loading/Loading";
import { CardReceta, CardsContainer, ContainerBody } from "./localStyle";
import Toaster from "global/components/genericos/Toaster/Toaster";
import { GlobalContext } from "global/context/Provider";
import NavTabBar from "_+_HistoriaClinica/components/NavTabBar/NavTabBar";
import { HistoriaClinicaContext } from "_+_HistoriaClinica/context/Provider";
import { wsGetRecetaByPaciente } from "_+_HistoriaClinica/context/action/recetaDigital/recetaDigital";
import camelize from "global/utils/camelize";
import RecetaPDF from "_+_HistoriaClinica/components/RecetaPDF/RecetaPDF";
import { hideModal, showModal } from "global/context/action/modal/modal";
import RecetaDigitalIcon from "global/assets/generico/RecetaDigitalIcon";
import SegundoModal from "global/components/genericos/SegundoModal/SegundoModal";
import {
  getItemIndexDB,
  updateEvoEditIndexDB,
} from "../Evolucion/EvolucionFun";
import { showToaster } from "global/context/action/toaster/toaster";
import TurnoNoEncontrado from "global/components/genericos/TurnoNoEcontrado/TurnoNoEncontrado";

const RecetasPaciente = () => {
  const {
    modalState,
    toasterState,
    modalDispatch,
    segundoModalState,
    toasterDispatch,
  } = useContext(GlobalContext);
  const { recetaDigitalDispatch, pacienteState } = useContext(
    HistoriaClinicaContext
  );
  const [loading, setLoading] = useState(false);
  const [loadingDeleteRcta, setLoadingDeleteRcta] = useState(false);
  const [recetasCards, setRecetasCards] = useState([]);
  const [recetaDigitalEvo, setRecetaDigitalEvo] = useState([]);
  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Intervalo entre cada card
      },
    },
  };

  const cardsLi = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  useEffect(() => {
    setLoading(true);
    obtenerRecetas();
  }, []);

  const obtenerRecetas = () => {
    wsGetRecetaByPaciente(
      pacienteState.paciente?.buscarPac?.value[0].documento,
      false,
      cargarRecetas
    )(recetaDigitalDispatch);
    //chequea las que guarda en evolucion local para luego poder eliminarlas y tener en simultaneo ambos corriendo.
    checkEdit();
  };

  const refreshSeg = () => {};

  const dissmiss = () => {
    hideModal()(modalDispatch);
  };

  const verReceta = (data) => {
    showModal(
      <RecetaPDF
        dissmiss={dissmiss}
        dataReceta={data}
        obtenerRecetas={obtenerRecetas}
        setLoadingDeleteRcta={setLoadingDeleteRcta}
        updateArrRecetas={updateArrRecetas}
        isCreationContext={false}
      />,
      `Receta Digital`,
      dissmiss,
      false,
      {},
      "centro",
      true
    )(modalDispatch);
  };

  //funcion async para cargar la edicion local
  async function asyncUpdEdicionIDB(key, ref, obj) {
    try {
      const response = await updateEvoEditIndexDB(key, ref, obj);
      if (response !== null) {
        //ok sin respuesta
      }
    } catch (error) {
      //no necesita
    }
  }

  const checkEdit = () => {
    async function getDataIndexDB() {
      try {
        const response = await getItemIndexDB(5);
        if (response) {
          if (
            response.ListEditEvo.recetaDigital &&
            response.ListEditEvo.recetaDigital.length > 0
          ) {
            setRecetaDigitalEvo(response.ListEditEvo.recetaDigital);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    getDataIndexDB();
  };

  const updateArrRecetas = (idReceta) => {
    // Para RecetasPaciente, las recetas vienen del servidor, no del estado local
    // Solo necesitamos refrescar la lista desde el servidor
    obtenerRecetas();
  };

  const cargarRecetas = (isCorrect, data) => {
    if (isCorrect) {
      setRecetasCards(data.value);
    } else {
      showToaster(
        {
          texto: data?.error?.errorMessage
            ? data.error.errorMessage
            : "Error al cargar recetas.",
          tipo: "danger",
        },
        "centroArriba"
      )(toasterDispatch);
    }
    setLoading(false);
  };
  return (
    <>
      {modalState.modal.show && <Modal />}
      {segundoModalState.segundoModal.show && <SegundoModal />}
      {toasterState.toaster.show && <Toaster />}
      <Loading
        dataLoading={loading || loadingDeleteRcta}
        color="c-white"
        descripcion={
          (loading && "Cargando recetas del paciente...") ||
          (loadingDeleteRcta && "Anulando receta...")
        }
      />
      <HeaderbarHome />
      <NavTabBar refreshNavTab={() => refreshSeg(false)} />

      <ContainerBody
        key={recetasCards?.length}
        variants={container}
        initial="hidden"
        animate="visible"
        cards={recetasCards?.length}
      >
        {recetasCards !== null && recetasCards.length > 0 ? (
          recetasCards?.map((item, index) => {
            return (
              <CardsContainer key={index} variants={cardsLi}>
                <CardReceta>
                  <p className="cardTitle c-white rb18m">
                    Emitida: {new Date(item.fechaalta).toLocaleDateString()}
                  </p>
                  <div className="cardBody">
                    <p>
                      Realizada por:{" "}
                      <span className="rb16m">
                        {camelize(item.idmedicO_Desc)}
                      </span>{" "}
                    </p>
                    <p>
                      Especialidad:{" "}
                      <span className="rb16m">
                        {camelize(item.idespecialidaD_Desc)}
                      </span>{" "}
                    </p>
                    <p>
                      Fecha de vencimiento:{" "}
                      <span className="rb16m">
                        {new Date(item.fechavencimiento).toLocaleDateString()}
                      </span>{" "}
                    </p>
                    <button
                      className="btnReceta rb16m c-latex30 pointer"
                      onClick={() => verReceta(item)}
                    >
                      <RecetaDigitalIcon
                        color={"var(--color-latex30)"}
                        size={20}
                      />{" "}
                      Ver receta
                    </button>
                  </div>
                </CardReceta>
              </CardsContainer>
            );
          })
        ) : (
          <TurnoNoEncontrado
            sinSeleccionar={false}
            sinSeleccionarMsj={"No hay recetas digitales para mostrar."}
          />
        )}
      </ContainerBody>
    </>
  );
};

export default RecetasPaciente;
