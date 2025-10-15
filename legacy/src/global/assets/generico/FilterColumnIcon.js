const FilterColumnIcon = () => {
  return (
    <svg
      width="20"
      height="22"
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_253_395)">
        <rect
          x="6.38086"
          y="1.60889"
          width="5.06142"
          height="16.4543"
          rx="1"
          fill="white"
        />
        <rect
          x="11.7383"
          y="1.60889"
          width="5.06142"
          height="16.4543"
          rx="1"
          fill="white"
        />
        <rect
          x="1.02148"
          y="1.60889"
          width="5.06142"
          height="16.4543"
          rx="1"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_253_395"
          x="0.0214844"
          y="0.608887"
          width="19.7773"
          height="20.4546"
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
            result="effect1_dropShadow_253_395"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_253_395"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default FilterColumnIcon;
