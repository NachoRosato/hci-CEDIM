import styled from "styled-components";
import { motion } from "framer-motion";

export const ContainerBody = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 85px;
  overflow-y: scroll;
  height: 100vh;
`;

export const ContainerBuscador = styled.div`
  width: 80%;
  height: 115px;
  padding-left: 35px;
  padding-right: 35px;
  padding-top: 17px;
  padding-bottom: 20px;
  position: relative;
  background: var(--color-white);
  box-shadow: 0px 100px 80px rgba(0, 0, 0, 0.07),
    0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198),
    0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275),
    0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
    0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725),
    0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
  border-radius: 10px;
  border-right: 10px solid var(--color-latex30);
  border-left: 10px solid var(--color-latex30);
  margin-bottom: 70px;
`;

export const ContainerBuscadorItems = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const ContainerBuscadorTitleBox = styled.div`
  display: flex;
  align-items: center;
  .busqPaciente-avatar {
    margin-right: 9px;
  }
  .busqPaciente-title {
    margin-bottom: 4px;
  }
`;
export const ContainerBuscadorDropBox = styled.div``;

export const ContainerBuscadorTabla = styled.div`
  padding: 0 20px;
  display: flex;
  width: 80%;
`;

export const BtnSnomed = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 138px;
  height: 30px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: var(--color-primary);
  color: var(--color-white);
`;

export const BtnAsignar = styled.button`
  width: 138px;
  height: 30px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border: none;
  ${({ activo }) => {
    if (activo) {
      return `
        cursor: pointer;
      `;
    }
  }}
  margin-left: 10px;
  margin-bottom: 10px;
`;
