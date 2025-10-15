import SolicitarEstudios from "../SolicitarEstudios/SolicitarEstudios";
import { Slider } from "./localStyle";
import SliderOrdenPrac from "../SliderOrdenPrac/SliderOrdenPrac";
import SliderOrdenLabo from "../SliderOrdenLabo/SliderOrdenLabo";

const SliderEvoOrden = ({
  detersOrdenPrac,
  openSlider,
  setOpenSlider,
  openSelectorOrden,
  setOpenSelectorOrden,
  openCirOrdenPrac,
  setOpenCirOrdenPrac,
  seleccionaOrdenPractica,
  datosPaso2Prac,
  setDatosPaso2Prac,
  ordenDigital,
  setOrdenDigital,
  itemEditar,
  edicion,
  setEditaOrdPrac,
  seleccionaoOrdenLabo,
  openCircOrdenLabo,
  setOpenCirOrdenLabo,
  abrirOrdenLabo,
  ordenItems,
  crearNuevaOrden,
  mensajeVerMas,
  datosPac,
  editaOrdenLabo,
  setEditaOrdenLabo,
  editaOrdPrac,
  itemsOrdenHc,
  itemsLabNom,
}) => {
  const finalizaEdicion = () => {
    setEditaOrdPrac({
      item: null,
      modifica: null,
      index: null,
    });
    setDatosPaso2Prac({
      agregadosConsulta: [],
      fechaElegida: "",
    });
  };

  return (
    <>
      <Slider open={openSlider}>
        {openSelectorOrden && (
          <SolicitarEstudios
            setOpenSlider={setOpenSlider}
            seleccionaoOrdenLabo={seleccionaoOrdenLabo}
            seleccionaOrdenPractica={seleccionaOrdenPractica}
            finalizaEdicion={finalizaEdicion}
            setEditaOrdenLabo={setEditaOrdenLabo}
          />
        )}
        {openCirOrdenPrac && (
          <SliderOrdenPrac
            setOpenSlider={setOpenSlider}
            setOpenCirOrdenPrac={setOpenCirOrdenPrac}
            setOpenSelectorOrden={setOpenSelectorOrden}
            datosBuscador={detersOrdenPrac}
            datosPaso2Prac={datosPaso2Prac}
            setDatosPaso2Prac={setDatosPaso2Prac}
            ordenDigital={ordenDigital}
            setOrdenDigital={setOrdenDigital}
            itemEditar={itemEditar}
            edicion={edicion}
            finalizaEdicion={finalizaEdicion}
            editaOrdPrac={editaOrdPrac}
          />
        )}
        {openCircOrdenLabo && (
          <SliderOrdenLabo
            setOpenSlider={setOpenSlider}
            setOpenCirOrdenLabo={setOpenCirOrdenLabo}
            setOpenSelectorOrden={setOpenSelectorOrden}
            abrirOrdenLabo={abrirOrdenLabo}
            ordenItems={ordenItems}
            crearNuevaOrden={crearNuevaOrden}
            mensajeVerMas={mensajeVerMas}
            ordenDigital={ordenDigital}
            setOrdenDigital={setOrdenDigital}
            datosPac={datosPac}
            editaOrdenLabo={editaOrdenLabo}
            setEditaOrdenLabo={setEditaOrdenLabo}
            edicion={edicion}
            itemsOrdenHc={itemsOrdenHc}
            itemsLabNom={itemsLabNom}
          />
        )}
      </Slider>
    </>
  );
};

export default SliderEvoOrden;
