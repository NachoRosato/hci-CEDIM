const SearchIconAbm = ({color}) => {
  return (
    <svg
      width="18"
      height="21"
      viewBox="0 0 18 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_253_384)">
        <circle
          cx="7.27457"
          cy="7.29934"
          r="4.35159"
          transform="rotate(10.7369 7.27457 7.29934)"
          stroke={color}
          strokeWidth="2"
        />
        <path
          d="M9.46752 11.5387C9.32687 11.3082 9.38965 11.008 9.6109 10.8532C9.83064 10.6994 10.1318 10.7415 10.301 10.9496L14.4716 16.0797C14.8196 16.5078 14.7349 17.1406 14.2866 17.462C13.8341 17.7865 13.2012 17.6579 12.9112 17.1826L9.46752 11.5387Z"
          fill={color}
        />
        <line
          x1="5.41928"
          y1="7.83298"
          x2="6.51443"
          y2="7.11327"
          stroke={color}
          strokeWidth="0.5"
          strokeLinecap="round"
        />
        <line
          x1="5.26598"
          y1="7.24316"
          x2="5.96731"
          y2="6.80195"
          stroke={color}
          strokeWidth="0.5"
          strokeLinecap="round"
        />
        <line
          x1="5.98169"
          y1="8.1602"
          x2="6.63599"
          y2="7.72465"
          stroke={color}
          strokeWidth="0.5"
          strokeLinecap="round"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_253_384"
          x="0.921875"
          y="0.946777"
          width="16.7637"
          height="19.6948"
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
          <feOffset dx="1" dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_253_384"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_253_384"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default SearchIconAbm;
