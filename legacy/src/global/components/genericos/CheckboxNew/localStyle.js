import styled from "styled-components"; 

export const ContainerCheckNew =  styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 20px; 
    span {
        cursor: pointer;
    }
    .circle-color {
        width: 15px;
        height: 15px;
        border-radius: 100%;
    }
`;

export const CheckCircle = styled.span`
    width: 25px;
    height: 25px;
    border-radius: 100%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`;