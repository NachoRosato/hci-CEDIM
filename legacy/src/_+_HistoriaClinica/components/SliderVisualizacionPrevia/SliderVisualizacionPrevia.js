import React from "react";
import {
  Slider,
  Overlay,
  ContainerBox,
  ContainerTitle,
  TitleText,
  CloseButton,
  CloseButtonText,
  ContainerContent,
  ContainerFooter,
  CloseFooterButton,
  SaveFooterButton,
  LoadingText,
} from "./localStyle";
import FlechaIconColor from "global/assets/generico/FlechaIconColor";

const SliderVisualizacionPrevia = ({
  open,
  datosEvolucion,
  onGuardar,
  onCerrar,
  loading = false,
}) => {
  return (
    <>
      {/* Overlay para cerrar al hacer clic fuera */}
      {open && <Overlay onClick={onCerrar} />}

      <Slider open={open}>
        {open && (
          <ContainerBox onClick={(e) => e.stopPropagation()}>
            {/* Título fijo */}
            <ContainerTitle>
              <TitleText>Visualización Evolución</TitleText>
            </ContainerTitle>

            {/* Botón de cerrar con flecha */}
            <CloseButton
              onClick={(e) => {
                // Animación de rotación 360 grados
                e.target.style.transform = "rotate(360deg) scale(1.2)";
                e.target.style.transition = "transform 0.4s ease-in-out";

                // Cerrar el slider después de la animación
                setTimeout(() => {
                  onCerrar();
                }, 400);
              }}
              onMouseEnter={(e) => {
                if (!e.target.style.transform.includes("360deg")) {
                  e.target.style.backgroundColor = "var(--color-primary)";
                  e.target.style.transform = "translateX(0) scale(1.1)";
                }
              }}
              onMouseLeave={(e) => {
                if (!e.target.style.transform.includes("360deg")) {
                  e.target.style.backgroundColor = "var(--color-latex30)";
                  e.target.style.transform = "translateX(0) scale(1)";
                }
              }}
            >
              <CloseButtonText>
                <FlechaIconColor color="var(--color-white)" />
              </CloseButtonText>
            </CloseButton>

            {/* Contenido scrolleable */}
            <ContainerContent>
              {datosEvolucion ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: datosEvolucion.evolucionHtml,
                  }}
                />
              ) : (
                <LoadingText>Cargando visualización previa...</LoadingText>
              )}
            </ContainerContent>

            {/* Footer fijo con botones */}
            <ContainerFooter>
              <CloseFooterButton onClick={onCerrar} disabled={loading}>
                <span>Cerrar</span>
              </CloseFooterButton>

              <SaveFooterButton onClick={onGuardar} disabled={loading}>
                <span>{loading ? "Guardando..." : "Guardar evolución"}</span>
              </SaveFooterButton>
            </ContainerFooter>
          </ContainerBox>
        )}
      </Slider>
    </>
  );
};

export default SliderVisualizacionPrevia;
