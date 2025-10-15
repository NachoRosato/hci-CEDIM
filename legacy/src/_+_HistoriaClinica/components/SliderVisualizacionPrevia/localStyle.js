import styled from "styled-components";

export const Slider = styled.div`
  position: fixed;
  top: 0px;
  right: ${({ open }) => (open === true ? "-4px" : "-50%")};
  width: 50%;
  height: 100vh;
  background-color: var(--color-white);
  transition: right 0.5s ease-in-out;
  z-index: ${({ open }) => (open ? "11" : "9")};
  -webkit-box-shadow: inset 0px 5px 10px -8px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: inset 0px 5px 10px -8px rgba(0, 0, 0, 0.75);
  box-shadow: inset 0px 5px 10px -8px rgba(0, 0, 0, 0.75);
  @media (max-width: 1366px) {
    top: 0px;
    height: 100vh;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

export const ContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
`;

export const ContainerTitle = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  height: 50px;
  background-color: var(--color-white);
  border-bottom: 2px solid var(--color-latex30);
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 12;
  padding: 0 20px;

  @media (max-width: 1366px) {
    height: 35px;
    padding: 0 10px;
  }
`;

export const TitleText = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: var(--color-latex30);
  letter-spacing: 0.5px;

  @media (max-width: 1366px) {
    font-size: 16px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 35px;
  left: -15px;
  width: 30px;
  height: 30px;
  background-color: var(--color-latex30);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 13;
  transition: all 0.3s ease;
  opacity: 1;
  transform: translateX(0) scale(1);

  &:hover {
    background-color: var(--color-primary);
    transform: translateX(0) scale(1.1);
  }

  @media (max-width: 1366px) {
    top: 17px;
  }
`;

export const CloseButtonText = styled.span`
  color: white;
  font-size: 14px;
  font-weight: bold;
`;

export const ContainerContent = styled.div`
  position: absolute;
  top: 50px;
  left: 0px;
  right: 0px;
  height: calc(100vh - 210px);
  padding: 20px;
  overflow-y: auto;
  overflow-x: hidden;

  @media (max-width: 1366px) {
    top: 35px;
    height: calc(100vh - 170px);
    padding: 8px;
  }
`;

export const ContainerFooter = styled.div`
  position: absolute;
  bottom: 80px;
  left: 0px;
  right: 0px;
  height: 80px;
  background-color: var(--color-white);
  border-top: 1px solid var(--color-latex30);
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 12;

  @media (max-width: 1366px) {
    bottom: 80px;
    height: 50px;
    padding: 0 10px;
  }
`;

export const FooterButton = styled.button`
  width: 150px;
  height: 40px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.3);
  }

  &:disabled {
    cursor: not-allowed;
    transform: none;
  }

  span {
    font-size: 14px;
  }

  @media (max-width: 1366px) {
    width: 110px;
    height: 35px;

    span {
      font-size: 12px;
    }
  }
`;

export const CloseFooterButton = styled(FooterButton)`
  background-color: var(--color-latex30);
  color: white;
`;

export const SaveFooterButton = styled(FooterButton)`
  background-color: var(--color-primary);
  width: 150px;
  color: white;

  &:hover:not(:disabled) {
    background-color: var(--color-broccoli);
  }
`;

export const LoadingText = styled.div`
  text-align: center;
  padding: 20px;
`;
