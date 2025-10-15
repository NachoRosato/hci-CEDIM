const CruzCloseBurguer = ({ size }) => {
  return (
    <svg
      width={size ? size : "20"}
      height={size ? size : "20"}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.300781"
        y="16.9702"
        width="23.9996"
        height="3.42851"
        rx="1.71426"
        transform="rotate(-45 0.300781 16.9702)"
        fill="var(--color-white)"
      />
      <rect
        x="2.72656"
        y="0.245605"
        width="23.9996"
        height="3.42851"
        rx="1.71426"
        transform="rotate(45 2.72656 0.245605)"
        fill="var(--color-white)"
      />
    </svg>
  );
};

export default CruzCloseBurguer;
