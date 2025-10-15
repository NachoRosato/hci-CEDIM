import styled from "styled-components"; 

export const ContaienerInput = styled.div`
    width: 140px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-weight: 600;
    cursor: pointer;
    background-color: var(--color-grey95);
    color: var(--color-grey45);
    border-radius: 4px;
    /* margin-top: 4px; */
    ${({active})=> {
        if(active){
            return (
                `
                background-color: var(--color-grey95);
                color: var(--color-latex30);
                `
            )
        }
    }}
    ${({error}) => {
        if(error) return `border: 1px solid var(--color-danger);`
        else return `border: 1px solid transparent`
    }}
`;