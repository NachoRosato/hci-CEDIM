const CruzEtiqueta = ({ color }) => {
  return (
    <svg
      width="9"
      height="10"
      viewBox="0 0 9 10"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 1.27539L8.06917 8.34456" stroke={color} strokeWidth="2" />
      <path d="M8.22266 1L1.15349 8.06917" stroke={color} strokeWidth="2" />
    </svg>
  );
};

export default CruzEtiqueta;
