import { getFechaNacFormat } from "global/utils/getFechaNacFormat";
import React, { useContext, useEffect, useState } from "react";
import { showToaster } from "global/context/action/toaster/toaster";
import { GlobalContext } from "global/context/Provider";
import { regexNumeroLetras } from "global/utils/expresionesRegulares";
import { fechaDatePicker } from "global/utils/fechaTurnoFormat";
import EditarMobileIcon from "global/assets/generico/EditarMobileIcon";
import QuestionMark from "global/assets/generico/QuestionMark";
import DatePicker from "global/components/genericos/DatePicker/DatePicker";
import InputV1 from "global/components/genericos/InputV1/InputV1";
import camelize from "global/utils/camelize";
import getEdad from "global/utils/getEdad";
import {
  ContainerBox,
  ContainerButtons,
  BtnCerrar,
  ContainerTitle,
  ContainerOrden,
  ContainerOrdenItems,
  ContainerDatosOrden,
  ContainerOrdenTitle,
  ContainerOrdenBody,
  ContainerOrdenBox,
  ContainerModifButton,
  BtnModificar,
  BtnGenerarOrden,
  BtnUrgenciaNomenc,
  BoxDatosPac,
  BoxDiagnostico,
  BoxFecha,
  BoxDiagnosticoTitle,
  BoxDiagnosticoInput,
  BoxFechaTitle,
  BoxFechaInput,
  CerrarCmp,
  ContainerQst,
  BoxUrgencia,
} from "./localStyle";
import FlechaIzquierdaIcon from "global/assets/generico/FlechaIzquierdaIcon";
import { hideModal, showModal } from "global/context/action/modal/modal";
import Mensaje from "global/components/genericos/Mensaje/Mensaje";
import { updateEvoEditIndexDB } from "_+_HistoriaClinica/pages/Evolucion/EvolucionFun";
import ModalUrgenciaNomenc from "../ModalUrgenciaNomenc/ModalUrgenciaNomenc";

const ModificaOrdenLabo = ({
  itemSeleccionado,
  datosPac,
  crearOrdenLabo,
  setOrdenDigital,
  ordenGeneradaIndex,
  modifica,
  ordenDigital,
  setOpenSlider,
  setOpenCirOrdenLabo,
  setOrdenLabo,
  ordenLabo,
  setOrdenSeleccionada,
  setItemsEnEdicion,
  setOrdenGeneradaIndex,
  setEditaOrdenLabo,
}) => {
  const { toasterDispatch, modalDispatch } = useContext(GlobalContext);

  const [valueDiagnostico, setValueDiagnostico] = useState("");
  const [valueFecha, setValueFecha] = useState(
    fechaDatePicker(itemSeleccionado.fechaOrden)
  );
  const [itemsConUrgencia, setItemsConUrgencia] = useState(null);

  const hoy = new Date();
  let idUsuarioLocal = JSON.parse(localStorage.getItem("idUsuario"));
  let config = localStorage.getItem("config");
  let opcUrgenciaMedica = JSON.parse(config).opcUrgenciaMedica;

  const fechaNac = () => {
    let parseFecha = datosPac.fechaNacimiento.slice(0, 10).replace(/[-]/g, "/");
    let fecha = getFechaNacFormat(new Date(parseFecha));
    let edad = getEdad(datosPac.fechaNacimiento);

    return `${fecha + " (" + edad + " años)"}`;
  };

  const preventKeyOnlyTextandLetters = (e) => {
    if (!regexNumeroLetras.test(e.key)) {
      e.preventDefault();
    }
  };

  const onChangeDiagnostico = (e) => {
    if (e !== undefined && e !== null) {
      setValueDiagnostico(e.target.value);
    }
  };

  const onChangeFecha = (e) => {
    setValueFecha(e);
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

  //filtrar unicos x orden - SOLO para órdenes de laboratorio
  const filterUniqueItems = (newItems, allOrders, skipIndex = null) => {
    // 1) Si estamos editando, excluir la orden actual de allOrders primero
    const ordersToCheck =
      skipIndex !== null
        ? allOrders.filter((_, idx) => idx !== skipIndex)
        : allOrders;

    // 2) Filtrar solo las órdenes de laboratorio (que tienen listGrupoEstudioItem)
    const laboOrders = ordersToCheck.filter(
      (ord) =>
        ord &&
        Array.isArray(ord.listGrupoEstudioItem) &&
        ord.listGrupoEstudioItem.length > 0
    );

    // 3) Recopilar todos los idlabnomenclador usados en las órdenes de laboratorio
    const usedKeys = laboOrders.flatMap((ord) => {
      return ord.listGrupoEstudioItem
        .filter(
          (i) =>
            i && i.idlabnomenclador !== undefined && i.idlabnomenclador !== null
        )
        .map((i) => i.idlabnomenclador);
    });

    // 4) Separar items únicos y duplicados
    const uniqueItems = newItems.filter(
      (item) =>
        item &&
        item.idlabnomenclador !== undefined &&
        item.idlabnomenclador !== null &&
        !usedKeys.includes(item.idlabnomenclador)
    );

    const duplicateItems = newItems.filter(
      (item) =>
        item &&
        item.idlabnomenclador !== undefined &&
        item.idlabnomenclador !== null &&
        usedKeys.includes(item.idlabnomenclador)
    );

    return {
      uniqueItems,
      duplicateItems,
      totalItems: newItems.length,
      uniqueCount: uniqueItems.length,
      duplicateCount: duplicateItems.length,
    };
  };

  // const generarOrden = () => {
  //   if (valueDiagnostico !== "") {
  //     let fechaAux = valueFecha.replaceAll(" ", "-");
  //     let itemInfo = JSON.parse(localStorage.getItem("itemInfo"));
  //     //limpio los item de textoAdicional
  //     let grupoItems = itemSeleccionado.items.filter(
  //       (element) => element.id !== -1
  //     );
  //     if (itemInfo) {
  //       //ajusto el idgrupoestudio segun edicion
  //       let idGrupoEstudios = itemSeleccionado.id;
  //       if (idGrupoEstudios === undefined || modifica) {
  //         idGrupoEstudios = -1;
  //       }
  //       // dtoReEdicion sirve para cuando llamo a editar desde el card ...
  //       // ... mantengo los mismos item antes de guardar para poder editarlos.
  //       let dtoGeneraOrden = {
  //         diagnostico: valueDiagnostico,
  //         fechadiferida: fechaAux,
  //         idgrupoestudios: parseInt(idGrupoEstudios),
  //         idpaciente: datosPac.id,
  //         idturnoorigen: itemInfo.idTurno,
  //         listGrupoEstudioItem: grupoItems,
  //         idusuarioalta: idUsuarioLocal,
  //         textoadicional:
  //           itemSeleccionado.textoAdicional !== undefined
  //             ? itemSeleccionado.textoAdicional
  //             : "",
  //         tipoOrden: "Labo",
  //         pendienteAsignacion:
  //           itemSeleccionado.pendienteAsignacion !== undefined
  //             ? itemSeleccionado.pendienteAsignacion
  //             : false,
  //         dtoReEdicion: {
  //           descripcion: itemSeleccionado.descripcion,
  //           id: itemSeleccionado.id,
  //           idusuario: itemSeleccionado.idusuario,
  //           idusuario_desc: itemSeleccionado.idusuario_desc,
  //           orden: itemSeleccionado.orden,
  //           items: itemSeleccionado.items,
  //           diagnostico: valueDiagnostico,
  //           fechaOrden: fechaAux,
  //         },
  //       };
  //       //guardo previamente la orden, la orden se genera dentro de "guardar evolucion".
  //       if (ordenDigital !== null && ordenDigital.length > 0) {
  //         if (
  //           modifica !== null &&
  //           ordenGeneradaIndex !== null &&
  //           (modifica || !modifica)
  //         ) {
  //           //si es una modificacion, actualizo el item en la lista
  //           ordenDigital[ordenGeneradaIndex] = dtoGeneraOrden;

  //           //aca 1
  //           console.log("modifica orden", ordenDigital);
  //           asyncUpdEdicionIDB(5, "ordenDigital", ordenDigital);
  //           //mantengo el hook para que se vea la lista
  //           setOrdenDigital(ordenDigital);
  //           cerrarSliderSelector();
  //         } else {
  //           //si es una nueva orden, mantengo la data en local
  //           ordenDigital.push(dtoGeneraOrden);
  //           console.log("nueva orden", ordenDigital);
  //           //aca 2
  //           asyncUpdEdicionIDB(5, "ordenDigital", ordenDigital);
  //           //mantengo el hook para que se vea la lista
  //           setOrdenDigital(ordenDigital);
  //           cerrarSliderSelector();
  //         }
  //       } else {
  //         //primera vez que guardo una orden
  //         console.log("primera orden", dtoGeneraOrden);
  //         setOrdenDigital((estudio) => [...estudio, dtoGeneraOrden]);
  //         asyncUpdEdicionIDB(5, "ordenDigital", [dtoGeneraOrden]);
  //       }
  //       showToaster(
  //         {
  //           texto: "Orden generada correctamente",
  //           tipo: "success",
  //         },
  //         "centroArriba"
  //       )(toasterDispatch);
  //       cerrarSliderSelector();
  //     } else {
  //       showToaster(
  //         {
  //           texto: "No posee un item seleccionado, vuelva a comenzar",
  //           tipo: "danger",
  //         },
  //         "centroArriba"
  //       )(toasterDispatch);
  //     }
  //   } else {
  //     showToaster(
  //       {
  //         texto: "Complete un diagnóstico",
  //         tipo: "danger",
  //       },
  //       "centroArriba"
  //     )(toasterDispatch);
  //   }
  //   };

  // Componente para el modal de confirmación de items duplicados
  const ModalConfirmacionDuplicados = ({
    duplicateItems,
    uniqueItems,
    onConfirmar,
    onCancelar,
  }) => {
    return (
      <div style={{ padding: "20px", maxWidth: "600px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h3 style={{ color: "#2c3e50", marginBottom: "10px" }}>
            ⚠️ Determinaciones Duplicadas Detectadas
          </h3>
          <p style={{ color: "#7f8c8d", fontSize: "14px" }}>
            Se encontraron determinaciones que ya existen en otras órdenes de
            laboratorio.
          </p>
        </div>

        {duplicateItems.length > 0 && (
          <div style={{ marginBottom: "20px" }}>
            <h4 style={{ color: "#e74c3c", marginBottom: "10px" }}>
              ❌ Determinaciones que NO se incluirán ({duplicateItems.length}):
            </h4>
            <div
              style={{
                backgroundColor: "#fdf2f2",
                border: "1px solid #fecaca",
                borderRadius: "8px",
                padding: "15px",
                maxHeight: duplicateItems.length > 3 ? "120px" : "auto",
                overflowY: duplicateItems.length > 3 ? "auto" : "visible",
                scrollbarWidth: "thin",
                scrollbarColor: "#fecaca #fdf2f2",
              }}
            >
              {duplicateItems.map((item, index) => (
                <div
                  key={index}
                  style={{
                    padding: "5px 0",
                    borderBottom:
                      index < duplicateItems.length - 1
                        ? "1px solid #fecaca"
                        : "none",
                    color: "#dc2626",
                    fontSize: "14px",
                    lineHeight: "1.4",
                  }}
                >
                  • {item.idlabnomenclador_desc}
                </div>
              ))}
            </div>
          </div>
        )}

        {uniqueItems.length > 0 && (
          <div style={{ marginBottom: "20px" }}>
            <h4 style={{ color: "#059669", marginBottom: "10px" }}>
              ✅ Determinaciones que SÍ se incluirán ({uniqueItems.length}):
            </h4>
            <div
              style={{
                backgroundColor: "#f0fdf4",
                border: "1px solid #bbf7d0",
                borderRadius: "8px",
                padding: "15px",
                maxHeight: uniqueItems.length > 3 ? "120px" : "auto",
                overflowY: uniqueItems.length > 3 ? "auto" : "visible",
                scrollbarWidth: "thin",
                scrollbarColor: "#bbf7d0 #f0fdf4",
              }}
            >
              {uniqueItems.map((item, index) => (
                <div
                  key={index}
                  style={{
                    padding: "5px 0",
                    borderBottom:
                      index < uniqueItems.length - 1
                        ? "1px solid #bbf7d0"
                        : "none",
                    color: "#059669",
                    fontSize: "14px",
                    lineHeight: "1.4",
                  }}
                >
                  • {item.idlabnomenclador_desc}
                </div>
              ))}
            </div>
          </div>
        )}

        <div
          style={{
            backgroundColor: "#fef3c7",
            border: "1px solid #fde68a",
            borderRadius: "8px",
            padding: "15px",
            marginTop: "20px",
          }}
        >
          <p style={{ color: "#92400e", fontSize: "14px", margin: 0 }}>
            <strong>¿Desea continuar con la creación de la orden?</strong>
          </p>
        </div>
      </div>
    );
  };

  // Función principal para crear o modificar una orden
  const generarOrden = () => {
    // Validaciones básicas
    if (valueDiagnostico === "") {
      showToaster(
        { texto: "Complete un diagnóstico", tipo: "danger" },
        "centroArriba"
      )(toasterDispatch);
      return;
    }

    let fechaAux = valueFecha.replaceAll(" ", "-");
    const itemInfo = JSON.parse(localStorage.getItem("itemInfo"));

    // Usar items con urgencia si están disponibles, sino usar todos los items
    let grupoItems;
    if (itemsConUrgencia) {
      // Filtrar solo los items marcados como urgencia
      grupoItems = itemsConUrgencia.filter((e) => e.id !== -1);

      // Si no hay items con urgencia seleccionados, mostrar mensaje
      if (grupoItems.length === 0) {
        showToaster(
          {
            texto: "Debe seleccionar al menos una determinación con urgencia",
            tipo: "danger",
          },
          "centroArriba"
        )(toasterDispatch);
        return;
      }
    } else {
      // Usar todos los items si no se ha configurado urgencia
      grupoItems = itemSeleccionado.items.filter((e) => e.id !== -1);
    }

    if (!itemInfo) {
      showToaster(
        {
          texto: "No posee un item seleccionado, vuelva a comenzar",
          tipo: "danger",
        },
        "centroArriba"
      )(toasterDispatch);
      return;
    }
    // Preparar DTO de orden
    let idGrupoEstudios = itemSeleccionado.id;
    if (idGrupoEstudios === undefined || modifica) {
      idGrupoEstudios = -1;
    }

    const dtoGeneraOrden = {
      diagnostico: valueDiagnostico,
      fechadiferida: fechaAux,
      idgrupoestudios: parseInt(idGrupoEstudios),
      idpaciente: datosPac.id,
      idturnoorigen: itemInfo.idTurno,
      listGrupoEstudioItem: grupoItems,
      idusuarioalta: idUsuarioLocal,
      textoadicional: itemSeleccionado.textoAdicional || "",
      tipoOrden: "Labo",
      pendienteAsignacion: itemSeleccionado.pendienteAsignacion || false,
      dtoReEdicion: {
        descripcion: itemSeleccionado.descripcion,
        id: itemSeleccionado.id,
        idusuario: itemSeleccionado.idusuario,
        idusuario_desc: itemSeleccionado.idusuario_desc,
        orden: itemSeleccionado.orden,
        items: grupoItems,
        diagnostico: valueDiagnostico,
        fechaOrden: fechaAux,
      },
    };

    // Lógica de guardado en IndexedDB / estado
    if (ordenDigital && ordenDigital.length > 0) {
      const skipIndex =
        modifica && ordenGeneradaIndex != null ? ordenGeneradaIndex : null;

      const filterResult = filterUniqueItems(
        dtoGeneraOrden.listGrupoEstudioItem,
        ordenDigital,
        skipIndex
      );
      // Si no hay items únicos, mostrar error
      if (filterResult.uniqueItems.length === 0) {
        showToaster(
          {
            texto:
              "Las determinaciones solicitadas ya se encuentran en otra orden",
            tipo: "danger",
          },
          "centroArriba"
        )(toasterDispatch);
        return;
      }

      // Si hay items duplicados, mostrar modal de confirmación (tanto para nuevas órdenes como para edición)
      if (filterResult.duplicateItems.length > 0) {
        showModal(
          <ModalConfirmacionDuplicados
            duplicateItems={filterResult.duplicateItems}
            uniqueItems={filterResult.uniqueItems}
            onConfirmar={() => {
              hideModal()(modalDispatch);
              // Continuar con la creación/edición de la orden usando solo items únicos
              dtoGeneraOrden.listGrupoEstudioItem = filterResult.uniqueItems;
              dtoGeneraOrden.dtoReEdicion.items = filterResult.uniqueItems;

              if (modifica && ordenGeneradaIndex != null) {
                // Edición
                ordenDigital[ordenGeneradaIndex] = dtoGeneraOrden;
              } else {
                // Nueva orden
                ordenDigital.push(dtoGeneraOrden);
              }

              asyncUpdEdicionIDB(5, "ordenDigital", ordenDigital);
              setOrdenDigital(ordenDigital);
              cerrarSliderSelector();
              showToaster(
                { texto: "Orden generada correctamente", tipo: "success" },
                "centroArriba"
              )(toasterDispatch);
            }}
            onCancelar={() => {
              hideModal()(modalDispatch);
            }}
          />,
          "Confirmar Creación de Orden",
          () => hideModal()(modalDispatch),
          false,
          [
            {
              text: "Cancelar",
              clase: "btn-Mensaje bgc-danger rb16m c-white",
              accion: () => hideModal()(modalDispatch),
            },
            {
              text: "Continuar",
              clase: "btn-Mensaje b-latex30 rb16m c-latex30",
              accion: () => {
                hideModal()(modalDispatch);
                // Continuar con la creación/edición de la orden usando solo items únicos
                dtoGeneraOrden.listGrupoEstudioItem = filterResult.uniqueItems;
                dtoGeneraOrden.dtoReEdicion.items = filterResult.uniqueItems;

                if (modifica && ordenGeneradaIndex != null) {
                  // Edición
                  ordenDigital[ordenGeneradaIndex] = dtoGeneraOrden;
                } else {
                  // Nueva orden
                  ordenDigital.push(dtoGeneraOrden);
                }

                asyncUpdEdicionIDB(5, "ordenDigital", ordenDigital);
                setOrdenDigital(ordenDigital);
                cerrarSliderSelector();
                showToaster(
                  { texto: "Orden generada correctamente", tipo: "success" },
                  "centroArriba"
                )(toasterDispatch);
              },
            },
          ],
          "centro",
          false
        )(modalDispatch);
        return;
      }

      // Si no hay duplicados o estamos editando, continuar normalmente
      dtoGeneraOrden.listGrupoEstudioItem = filterResult.uniqueItems;
      dtoGeneraOrden.dtoReEdicion.items = filterResult.uniqueItems;

      if (modifica && ordenGeneradaIndex != null) {
        // Edición
        ordenDigital[ordenGeneradaIndex] = dtoGeneraOrden;
        asyncUpdEdicionIDB(5, "ordenDigital", ordenDigital);
        setOrdenDigital(ordenDigital);
        cerrarSliderSelector();
        showToaster(
          { texto: "Orden generada correctamente", tipo: "success" },
          "centroArriba"
        )(toasterDispatch);
      } else {
        // Nueva orden sin duplicados
        ordenDigital.push(dtoGeneraOrden);
        asyncUpdEdicionIDB(5, "ordenDigital", ordenDigital);
        setOrdenDigital(ordenDigital);
        cerrarSliderSelector();
        showToaster(
          { texto: "Orden generada correctamente", tipo: "success" },
          "centroArriba"
        )(toasterDispatch);
      }
    } else {
      // Primera orden
      setOrdenDigital([dtoGeneraOrden]);
      asyncUpdEdicionIDB(5, "ordenDigital", [dtoGeneraOrden]);
      cerrarSliderSelector();
      showToaster(
        { texto: "Orden generada correctamente", tipo: "success" },
        "centroArriba"
      )(toasterDispatch);
    }
  };

  useEffect(() => {
    //agrego el valor de diagnostico si es que modifico
    if (itemSeleccionado.diagnostico !== undefined) {
      setValueDiagnostico(itemSeleccionado.diagnostico);
    }
  }, []);

  const cerrarSliderSelector = () => {
    setOpenCirOrdenLabo(false);
    setOpenSlider(false);
    setEditaOrdenLabo({
      item: null,
      modifica: false,
      index: null,
    });
  };

  const volverP1 = () => {
    setOrdenSeleccionada([]);
    setItemsEnEdicion([]);
    setOrdenGeneradaIndex();
    setOrdenLabo({
      ...ordenLabo,
      ordenLaboP1: true,
      ordenLaboP2: false,
      ordenLaboP3: false,
    });
  };

  const dissmissCreacion = () => {
    setOpenCirOrdenLabo(false);
    setOpenSlider(false);
    setEditaOrdenLabo({
      item: null,
      modifica: false,
      index: null,
    });
    hideModal()(modalDispatch);
  };
  const continuaCreando = () => {
    hideModal()(modalDispatch);
  };

  const showCierre = () => {
    showModal(
      <Mensaje
        textoNegrita={"Usted tiene una creación de orden en curso"}
        texto={"Desea cancelar?"}
      ></Mensaje>,
      "Creación de Orden en curso",
      continuaCreando,
      false,
      [
        {
          text: "Cancelar creación",
          clase: "btn-Mensaje bgc-danger rb16m c-white",
          accion: dissmissCreacion,
        },
        {
          text: "Continuar",
          clase: "btn-Mensaje b-latex30 rb16m c-latex30",
          accion: continuaCreando,
        },
      ],
      "centro",
      false
    )(modalDispatch);
  };

  const handleUrgenciaNomenc = () => {
    showModal(
      <ModalUrgenciaNomenc
        grupoEstudioItems={itemSeleccionado.items}
        modifica={modifica}
        onGuardar={(itemsModificados, modifica) => {
          setItemsConUrgencia(itemsModificados);
          hideModal()(modalDispatch);
          const itemsUrgencia = itemsModificados.filter(
            (item) => item.urgencia
          ).length;
          showToaster(
            {
              texto: `Configuración de urgencia guardada. ${itemsUrgencia} determinación(es) marcada(s) como urgente(s)`,
              tipo: "success",
            },
            "centroArriba"
          )(toasterDispatch);
        }}
        onVolver={() => {
          hideModal()(modalDispatch);
        }}
      />,
      "Urgencia Médica",
      () => hideModal()(modalDispatch),
      false,
      [],
      "centro",
      true
    )(modalDispatch);
  };

  return (
    <>
      <CerrarCmp
        className="cerrarIcon ts_modifOrdenLabo_close-btn"
        onClick={() => showCierre()}
      >
        <span className="rb16l c-latex30">Cerrar</span>
        <div>
          {" "}
          <FlechaIzquierdaIcon />
        </div>
      </CerrarCmp>
      <ContainerBox>
        <ContainerTitle>
          <span className="rb24b c-latex30">
            Solicitud de Orden de Laboratorio
          </span>
        </ContainerTitle>
        <ContainerQst>
          <span className="rb18l c-latex30">
            De ser necesario puede hacer modificaciones a la orden actual.
            Ingrese el diagnóstico de la misma y toque GENERAR ORDEN.
          </span>
        </ContainerQst>
        <ContainerOrden>
          <ContainerOrdenBox>
            <ContainerOrdenTitle className="bgcG-latex30">
              <span className="rb16b c-white">
                Orden: {camelize(itemSeleccionado.descripcion)}
              </span>
            </ContainerOrdenTitle>
            <ContainerOrdenBody>
              <ContainerOrdenItems className="ts_modifOrdenLabo_ordenItems-item">
                {Array.isArray(itemSeleccionado.items) &&
                  itemSeleccionado.items.map((item, index) => {
                    return (
                      <React.Fragment key={index}>
                        <div>
                          <span className="rb12l c-latex30">
                            {item.idlabnomenclador_desc}
                          </span>
                        </div>
                      </React.Fragment>
                    );
                  })}
              </ContainerOrdenItems>
              <ContainerModifButton>
                <BtnModificar
                  className="bgc-latex30 rb16m c-white pointer ts_modifOrdenLabo_gotoNewOrden-btn"
                  onClick={() =>
                    crearOrdenLabo(itemSeleccionado, true, ordenGeneradaIndex)
                  }
                >
                  <span>Modificar</span>
                  <div>
                    <EditarMobileIcon
                      color={"var(--color-white)"}
                    ></EditarMobileIcon>
                  </div>
                </BtnModificar>
              </ContainerModifButton>
            </ContainerOrdenBody>
          </ContainerOrdenBox>
          <ContainerDatosOrden>
            <BoxDatosPac className="bgcG-latex30 c-white">
              <p className="rb16b c-white">{datosPac.nombre}</p>
              <p className="rb12l c-white">
                Fecha de Nacimiento: <span className="rb12b">{fechaNac()}</span>
              </p>
              <p className="rb12l c-white">
                Obra Social:{" "}
                <span className="rb12b">{datosPac.obraSocial}</span>
              </p>
              <p className="rb12l c-white">
                Plan: <span className="rb12b"> {datosPac.plan}</span>
              </p>
            </BoxDatosPac>
            <div>
              <p className="rb16l c-latex30">
                Cantidad de determinaciones:{" "}
                <span className="rb16b c-latex30">
                  {Array.isArray(itemSeleccionado.items) &&
                    itemSeleccionado.items.length}
                </span>
              </p>
            </div>
            <BoxDiagnostico>
              <BoxDiagnosticoTitle>
                <p className="rb16l c-latex30">Diagnóstico:</p>
                <QuestionMark
                  colorFondo={"var(--color-latex30)"}
                  colorSigno={"var(--color-white)"}
                />
              </BoxDiagnosticoTitle>
              <BoxDiagnosticoInput>
                <InputV1
                  inputType="text"
                  name="txtDiagPac"
                  placeholderText="HTA"
                  errorStr="Ingrese al menos 3 caracteres."
                  onChange={onChangeDiagnostico}
                  onKeyPress={preventKeyOnlyTextandLetters}
                  maxLength="50"
                  className="rb16m ts_modifOrdenLabo_diagOrden-input"
                  isRequired={true}
                  value={valueDiagnostico}
                  autoFocus={false}
                />
              </BoxDiagnosticoInput>
            </BoxDiagnostico>
            <BoxFecha>
              <BoxFechaTitle>
                <p className="rb16l c-latex30">Fecha Orden Diferida:</p>
                <QuestionMark
                  colorFondo={"var(--color-latex30)"}
                  colorSigno={"var(--color-white)"}
                />
              </BoxFechaTitle>
              <BoxFechaInput className="ts_modifOrdenLabo_datePicker">
                <DatePicker
                  fechaInicial={`${hoy.getFullYear()} ${
                    hoy.getMonth() + 1
                  } ${hoy.getDate()}`}
                  fechaFinal={`${hoy.getFullYear() + 1} ${
                    hoy.getMonth() + 1
                  } ${hoy.getDate()}`}
                  onChange={onChangeFecha}
                  selectedFecha={fechaDatePicker(itemSeleccionado.fechaOrden)}
                  checkError={"fecha incorrecta"}
                  errorStr="La fecha es requerida"
                  isRequired={false}
                  posicion={"absolute"}
                  botones={true}
                  background={true}
                  customPosition={"hc-modifOrdenLabo-datepicker"}
                />
              </BoxFechaInput>
            </BoxFecha>
            {opcUrgenciaMedica && (
              <BoxUrgencia>
                <BtnUrgenciaNomenc
                  activo={itemsConUrgencia !== null}
                  className="rb16m ts_modifOrdenLabo_urgencia-btn"
                  onClick={() => {
                    handleUrgenciaNomenc();
                  }}
                >
                  Urgencia Médica
                </BtnUrgenciaNomenc>
              </BoxUrgencia>
            )}
          </ContainerDatosOrden>
        </ContainerOrden>
        <ContainerButtons>
          <BtnCerrar
            onClick={volverP1}
            className="rb16b c-white ts_modifOrdenLabo_back-btn"
          >
            Volver
          </BtnCerrar>
          <BtnGenerarOrden
            onClick={generarOrden}
            className="rb16m c-white ts_modifOrdenLabo_saveOrden-btn"
          >
            Generar Orden
          </BtnGenerarOrden>
        </ContainerButtons>
      </ContainerBox>
    </>
  );
};

export default ModificaOrdenLabo;
