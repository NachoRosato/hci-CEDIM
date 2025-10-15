export default ({width, height, color }) => {
  return (
    <svg
      width={width ? width : "12"}
      height={height ?height :  "7"}
      viewBox="0 0 12 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 6.3999L0 0.399902H1.5H5.5L10.5 0.4L12 0.399902L6 6.3999Z"
        fill={color ? color : "black"}
      />
    </svg>
  );
};
