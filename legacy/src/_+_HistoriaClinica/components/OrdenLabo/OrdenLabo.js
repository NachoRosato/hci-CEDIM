import CircleMasIcon from "global/assets/generico/CircleMasIcon";
import React from "react";
import CardOrdenLabo from "../CardOrdenLabo/CardOrdenLabo";
import {
  ContainerBox,
  ContainerButtons,
  BtnCerrar,
  ContainerTitle,
  ContainerOrden,
  ContainerNuevaOrden,
  CerrarCmp,
  ContainerQst,
} from "./localStyle";
import FlechaIzquierdaIcon from "global/assets/generico/FlechaIzquierdaIcon";
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination, Navigation } from "swiper/modules";

const OrdenLabo = ({
  crearNuevaOrden,
  ordenItems,
  seleccionaOrden,
  mensajeVerMas,
  setOpenCirOrdenLabo,
  setOpenSlider,
  setOpenSelectorOrden,
}) => {
  const cerrarSliderSelector = () => {
    setOpenCirOrdenLabo(false);
    setOpenSlider(false);
  };
  const volverSelector = () => {
    setOpenCirOrdenLabo(false);
    setOpenSelectorOrden(true);
  };

  return (
    <>
      <CerrarCmp
        className="cerrarIcon ts_ordenLabo_close-btn"
        onClick={() => cerrarSliderSelector()}
      >
        <span className="rb16l c-latex30">Cerrar</span>
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
            Seleccione una de sus ordenes guardadas o cree una nueva
          </span>
        </ContainerQst>
        <ContainerOrden className="ts_ordenLabo_preCards-item">
          <>
            <Swiper
              slidesPerView={3}
              spaceBetween={0}
              loop={true}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {ordenItems.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <SwiperSlide key={index}>
                      <CardOrdenLabo
                        itemName={item.descripcion}
                        arrayDeter={ordenItems[index]}
                        seleccionaOrden={seleccionaOrden}
                        mensajeVerMas={mensajeVerMas}
                      />
                    </SwiperSlide>
                  </React.Fragment>
                );
              })}
            </Swiper>
          </>
        </ContainerOrden>
        <ContainerNuevaOrden
          className="pointer ts_ordenLabo_newOrden-btn"
          onClick={() => crearNuevaOrden([], false)}
        >
          <div className="pointer" style={{ paddingTop: 8 }}>
            <CircleMasIcon></CircleMasIcon>
          </div>
          <span className="rb16b c-latex30 pointer">Crear nueva orden</span>
        </ContainerNuevaOrden>
        <ContainerButtons>
          <BtnCerrar
            onClick={volverSelector}
            className="rb16b c-white ts_ordenLabo_back-btn"
          >
            Volver
          </BtnCerrar>
        </ContainerButtons>
      </ContainerBox>
    </>
  );
};

export default OrdenLabo;
