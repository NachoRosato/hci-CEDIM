import { useEffect, useState } from "react";
import OrdenLabo from "../OrdenLabo/OrdenLabo";
import ModificaOrdenLabo from "../ModificaOrdenLabo/ModificaOrdenLabo";
import CrearOrdenLabo from "../CrearOrdenLabo/CrearOrdenLabo";

const SliderOrdenLabo = ({
  ordenItems,
  editaOrdenLabo,
  crearNuevaOrden,
  mensajeVerMas,
  setOpenCirOrdenLabo,
  setOpenSlider,
  setOrdenDigital,
  ordenDigital,
  datosPac,
  setNuevaOrdenGenerada,
  setOpenSelectorOrden,
  setEditaOrdenLabo,
  itemsOrdenHc,
  itemsLabNom,
}) => {
  const [ordenLabo, setOrdenLabo] = useState({
    ordenLaboP1: true,
    ordenLaboP2: false,
    ordenLaboP3: false,
  });

  const [modif, setModif] = useState({
    item: null,
    modifica: null,
    index: null,
  });

  const [auxOrdenDeters, setAuxOrdenDeters] = useState([]);
  const [auxBuscadorItems, setAuxBuscadorItems] = useState([]);
  const [sobrante, setSobrante] = useState([]);
  const [itemsEnEdicion, setItemsEnEdicion] = useState([]);
  const [ordenSeleccionada, setOrdenSeleccionada] = useState([]);
  const [ordenGeneradaIndex, setOrdenGeneradaIndex] = useState();

  const selecOrdenLabo = (item, modifica, index) => {
    if (item !== undefined) {
      setModif({
        ...modif,
        item: item,
        modifica: modifica !== undefined && modifica !== null ? modifica : null,
        index: index !== undefined && index !== null ? index : null,
      });
    }
    setOrdenLabo({
      ...ordenLabo,
      ordenLaboP1: false,
      ordenLaboP2: false,
      ordenLaboP3: true,
    });
  };

  const crearOrdenLabo = (item, procesoModifica, ordenGeneradaIndex) => {
    let auxOrdenDeters = itemsOrdenHc.value;
    let auxBuscadorItems = itemsLabNom.value;
    auxOrdenDeters = auxOrdenDeters.map((obj) => ({ ...obj, checked: false }));
    //tuve que agregar idlabnomenclador para filtrar bien del otro lado
    auxBuscadorItems = auxBuscadorItems.map((obj) => ({
      ...obj,
      checked: false,
      idlabnomenclador_desc: obj.descripcion,
      idlabnomenclador: obj.codigo,
    }));
    setAuxOrdenDeters(auxOrdenDeters);
    setAuxBuscadorItems(auxBuscadorItems);
    //circuito de modificacion de orden
    let sobrante = [];
    if (procesoModifica) {
      //determino las coincidencias y modifico sobre el mismo
      auxOrdenDeters = auxOrdenDeters.map((obj) => {
        for (let i = 0; i < item.items.length; i++) {
          if (
            obj.idlabnomenclador_desc === item.items[i].idlabnomenclador_desc
          ) {
            obj.checked = true;
          }
        }
        return obj;
      });
      // determino si hubo sobrante

      item.items.filter((obj) => {
        if (
          auxOrdenDeters.find(
            (element) =>
              element.idlabnomenclador_desc === obj.idlabnomenclador_desc
          ) === undefined
        ) {
          sobrante.push(obj);
        }
      });
      setAuxOrdenDeters(auxOrdenDeters);

      setOrdenSeleccionada(item);
      setItemsEnEdicion(item.items);
    }
    //-- fin circuito modificacion
    setSobrante(sobrante);
    setOrdenGeneradaIndex(ordenGeneradaIndex);
    setOrdenLabo({
      ...ordenLabo,
      ordenLaboP1: false,
      ordenLaboP2: true,
      ordenLaboP3: false,
    });
  };

  useEffect(() => {
    if (editaOrdenLabo.item !== null) {
      selecOrdenLabo(
        editaOrdenLabo.item,
        editaOrdenLabo.modifica,
        editaOrdenLabo.index
      );
      setEditaOrdenLabo({
        item: null,
        modifica: false,
        index: null,
      });
    }
  }, [editaOrdenLabo]);

  return (
    <>
      {ordenLabo.ordenLaboP1 && (
        <OrdenLabo
          setOpenSlider={setOpenSlider}
          setOpenCirOrdenLabo={setOpenCirOrdenLabo}
          ordenItems={ordenItems}
          seleccionaOrden={selecOrdenLabo}
          crearNuevaOrden={() => crearOrdenLabo()}
          mensajeVerMas={mensajeVerMas}
          setOpenSelectorOrden={setOpenSelectorOrden}
        />
      )}
      {ordenLabo.ordenLaboP2 && (
        <CrearOrdenLabo
          deters={auxOrdenDeters}
          buscadorItems={auxBuscadorItems}
          setNuevaOrdenGenerada={setNuevaOrdenGenerada}
          detersAuxiliares={sobrante}
          itemsEnEdicion={itemsEnEdicion}
          ordenSeleccionada={ordenSeleccionada}
          ordenGeneradaIndex={ordenGeneradaIndex}
          seleccionaOrden={selecOrdenLabo}
          setOpenSlider={setOpenSlider}
          setOpenCirOrdenLabo={setOpenCirOrdenLabo}
          setOrdenLabo={setOrdenLabo}
          ordenLabo={ordenLabo}
          setEditaOrdenLabo={setEditaOrdenLabo}
        />
      )}
      {ordenLabo.ordenLaboP3 && (
        <ModificaOrdenLabo
          setOpenSlider={setOpenSlider}
          setOpenCirOrdenLabo={setOpenCirOrdenLabo}
          setOrdenLabo={setOrdenLabo}
          ordenLabo={ordenLabo}
          itemSeleccionado={modif.item}
          datosPac={datosPac}
          crearOrdenLabo={crearOrdenLabo}
          setOrdenDigital={setOrdenDigital}
          ordenDigital={ordenDigital}
          ordenGeneradaIndex={modif.index}
          modifica={modif.modifica}
          setOrdenSeleccionada={setOrdenSeleccionada}
          setItemsEnEdicion={setItemsEnEdicion}
          setOrdenGeneradaIndex={setOrdenGeneradaIndex}
          setEditaOrdenLabo={setEditaOrdenLabo}
        />
      )}
    </>
  );
};

export default SliderOrdenLabo;
