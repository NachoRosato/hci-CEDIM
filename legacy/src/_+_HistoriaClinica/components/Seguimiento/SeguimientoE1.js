import React, { useContext, useEffect, useState } from "react";
import {
  ContainerBox,
  ContainerButtons,
  BtnCerrar,
  BtnEditSeg,
  BtnNewSeg,
  ContainerInfoSeg,
  ContainerTitleS2,
  ContainerPacFilterS2,
  PacFilterName,
  ContainerFilterS2,
  PacFilterTipo,
  PacFilterAccion,
  ContainerComentarioS2,
  ContainerAccionInfo,
  ContainerAccionTitles,
  ContainerFechaAccion,
  ContainerAccionData,
  ContainerInfoPacS3,
  ContainerInfoPacSeg,
  BtnDelSeg,
} from "./localStyle";
import { pagination } from "global/components/genericos/Table/funtions/pagination";
import { IonSpinner } from "@ionic/react";
import CleanTable from "global/components/genericos/CleanTable/CleanTable";
import { HistoriaClinicaContext } from "_+_HistoriaClinica/context/Provider";
import {
  wsGetEventXIdSeg,
  wsGetSegXIdPac,
} from "_+_HistoriaClinica/context/action/seguimiento/seguimiento";
import DropdownV2 from "global/components/genericos/DropdownV3/DropdownV2";
import InputBase from "global/components/genericos/InputBase/InputBase";
import { showToaster } from "global/context/action/toaster/toaster";
import { GlobalContext } from "global/context/Provider";
import {
  itemsSubTipoSeg1,
  itemsSubTipoSeg2,
  itemsTipoSeg,
} from "./SeguimientoData";
import camelize from "global/utils/camelize";
import { updateEvoEditIndexDB } from "_+_HistoriaClinica/pages/Evolucion/EvolucionFun";

const SeguimientoE1 = ({
  dissmiss,
  setEditedSeg,
  editedSeg,
  pacName,
  gralEdited,
}) => {
  const { pacienteState, seguimientoState, seguimientoDispatch } = useContext(
    HistoriaClinicaContext
  );
  const { toasterDispatch, authState } = useContext(GlobalContext);

  const [editSegE1, setEditSegE1] = useState({ estado: "" });
  const [editing, setEditing] = useState(false);
  const [editInputValue, setEditInputValue] = useState("");
  const [dropTipo, setDropTipo] = useState(null);
  const [dropAcc, setDropAcc] = useState(null);
  const [cerrados, setCerrados] = useState(false);
  const [nuevos, setNuevos] = useState(false);

  const ColumnBaseNewComplete = [
    {
      type: "string",
      name: "diagnostico",
      width: 0,
    },
  ];
  const ColumnBaseNew = [
    {
      type: "string",
      name: "estadoDesign",
      width: 107,
      colname: "Estado",
      funChangeValue: null,
      onClickAccion: null,
    },
    {
      type: "string",
      name: "fechaDesign",
      width: 207,
      colname: "Fecha",
      funChangeValue: null,
      onClickAccion: null,
    },
    {
      type: "string",
      name: "tipoSeguimiento",
      width: 133,
      colname: "Tipo",
      funChangeValue: null,
      onClickAccion: null,
    },
    {
      type: "string",
      name: "tipoDesc",
      width: 164,
      colname: "Acción",
      funChangeValue: null,
      onClickAccion: null,
    },
    {
      type: "string",
      name: "observaciones",
      width: 344,
      colname: "Observaciones",
      funChangeValue: null,
      onClickAccion: null,
    },
    {
      type: "select-boolean",
      name: "estado",
      width: 124,
      colname: "Resuelto",
      funChangeValue: () => {},
      onClickAccion: null,
    },
  ];

  const [filtroBuscador, setFiltroBuscador] = useState(null);
  const [configTable, setConfigTable] = useState({
    data: [],
    columnComplete: ColumnBaseNewComplete,
    column: ColumnBaseNew,
    paginationView: 200,
    pagination: false,
    border: true,
    borderType: "line",
    width: 1081,
    colWidth: true,
    footer: false,
    customSeguimiento: true,
  });

  useEffect(() => {
    if (seguimientoState.seguimiento.segXIdPac === null) {
      wsGetSegXIdPac(pacienteState.paciente.buscarPac.value[0].id)(
        seguimientoDispatch
      );
    } else if (seguimientoState.seguimiento.segXIdPac !== null) {
      let auxArr = seguimientoState.seguimiento.segXIdPac.value.map((item) => {
        return {
          ...item,
          fechaDesign: obtenerFechaDesing(item.fechaIndicacion),
          estadoDesign: item.estado === "A" ? "Abierto" : "Cerrado",
        };
      });
      //agregado de seg nuevos x visualizacion y edit
      if (editedSeg.length > 0) {
        //logica nuevos
        let auxNewEdited = editedSeg.filter((editados) => !editados.segEdit);
        if (auxNewEdited.length > 0) {
          auxNewEdited.forEach((element) => {
            auxArr.push(element.itemEdited);
          });
        }
        //logica listaeditados
        let auxEdited = editedSeg.filter((editados) => editados.segEdit);
        if (auxEdited.length > 0) {
          auxArr = auxArr.map((mapItem) => {
            let temp = auxEdited.filter(
              (item2) => item2.itemEdited.id === mapItem.id
            );
            if (temp.length > 0) {
              temp[0].itemEdited.fechaDesign = obtenerFechaDesing(
                temp[0].itemEdited.fechaIndicacion
              );
              temp[0].itemEdited.estadoDesign =
                temp[0].itemEdited.estado === "A" ? "Abierto" : "Cerrado";
              return temp[0].itemEdited;
            } else return mapItem;
          });
        }
      }
      setConfigTable({
        ...configTable,
        data: auxArr,
      });
      setFiltroBuscador(pagination(auxArr, configTable.paginationView));
    }
  }, [seguimientoState.seguimiento.segXIdPac]);

  const [dataEventXIdSeg, setDataEventXIdSeg] = useState(null);

  const onChangeSelectedRow = (item) => {
    if (item.length > 0) {
      let auxItemSeg = configTable.data.filter((e) => e.id === item[0]);
      if (auxItemSeg[0].estado === "A") {
        setCerrados(false);
        setEditing(false);
        setNuevos(false);
        setEditSegE1(auxItemSeg[0]);
        setEditInputValue(auxItemSeg[0].observaciones);
        //dropdown default config en edit
        let auxTipo = itemsTipoSeg.filter(
          (e) => e.id === auxItemSeg[0].idSegTipo
        );
        setConfigDropTipo({
          ...configDropTipo,
          defaultValue: auxTipo[0].descripcion,
        });

        let auxAcc = itemsSubTipoSeg1.filter(
          (e) => e.id === auxItemSeg[0].idSegSubTipo
        );
        if (auxAcc.length > 0) {
          setConfigDropAcc({
            ...configDropAcc,
            defaultValue: auxAcc[0].descripcion,
          });
        } else {
          auxAcc = itemsSubTipoSeg2.filter(
            (e) => e.id === auxItemSeg[0].idSegSubTipo
          );
          setConfigDropAcc({
            ...configDropAcc,
            defaultValue: auxAcc[0].descripcion,
            data: itemsSubTipoSeg2,
          });
        }
      } else {
        setNuevos(false);
        setEditing(false);
        setEditSegE1(null);
        setDataEventXIdSeg(auxItemSeg[0]);
        wsGetEventXIdSeg(auxItemSeg[0].id)(seguimientoDispatch);
      }
    }
  };

  useEffect(() => {
    if (seguimientoState.seguimiento.segEventXIdSeg !== null) {
      if (
        seguimientoState.seguimiento.segEventXIdSeg.value !== null &&
        seguimientoState.seguimiento.segEventXIdSeg.value.length > 0 &&
        dataEventXIdSeg !== null
      ) {
        let auxItem = {
          ...seguimientoState.seguimiento.segEventXIdSeg.value[0],
          paciente: camelize(dataEventXIdSeg.paciente),
          tipoDesc: camelize(dataEventXIdSeg.tipoDesc),
          tipoSeguimiento: camelize(dataEventXIdSeg.tipoSeguimiento),
        };
        setEditSegE1(auxItem);
        setCerrados(true);
      } else if (seguimientoState.seguimiento.segEventXIdSeg.error !== null) {
        showToaster(
          {
            texto:
              seguimientoState.seguimiento.segEventXIdSeg.error.error
                .errorMessage,
            tipo: "danger",
          },
          "danger"
        )(toasterDispatch);
      }
    } else if (seguimientoState.seguimiento.error !== null) {
      showToaster(
        {
          texto: seguimientoState.seguimiento.error.error.errorMessage,
          tipo: "danger",
        },
        "danger"
      )(toasterDispatch);
    }
  }, [seguimientoState.seguimiento.segEventXIdSeg]);

  useEffect(() => {
    if (seguimientoState.seguimiento.error !== null) {
      //oculto en front si no tiene seguimientos. no muestro el error.
      if (seguimientoState.seguimiento.error.error.errorCode !== "SEGPAC-003") {
        showToaster(
          {
            texto: seguimientoState.seguimiento.error.error.errorMessage,
            tipo: "danger",
          },
          "danger"
        )(toasterDispatch);
      }
    }
  }, [seguimientoState.seguimiento.error]);

  const editarSeguimiento = () => {
    setCerrados(false);
    setEditing(true);
    //necesito revisar que el item que estoy editando tenga .nuevo = false
    if (editSegE1.nuevo === undefined) {
      editSegE1.nuevo = false;
    }
    //deja seleccionada una sola fila
    setConfigTable({
      ...configTable,
      disableAll: true,
    });
  };

  // en editando
  const onChangeInput = (e) => {
    setEditInputValue(e.target.value);
  };

  const [configDropTipo, setConfigDropTipo] = useState({
    data: itemsTipoSeg,
    header: "",
    footer: "",
    descripcion: "descripcion",
    placeholder: "Ej: Ecografía abdominal adulto",
    placeHolderFontSize: 14,
    defaultValue: itemsTipoSeg[0].descripcion,
    defaultValueParametro: "descripcion",
    width: 155,
    height: 32,
    cantidadItems: 10,
    maxlength: 100,
    error: false,
    arrow: true,
    search: false,
    disabled: false,
    tooltip: false,
    showUp: false,
    regex: /^[a-zA-Z\s]+$/,
    masBuscados: false,
    buscarPorDefault: false,
  });

  const [configDropAcc, setConfigDropAcc] = useState({
    data: itemsSubTipoSeg1,
    header: "",
    footer: "",
    descripcion: "descripcion",
    placeholder: "Ej: Ecografía abdominal adulto",
    placeHolderFontSize: 14,
    defaultValue: itemsSubTipoSeg1[0].descripcion,
    defaultValueParametro: "descripcion",
    height: 32,
    width: 181,
    cantidadItems: 10,
    maxlength: 100,
    error: false,
    arrow: true,
    search: false,
    disabled: false,
    tooltip: false,
    showUp: false,
    regex: /^[a-zA-Z\s]+$/,
    masBuscados: false,
    buscarPorDefault: false,
    orderCustom: "dias",
  });

  const onChangeFiltroTipo = (e) => {
    setDropTipo(e);
    if (e.id === 1) {
      setConfigDropAcc({
        ...configDropAcc,
        defaultValue: "",
        data: itemsSubTipoSeg1,
      });
    } else {
      setConfigDropAcc({
        ...configDropAcc,
        defaultValue: "",
        data: itemsSubTipoSeg2,
      });
    }
  };

  const onChangeFiltroAccion = (e) => {
    setDropAcc(e);
  };

  const obtenerDias = () => {
    if (configDropTipo.defaultValue === "ADMINISTRATIVO") {
      let aux = itemsSubTipoSeg1.filter(
        (item) => item.descripcion === configDropAcc.defaultValue
      );
      if (aux.length > 0) {
        return aux[0].dias;
      } else {
        return 0;
      }
    } else {
      let aux = itemsSubTipoSeg2.filter(
        (item) => item.descripcion === configDropAcc.defaultValue
      );
      if (aux.length > 0) {
        return aux[0].dias;
      } else {
        return 0;
      }
    }
  };

  const obtenerFechaEdit = () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let day = String(date.getDate()).padStart(2, "0");
    let hours = String(date.getHours()).padStart(2, "0");
    let minutes = String(date.getMinutes()).padStart(2, "0");
    let seconds = String(date.getSeconds()).padStart(2, "0");
    let milliseconds = String(date.getMilliseconds()).padStart(3, "0");
    // Formateo
    let localDateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
    return localDateString.slice(0, 22);
  };

  const obtenerFechaDesing = (e) => {
    //modifica la fecha en el formato solicitado
    const dateString = e;
    const date = new Date(dateString);
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} ${date.getHours()}:${
      (date.getMinutes() < 10 ? "0" : "") + date.getMinutes()
    } hs`;
    return formattedDate;
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

  const confirmaEdit = () => {
    if (editing && editSegE1.nuevo !== undefined && !editSegE1.nuevo) {
      if (editInputValue !== "") {
        let auxGraledited = gralEdited;
        auxGraledited = auxGraledited.filter(
          (item) => item.itemEdited.id !== editSegE1.id
        );
        let auxEdicion = {
          segEdit: true,
          itemEdited: {
            id: editSegE1.id,
            idPaciente: editSegE1.idPaciente,
            idUsuario: authState.auth.data.value.usuario,
            fechaIndicacion: obtenerFechaEdit(),
            idSegSubTipo:
              dropAcc !== null ? dropAcc.id : editSegE1.idSegSubTipo,
            observaciones: editInputValue,
            estado: editSegE1.estado,
            accionEnDias: dropAcc !== null ? dropAcc.dias : obtenerDias(),
            tipoSeguimiento:
              dropTipo !== null
                ? dropTipo.descripcion
                : editSegE1.tipoSeguimiento,
            paciente: pacienteState.paciente.buscarPac.value[0].nombre,
            usuario: `${authState.auth.data.value.apellido} ${authState.auth.data.value.nombre}`,
            idSegTipo: dropTipo !== null ? dropTipo.id : editSegE1.idSegTipo,
            tipoDesc:
              dropAcc !== null ? dropAcc.descripcion : editSegE1.tipoDesc,
            subTipoDesc: null,
            pacienteTelefono: null,
            unixTime: "0001-01-01T00:00:00",
            minutosDiff: 0,
            key:
              editSegE1.key !== undefined
                ? editSegE1.key
                : editedSeg.length + 1,
          },
        };
        auxGraledited.push(auxEdicion);
        setEditedSeg(auxGraledited);
        asyncUpdEdicionIDB(5, "seguimientos", auxGraledited);
        showToaster(
          {
            texto: "Seguimiento editado correctamente",
            tipo: "success",
          },
          "centroArriba"
        )(toasterDispatch);
        dissmiss();
      } else {
        showToaster(
          {
            texto: "Complete el campo de observación",
            tipo: "success",
          },
          "danger"
        )(toasterDispatch);
      }
    } else {
      //caso nuevo seguimiento
      if (nuevos || (editSegE1.nuevo !== undefined && editSegE1.nuevo)) {
        if (editInputValue !== "") {
          let auxNuevoSeg = {
            segEdit: false,
            itemEdited: {
              id:
                editSegE1.key !== undefined
                  ? editSegE1.key
                  : editedSeg.length + 1,
              accionEnDias: dropAcc !== null ? dropAcc.dias : obtenerDias(),
              estado: "A",
              fechaIndicacion: obtenerFechaEdit(),
              idUsuario: authState.auth.data.value.usuario,
              idPaciente: pacienteState.paciente.buscarPac.value[0].id,
              idSegSubTipo:
                dropAcc !== null ? dropAcc.id : itemsSubTipoSeg1[0].id,
              idSegTipo: dropTipo !== null ? dropTipo.id : itemsTipoSeg[0].id,
              idSeguimientoTipo:
                dropTipo !== null ? dropTipo.id : itemsTipoSeg[0].id,
              observaciones: editInputValue,
              usuario: `${authState.auth.data.value.apellido} ${authState.auth.data.value.nombre}`,
              nuevo: true,
              tipoDesc:
                dropAcc !== null
                  ? dropAcc.descripcion
                  : itemsSubTipoSeg1[0].descripcion,
              estadoDesign: "Abierto",
              fechaDesign: obtenerFechaDesing(obtenerFechaEdit()),
              tipoSeguimiento:
                dropTipo !== null
                  ? dropTipo.descripcion
                  : itemsTipoSeg[0].descripcion,
              key:
                editSegE1.key !== undefined
                  ? editSegE1.key
                  : editedSeg.length + 1,
            },
          };
          if (editedSeg.length > 0) {
            let auxEditedSeg = editedSeg.filter(
              (mapedItem) =>
                mapedItem.itemEdited.key !== undefined &&
                mapedItem.itemEdited.key !== auxNuevoSeg.itemEdited.key
            );
            auxEditedSeg.push(auxNuevoSeg);
            setEditedSeg(auxEditedSeg);
            asyncUpdEdicionIDB(5, "seguimientos", auxEditedSeg);
          } else {
            //logica de reemplazo
            setEditedSeg((editSeg) => [...editSeg, auxNuevoSeg]);
            asyncUpdEdicionIDB(5, "seguimientos", [auxNuevoSeg]);
          }
          showToaster(
            {
              texto: "Seguimiento creado correctamente",
              tipo: "success",
            },
            "centroArriba"
          )(toasterDispatch);
          dissmiss();
        } else {
          showToaster(
            {
              texto: "Complete el campo de observación",
              tipo: "success",
            },
            "danger"
          )(toasterDispatch);
        }
      }
    }
  };

  const cancelaEdit = () => {
    setEditing(false);
    setCerrados(false);
    setNuevos(false);
    setEditSegE1({ estado: "" });
    setConfigTable({
      ...configTable,
      disableAll: false,
    });
    setEditInputValue("");
  };

  const nuevoSeguimiento = () => {
    setEditInputValue("");
    setEditing(false);
    setEditSegE1({ estado: "" });
    setCerrados(false);
    setNuevos(true);
    setConfigTable({
      ...configTable,
      disableAll: true,
    });
  };

  const delSeguimiento = () => {
    let auxDel = editedSeg.filter(
      (item) => item.itemEdited.id !== editSegE1.id
    );
    setEditedSeg(auxDel);
    asyncUpdEdicionIDB(5, "seguimientos", auxDel);
    dissmiss();
    showToaster(
      {
        texto: "Seguimiento eliminado correctamente",
        tipo: "success",
      },
      "centroArriba"
    )(toasterDispatch);
  };

  return (
    <>
      <ContainerBox
        editando={editing}
        cerrados={cerrados || seguimientoState.seguimiento.loading}
        nuevos={nuevos}
      >
        <CleanTable
          config={configTable}
          filtroBuscador={filtroBuscador}
          onChange={onChangeSelectedRow}
        />

        {(editing && !cerrados) || nuevos ? (
          <ContainerInfoSeg>
            <ContainerTitleS2 className="rb16mb c-latex30">
              Nuevo Seguimiento
            </ContainerTitleS2>
            <ContainerPacFilterS2>
              <PacFilterName className="rb16l c-latex30">
                Paciente: <span className="rb16mb">{pacName}</span>
              </PacFilterName>
              <ContainerFilterS2>
                <PacFilterTipo>
                  <span className="rb16l c-latex30">Tipo:</span>
                  <DropdownV2
                    config={configDropTipo}
                    onClick={onChangeFiltroTipo}
                  />
                </PacFilterTipo>
                <PacFilterAccion>
                  <span className="rb16l c-latex30">Acción:</span>
                  <DropdownV2
                    config={configDropAcc}
                    onClick={onChangeFiltroAccion}
                  />
                </PacFilterAccion>
              </ContainerFilterS2>
            </ContainerPacFilterS2>
            <ContainerComentarioS2>
              <InputBase
                property={``}
                placeholder={"Escriba su comentario aqui..."}
                errorStr="Debe ser una palabra"
                // state={localForm}
                // setState={setLocalForm}
                isRequired={true}
                value={editInputValue}
                onChange={(e) => onChangeInput(e)}
                extraProperty={{
                  initialValue: "",
                  // errorForced: stateRequired.nombre,
                  // setErrorForced: setStateRequired,
                  // stateRequired: stateRequired,
                  titleStyle: "rb14l c-latexAbm",
                  heightContainer: 34,
                  widthContainer: 300,
                  heightInput: 34,
                  widthInput: 191,
                  textValueStyle: `rb14l c-latex30 bgc-grey95 ${""}`,
                  maxLength: 200,
                }}
              />
            </ContainerComentarioS2>
          </ContainerInfoSeg>
        ) : (
          ""
        )}
        {(!editing && cerrados) ||
        (seguimientoState.seguimiento.loading &&
          seguimientoState.seguimiento.segXIdPac !== null) ? (
          <ContainerInfoPacSeg>
            {editSegE1 !== null ? (
              <ContainerInfoPacS3>
                <div>
                  <span
                    className="rb16l c-latex30"
                    style={{ paddingRight: 15 }}
                  >
                    Paciente:
                  </span>
                  <span className="rb16mb c-latex30">{pacName}</span>
                </div>
                <div>
                  <span
                    className="rb16l c-latex30"
                    style={{ paddingRight: 29 }}
                  >
                    Acción:
                  </span>
                  <span className="rb16mb c-latex30">
                    {dataEventXIdSeg !== null
                      ? camelize(dataEventXIdSeg.tipoDesc)
                      : ""}
                  </span>
                </div>
                <div>
                  <span
                    className="rb16l c-latex30"
                    style={{ paddingRight: 48 }}
                  >
                    Tipo:
                  </span>
                  <span className="rb16mb c-latex30">
                    {dataEventXIdSeg !== null
                      ? camelize(dataEventXIdSeg.tipoSeguimiento)
                      : ""}
                  </span>
                </div>
              </ContainerInfoPacS3>
            ) : (
              <IonSpinner name="lines-small" />
            )}
            <ContainerAccionInfo>
              {editSegE1 !== null ? (
                <>
                  <ContainerAccionTitles>
                    <div style={{ paddingBottom: 7 }}>
                      <span className="rb16mb c-latex30">Respuesta:</span>
                    </div>
                    {/* meter tooltip y al texto cuando es muy largo? */}
                    <div style={{ paddingBottom: 13 }}>
                      <span className="rb16l c-latex30">
                        {editSegE1 !== null ? camelize(editSegE1.usuario) : ""}:
                      </span>
                    </div>
                    <ContainerFechaAccion>
                      <span className="rb12l c-latex30">
                        {editSegE1 !== null
                          ? obtenerFechaDesing(editSegE1.fecha)
                          : ""}
                      </span>
                    </ContainerFechaAccion>
                  </ContainerAccionTitles>
                  <ContainerAccionData>
                    <span className="rb16xxl c-latex30">
                      {editSegE1 !== null && editSegE1.observacion
                        ? editSegE1.observacion
                        : ""}
                    </span>
                  </ContainerAccionData>
                </>
              ) : (
                <IonSpinner name="lines-small" />
              )}
            </ContainerAccionInfo>
          </ContainerInfoPacSeg>
        ) : (
          ""
        )}
        <ContainerButtons>
          <div>
            <BtnCerrar
              onClick={editing || nuevos ? cancelaEdit : dissmiss}
              className="rb16mb c-white"
            >
              {editing || nuevos ? "Volver" : "Cerrar"}
            </BtnCerrar>
          </div>
          <div>
            {editSegE1 !== null &&
            editSegE1.estado !== undefined &&
            editSegE1.estado === "A" &&
            !editing ? (
              <>
                {editSegE1.key !== undefined && (
                  <BtnDelSeg
                    onClick={delSeguimiento}
                    className="rb16mh c-primary"
                  >
                    Eliminar
                  </BtnDelSeg>
                )}
                <BtnEditSeg
                  onClick={editarSeguimiento}
                  className="rb16mh c-primary"
                >
                  Editar Seguimiento
                </BtnEditSeg>
              </>
            ) : (
              ""
            )}
            {editing || nuevos ? (
              <BtnNewSeg onClick={confirmaEdit} className="rb16mh c-white">
                Confirmar
              </BtnNewSeg>
            ) : (
              <BtnNewSeg onClick={nuevoSeguimiento} className="rb16mh c-white">
                Nuevo Seguimiento
              </BtnNewSeg>
            )}
          </div>
        </ContainerButtons>
      </ContainerBox>
    </>
  );
};

export default SeguimientoE1;
