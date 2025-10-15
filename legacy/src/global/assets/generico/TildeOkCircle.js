import TildeIcon from "./TildeIcon";
import TildeOk from "./TildeOk";
import "./TildeOkCircle.css";

const TildeOkCircle = ({ texto, colorTexto, colorTilde }) => {
  return (
    <div className="ptur-tildeOk-box">
      <div className="ptur-tildeOk-circulito">
          <TildeIcon color={colorTilde} />
      </div>
      <h2
        className={`ptur-tildeOk-texto rb18m ${colorTexto} noSeleccionable`}     
      >
        {texto}
      </h2>
    </div>
  );
};

export default TildeOkCircle;
