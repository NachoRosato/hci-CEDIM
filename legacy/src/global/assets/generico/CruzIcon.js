const CruzIcon = ({ color, size }) => {
  return (
    <svg
      width={size ? size : "14"}
      height={size ? size : "12"}
      viewBox="0 0 11 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        y="9.69287"
        width="12.9981"
        height="1.85687"
        rx="0.928436"
        transform="rotate(-45 0 9.69287)"
        fill={color}
      />
      <rect
        x="1.3125"
        y="0.635254"
        width="12.9981"
        height="1.85687"
        rx="0.928436"
        transform="rotate(45 1.3125 0.635254)"
        fill={color}
      />
    </svg>
  );
};
export default CruzIcon;
