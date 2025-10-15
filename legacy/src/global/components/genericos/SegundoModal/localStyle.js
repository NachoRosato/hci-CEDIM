import styled from "styled-components";

export const ModalBackground = styled.div`
  background-color: hsla(0, 0%, 0%, 0.5);
  height: 100%;
  width: 100%;
  z-index: 999;
  position: absolute;
`;

export const ModalConteiner = styled.div`
  /* max-width: 900px;
  max-height: 600px; */
  max-width: fit-content;
  max-height: fit-content;
  margin: auto;
  background: white;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  border-radius: 10px;
  text-align: center;
  opacity: 1;
  box-shadow: 0px 100px 80px rgba(0, 0, 0, 0.07),
    0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198),
    0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275),
    0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
    0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725),
    0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
  /* animation-duration: 2s;    */
  animation: desplazarCentrado 0.6s ease-in-out;
  @media (max-width: 1700px) {
    min-width: 350px;
    .centroDerecha {
      left: 65%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  @media (max-width: 1400px) {
    .centroDerecha {
      left: 70%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  @media (max-width: 1024px) {
    .btn-Mensaje {
      padding: 12px 7px;
    }
    .btn-Mensaje-1 {
      padding: 0px 10px;
    }
    .centroDerecha {
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  @media (max-width: 600px) {
    .centroDerecha {
      left: 50%;
      top: 51%;
      transform: translate(-50%, -50%);
    }
  }
`;

export const ModalButtons = styled.button`
  border: none;
  cursor: pointer;
  .btn {
    padding: 12px 36px;
    min-width: 100px;
    border-radius: 8px;
    margin: 8px;
    background: white;
    box-shadow: 0px 100px 80px rgba(0, 0, 0, 0.07),
      0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198),
      0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275),
      0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
      0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725),
      0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
  }
  .btn-Mensaje-1 {
    padding: 12px 56px;
    min-width: 100px;
    border-radius: 8px;
    margin: 8px;
    box-shadow: 0px 100px 80px rgba(0, 0, 0, 0.07),
      0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198),
      0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275),
      0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
      0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725),
      0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
  }
  .btn-Mensaje {
    padding: 12px 56px;
    min-width: 100px;
    border-radius: 8px;
    margin: 8px;
    background-color: var(--color-white);
    box-shadow: 0px 100px 80px rgba(0, 0, 0, 0.07),
      0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198),
      0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275),
      0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
      0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725),
      0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  border: 1px;
  height: 56px;
  margin-top: 20px;
  margin-bottom: 20px;
  justify-content: center;
`;

export const ModalHeaderConteiner = styled.div`
  padding: 16px;
  border-radius: 8px 8px 0px 0px;
  min-width: 350px;
`;

export const ModalHeaderTitle = styled.h3`
  margin: 0px;
  color: var(--color-white);
`;

export const ModalHeaderCross = styled.div`
  right: 32px;
  top: 16px;
  position: absolute;
  display: block;
  height: 16px;
  width: 16px;
  &:hover {
    cursor: pointer;
  }
`;

export const ModalHeaderCrossX = styled.div`
  border: 1px solid #fff;
  height: 20px;
  transform: rotate(45deg);
  width: 0px;
  background: #fff;
  position: absolute;
  left: 8px;
`;

export const ModalHeaderCrossY = styled.div`
  border: 1px solid #fff;
  height: 20px;
  transform: rotate(-45deg);
  width: 0px;
  background: #fff;
  position: absolute;
  left: 8px;
`;
