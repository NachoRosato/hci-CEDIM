import React, { useContext, useEffect, useState } from "react";
import {
  ContainerBox,
  ContainerButtons,
  BtnCerrar,
  MedicamentosBox,
  BuscadorBox,
} from "./localStyle";
import { pagination } from "global/components/genericos/Table/funtions/pagination";
import { IonSpinner } from "@ionic/react";
import TableSnomed from "global/components/genericos/TableSnomed/TableSnomed";

const CmpSnomed = ({ dissmiss, datos, seleccionarItem }) => {
  // const { modalDispatch, toasterDispatch } = useContext(GlobalContext);
  // const { vademecumState, vademecumDispatch } = useContext(
  //   HistoriaClinicaContext
  // );

  const borrarComa = (string) => {
    if (string !== "" && string !== null) {
      return string.replace(/^,\s*/, "");
    }
  };

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
      name: "diagnostico",
      width: 670,
      colname: "diagnostico",
      funChangeValue: null,
      onClickAccion: null,
    },
    {
      type: "string",
      name: "icon",
      width: 150,
      colname: "Acciones",
      funChangeValue: null,
      onClickAccion: seleccionarItem,
    },
  ];

  const config = {
    data: datos,
    columnComplete: ColumnBaseNewComplete,
    column: ColumnBaseNew,
    paginationView: 200,
    pagination: false,
    border: true,
    borderType: "line",
    width: 820,
    colWidth: true,
  };

  const [filtroBuscador, setFiltroBuscador] = useState(null);

  useEffect(() => {
    if (datos) {
      setFiltroBuscador(pagination(config.data, config.paginationView));
    }
  }, [datos]);

  return (
    <>
      {datos !== null ? (
        <ContainerBox>
          <MedicamentosBox>
            <p className="rb16l c-latex30">
              Escriba el nombre del diagnóstico que está buscando
            </p>
          </MedicamentosBox>
          {filtroBuscador !== null ? (
            <TableSnomed config={config} filtroBuscador={filtroBuscador} />
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

export default CmpSnomed;
