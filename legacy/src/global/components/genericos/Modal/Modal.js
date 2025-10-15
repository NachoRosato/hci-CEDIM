import "./Modal.css";
import React, { useState, useEffect, useContext } from "react";
import { GlobalContextMain } from "../../../../_+_HistoriaClinica/context/Provider";
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
import { hideModal } from "../../../context/action/modal/modal";
import { GlobalContext } from "../../../context/Provider";

const Modal = () => {
  const { modalState, modalDispatch } = useContext(GlobalContext);
  const [animation, setAnimation] = useState("");
  const [flgComponent, setFlgComponet] = useState(false);
  const [listBotones, setListBotones] = useState([]);
  const [posicion, setPosicion] = useState(["centro"]);
  const [bloquearDissmiss, setBloquearDissmiss] = useState(true);

  const dissmiss = () => {
    if (!bloquearDissmiss) {
      setAnimation("");
      hideModal()(modalDispatch);
    }
  };

  const preventDissmiss = (event) => {
    event.stopPropagation();
  };

  useEffect(() => {
    if (flgComponent) {
      setFlgComponet(false);
      setBloquearDissmiss(modalState.modal.data.bloquearDissmiss);
    }
  }, [flgComponent]);

  useEffect(() => {
    if (
      modalState.modal.data.posicion !== undefined &&
      modalState.modal.data.posicion !== null &&
      modalState.modal.data.posicion !== ""
    ) {
      setPosicion(modalState.modal.data.posicion);
      // switch (modalState.modal.data.posicion) {
      //   case "centro":
      //     setAnimation("desplazarCentro");
      //     break;
      //   case "centroAbajo":
      //     setAnimation("desplazarCentroAbajo");
      //     break;
      //   case "centroDerecha":
      //     setAnimation("desplazarCentroDerecha");
      //     break;
      //   default:
      //     setAnimation("desplazarCentro");
      // }
    }
    setFlgComponet(true);
    // setBloquearDissmiss(modalState.modal.data.bloquearDissmiss);
    if (Array.isArray(modalState.modal.data.listBotones)) {
      setListBotones(modalState.modal.data.listBotones);
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
              modalState.modal.data.headerState ? "bgcG-danger" : "bgcG-latex30"
            }`}
          >
            <ModalHeaderTitle className="rb16mb">
              {modalState.modal.data.title === ""
                ? "Error en el sistema"
                : modalState.modal.data.title}
            </ModalHeaderTitle>
            <ModalHeaderCross onClick={modalState.modal.data.dissmiss}>
              <ModalHeaderCrossX></ModalHeaderCrossX>
              <ModalHeaderCrossY></ModalHeaderCrossY>
            </ModalHeaderCross>
          </ModalHeaderConteiner>
          {modalState.modal.data.component !== null &&
            modalState.modal.data.params !== null &&
            modalState.modal.data.component}
          {Array.isArray(listBotones) && listBotones.length > 0 && (
            <ModalFooter>
              {listBotones.map((item, i) => {
                return (
                  <ModalButtons
                    className={item.clase}
                    onClick={item.accion}
                    key={i}
                  >
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
export default Modal;
