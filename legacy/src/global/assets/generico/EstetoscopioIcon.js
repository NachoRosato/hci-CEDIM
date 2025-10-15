const EstetoscopioIcon = ({ color, background }) => {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.0292969"
        y="0.4021"
        width="24"
        height="24"
        rx="4"
        fill={background ? background : "black"}
      />
      <path
        d="M6.0293 4.4021H5.0293C4.49886 4.4021 3.99016 4.61281 3.61508 4.98789C3.24001 5.36296 3.0293 5.87167 3.0293 6.4021V9.9021C3.0293 11.3608 3.60876 12.7597 4.64021 13.7912C5.67166 14.8226 7.07061 15.4021 8.5293 15.4021C9.98799 15.4021 11.3869 14.8226 12.4184 13.7912C13.4498 12.7597 14.0293 11.3608 14.0293 9.9021V6.4021C14.0293 5.87167 13.8186 5.36296 13.4435 4.98789C13.0684 4.61281 12.5597 4.4021 12.0293 4.4021H11.0293"
        stroke={color ? color : "white"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.0293 15.4021C8.0293 16.19 8.18449 16.9702 8.48602 17.6982C8.78755 18.4262 9.2295 19.0876 9.78666 19.6447C10.3438 20.2019 11.0052 20.6438 11.7332 20.9454C12.4611 21.2469 13.2414 21.4021 14.0293 21.4021C14.8172 21.4021 15.5974 21.2469 16.3254 20.9454C17.0534 20.6438 17.7148 20.2019 18.2719 19.6447C18.8291 19.0876 19.271 18.4262 19.5726 17.6982C19.8741 16.9702 20.0293 16.19 20.0293 15.4021V12.4021"
        stroke={color ? color : "white"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.0293 3.4021V5.4021"
        stroke={color ? color : "white"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.0293 3.4021V5.4021"
        stroke={color ? color : "white"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.0293 10.4021C18.0293 10.9325 18.24 11.4412 18.6151 11.8163C18.9902 12.1914 19.4989 12.4021 20.0293 12.4021C20.5597 12.4021 21.0684 12.1914 21.4435 11.8163C21.8186 11.4412 22.0293 10.9325 22.0293 10.4021C22.0293 9.87167 21.8186 9.36296 21.4435 8.98789C21.0684 8.61281 20.5597 8.4021 20.0293 8.4021C19.4989 8.4021 18.9902 8.61281 18.6151 8.98789C18.24 9.36296 18.0293 9.87167 18.0293 10.4021Z"
        stroke={color ? color : "white"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default EstetoscopioIcon;
