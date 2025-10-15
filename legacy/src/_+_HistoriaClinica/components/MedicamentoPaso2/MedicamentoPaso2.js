import { useContext, useEffect, useState } from "react";
import {
  ContainerBox,
  ContainerButtons,
  BtnCerrar,
  MedicamentosBox,
} from "./localStyle";
import { HistoriaClinicaContext } from "_+_HistoriaClinica/context/Provider";
import Table from "global/components/genericos/Table/Table";
import { hideModal, showModal } from "global/context/action/modal/modal";
import { GlobalContext } from "global/context/Provider";
import Medicamento from "../Medicamento/Medicamento";
import { resetMedicamentoSelected } from "_+_HistoriaClinica/context/action/vademecum/vademecum";
import MedicamentoPaso3 from "../MedicamentoPaso3/MedicamentoPaso3";

const MedicamentoPaso2 = ({
  dissmiss,
  medicamentoSelected,
  setMedicamentoSelected,
  setIndicacionFarmacologica,
  setOpenFarmacos,
  indicacionFarmacologica,
}) => {
  const { vademecumState, vademecumDispatch } = useContext(
    HistoriaClinicaContext
  );
  const { modalDispatch } = useContext(GlobalContext);
  const [listaOriginal, setListaOriginal] = useState(null);

  const seleccionarItem = (e) => {
    hideModal()(modalDispatch);
    //agrego el tipo de vademecum
    let auxSelected = e;
    e.tipoVademecum = medicamentoSelected.tipoVademecum;
    showModal(
      <MedicamentoPaso3
        indicacionFarmacologica={indicacionFarmacologica}
        setOpenFarmacos={setOpenFarmacos}
        medicamentoSelected={auxSelected}
        setMedicamentoSelected={setMedicamentoSelected}
        setIndicacionFarmacologica={setIndicacionFarmacologica}
        dissmiss={dissmiss}
      />,
      "Indicaciones Farmacologicas",
      dissmiss,
      false,
      {},
      "centro",
      true
    )(modalDispatch);
  };

  const ColumnBaseNewComplete = [
    {
      type: "select-boolean",
      name: "",
      width: 0,
    },

    {
      type: "string",
      name: "descripcion",
      width: 0,
    },
    {
      type: "number",
      name: "id",
      width: 0,
    },
    {
      type: "string",
      name: "domicilio",
      width: 0,
    },
    {
      type: "date",
      name: "fecha",
      width: 300,
    },
  ];

  const ColumnBaseNew = [
    {
      type: "string",
      name: "nombre",
      width: 273.33,
      colname: "Nombre",
      funChangeValue: null,
      onClickAccion: null,
    },

    {
      type: "number",
      name: "descripcion",
      width: 273.33,
      colname: "Tipología",
      funChangeValue: null,
      onClickAccion: null,
    },
    {
      type: "string",
      name: "icon",
      width: 273.33,
      colname: "Acciones",
      funChangeValue: null,
      onClickAccion: seleccionarItem,
    },
  ];

  const config = {
    data: listaOriginal,
    columnComplete: ColumnBaseNewComplete,
    column: ColumnBaseNew,
    paginationView: 8,
    pagination: true,
    border: true,
    borderType: "line",
    width: 820,
    colWidth: true,
    onClickRow: seleccionarItem,
  };

  useEffect(() => {
    if (vademecumState.selected.data) {
      let listaModificada = vademecumState.selected.data.value.map((item) => ({
        ...item,
        nombre: medicamentoSelected.descripcion,
      }));
      setListaOriginal(listaModificada);
    }
  }, [vademecumState.selected.data]);

  const volverAlPaso1 = () => {
    setMedicamentoSelected(null);
    resetMedicamentoSelected()(vademecumDispatch);
    hideModal()(modalDispatch);
    showModal(
      <Medicamento
        dissmiss={dissmiss}
        indicacionFarmacologica={indicacionFarmacologica}
        setIndicacionFarmacologica={setIndicacionFarmacologica}
      />,
      "Indicaciones Farmacologicas",
      dissmiss,
      false,
      {},
      "centro",
      true
    )(modalDispatch);
  };

  return (
    <>
      {listaOriginal && (
        <ContainerBox>
          <MedicamentosBox>
            <p className="rb16l c-latex30">Medicamento seleccionado:</p>
            <p className="rb24b c-latex10">{medicamentoSelected.descripcion}</p>
            <p className="rb16l c-latex30">
              Seleccione una de las posibles presentaciones
            </p>
          </MedicamentosBox>
          <Table config={config} />
          <ContainerButtons>
            <BtnCerrar onClick={volverAlPaso1} className="rb16b c-white">
              Volver
            </BtnCerrar>
          </ContainerButtons>
        </ContainerBox>
      )}
    </>
  );
};

export default MedicamentoPaso2;
