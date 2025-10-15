import CruzIcon from "global/assets/generico/CruzIcon";
import { showToaster } from "global/context/action/toaster/toaster";
import { GlobalContext } from "global/context/Provider";
import { parseCheckBox } from "global/utils/parseFilter";
import React, { useContext, useEffect, useState } from "react";
import BuscadorOrden from "../BuscadorOrden/BuscadorOrden";
import ItemCheckBox from "../ItemCheckBox/ItemCheckBox";
import {
  ContainerBox,
  ContainerButtons,
  BtnCerrar,
  ContainerTitle,
  ContainerOrden,
  ContainerOrdenItems,
  ContainerOrdenTitle,
  ContainerOrdenBody,
  ContainerOrdenBox,
  BtnGenerarOrden,
  ContainerAdicionales,
  BoxBuscador,
  ContainerBuscador,
  BoxBuscadorTitle,
  BoxBuscadorInput,
  ContainerAdicionalesItems,
  ContainerChecks,
  BoxChecksDescItem,
  ContainerCantDeter,
  BtnAdicionales,
  ContainerQst,
  CerrarCmp,
} from "./localStyle";
import FlechaIzquierdaIcon from "global/assets/generico/FlechaIzquierdaIcon";
import { hideModal, showModal } from "global/context/action/modal/modal";
import Mensaje from "global/components/genericos/Mensaje/Mensaje";

const CrearOrdenLabo = ({
  setOrdenLabo,
  ordenLabo,
  deters,
  buscadorItems,
  detersAuxiliares,
  itemsEnEdicion,
  modifica,
  ordenSeleccionada,
  ordenGeneradaIndex,
  setOpenCirOrdenLabo,
  setOpenSlider,
  seleccionaOrden,
  setEditaOrdenLabo,
}) => {
  const { toasterDispatch, modalDispatch } = useContext(GlobalContext);

  const [seleccionados, setSeleccionados] = useState([]);
  const [original, setOriginal] = useState([]);
  const [activeFilter, setActiveFilter] = useState();
  const [deterOriginal, setDeterOriginal] = useState(deters);
  const [flgFiltrar, setFlgFiltrar] = useState(false);
  const [flgFiltroFinal, setFlgFiltroFinal] = useState(false);
  const [newDeter, setNewDeter] = useState([]);

  const verificarCambios = (seleccionados) => {
    let max;
    let min;
    if (seleccionados.length >= original.length) {
      max = seleccionados;
      min = original;
    } else if (seleccionados.length <= original.length) {
      max = original;
      min = seleccionados;
    }
    let aux;
    let flgCambios = false;
    for (let i = 0; i < max.length; i++) {
      aux = min.filter(
        (e) => e.idlabnomenclador_desc === max[i].idlabnomenclador_desc
      );
      if (aux.length <= 0) {
        flgCambios = true;
        break;
      }
    }
    return flgCambios;
  };

  const guardarOrden = () => {
    if (seleccionados && seleccionados.length > 0) {
      let cambiosRealizados = verificarCambios(seleccionados);
      let textoAdicional = seleccionados.filter((item) => item.id === -1);
      let textoAString = "";
      if (textoAdicional.length > 0) {
        for (let i = 0; i < textoAdicional.length; i++) {
          if (textoAdicional[textoAdicional.length - 1] === textoAdicional[i]) {
            textoAString +=
              textoAdicional[i].idlabnomenclador_desc.toUpperCase();
          } else {
            textoAString +=
              textoAdicional[i].idlabnomenclador_desc.toUpperCase() + " | ";
          }
        }
      }
      let dtoGeneraOrden = {
        idgrupoestudios: !cambiosRealizados ? ordenSeleccionada.id : -1,
        descripcion: !cambiosRealizados
          ? ordenSeleccionada.descripcion
          : "Nueva Orden",
        textoAdicional: textoAString,
        diagnostico: ordenSeleccionada.diagnostico,
        fechaOrden: ordenSeleccionada.fechaOrden,
        items: seleccionados,
      };
      seleccionaOrden(dtoGeneraOrden, cambiosRealizados, ordenGeneradaIndex);
    } else {
      showToaster(
        {
          texto: "Elija al menos un estudio",
          tipo: "danger",
        },
        "centroArriba"
      )(toasterDispatch);
    }
  };

  //-- filtros checks
  const handleChangeFiltros = (e) => {
    //freno que no haya agregado en el buscador.
    let auxArray = seleccionados.filter(
      (item) => item.descripcion === e.target.descripcion
    );
    if (auxArray.length > 0) {
      showToaster(
        {
          texto:
            "La determinación seleccionada ya se encuentra en la orden digital",
          tipo: "danger",
        },
        "centroArriba"
      )(toasterDispatch);
    } else {
      let auxFilter = deterOriginal;
      auxFilter = parseCheckBox(auxFilter, e);
      //revisar este codigo
      let auxSeleccionados = seleccionados;
      let auxAFiltrar = auxFilter;
      let test;
      for (let i = 0; i < auxSeleccionados.length; i++) {
        test = auxAFiltrar.filter(
          (element) =>
            element.idlabnomenclador_desc ===
            auxSeleccionados[i].idlabnomenclador_desc
        );
        if (test.length > 0) {
          auxSeleccionados[i] = test[0];
        }
      }
      let auxFiltrados = auxSeleccionados.filter(
        (item) => item.checked === true
      );
      setSeleccionados(auxFiltrados);
      //-hasta aca
      setActiveFilter(auxFilter);
      setFlgFiltrar(true);
    }
  };

  useEffect(() => {
    if (flgFiltrar && activeFilter) {
      //seteo la lista actualizada.
      setDeterOriginal(activeFilter);
      //cant de deters seleccionadas
      let auxFiltrados = activeFilter.filter((item) => item.checked === true);
      for (let i = 0; i < auxFiltrados.length; i++) {
        setSeleccionados((seleccionados) => [
          ...seleccionados,
          auxFiltrados[i],
        ]);
      }

      //bajo los flags
      setFlgFiltrar(false);
      setActiveFilter();
      //abro el filtro gral
      setFlgFiltroFinal(true);
    }
  }, [flgFiltrar, activeFilter]);
  //-- fin filtroscheck

  //-- buscador
  const onChangeBuscador = (item) => {
    //solo para items de la lista - los nuevos se manejan distinto
    if (item !== "" && typeof item === "object") {
      //filtro para no tener duplicados con el array de checks
      let auxArray;
      auxArray = seleccionados.filter(
        (e) => e.idlabnomenclador === item.codigo
      );
      auxArray = auxArray.map((obj) => ({ ...obj, checked: true }));
      if (auxArray.length > 0) {
        showToaster(
          {
            texto:
              "La determinación seleccionada ya se encuentra en la orden digital",
            tipo: "danger",
          },
          "centroArriba"
        )(toasterDispatch);
      } else {
        //pusheo el objeto a la lista si es que no esta duplicadios
        item.checked = true;
        setSeleccionados((seleccionados) => [...seleccionados, item]);
        setNewDeter((newDeter) => [...newDeter, item]);
      }
    }
  };

  const addNewItem = (item) => {
    let aux = {
      id: -1,
      idlabnomenclador_desc: item,
      checked: true,
    };
    setSeleccionados((seleccionados) => [...seleccionados, aux]);
    setNewDeter((newDeter) => [...newDeter, aux]);
  };

  const removeDeterAdc = (item) => {
    let selecAux = seleccionados.filter(
      (e) => e.idlabnomenclador_desc !== item.idlabnomenclador_desc
    );
    let selecNew = newDeter.filter(
      (e) => e.idlabnomenclador_desc !== item.idlabnomenclador_desc
    );
    setSeleccionados(selecAux);
    setNewDeter(selecNew);
  };

  useEffect(() => {
    if (flgFiltroFinal) {
      //-- saco siempre los repetidos
      let hash = {};
      let arrAux;
      arrAux = seleccionados.filter((item) =>
        hash[item.idlabnomenclador_desc]
          ? false
          : (hash[item.idlabnomenclador_desc] = true)
      );
      //saco los checked en falso
      arrAux = arrAux.filter((item) => item.checked === true);
      setSeleccionados(arrAux);
      setFlgFiltroFinal(false);
    }
  }, [seleccionados, flgFiltroFinal]);
  //--fin buscadr

  //-- modificar orden
  useEffect(() => {
    //recibo los items checkeados formateo y guardo en los que utilizo
    if (detersAuxiliares.length > 0) {
      setNewDeter(detersAuxiliares);
    }
    if (itemsEnEdicion.length > 0) {
      setSeleccionados(itemsEnEdicion);
      setOriginal(itemsEnEdicion);
    }
  }, [detersAuxiliares, itemsEnEdicion]);

  const cerrarSliderSelector = () => {
    setOpenCirOrdenLabo(false);
    setOpenSlider(false);
    setEditaOrdenLabo({
      item: null,
      modifica: false,
      index: null,
    });
    // finalizaEdicion();
  };

  const volverP1P2 = () => {
    if (itemsEnEdicion.length > 0) {
      seleccionaOrden(ordenSeleccionada);
    } else {
      setOrdenLabo({
        ...ordenLabo,
        ordenLaboP1: true,
        ordenLaboP2: false,
        ordenLaboP3: false,
      });
    }
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
        textoNegrita={"Usted tiene una edición de orden en curso"}
        texto={"Desea cancelar?"}
      ></Mensaje>,
      "Edición de Orden en curso",
      continuaCreando,
      false,
      [
        {
          text: "Cancelar edición",
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

  return (
    <>
      <CerrarCmp
        className="cerrarIcon ts_crearOrdenLabo_close-btn"
        onClick={() => showCierre()}
      >
        <span className="rb16l c-latex30">Cerrar</span>{" "}
        <div>
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
            Seleccione las determinaciones que desea solicitar o utilice el
            buscador debajo
          </span>
        </ContainerQst>
        <ContainerOrden>
          <ContainerOrdenBox>
            <ContainerOrdenTitle className="bgcG-latex30">
              <span className="rb16b c-white">
                Análisis incluidos en esta orden
              </span>
            </ContainerOrdenTitle>
            <ContainerOrdenBody>
              <ContainerOrdenItems className="ts_crearOrdenLabo_checkItems-item">
                {deterOriginal?.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <ContainerChecks>
                        <ItemCheckBox
                          id={item.id}
                          checked={item.checked}
                          descripcion={item.idlabnomenclador_desc}
                          onChange={handleChangeFiltros}
                        />
                      </ContainerChecks>
                    </React.Fragment>
                  );
                })}
              </ContainerOrdenItems>
            </ContainerOrdenBody>
          </ContainerOrdenBox>
        </ContainerOrden>
        <ContainerAdicionales>
          <ContainerBuscador>
            <BoxBuscador>
              <BoxBuscadorTitle>
                <p className="rb16l c-latex30">Buscar adicionales:</p>
              </BoxBuscadorTitle>
              <BoxBuscadorInput className="ts_crearOrdenLabo_searchDeter-search">
                <BuscadorOrden
                  datos={buscadorItems}
                  campoCodigo="descripcion"
                  descripcion="descripcion"
                  onChange={onChangeBuscador}
                  campoAgenda="medico"
                  campoEspecialidad="especialidad"
                  widthLista={"100%"}
                  autoFocus={true}
                  origen={"CONSULTA_MEDICA"}
                  placeholder={"ej. Colesterol LDL"}
                  desactivarOnBlur={true}
                  checkError={false}
                  /* addNewItem={addNewItem} */
                  disableNewItem={true}
                />
              </BoxBuscadorInput>
            </BoxBuscador>
          </ContainerBuscador>
          <ContainerCantDeter>
            <p className="rb16l c-latex30">
              Cantidad de determinaciones:{" "}
              <span className="rb16b c-latex30">{seleccionados.length}</span>
            </p>
          </ContainerCantDeter>
          <ContainerAdicionalesItems className="ts_crearOrdenLabo_adicionalItem-item">
            {newDeter.length > 0 &&
              newDeter.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <BtnAdicionales
                      className={`rb12b ${
                        item.id === -1 ? `c-primary` : `c-latex30`
                      }`}
                    >
                      <div className="btnAdicional-span">
                        {item.idlabnomenclador_desc.toUpperCase()}{" "}
                      </div>
                      <div
                        className="btnAdcional-padAdjust pointer ts_crearOrdenLabo_selectedItems_close-btn"
                        onClick={() => removeDeterAdc(item)}
                      >
                        <CruzIcon color={"var(--color-latex30)"}></CruzIcon>
                      </div>
                    </BtnAdicionales>
                  </React.Fragment>
                );
              })}
          </ContainerAdicionalesItems>
        </ContainerAdicionales>
        <ContainerButtons>
          <BtnCerrar
            onClick={volverP1P2}
            className="rb16b c-white ts_crearOrdenLabo_back-btn"
          >
            Volver
          </BtnCerrar>
          <BtnGenerarOrden
            onClick={guardarOrden}
            className="rb16m c-white ts_crearOrdenLabo_save-btn"
          >
            Guardar
          </BtnGenerarOrden>
        </ContainerButtons>
      </ContainerBox>
    </>
  );
};

export default CrearOrdenLabo;
