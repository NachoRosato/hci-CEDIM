const NavExitIcon = ({ size, className }) => {
  return (
    <svg
      width={size ? size : "20"}
      height={size ? size : "20"}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M30 50C18.9543 50 10 41.0458 10 30C10 18.9543 18.9543 10 30 10"
        stroke={"white"}
        strokeWidth="3.75"
        strokeLinecap="round"
      />
      <path
        d="M25 30H50M50 30L42.5 22.5M50 30L42.5 37.5"
        stroke={"white"}
        strokeWidth="3.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default NavExitIcon;
