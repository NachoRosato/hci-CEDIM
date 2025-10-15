const TurnoNoAsistidoIcon = ( {color} ) => {
  return (
    <svg
      width="27"
      height="27"
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="13.5"
        cy="13.5"
        r="12.1829"
        fill="#ECECEC"
        stroke="#CBCBCB"
        strokeWidth="2.63415"
      />
      <path
        d="M7.24219 13.8295L11.1934 18.11L19.7544 9.21973"
        stroke="#CBCBCB"
        strokeWidth="2.63415"
      />
      <circle
        cx="13.5"
        cy="13.5"
        r="12.1829"
        fill={color}
        stroke="#940C03"
        strokeWidth="2.63415"
      />
      <path
        d="M8.94922 8.94922L18.8487 18.8487"
        stroke="white"
        strokeWidth="2"
      />
      <path
        d="M8.94922 18.8496L18.8487 8.95011"
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  );
};

export default TurnoNoAsistidoIcon;
