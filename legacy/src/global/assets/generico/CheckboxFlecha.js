const CheckboxFlecha = ({color}) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="18" height="18" rx="4" fill="#006299" />
      <path
        d="M3.75195 8.99902L7.12695 12.374L14.252 5.24902"
        stroke={color}
        strokeWidth="2.08333"
      />
    </svg>
  );
};

export default CheckboxFlecha;
