import styled from "styled-components";

export const ContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 1100px;
  height: 600px;
  padding: 0px 10px 10px 10px;
  overflow-x: hidden;
  overflow-y: scroll;
  @media (max-width: 1366px) {
    height: 450px;
  }
`;

export const ContainerItems = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  text-align: left;
  overflow-x: hidden;
  overflow-y: scroll;
  div {
    padding-bottom: 5px;
  }
`;
