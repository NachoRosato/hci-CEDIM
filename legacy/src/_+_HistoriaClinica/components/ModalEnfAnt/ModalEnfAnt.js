import { useContext } from "react";
import {
  ContainerBox,
  ContainerButtons,
  BtnCerrar,
  MedicamentosBox,
} from "./localStyle";
import { showToaster } from "global/context/action/toaster/toaster";
import { GlobalContext } from "global/context/Provider";
import { resetSnomed } from "_+_HistoriaClinica/context/action/snomed/snomed";
import { HistoriaClinicaContext } from "_+_HistoriaClinica/context/Provider";
import { hideSegundoModal } from "global/context/action/segundoModal/segundoModal";
import { hideModal } from "global/context/action/modal/modal";
import fechaTurnoFormat from "global/utils/fechaTurnoFormat";
import DropdownHC from "global/components/genericos/DropdownHC/DropdownHC";
import { updateEvoEditIndexDB } from "_+_HistoriaClinica/pages/Evolucion/EvolucionFun";

const ModalEnfAnt = ({
  setEnfermedadesAntecedentesLista,
  enfermedadesAntecedentesLista,
}) => {
  const { snomedDispatch, pacienteState } = useContext(HistoriaClinicaContext);

  const { toasterDispatch, modalDispatch, segundoModalDispatch, authState } =
    useContext(GlobalContext);

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

  const agregarAntecedenteEnfermedad = (e) => {
    let auxInfo = JSON.parse(localStorage.getItem("itemInfo"));
    let antecedentesList = enfermedadesAntecedentesLista;
    //agrego el item para poder filtrarlo y agregarlo luego en snomedlist

    let diagPresDto = {
      id: -1,
      idpaciente: pacienteState.paciente.buscarPac.value[0].id,
      idpaciente_desc: pacienteState.paciente.buscarPac.value[0].nombre,
      idsnomed: e.tipo !== undefined ? "" : e.concept.conceptId,
      descripcion: e.term,
      idevolucion: auxInfo.proceso === "edita" ? auxInfo.id : 0,
      presuntivo: false,
      idevolucionbaja: 0,
      idusuarioctrl: authState.auth.data.value.usuario,
      idusuarioctrl_desc: `${authState.auth.data.value.nombre} ${authState.auth.data.value.apellido}`,
      fechactrl: fechaTurnoFormat(),
      texto: e.term,
      darBaja: false,
      newItem: true,
      tipo: e.tipo !== undefined ? e.tipo : "SE",
    };
    antecedentesList.push(diagPresDto);
    asyncUpdEdicionIDB(5, "enfYAntc", antecedentesList);
    setEnfermedadesAntecedentesLista(antecedentesList);
    dissmissBusqueda();
  };

  const onClickSelecTerm = (e) => {
    /// definir que hacer.
    if (e !== "") {
      //verifico primero con aquellos que no tienen snome
      if (e.tipo !== undefined) {
        let buscarEnLista = enfermedadesAntecedentesLista.filter(
          (item) => item.display === e.term
        );
        if (buscarEnLista.length > 0) {
          showToaster(
            {
              texto: "No puede agregar un antecedente ya existente",
              tipo: "danger",
            },
            "centroArriba"
          )(toasterDispatch);
        } else {
          agregarAntecedenteEnfermedad(e);
          dissmissBusqueda();
        }
      } else {
        let buscarEnLista = enfermedadesAntecedentesLista.filter(
          (item) =>
            item.idSnomed === e.concept.conceptId ||
            item.idDiagnostico === e.concept.conceptId ||
            item.idsnomed === e.concept.conceptId
        );
        if (buscarEnLista.length > 0) {
          showToaster(
            {
              texto: "No puede agregar un antecedente ya existente",
              tipo: "danger",
            },
            "centroArriba"
          )(toasterDispatch);
        } else {
          agregarAntecedenteEnfermedad(e);
          dissmissBusqueda();
        }
      }
    } else {
      dissmissBusqueda();
    }
  };

  const dissmissBusqueda = () => {
    resetSnomed()(snomedDispatch);
    hideSegundoModal()(segundoModalDispatch);
    hideModal()(modalDispatch);
  };

  return (
    <ContainerBox>
      <MedicamentosBox className="ts_modalEnf-dropdown">
        <p className="rb16l c-latex30">
          Escriba el nombre de la enfermedad o antecedente
        </p>
        <DropdownHC
          handleSelectItem={onClickSelecTerm}
          posTop={false}
          customHeight={400}
          blockAgregar={true}
          customContWidth={590}
        />
      </MedicamentosBox>
      <ContainerButtons>
        <BtnCerrar
          onClick={dissmissBusqueda}
          className="bgc-latex30 rb16b c-white ts_modalEnf_volver-btn"
        >
          Volver
        </BtnCerrar>
        <BtnCerrar
          onClick={dissmissBusqueda}
          className={`bgc-primary rb16b c-white ts_modalEnf_agregar-btn`}
        >
          Agregar
        </BtnCerrar>
      </ContainerButtons>
    </ContainerBox>
  );
};

export default ModalEnfAnt;
