import styled from "styled-components";
import { motion } from "framer-motion";

export const ContainerBase = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background: var(--color-primary-gradient);
`;

export const ContainerLogin = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-left: 10px;
  margin-right: 10px;
`;

export const DivideLineSection = styled.hr`
  width: 100%;
`;
export const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0px;
  div:first-child {
    margin-bottom: 15px;
  }
`;

export const ShowPassword = styled.div`
  .ptur-loginBox-show-hideBtn {
    position: absolute;
    width: 10%;
    left: 81%;
    bottom: 37%;
    border: none;
    background: var(--color-grey95);
  }
  @media (max-width: 400px) {
    .ptur-loginBox-show-hideBtn {
      left: 78%;
    }
  }
`;

export const ContainerLogo = styled.div`
  display: flex;
  flex-direction: column;
  .ag-login-logotype {
    width: 200px;
  }
`;
export const ContainerSignIn = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: var(--color-white);
  width: 100%;
  min-width: 300px;
  max-width: 450px;
  height: 400px;
  padding: 30px 30px 30px 30px;
  /* min-height: 500px; */
  box-shadow: 0 100px 80px rgb(0 0 0 / 7%),
    0 41.7776px 33.4221px rgb(0 0 0 / 5%), 0 22.3363px 17.869px rgb(0 0 0 / 4%),
    0 12.5216px 10.0172px rgb(0 0 0 / 4%), 0 6.6501px 5.32008px rgb(0 0 0 / 3%),
    0 2.76726px 2.21381px rgb(0 0 0 / 2%);
  border-radius: 24px;
  .ag-login-inputs {
    padding: 10px 10px;
  }
  /* @media (max-width: 480px) {
    width: 400px;
  }
  @media (max-width: px) {
    width: 400px;
  } */
`;

export const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
`;

export const BtnPrimary = styled.button`
  text-decoration: none;
  color: #fff;
  width: 100%;
  height: 50px;
  border-radius: 5px;
  border: none;
  font-size: 20px;
  font-weight: 300;
  /* box-shadow: 0px 0px 10px 0px rgba(0,112,243,1); */
  transition: ease-in-out 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  /* &:hover {
       box-shadow: 0px 0px 15px 1px rgba(0,112,243,1);
    } */
  .ag-login-spinner {
    width: 30px;
    height: 30px;
    margin-left: 6px;
  }
  .ag-login-spanBtnPrimary {
    padding-left: 8px;
    vertical-align: middle;
  }
`;
