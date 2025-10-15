import styled from "styled-components"; 

export const ContainerFilterString = styled.div`
    width: 100%;
    height: 100%;
    background-color: #ededed;
    display: flex;
    align-items: center;
    gap: 10px;
    flex-direction: column;
    padding-top: 20px;
    input {
    height:30px;
    width: 90%;
    padding-left: 20px;
    }
    .container-btn {
        display: flex;
        justify-content: space-between;
        width: 90%;
    }
`; 

export const ContainerCheck = styled.div`
    width: 90%;
    height: 200px;
    background-color: var(--color-white);
    color: var(--color-black);
    display: flex;
    gap: 10px;
    flex-direction: column;
    overflow-y: auto;
    padding-left: 20px;
    .container-item {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
        input {
            width: 20px;
        }
    }
`; 