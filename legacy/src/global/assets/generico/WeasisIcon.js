const WeasisIcon = ({ color }) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="4 2 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_137_689)">
        <path
          d="M27.3884 46.8955C39.7909 46.8955 49.8451 37.0304 49.8451 24.8611C49.8451 12.6918 39.7909 2.8266 27.3884 2.8266C14.9859 2.8266 4.93164 12.6918 4.93164 24.8611C4.93164 37.0304 14.9859 46.8955 27.3884 46.8955Z"
          fill="black"
        />
        <path
          d="M29.2165 41.8637C28.5084 43.303 26.4193 43.303 25.7112 41.8637L15.9113 21.9451C15.2874 20.6771 16.229 19.2052 17.664 19.2052H37.2637C38.6988 19.2052 39.6403 20.6771 39.0165 21.9451L29.2165 41.8637Z"
          fill="white"
        />
        <path
          d="M37.6992 22.3941L41.6212 15.1564"
          stroke="url(#paint0_linear_137_689)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M17.3645 22.4618L13.4424 15.2242"
          stroke="url(#paint1_linear_137_689)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_137_689"
          x="0.931641"
          y="0.826599"
          width="54.9136"
          height="54.0689"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="1" dy="3" />
          <feGaussianBlur stdDeviation="2.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_137_689"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_137_689"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_137_689"
          x1="40.9821"
          y1="19.4649"
          x2="41.1132"
          y2="19.5359"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_137_689"
          x1="16.7253"
          y1="18.1534"
          x2="16.8564"
          y2="18.0824"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default WeasisIcon;
