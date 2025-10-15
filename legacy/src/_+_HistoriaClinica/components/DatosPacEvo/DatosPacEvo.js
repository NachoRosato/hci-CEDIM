import {
  BoxAfiliado,
  BoxDatosComp,
  BoxFechaNac,
  BoxName,
  BoxObraSoc,
  BoxPlan,
  ContainerName,
} from "./localStyle";
import getEdad from "global/utils/getEdad";

const DatosPacEvo = ({ datosPac }) => {
  //revisar porque tantos render en pac evo
  const fechaNac = () => {
    let fecha = new Date(datosPac.fechaNacimiento).toLocaleDateString();
    let edad = getEdad(datosPac.fechaNacimiento);
    return `${edad + " años " + fecha}`;
  };
  
  return (
    <>
      <ContainerName className="iconAdjust c-white">
        <BoxName className="rb24b ctTextDtoPacEvo">{datosPac?.nombre}</BoxName>
        {/* <div className="icon pointer">
          <InformationName></InformationName>
        </div> */}
        <BoxFechaNac className="c-white rb16l">
          <span className="c-white rb16b ctTextFN">{fechaNac()}</span>
        </BoxFechaNac>
        <BoxFechaNac className="c-white rb16l">
          <div>DNI:</div>
          <span className="c-white rb16b ctTextFN">{datosPac?.documento}</span>
        </BoxFechaNac>
      </ContainerName>
      <BoxDatosComp>
        <BoxObraSoc className="c-white rb16l">
          <div>Obra Social:</div>
          <span className="c-white rb16b ctTextFN">
            {" "}
            {datosPac?.obraSocial}
          </span>
        </BoxObraSoc>
        <BoxPlan className="c-white rb16l">
          <div>Plan:</div>
          <span className="c-white rb16b ctTextFN"> {datosPac?.plan}</span>
        </BoxPlan>
        <BoxAfiliado className="c-white rb16l">
          <div>Afiliado:</div>
          <span className="c-white rb16b ctTextFN">
            {" "}
            {datosPac?.nroAfiliado}
          </span>
        </BoxAfiliado>
      </BoxDatosComp>
    </>
  );
};

export default DatosPacEvo;
