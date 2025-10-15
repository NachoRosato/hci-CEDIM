import "./localStyle";
import { useHistory } from "react-router";
import { useContext } from "react";
import { GlobalContext } from "../../../global/context/Provider";
import { pagina404Descripcion, pagina404titulo } from "./Pagina404txt";
import LoginIcon from "../../../global/assets/generico/LoginIcon";
import {
  Pagina404Body,
  Pagina404Btn,
  Pagina404BtnContainer,
  Pagina404Container,
  Pagina404Header,
  Pagina404Txt,
} from "./localStyle";

const PaginaNoEncontrada = () => {
  const { textosState } = useContext(GlobalContext);
  const history = useHistory();
  const ingresarAlPortal = () => {
    history.push("/");
  };
  const volverAlSitioWeb = () => {
    history.push("/demo");
  };

  return (
    <Pagina404Container className="bgcG-latex30">
      <Pagina404Header>
        <img  src={process.env.PUBLIC_URL + "/assets/images/empresa/IsoLogo.png"} alt="logo"></img>
        <span className="rb24t c-white">
          {textosState.textos.data
            ? textosState.textos.data.msjPage404.nombre
            : pagina404titulo}
        </span>
      </Pagina404Header>
      <Pagina404Body>
        <Pagina404Txt>
          {textosState.textos.data ? (
            <span
              className="rb18l c-white"
              dangerouslySetInnerHTML={{
                __html: textosState.textos.data.msjPage404.descripcion,
              }}
            ></span>
          ) : (
            <span className="rb18l c-white">{pagina404Descripcion}</span>
          )}
        </Pagina404Txt>
        <Pagina404BtnContainer>
          <Pagina404Btn className="btn bgc-primary" onClick={ingresarAlPortal}>
            <LoginIcon />
            <span className="rb18m c-white">Volver al Login</span>
          </Pagina404Btn>
        </Pagina404BtnContainer>
      </Pagina404Body>
    </Pagina404Container>
  );
};

export default PaginaNoEncontrada;
