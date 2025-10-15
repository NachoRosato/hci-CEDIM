export default ({ width, height, color }) => {
  return (
    <svg
      width={width ? width:  "14"}
      height={height ? height: "14"}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_208_6)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.222 2H0.778C0.348 2 0 1.552 0 1C0 0.448 0.348 0 0.778 0H13.222C13.652 0 14 0.448 14 1C14 1.552 13.652 2 13.222 2V2ZM1.556 3.111L5.444 7.778V13.222C5.444 13.652 5.793 14 6.222 14H7.778C8.208 14 8.556 13.652 8.556 13.222V7.778L12.444 3.111H1.556V3.111Z"
          fill={color ?color:"black"}
        />
      </g>
      <defs>
        <clipPath id="clip0_208_6">
          <rect width="14" height="14" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
