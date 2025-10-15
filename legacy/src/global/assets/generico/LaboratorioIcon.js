const LaboratorioIcon = ({ color, className }) => {
  return (
    <svg
      width="17"
      height="26"
      viewBox="0 0 17 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4.5 19L5.87662 20L8 17"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 13L5.87662 14L8 11"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 18H13"
        stroke={color}
        strokeWidth="1.6875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 12H13"
        stroke={color}
        strokeWidth="1.6875"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.7143 6H2.28571C1.57563 6 1 6.57563 1 7.28571V23.7143C1 24.4244 1.57563 25 2.28571 25H14.7143C15.4244 25 16 24.4244 16 23.7143V7.28571C16 6.57563 15.4244 6 14.7143 6Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.6233 3.01477C11.6233 3.09791 11.6199 3.18027 11.6133 3.26172H12.5434C13.3718 3.26172 14.0434 3.93329 14.0434 4.76172V6.10954C14.0434 6.93797 13.3718 7.60954 12.5434 7.60954H4.67383C3.8454 7.60954 3.17383 6.93797 3.17383 6.10954V4.76172C3.17383 3.93329 3.8454 3.26172 4.67383 3.26172H5.60372C5.59712 3.18027 5.59375 3.09791 5.59375 3.01477C5.59375 1.34976 6.94351 0 8.60852 0C10.2735 0 11.6233 1.34976 11.6233 3.01477ZM8.60939 4.30652C9.4419 4.30652 10.1168 3.63164 10.1168 2.79913C10.1168 1.96663 9.4419 1.29175 8.60939 1.29175C7.77689 1.29175 7.10201 1.96663 7.10201 2.79913C7.10201 3.63164 7.77689 4.30652 8.60939 4.30652Z"
        fill={color}
      />
    </svg>
  );
};

export default LaboratorioIcon;
