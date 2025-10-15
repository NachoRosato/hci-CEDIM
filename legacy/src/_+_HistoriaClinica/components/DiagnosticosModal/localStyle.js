import styled from "styled-components";

export const EnfermedadesVacio = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const EnfermedadesItem = styled.div`
  width: auto;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 10px;
  padding-right: 10px;
  margin-left: 10px;
  margin-right: 10px;
  padding-top: 8px;
  padding-bottom: 5px;
  margin-bottom: 10px;
  background: linear-gradient(87.1deg, #008d17 17.72%, #00b61d 85.58%);
  color: var(--color-white);
  box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  .txtCruz {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const EnfermedadesItems = styled.div`
  max-height: 300px;
  overflow-y: scroll;
`;

export const DiagBox = styled.div`
  width: 500px;
  height: auto;
  margin: 20px 20px 20px 20px;
`;
