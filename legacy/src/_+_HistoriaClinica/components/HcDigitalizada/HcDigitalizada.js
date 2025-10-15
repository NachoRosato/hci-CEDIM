import {
  wsGetHcDigitalizada,
  wsGetPfdHcDigitalizada,
} from "_+_HistoriaClinica/context/action/hcDigitalizada/hcDigitalizada";
import React, { useContext, useEffect, useState } from "react";
import { IonSpinner } from "@ionic/react";
import { Container, List, ListItem, ListWrapper, Title } from "./localStyle";
import { HistoriaClinicaContext } from "_+_HistoriaClinica/context/Provider";

// Componente principal
const HcDigitalizada = ({ idPaciente, verHcDigitPdf }) => {
  const { hcDigitalizadaDispatch, hcDigitalizadaState } = useContext(
    HistoriaClinicaContext
  );

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [items, setItems] = useState(null);

  function base64ToBlob(base64, type = "application/octet-stream") {
    const binStr = atob(base64);
    const len = binStr.length;
    const arr = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      arr[i] = binStr.charCodeAt(i);
    }
    return new Blob([arr], { type: type, title: "Informe" });
  }

  const nextStepDigit = (isCorrect, data) => {
    if (isCorrect && data.items !== null) {
      const blob = base64ToBlob(data.items, "application/pdf");
      verHcDigitPdf(URL.createObjectURL(blob));
    } else {
      console.error(
        "Error al obtener los datos de la historia clínica digitalizada"
      );
    }
  };

  const handleSelect = (index) => {
    setSelectedIndex(index);
    //disparo la segunda funcion y muestro el pdf en un modal
    wsGetPfdHcDigitalizada(
      idPaciente,
      items[index].cadena,
      nextStepDigit
    )(hcDigitalizadaDispatch);
  };

  const nextStep = (isCorrect, data) => {
    if (isCorrect) {
      if (data.items !== null) {
        setItems(data.items);
      }
    } else {
      console.error(
        "Error al obtener los datos de la historia clínica digitalizada"
      );
      setItems([]);
    }
  };

  useEffect(() => {
    wsGetHcDigitalizada(idPaciente, nextStep)(hcDigitalizadaDispatch);
  }, []);

  return (
    <>
      <Container>
        <Title>Historia Clínica Digitalizada</Title>
        <ListWrapper>
          {items !== null && (
            <List>
              {items.map((item, index) => (
                <ListItem
                  key={index}
                  selected={
                    selectedIndex !== null
                      ? selectedIndex === index
                      : selectedIndex
                  }
                  onClick={() => handleSelect(index)}
                  title={item.cadena}
                >
                  {item.cadena}
                </ListItem>
              ))}
            </List>
          )}
          {items === null && !hcDigitalizadaState.hcDigit.loading && (
            <div>
              <p className="c-latex30 rb16l">"No hay datos disponibles" </p>
            </div>
          )}
          {hcDigitalizadaState.hcDigit.loading && (
            <IonSpinner name="lines-small" />
          )}
        </ListWrapper>
      </Container>
    </>
  );
};

export default HcDigitalizada;
