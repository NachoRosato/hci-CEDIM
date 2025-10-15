import OhifIcon from "global/assets/generico/OhifIcon";
import OrthancIcon from "global/assets/generico/OrthancIcon";
import RadiantIcon from "global/assets/generico/RadiantIcon";
import WeasisIcon from "global/assets/generico/WeasisIcon";
import LogoIntellispace from "global/assets/generico/IntellispaceDsb.png";
import {
  ContainerBox,
  ContainerImagenes,
  ContainerButtons,
  BtnCerrar,
  BtnContainer,
  LineSeparadora
} from "./localStyle";

const ModalImagenes = ({ abrirVisorImagen, dissmiss }) => {
  return (
    <>
      <ContainerBox>
        <ContainerImagenes>
          <BtnContainer
            className="imagenesBtn"
            onClick={() => abrirVisorImagen("Stone")}
          >
            <OrthancIcon />
            <p className="rb18l c-latex30">O. Stone</p>
          </BtnContainer>

          <BtnContainer
            className="imagenesBtn"
            onClick={() => abrirVisorImagen("ohif")}
          >
            <OhifIcon />
            <p className="rb18l c-latex30">OHIF</p>
          </BtnContainer>


          <BtnContainer
            className="imagenesBtn"
            onClick={() => abrirVisorImagen("radiant")}
          >
            <RadiantIcon />
            <p className="rb18l c-latex30">Radiant</p>
          </BtnContainer>


          <BtnContainer
            className="imagenesBtn intellispace"
            // onClick={() => abrirVisorImagen("intellispace")}
          >
            {/* <IntellispaceIcon /> */}
            <img src={LogoIntellispace} alt="intellispace" width={48}></img>
            <p className="rb18l c-grey65">Intellispace</p>
          </BtnContainer>


          <BtnContainer
            className="imagenesBtn"
            onClick={() => abrirVisorImagen("weasis")}
          >
            <WeasisIcon />
            <p className="rb18l c-latex30">Weasis</p>
          </BtnContainer>

        </ContainerImagenes>
        <ContainerButtons>
          <BtnCerrar onClick={dissmiss} className="rb18m c-white">
            Cerrar
          </BtnCerrar>
        </ContainerButtons>
      </ContainerBox>
    </>
  );
};

export default ModalImagenes;
