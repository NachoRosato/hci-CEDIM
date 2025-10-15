import { useContext, useEffect, useState } from "react";
import {
  ContainerBox,
  ContainerButtons,
  BtnCerrar,
  MedicamentosBox,
} from "./localStyle";
import {
  wsGetVademecum,
  wsGetVademecumByIdAlfa,
  wsGetVademecumByIdKairos,
} from "_+_HistoriaClinica/context/action/vademecum/vademecum";
import { HistoriaClinicaContext } from "_+_HistoriaClinica/context/Provider";
import Table from "global/components/genericos/Table/Table";
import { pagination } from "global/components/genericos/Table/funtions/pagination";
import { hideModal, showModal } from "global/context/action/modal/modal";
import { GlobalContext } from "global/context/Provider";
import MedicamentoPaso2 from "../MedicamentoPaso2/MedicamentoPaso2";
import { showToaster } from "global/context/action/toaster/toaster";
import { IonSpinner } from "@ionic/react";

const Medicamento = ({
  dissmiss,
  setIndicacionFarmacologica,
  indicacionFarmacologica,
  setOpenFarmacos,
}) => {
  const { modalDispatch, toasterDispatch } = useContext(GlobalContext);
  const { vademecumState, vademecumDispatch } = useContext(
    HistoriaClinicaContext
  );
  const [listaOriginal, setListaOriginal] = useState(null);
  const [medicamentoSelected, setMedicamentoSelected] = useState(null);
  const [flgPaso2, setFlgPaso2] = useState(false);

  const borrarComa = (string) => {
    if (string !== "" && string !== null) {
      return string.replace(/^,\s*/, "");
    }
  };

  const seleccionarItem = (e) => {
    //agregar que valide por ALFABETA.
    if (indicacionFarmacologica !== undefined) {
      let buscarMedicamento = indicacionFarmacologica.filter(
        (item) => item.idProducto === e.id
      );
      if (buscarMedicamento.length > 0) {
        showToaster(
          {
            texto:
              "El medicamento ya se encuentra indicado en la evolución actual",
            tipo: "danger",
          },
          "centroArriba"
        )(toasterDispatch);
      } else {
        setMedicamentoSelected(e);
        setFlgPaso2(true);
        if (vademecumState.vademecum.tipoVademecum === "kairos") {
          wsGetVademecumByIdKairos(e.id)(vademecumDispatch);
        } else {
          wsGetVademecumByIdAlfa(e.id)(vademecumDispatch);
        }
      }
    } else {
      setMedicamentoSelected(e);
      setFlgPaso2(true);
      if (vademecumState.vademecum.tipoVademecum === "kairos") {
        wsGetVademecumByIdKairos(e.id)(vademecumDispatch);
      } else {
        wsGetVademecumByIdAlfa(e.id)(vademecumDispatch);
      }
    }
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
      name: "descripcion",
      width: 273.33,
      colname: "Nombre",
      funChangeValue: null,
      onClickAccion: null,
    },

    {
      type: "number",
      name: "drogas",
      width: 273.33,
      colname: "Drogas",
      funChangeValue: borrarComa,
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

  const [filtroBuscador, setFiltroBuscador] = useState(null);

  useEffect(() => {
    if (
      vademecumState.vademecum.data !== null &&
      vademecumState.vademecum.data.value !== null
    ) {
      setListaOriginal(vademecumState.vademecum.data.value);
    } else if (
      vademecumState.vademecum.data.value === null &&
      !vademecumState.vademecum.loading
    ) {
      wsGetVademecum()(vademecumDispatch);
    }
  }, []);

  useEffect(() => {
    if (listaOriginal) {
      setFiltroBuscador(pagination(config.data, config.paginationView));
    }
  }, [listaOriginal]);

  useEffect(() => {
    if (vademecumState.selected.data && flgPaso2) {
      hideModal()(modalDispatch);
      showModal(
        <MedicamentoPaso2
          indicacionFarmacologica={indicacionFarmacologica}
          setOpenFarmacos={setOpenFarmacos}
          medicamentoSelected={medicamentoSelected}
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
    }
  }, [vademecumState.selected.data, flgPaso2]);

  return (
    <>
      {listaOriginal !== null ? (
        <ContainerBox>
          <MedicamentosBox>
            <p className="rb16l c-latex30">
              Escriba el nombre del medicamento que está buscando
            </p>
          </MedicamentosBox>
          {filtroBuscador !== null ? (
            <Table config={config} filtroBuscador={filtroBuscador} />
          ) : (
            <IonSpinner name="lines-small" />
          )}
          <ContainerButtons>
            <BtnCerrar onClick={dissmiss} className="rb16b c-white">
              Volver
            </BtnCerrar>
          </ContainerButtons>
        </ContainerBox>
      ) : (
        <IonSpinner name="lines-small" />
      )}
    </>
  );
};

export default Medicamento;
