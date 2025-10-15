const TimeLine = ({color}) => {
  return (
    <svg
      width="8"
      height="29"
      viewBox="0 0 8 29"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.09961 5.4585L4.09961 24.1841"
        stroke="#006299"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle
        cx="4.09961"
        cy="3.96191"
        r="3.24512"
        fill="#006299"
        stroke="#006299"
      />
      <circle
        cx="4.09961"
        cy="14.1973"
        r="3.24512"
        fill="#006299"
        stroke="#006299"
      />
      <circle
        cx="4.09961"
        cy="24.4326"
        r="3.24512"
        fill="white"
        stroke="#006299"
      />
    </svg>
  );
};

export default TimeLine;
