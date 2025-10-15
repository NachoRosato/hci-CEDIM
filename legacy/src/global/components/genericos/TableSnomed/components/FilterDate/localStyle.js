import styled from "styled-components";

export const ContainerFilterDate = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ededed;
  color: var(--color-black);
  .container-date {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
  }
  .container-date-item {
    display: flex;
    flex-direction: column;
    gap: 10px;
    span {
      font-weight: bold;
    }
  }
  .container-btn {
    bottom: 0;
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin: auto;
    height: 190px;   
}
`;
