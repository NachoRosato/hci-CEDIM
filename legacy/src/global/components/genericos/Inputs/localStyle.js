import styled from "styled-components"

export const Input =  styled.input`
    width: 100%;
    height: 50px;
    margin: 0;
    padding: 0;
    background-color: var(--color-inputs-grey97);
    border: 1px solid var(--color-inputs-grey90);
    padding-left: 10px;
    color: var(--color-inputs-black);
    &::placeholder {
        color: var(--color-inputs-grey45);
    }
`;

export const ContainerInput = styled.div`
    ${({error}) => {
        if(error){
            return (
            `
             input {
                border: 1px solid var(--color-inputs-danger);
                &::placeholder {
                    padding-left: 10px;
                }
             }
             p {
                visibility: visible;
             }
            `
            )
        }
    }}
    
`;

export const MsjError = styled.p`
    color: var(--color-inputs-danger); 
    visibility: hidden;
`;
export const TitleMsj = styled.span`
      font-weight: bold;
`;