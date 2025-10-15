const EnviarMailIcon = ({color, width, height}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 42 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M35.9009 3.81538L6.47947 3.73333L21.1902 15.5897L35.9009 3.81538ZM17.7146 18.8923L4.86291 8.6359V28.1231H36.6485V9.04615L24.7264 18.9333C20.685 22.2769 21.8974 22.2154 17.7146 18.8923ZM5.02456 0H36.7293C39.2956 0 41.377 2.13333 41.377 4.71795V27.282C41.377 29.8872 39.2754 32 36.7293 32H5.02456C2.45827 32 0.376953 29.8667 0.376953 27.282V4.71795C0.376953 2.11282 2.47848 0 5.02456 0Z"
        fill={color}
      />
    </svg>
  );
};

export default EnviarMailIcon;
