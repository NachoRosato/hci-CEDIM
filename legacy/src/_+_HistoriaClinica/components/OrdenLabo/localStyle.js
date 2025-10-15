import styled from "styled-components";

export const ContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 750px;
  padding-left: 66px;
  padding-right: 66px;
  position: relative;
`;

export const ContainerButtons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 65px;
  padding-right: 65px;
  position: absolute;
  bottom: 33px;
  @media (max-width: 1366px) {
    bottom: 270px;
  }
`;

export const BtnCerrar = styled.button`
  width: 150px;
  height: 30px;
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: var(--color-latex30);
`;

export const ContainerTitle = styled.div`
  margin-top: 23px;
  margin-bottom: 28px;
  @media (max-width: 1366px) {
    margin-top: 10px;
    margin-bottom: 10px;
    span {
      font-size: 20px !important;
    }
  }
`;
export const ContainerQst = styled.div`
  margin-bottom: 40px;
  @media (max-width: 1366px) {
    margin-bottom: 0px;
    span {
      font-size: 16px !important;
    }
  }
`;

export const ContainerOrden = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-bottom: 58px;
  width: 800px;
  height: 330px;

  .swiper {
    width: 80%;
    height: 100%;
  }

  .swiper-slide {
    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .swiper {
    /* margin-left: auto;
    margin-right: auto; */
  }
  @media (max-width: 1366px) {
    .swiper {
      width: 80%;
      height: 100%;
    }
    margin-bottom: 0px;
  }
`;

export const ContainerOrdenItems = styled.div`
  width: 656px;
  height: 409px;
  background: var(--color-white);
  box-shadow: 0px 12.5216px 10.0172px rgba(0, 0, 0, 0.035),
    0px 6.6501px 5.32008px rgba(0, 0, 0, 0.0282725),
    0px 2.76726px 2.21381px rgba(0, 0, 0, 0.0196802);
  border-radius: 16px;
  padding: 17px 0px 20px 24px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const ContainerNuevaOrden = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 27px;
  @media (max-width: 1366px) {
    gap: 10px;
    margin-left: 200px;
  }
`;

export const CerrarCmp = styled.div`
  width: max-content;
  cursor: pointer;
  margin-top: 28px;
  margin-left: 31px;
  display: flex;
  align-items: center;
  gap: 6px;
  div {
    transform: rotate(180deg);
  }
  span {
    padding-top: 3px;
  }
  @media (max-width: 1366px) {
    margin-top: 13px;
    margin-left: 16px;
  }
`;
