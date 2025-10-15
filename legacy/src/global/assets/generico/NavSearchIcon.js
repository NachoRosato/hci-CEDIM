const NavSearchIcon = ({ size, color }) => {
  return (
    <svg
      width={size ? size : "20"}
      height={size ? size : "20"}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M39.4887 39.5278L52.5 52.5M45 26.25C45 36.6052 36.6052 45 26.25 45C15.8947 45 7.5 36.6052 7.5 26.25C7.5 15.8947 15.8947 7.5 26.25 7.5C36.6052 7.5 45 15.8947 45 26.25Z"
        stroke={color ? color : "black"}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default NavSearchIcon;
