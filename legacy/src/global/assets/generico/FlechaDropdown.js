const FlechaDropdown = ({color, height, width}) => {
  return (
    <svg
      width={height ? height : "12"}
      height={width ? width : "7"}
      viewBox="0 0 12 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.4374 0L1.7572 0C1.06632 0 0.693353 0.810128 1.14258 1.33502L5.59998 6.54313C5.92855 6.92704 6.52474 6.91911 6.84299 6.52661L11.0658 1.31849C11.4946 0.789667 11.1182 0 10.4374 0Z"
        fill={color}
      />
    </svg>
  );
};

export default FlechaDropdown;
