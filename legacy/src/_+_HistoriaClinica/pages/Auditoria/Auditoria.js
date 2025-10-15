import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../../global/context/Provider";
import { HistoriaClinicaContext } from "_+_HistoriaClinica/context/Provider";
import Toaster from "global/components/genericos/Toaster/Toaster";
import HeaderbarHome from "../../../global/components/genericos/HeaderbarHome/HeaderbarHome";
import Modal from "../../../global/components/genericos/Modal/Modal";
import Loading from "global/components/genericos/Loading/Loading";
import { pagination } from "global/components/genericos/CleanTable/funtions/pagination";
import {
  ContainerBody,
  ContainerTitleFilters,
  ContainerTitle,
  ContainerAudCboFecha,
  ContainerAudFechaDesde,
  ContainerAudFechaTitle,
  ContainerAudFechaDrop,
  ContainerAudFechaHasta,
  BtnRDiag,
  BtnCDiag,
  BtnODiag,
  AuditoriaContainer,
} from "./localStyle";
import { IonSpinner } from "@ionic/react";
import {
  addItemIndexDB,
  deleteItemIndexDB,
  getItemIndexDB,
} from "../Evolucion/EvolucionFun";
import { checkLocalDataAud, setLocalDataAud } from "./AuditoriaFun";
import { hideModal, showModal } from "global/context/action/modal/modal";
import DatePicker from "global/components/genericos/DatePicker/DatePicker";
import NavTabBar from "_+_HistoriaClinica/components/NavTabBar/NavTabBar";
import CleanTableAudit from "global/components/genericos/CleanTableAudit/CleanTableAudit";
import OjoIcon from "global/assets/generico/OjoIcon";
import DropdownAudit from "_+_HistoriaClinica/components/DropdownAudit/DropdownAudit";
import AuditoriaNewCmp from "_+_HistoriaClinica/components/AuditoriaNewCmp/AuditoriaNewCmp";
import { showToaster } from "global/context/action/toaster/toaster";
import {
  resetAfterEdit,
  setAudTableListCtx,
  wsGetAuditSnomed,
  wsGetAuditSnomedEvoHtml,
  wsGetReemplazarDiagSnomed,
} from "_+_HistoriaClinica/context/action/auditoriaSnomed/auditoriaSnomed";

const Auditoria = () => {
  const {
    modalState,
    toasterState,
    modalDispatch,
    authState,
    toasterDispatch,
  } = useContext(GlobalContext);
  const { auditSnomedState, auditSnomedDispatch } = useContext(
    HistoriaClinicaContext
  );
  const [filtroBuscador, setFiltroBuscador] = useState(null);

  //falta efectivizar los filtros
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");

  const [diagSelected, setDiagSelected] = useState(null);
  const [idToEdit, setIdToEdit] = useState(null);

  const windowWidth = window.innerWidth;
  const hoy = new Date();

  const onChangeDiag = (newConcept) => {
    let newObj = {};
    newObj = {
      descripcion: newConcept.term,
      idusuarioctrl: authState.auth.data.value.usuario,
      idusuarioctrl_desc:
        authState.auth.data.value.nombre +
        " " +
        authState.auth.data.value.apellido,
      idsnomed: newConcept.concept.conceptId,
    };
    setDiagSelected(newObj);
  };

  const reemplazarDiag = (itemRow) => {
    if (itemRow !== null) {
      setIdToEdit(itemRow.id);
    }
    hideModal()(modalDispatch);
  };

  useEffect(() => {
    if (idToEdit !== null && diagSelected !== null) {
      let auxObj = diagSelected;
      auxObj.id = idToEdit;
      wsGetReemplazarDiagSnomed(idToEdit, auxObj)(auditSnomedDispatch);
      setIdToEdit(null);
      setDiagSelected(null);
    }
  }, [idToEdit, diagSelected]);

  const nuevoDiag = (itemRow) => {
    console.log(itemRow);
  };

  const dismissMasInfo = () => {
    hideModal()(modalDispatch);
  };
  const masInfo = (itemRow) => {
    wsGetAuditSnomedEvoHtml(itemRow.idevolucion)(auditSnomedDispatch);
    showModal(
      <AuditoriaNewCmp
        itemInfo={itemRow}
        exitModal={dismissMasInfo}
        nuevoDiag={nuevoDiag}
        reemplazarDiag={reemplazarDiag}
        onChangeDiag={onChangeDiag}
      />,
      "Evolución paciente: 38199257",
      dismissMasInfo,
      false,
      {},
      "centro",
      true
    )(modalDispatch);
  };

  //table configurations
  //aca
  const ColumnBaseNewComplete = [
    {
      type: "string",
      name: "idEvolucion",
      width: 0,
    },
  ];
  const ColumnBaseNew = [
    {
      type: "string",
      name: "customDate",
      width: windowWidth > 1366 ? 117 : 90,
      colname: "Fecha",
      funChangeValue: null,
      onClickAccion: null,
      arrBtn: null,
    },
    {
      type: "string",
      name: "nombreApellido",
      width: windowWidth > 1366 ? 297 : 200,
      colname: "Profesional",
      funChangeValue: null,
      onClickAccion: null,
      arrBtn: null,
    },
    {
      type: "string",
      name: "especialidadprofesional",
      width: windowWidth > 1366 ? 202 : 140,
      colname: "Especialidad",
      funChangeValue: null,
      onClickAccion: null,
      arrBtn: null,
    },
    {
      type: "string",
      name: "descripcion",
      width: windowWidth > 1366 ? 428 : 240,
      colname: "Texto Ingresado",
      funChangeValue: null,
      onClickAccion: null,
      arrBtn: null,
    },
    {
      type: "string",
      name: "idevolucion",
      width: windowWidth > 1366 ? 100 : 80,
      colname: "Evolución",
      funChangeValue: null,
      onClickAccion: null,
      arrBtn: null,
    },
    {
      type: "string",
      name: "pacientedni",
      width: windowWidth > 1366 ? 255 : 120,
      colname: "DNI Paciente",
      funChangeValue: null,
      onClickAccion: null,
      arrBtn: null,
    },
    {
      type: "array",
      name: "arrBtn",
      width: 448,
      colname: "Acciones",
      funChangeValue: null,
      onClickAccion: null,
      arrBtn: [
        {
          btn: (
            <div style={{ marginRight: 5 }}>
              <DropdownAudit
                handleSelectItem={onChangeDiag}
                posTop={true}
                customHeight={400}
                blockAgregar={false}
                customContWidth={230}
              />
            </div>
          ),
          arFun: () => {},
        },
        {
          btn: <BtnRDiag className="rb14l c-white">Reemplazar</BtnRDiag>,
          arFun: reemplazarDiag,
        },
        // {
        //   btn: <BtnCDiag className="rb14l c-white">Crear nuevo</BtnCDiag>,
        //   arFun: nuevoDiag,
        // },
        {
          btn: (
            <BtnODiag className="rb14b c-white">
              <span>
                <OjoIcon />
              </span>
            </BtnODiag>
          ),
          arFun: masInfo,
        },
      ],
    },
  ];
  const [configTable, setConfigTable] = useState({
    data: [],
    columnComplete: ColumnBaseNewComplete,
    column: ColumnBaseNew,
    paginationView: 12,
    pagination: true,
    border: true,
    borderType: "line",
    width: windowWidth > 1366 ? 1847 : 1300,
    colWidth: true,
    footer: true,
    bodyHeight: windowWidth > 1366 ? 600 : 400,
    customSeguimiento: true,
    disableFilters: true,
    disableAll: false,
  });

  const onChangeSelectedRow = (item) => {
    if (item.length > 0) {
    }
  };

  const onChangeFechaDesde = (e) => {
    setFechaDesde(e);
  };
  const onChangeFechaHasta = (e) => {
    setFechaHasta(e);
  };

  const convertDateToISO = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (fechaDesde !== "" && fechaHasta !== "") {
      let auxArr = auditSnomedState.auditSnomed.tableList.value.filter((e) => {
        const formattedDate = convertDateToISO(e.customDate);
        return (
          new Date(formattedDate) >= new Date(fechaDesde) &&
          new Date(formattedDate) <= new Date(fechaHasta)
        );
      });
      setConfigTable({
        ...configTable,
        data: auxArr,
      });
      setFiltroBuscador(pagination(auxArr, configTable.paginationView));
      setFechaDesde("");
      setFechaHasta("");
    } else if (fechaDesde !== "") {
      let auxArr = auditSnomedState.auditSnomed.tableList.value.filter((e) => {
        const formattedDate = convertDateToISO(e.customDate);
        return new Date(formattedDate) >= new Date(fechaDesde);
      });
      setConfigTable({
        ...configTable,
        data: auxArr,
      });
      setFiltroBuscador(pagination(auxArr, configTable.paginationView));
      setFechaDesde("");
    } else if (fechaHasta !== "") {
      let auxArr = auditSnomedState.auditSnomed.tableList.value.filter((e) => {
        const formattedDate = convertDateToISO(e.customDate);
        return new Date(formattedDate) <= new Date(fechaHasta);
      });
      setConfigTable({
        ...configTable,
        data: auxArr,
      });
      setFiltroBuscador(pagination(auxArr, configTable.paginationView));
      setFechaHasta("");
    }
  }, [fechaDesde, fechaHasta]);

  const checkData = (data) => {
    if (checkLocalDataAud(data)) {
      refreshAudAndDel();
    } else {
      setAudTableListCtx(data.ListDataAud.auditSnomed.tableList)(
        auditSnomedDispatch
      );
    }
  };

  const refreshAud = () => {
    wsGetAuditSnomed()(auditSnomedDispatch);
  };

  const refreshAudAndDel = () => {
    asyncDelItemIndexDB(4);
  };

  //funcion async para cargar la db local
  async function asyncAddItemIndexDB(ListDataAud) {
    try {
      const response = await addItemIndexDB(4, "ListDataAud", ListDataAud);
      if (response !== null) {
        //DATOS GUARDADOS OK
      }
    } catch (error) {
      //agregar toaster de error
      console.log("No se pudo continuar");
      // history.push("/evolucion")
    }
  }

  useEffect(() => {
    //apenas cargo reviso si tengo la data en indexdb
    async function getDataIndexDB() {
      try {
        const response = await getItemIndexDB(4);
        checkData(response);
      } catch (error) {
        console.log(error);
      }
    }
    getDataIndexDB();
  }, []);

  const customDateAud = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses en JavaScript son 0-indexados
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    if (auditSnomedState.auditSnomed.tableList !== null) {
      //seteo la info para luego guardarla en indexdb
      let dataCompleted = setLocalDataAud(
        auditSnomedState.auditSnomed.tableList
      );
      //cargo la paginacion de la tabla
      let auxArr = auditSnomedState.auditSnomed.tableList.value.sort((a, b) => {
        return new Date(b.fecha) - new Date(a.fecha);
      });

      auxArr = auxArr.map((e) => {
        e.nombreApellido = e.evolucionprofesional;
        e.customDate = customDateAud(e.fechaevo);
        return e;
      });
      setConfigTable({
        ...configTable,
        data: auxArr,
      });
      setFiltroBuscador(pagination(auxArr, configTable.paginationView));
      //guardo el item filtrado
      dataCompleted.auditSnomed.tableList.value = auxArr;
      asyncAddItemIndexDB(dataCompleted);
    }

    //eslint-disable-next-line
  }, [auditSnomedState.auditSnomed]);

  //funcion async para eliminar item de la db local
  async function asyncDelItemIndexDB(key) {
    try {
      const response = await deleteItemIndexDB(key);
      if (response) {
        refreshAud();
      }
    } catch (error) {
      //agregar toaster de error
      console.log(error);
    }
  }

  useEffect(() => {
    if (auditSnomedState.auditSnomed.replaceSnomed !== null) {
      if (auditSnomedState.auditSnomed.replaceSnomed.isSuccess) {
        showToaster(
          {
            texto: "El diagnóstico fue modificado correctamente",
            tipo: "success",
          },
          "centroArriba"
        )(toasterDispatch);
        resetAfterEdit()(auditSnomedDispatch);
        asyncDelItemIndexDB(4);
      }
    }
  }, [auditSnomedState.auditSnomed.replaceSnomed]);

  return (
    <>
      {modalState.modal.show && <Modal />}
      {toasterState.toaster.show && <Toaster />}
      <Loading
        dataLoading={auditSnomedState.auditSnomed.loading}
        color="c-white"
        descripcion={
          auditSnomedState.auditSnomed.loading && "Cargando datos Auditoría..."
        }
      />
      <HeaderbarHome />
      <NavTabBar refreshNavTab={() => refreshAudAndDel()} />
      <AuditoriaContainer
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <ContainerTitleFilters>
          <ContainerTitle>
            <span className="rb20nh c-latex30">Auditoría</span>
          </ContainerTitle>
          <ContainerAudCboFecha>
            <ContainerAudFechaDesde>
              <ContainerAudFechaTitle className="rb16l c-latex30">
                Fecha desde:
              </ContainerAudFechaTitle>
              <ContainerAudFechaDrop>
                {" "}
                <DatePicker
                  fechaInicial="1990 01 01"
                  fechaFinal={`${hoy.getFullYear()} ${
                    hoy.getMonth() + 1 >= 10
                      ? hoy.getMonth() + 1
                      : `0${hoy.getMonth() + 1}`
                  } ${
                    hoy.getDate() >= 10 ? hoy.getDate() : `0${hoy.getDate()}`
                  }`}
                  onChange={onChangeFechaDesde}
                  selectedFecha={`${hoy.getFullYear()}-${
                    hoy.getMonth() + 1 >= 10
                      ? hoy.getMonth() + 1
                      : `0${hoy.getMonth() + 1}`
                  }-${
                    hoy.getDate() >= 10 ? hoy.getDate() : `0${hoy.getDate()}`
                  }`}
                  checkError={"fecha incorrecta"}
                  errorStr="La fecha es requerida"
                  isRequired={false}
                  posicion={"absolute"}
                  botones={true}
                  background={true}
                  customCss={"rb16l"}
                />
              </ContainerAudFechaDrop>
            </ContainerAudFechaDesde>
            <ContainerAudFechaHasta>
              <ContainerAudFechaTitle className="rb16l c-latex30">
                Fecha hasta:
              </ContainerAudFechaTitle>
              <ContainerAudFechaDrop>
                {" "}
                <DatePicker
                  fechaInicial="1990 01 01"
                  fechaFinal={`${hoy.getFullYear()} ${
                    hoy.getMonth() + 1 >= 10
                      ? hoy.getMonth() + 1
                      : `0${hoy.getMonth() + 1}`
                  } ${
                    hoy.getDate() >= 10 ? hoy.getDate() : `0${hoy.getDate()}`
                  }`}
                  onChange={onChangeFechaHasta}
                  selectedFecha={`${hoy.getFullYear()}-${
                    hoy.getMonth() + 1 >= 10
                      ? hoy.getMonth() + 1
                      : `0${hoy.getMonth() + 1}`
                  }-${
                    hoy.getDate() >= 10 ? hoy.getDate() : `0${hoy.getDate()}`
                  }`}
                  checkError={"fecha incorrecta"}
                  errorStr="La fecha es requerida"
                  isRequired={false}
                  posicion={"absolute"}
                  botones={true}
                  background={true}
                  customCss={"rb16l"}
                />
              </ContainerAudFechaDrop>
            </ContainerAudFechaHasta>
          </ContainerAudCboFecha>
        </ContainerTitleFilters>
        <ContainerBody>
          {true ? (
            <CleanTableAudit
              config={configTable}
              filtroBuscador={filtroBuscador}
              onChange={onChangeSelectedRow}
            />
          ) : (
            <IonSpinner name="lines-small" />
          )}
        </ContainerBody>
      </AuditoriaContainer>
    </>
  );
};

export default Auditoria;
