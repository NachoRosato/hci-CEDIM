const Hamburguer = ({ color }) => {
  return (
    <svg
      width="20"
      height="16"
      viewBox="0 0 24 20"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="23.9996" height="3.42851" rx="1.71426" fill={color} />
      <rect
        y="8.22827"
        width="23.9996"
        height="3.42851"
        rx="1.71426"
        fill={color}
      />
      <rect
        y="16.457"
        width="23.9996"
        height="3.42851"
        rx="1.71426"
        fill={color}
      />
    </svg>
  );
};

export default Hamburguer;
