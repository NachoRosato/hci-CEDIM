import { useState } from "react";
import CrearOrdenPrac from "../CrearOrdenPrac/CrearOrdenPrac";
import CrearOrdenPracPaso2 from "../CrearOrdenPrac/CrearOrdenPracPaso2";

const SliderOrdenPrac = ({
  setOpenSlider,
  setOpenCirOrdenPrac,
  dissmissOrden,
  showModalOrdenPaso2,
  datosBuscador,
  datosPaso2Prac,
  setDatosPaso2Prac,
  abrirOrdenPractica,
  ordenDigital,
  setOrdenDigital,
  itemEditar,
  edicion,
  finalizaEdicion,
  setOpenSelectorOrden,
  editaOrdPrac,
}) => {
  const [ordenPrac, setOrdenPrac] = useState({
    ordenPracP1: true,
    ordenPracP2: false,
  });
  return (
    <>
      {ordenPrac.ordenPracP1 && (
        <CrearOrdenPrac
          ordenDigital={ordenDigital}
          setOpenSlider={setOpenSlider}
          setOpenCirOrdenPrac={setOpenCirOrdenPrac}
          setOpenSelectorOrden={setOpenSelectorOrden}
          dissmiss={dissmissOrden}
          showModalOrdenPaso2={showModalOrdenPaso2}
          datosBuscador={datosBuscador}
          datosPaso2Prac={datosPaso2Prac}
          setDatosPaso2Prac={setDatosPaso2Prac}
          edicion={edicion}
          itemEditar={itemEditar}
          ordenPrac={ordenPrac}
          setOrdenPrac={setOrdenPrac}
          finalizaEdicion={finalizaEdicion}
          editaOrdPrac={editaOrdPrac} // Pasar la información de edición
        />
      )}
      {ordenPrac.ordenPracP2 && (
        <CrearOrdenPracPaso2
          setOpenSlider={setOpenSlider}
          setOpenCirOrdenPrac={setOpenCirOrdenPrac}
          datosBuscador={[]}
          agregadosEnConsulta={datosPaso2Prac}
          setDatosPaso2Prac={setDatosPaso2Prac}
          abrirOrdenPractica={abrirOrdenPractica}
          ordenDigital={ordenDigital}
          setOrdenDigital={setOrdenDigital}
          ordenPrac={ordenPrac}
          setOrdenPrac={setOrdenPrac}
          finalizaEdicion={finalizaEdicion}
        />
      )}
    </>
  );
};

export default SliderOrdenPrac;
