const CameraIcon = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 47.5 47.5"
      viewBox="0 0 47.5 47.5"
    >
      <defs>
        <clipPath id="a" clipPathUnits="userSpaceOnUse">
          <path d="M 0,38 38,38 38,0 0,0 0,38 Z" />
        </clipPath>
      </defs>
      <g clipPath="url(#a)" transform="matrix(1.25 0 0 -1.25 0 47.5)">
        <path
          fill="#292f33"
          d="m 0,0 c 0,0 0,4 4,4 l 28,0 c 0,0 4,0 4,-4 l 0,-18 c 0,0 0,-4 -4,-4 l -28,0 c 0,0 -4,0 -4,4 L 0,0 Z"
          transform="translate(1 27)"
        />
        <path
          fill="#ccd6dd"
          d="m 0,0 c 0,-5.523 4.477,-10 10,-10 5.523,0 10,4.477 10,10 C 20,5.523 15.523,10 10,10 4.477,10 0,5.523 0,0"
          transform="translate(12 18)"
        />
        <path
          fill="#292f33"
          d="m 0,0 c 0,-4.419 -3.581,-8 -8,-8 -4.418,0 -8,3.581 -8,8 0,4.418 3.582,8 8,8 4.419,0 8,-3.582 8,-8"
          transform="translate(30 18)"
        />
        <path
          fill="#3b88c3"
          d="m 0,0 c 0,-2.762 -2.238,-5 -5,-5 -2.762,0 -5,2.238 -5,5 0,2.762 2.238,5 5,5 2.762,0 5,-2.238 5,-5"
          transform="translate(27 18)"
        />
        <path
          fill="#fff"
          d="M 0,0 C 0,-0.829 -0.672,-1.5 -1.5,-1.5 -2.328,-1.5 -3,-0.829 -3,0 -3,0.829 -2.328,1.5 -1.5,1.5 -0.672,1.5 0,0.829 0,0"
          transform="translate(35 27.5)"
        />
        <path
          fill="#f5f8fa"
          d="m 0,0 c 0,-0.829 -0.671,-1.5 -1.5,-1.5 l -5,0 c -0.829,0 -1.5,0.671 -1.5,1.5 0,0.829 0.671,1.5 1.5,1.5 l 5,0 C -0.671,1.5 0,0.829 0,0"
          transform="translate(13 27.5)"
        />
        <path
          fill="#66757f"
          d="M 0,0 C 0,0 0,1 1,1 L 7,1 C 7,1 8,1 8,0 l 0,-1 -8,0 0,1 z"
          transform="translate(5 32)"
        />
      </g>
    </svg>
  );
};

export default CameraIcon;
