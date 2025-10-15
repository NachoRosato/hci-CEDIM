const FlechaIcon = ({ color }) => {
  return (
    <svg
      className="f-right"
      width="9"
      height="15"
      viewBox="0 0 9 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1L6.73522 6.29405C7.15256 6.67929 7.16565 7.33435 6.76404 7.73596L1 13.5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default FlechaIcon;
