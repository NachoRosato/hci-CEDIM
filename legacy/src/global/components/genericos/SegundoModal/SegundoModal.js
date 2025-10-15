import "./SegundoModal.css";
import React, { useState, useEffect, useContext } from "react";
import {
  ModalBackground,
  ModalButtons,
  ModalConteiner,
  ModalFooter,
  ModalHeader,
  ModalHeaderConteiner,
  ModalHeaderCross,
  ModalHeaderCrossX,
  ModalHeaderCrossY,
  ModalHeaderTitle,
} from "./localStyle";

import { hideSegundoModal } from "global/context/action/segundoModal/segundoModal";
import { GlobalContext } from "global/context/Provider";

const SegundoModal = () => {
  const { segundoModalState , segundoModalDispatch } = useContext(GlobalContext);
  const [animation, setAnimation] = useState("");
  const [flgComponent, setFlgComponet] = useState(false);
  const [listBotones, setListBotones] = useState([]);
  const [posicion, setPosicion] = useState(["centro"]);
  const [bloquearDissmiss, setBloquearDissmiss] = useState(true);

  const dissmiss = () => {
    if (!bloquearDissmiss) {
      setAnimation("");
      hideSegundoModal()(segundoModalDispatch);
    }
  };

  const preventDissmiss = (event) => {
    event.stopPropagation();
  };

  useEffect(() => {
    if (flgComponent) {
      setFlgComponet(false);
      setBloquearDissmiss(segundoModalState.segundoModal.data.bloquearDissmiss);
    }
  }, [flgComponent]);

  useEffect(() => {
    if (
      segundoModalState.segundoModal.data.posicion !== undefined &&
      segundoModalState.segundoModal.data.posicion !== null &&
      segundoModalState.segundoModal.data.posicion !== ""
    ) {
      setPosicion(segundoModalState.segundoModal.data.posicion);
    }
    setFlgComponet(true);
    if (Array.isArray(segundoModalState.segundoModal.data.listBotones)) {
      setListBotones(segundoModalState.segundoModal.data.listBotones);
    } else {
      setListBotones([]);
    }
  }, []);

  return (
    <React.Fragment>
      <ModalBackground onClick={dissmiss}>
        <ModalConteiner onClick={preventDissmiss}>
          <ModalHeaderConteiner
            className={`${
              segundoModalState.segundoModal.data.headerState ? "bgcG-danger" : "bgcG-latex30"
            }`}
          >
            <ModalHeaderTitle>
              {segundoModalState.segundoModal.data.title === ""
                ? "Error en el sistema"
                : segundoModalState.segundoModal.data.title}
            </ModalHeaderTitle>
            <ModalHeaderCross onClick={segundoModalState.segundoModal.data.dissmiss}>
              <ModalHeaderCrossX></ModalHeaderCrossX>
              <ModalHeaderCrossY></ModalHeaderCrossY>
            </ModalHeaderCross>
          </ModalHeaderConteiner>
          {segundoModalState.segundoModal.data.component !== null &&
            segundoModalState.segundoModal.data.params !== null &&
            segundoModalState.segundoModal.data.component}
          {Array.isArray(listBotones) && listBotones.length > 0 && (
            <ModalFooter>
              {listBotones.map((item, i) => {
                return (
                  <ModalButtons className={item.clase} onClick={item.accion} key={i}>
                    {item.text}
                  </ModalButtons>
                );
              })}
            </ModalFooter>
          )}
        </ModalConteiner>
      </ModalBackground>
    </React.Fragment>
  );
};
export default SegundoModal;