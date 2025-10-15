export default ({color}) => {
  return (
    <svg
      width="27"
      height="28"
      viewBox="0 0 27 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="13.3487" cy="13.9991" r="13.3467" fill={color} />
      <line
        x1="11.1271"
        y1="8.08301"
        x2="16.9849"
        y2="13.9408"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="1"
        y1="-1"
        x2="9.28412"
        y2="-1"
        transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 9.71289 19.915)"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
