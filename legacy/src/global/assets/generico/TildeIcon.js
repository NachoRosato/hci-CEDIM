const TildeIcon = ({color}) => {
  return (
    <svg
      width="14"
      height="18"
      viewBox="0 0 14 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 8.5L5 11L12.5 2"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default TildeIcon;
