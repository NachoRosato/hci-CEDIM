import styled from "styled-components";
import { motion } from "framer-motion";

export const ContainerOpcBar = styled(motion.div)`
  width: 100%;
  height: 46px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 50px;
  box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.14);
  position: relative;
  overflow: visible;
  z-index: 10;
  @media (max-width: 1366px) {
    height: 40px;
  }
`;

export const ContainerOpcItems = styled.button`
  width: max-content;
  height: 60px;
  margin-right: 44px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  border: none;
  background-color: transparent;
  flex-shrink: 0;
  &::after {
    content: "";
    width: 100%;
    height: 6px;
    background: var(--color-latex30);
    position: absolute;
    bottom: 7px;
    opacity: 0;
    transition: 0.5s all;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    ${({ active }) => {
      if (active) {
        return `opacity: 1`;
      } else {
        return `opacity: 0`;
      }
    }}
  }
  @media (max-width: 1366px) {
    height: 40px;
    margin-right: 30px;
    &::after {
      content: "";
      width: 100%;
      height: 3px;
      background: var(--color-latex30);
      position: absolute;
      bottom: 0px;
      opacity: 0;
      transition: 0.5s all;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      ${({ active }) => {
        if (active) {
          return `opacity: 1`;
        } else {
          return `opacity: 0`;
        }
      }}
    }
  }
`;

export const ContainerOpcIcon = styled.div`
  margin-right: 12px;
  margin-top: 5px;
`;

export const ContainerOpcText = styled.div`
  @media (max-width: 1366px) {
    font-family: Rubik;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
  }
`;

export const ContainerRefresh = styled.div`
  width: 160px;
  height: 60px;
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  margin-right: 44px;
  //agrego los font de este lado ya que sino el global ejecuta por prioridad
  font-family: Rubik;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;
  flex-shrink: 0;
  @media (max-width: 1366px) {
    .ctText {
      font-weight: 400;
      font-size: 14px;
    }
  }
`;

export const RefreshButton = styled.button`
  background: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  -webkit-animation: spin 4s linear infinite;
  -moz-animation: spin 4s linear infinite;
  animation: spin 3s linear infinite;

  @-moz-keyframes spin {
    100% {
      -moz-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

export const ExpandButton = styled.button`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-latex30);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
  transition: all 0.3s ease;
  flex-shrink: 0;

  &:hover {
    background: #004b76;
    transform: scale(1.05);
  }

  @media (max-width: 1366px) {
    width: 24px;
    height: 24px;
    font-size: 14px;
  }
`;

export const ItemsContainer = styled.div`
  display: flex;
  align-items: center;
  overflow: visible;
  flex: 1;
  margin-right: 170px;

  @media (max-width: 1366px) {
    margin-right: 160px;
  }
`;

export const ExpandedItemsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 50px;
  right: 170px;
  background: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 8px 8px;
  z-index: 11;
  max-height: 200px;
  overflow-y: auto;
  opacity: ${({ isExpanded }) => (isExpanded ? 1 : 0)};
  visibility: ${({ isExpanded }) => (isExpanded ? "visible" : "hidden")};
  transform: ${({ isExpanded }) =>
    isExpanded ? "translateY(0)" : "translateY(-10px)"};
  transition: all 0.3s ease;
  border: 1px solid #e0e0e0;

  @media (max-width: 1366px) {
    right: 160px;
  }
`;

export const ExpandedItem = styled.button`
  width: 100%;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  background: none;
  border: none;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f8f9fa;
  }

  &:last-child {
    border-bottom: none;
  }

  ${({ active }) =>
    active &&
    `
      background-color: #e3f2fd;
      color: var(--color-latex30);
    `}
`;
