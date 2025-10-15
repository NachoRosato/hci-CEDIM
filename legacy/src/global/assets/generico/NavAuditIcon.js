const NavAuditIcon = ({ size, color }) => {
  return (
    <svg
      width={size ? size : "20"}
      height={size ? size : "20"}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.5 35.5884V42.5001C22.5 49.4036 28.0965 55.0001 35 55.0001H37.206C41.9227 55.0001 45.8988 51.8276 47.1163 47.5001"
        stroke={color ? color : "black"}
        strokeWidth="3.75"
      />
      <path
        d="M13.5714 7.5H13.3423C12.5601 7.5 12.169 7.5 11.8394 7.52915C8.21908 7.8493 5.3493 10.7191 5.02915 14.3394C5 14.669 5 15.0601 5 15.8423V18.0882C5 27.7533 12.835 35.5883 22.5 35.5883C31.7705 35.5883 39.2858 28.073 39.2858 18.8025V15.8423C39.2858 15.0601 39.2857 14.669 39.2565 14.3394C38.9365 10.7191 36.0668 7.8493 32.4463 7.52915C32.1168 7.5 31.7255 7.5 30.9435 7.5H30.7142"
        stroke={color ? color : "black"}
        strokeWidth="3.75"
        strokeLinecap="round"
      />
      <path
        d="M47.5 47.5C51.6421 47.5 55 44.1421 55 40C55 35.8579 51.6421 32.5 47.5 32.5C43.3579 32.5 40 35.8579 40 40C40 44.1421 43.3579 47.5 47.5 47.5Z"
        stroke={color ? color : "black"}
        strokeWidth="3.75"
      />
      <path
        d="M30 5V10"
        stroke={color ? color : "black"}
        strokeWidth="3.75"
        strokeLinecap="round"
      />
      <path
        d="M15 5V10"
        stroke={color ? color : "black"}
        strokeWidth="3.75"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default NavAuditIcon;
