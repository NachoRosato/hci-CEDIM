import styled, { keyframes } from "styled-components";

export const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const latido = keyframes`
  0%   { transform: scale(1); }
  50%  { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

export const LoadingContainer = styled.div`
  background-color: hsla(0, 0%, 0%, 0.5);
  height: 100%;
  width: 100%;
  z-index: 1000;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 8px;
`;

export const Spinner = styled.div`
  position: absolute;
  border-radius: 100%;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  /* background: conic-gradient(
    var(--color-white) 0deg,
    var(--color-grey77) 90deg,
    transparent 300deg
  ); */
  background: conic-gradient(
    var(--color-disabled) 0deg,
    var(--color-primary) 90deg,
    transparent 300deg
  );
  mask: radial-gradient(
    farthest-side,
    transparent calc(100% - 6px),
    black calc(100% - 5px)
  );
  -webkit-mask: radial-gradient(
    farthest-side,
    transparent calc(100% - 6px),
    black calc(100% - 5px)
  );
  animation: ${rotate} 1.5s linear infinite reverse;
  animation-delay: ${(props) => props.delay}s;
  user-select: none;
`;

export const Logo = styled.img`
  width: 80px;
  height: 80px;
  z-index: 2;
  animation: ${latido} 1.2s ease-in-out infinite;
  margin-top: ${(props) =>
    props.texto === false || props.texto === "" ? "32px" : "54px"};
  user-select: none;
`;

export const TextoCargando = styled.p`
  margin-top: 20px;
  z-index: 2;
  user-select: none;
`;
