const RadiantIcon = ({ color }) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="23.7441"
        cy="23.7727"
        r="22.4268"
        transform="rotate(-36.1147 23.7441 23.7727)"
        fill="url(#paint0_linear_137_715)"
        stroke="#457A4D"
        strokeWidth="2"
      />
      <g filter="url(#filter0_d_0_1)">
        <path
          d="M12.6323 24.9789H12.3415V32.1855H8.82666V15.5366H14.2079C16.034 15.5366 17.3995 15.933 18.3045 16.7258C19.2095 17.5027 19.6619 18.6206 19.6619 20.0793C19.6619 20.9673 19.3468 21.7839 18.7166 22.5291C18.0863 23.2585 17.3187 23.6787 16.4138 23.7897C17.0602 23.9641 17.5611 24.2574 17.9167 24.6697C18.2722 25.0661 18.6439 25.7162 19.0317 26.62L21.4315 32.1855H17.8197L15.4684 26.8579C15.1291 26.0968 14.7655 25.5973 14.3776 25.3594C14.0059 25.1057 13.4242 24.9789 12.6323 24.9789ZM14.111 18.248H12.3415V22.2675H13.8686C14.515 22.2675 15.0159 22.0614 15.3715 21.6491C15.7431 21.2368 15.929 20.7295 15.929 20.1269C15.929 18.8743 15.323 18.248 14.111 18.248Z"
          fill="#445F3E"
        />
        <path
          d="M39.4901 32.009H35.9995L34.7875 27.9419H29.6728L28.4851 32.009H25.1157L30.2061 15.36H34.3512L39.4901 32.009ZM34.133 25.2067L32.2665 18.3569L30.3758 25.2067H34.133Z"
          fill="#E6F3D9"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_0_1"
          x="4.82666"
          y="13.36"
          width="40.6636"
          height="26.8255"
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
            result="effect1_dropShadow_0_1"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_0_1"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_137_715"
          x1="47.5709"
          y1="23.7727"
          x2="17.1304"
          y2="1.29885"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.509761" stopColor="#3E8F40" />
          <stop offset="0.509861" stopColor="#F3FBEE" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default RadiantIcon;
