const TurnoRealizadoIcon = ({ color, circulo, tilde, width, height }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="13.5"
        cy="13.5"
        r="12.1829"
        fill={color}
        stroke={circulo}
        strokeWidth="2.63415"
      />
      <path
        d="M7.24219 13.8295L11.1934 18.11L19.7544 9.21973"
        stroke={tilde}
        strokeWidth="2.63415"
      />
    </svg>
  );
};

export default TurnoRealizadoIcon;
