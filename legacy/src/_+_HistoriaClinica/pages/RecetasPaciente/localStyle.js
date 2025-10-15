import styled from "styled-components";
import { motion } from "framer-motion";

export const ContainerBody = styled(motion.ul)`
  ${({ cards }) => {
    if (cards > 0) {
      return `display: grid;
              grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      `;
    } else {
      return `display: flex;`;
    }
  }}
  flex-direction: row;
  gap: 30px;
  padding: 40px 50px;
  overflow-y: auto;
  height: 91vh;
  @media (max-width: 1366px) {
    height: 88vh;
    padding-top: 20px;
  }
`;

export const CardsContainer = styled(motion.li)`
  list-style: none;
`;

export const CardReceta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 350px;
  height: 280px;
  background-color: #ffffff;
  box-shadow: 0px 100px 80px rgba(0, 0, 0, 0.07),
    0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198),
    0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275),
    0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
    0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725),
    0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
  border-radius: 16px;
  .cardTitle {
    background: linear-gradient(257.94deg, #027bc0 18.65%, #004b76 86.55%);
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    padding: 15px 20px;
    min-height: 50px;
    display: flex;
    align-items: center;
  }
  .cardBody {
    display: flex;
    height: 100%;
    padding: 15px 20px;
    justify-content: space-between;
    flex-direction: column;
    gap: 15px;
    flex: 1;
  }
  .btnReceta {
    display: flex;
    align-items: center;
    gap: 10px;
    border: 2px solid var(--color-latex30);
    background: white;
    border-radius: 8px;
    padding: 12px 16px;
    width: fit-content;
    margin: auto;
    transition: all 0.3s ease;
    &:hover {
      background: var(--color-latex30);
      color: white;
      svg {
        filter: brightness(0) invert(1);
      }
    }
  }
`;
