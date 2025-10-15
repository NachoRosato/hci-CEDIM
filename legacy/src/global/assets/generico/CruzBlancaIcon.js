import "./CruzBlancaIconStyle.css"

const CruzBlancaIcon = ({color}) => {
  return (
    <div className="cruzBlanca">
      <div className={`cruzBlancaParte1 ${color}`}></div>
      <div className={`cruzBlancaParte2 ${color}`}></div>
    </div>
  );
};

export default CruzBlancaIcon;
