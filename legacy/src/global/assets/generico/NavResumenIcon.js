const NavResumenIcon = ({ size, color }) => {
  return (
    <svg
      width={size ? size : "20"}
      height={size ? size : "20"}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 10H45C47.7614 10 50 12.2386 50 15V45C50 47.7614 47.7614 50 45 50H15C12.2386 50 10 47.7614 10 45V15C10 12.2386 12.2386 10 15 10Z"
        stroke={color ? color : "black"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 20H40M20 30H40M20 40H35"
        stroke={color ? color : "black"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="45" cy="40" r="3" fill={color ? color : "black"} />
      <path
        d="M42 40L44 42L48 38"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default NavResumenIcon;
