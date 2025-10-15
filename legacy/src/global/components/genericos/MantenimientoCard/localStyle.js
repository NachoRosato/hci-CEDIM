import styled from "styled-components";

export const ContainerMantenimiento = styled.div`
  width: 500px;
  height: 500px;
  min-height: 500px;
  background: var(--color-white);
  /* Long Shadow */
  box-shadow: 0px 100px 80px rgba(0, 0, 0, 0.07),
    0px 41.7776px 33.4221px rgba(0, 0, 0, 0.0503198),
    0px 22.3363px 17.869px rgba(0, 0, 0, 0.0417275),
    0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
    0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725),
    0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
  border-radius: 24px;
  position: relative;
`;

export const HeaderMantenimiento = styled.div`
  display: flex;
  justify-content: center;
  color: var(--color-white);
  padding: 24px;
  border-radius: 24px 24px 0 0;
`;

export const BodyMantenimiento = styled.div`
  display: flex;
  justify-content: center;
  padding: 36px 70px;
  flex-direction: column;
  gap: 60px;
  text-align: center;
`;
