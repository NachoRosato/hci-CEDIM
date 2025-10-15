const TildeOkAbonado = ({color}) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="10" fill={color ? (color):("#00B67A")} />
      <path
        d="M8.64403 14.375L4.60156 10.4301L6.49981 8.5L8.64403 10.5147L14.0676 5L15.9658 6.93015L8.64403 14.375Z"
        fill="white"
      />
    </svg>
  );
};

export default TildeOkAbonado;
