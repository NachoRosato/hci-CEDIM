import styled from "styled-components";

export const ContainerBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  height: 300px;
  padding: 30px 20px 0px 60px;
  overflow-x: hidden;
  overflow-y: scroll;
`;

export const ContainerItems = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  text-align: left;
  overflow-x: hidden;
  overflow-y: scroll;
  div{
    padding-bottom: 5px;
  }
`;
