import styled from "styled-components"; 


export const Container = styled.div`
    ${({error}) => {
            if(error){
                return (
                `
                textarea {
                    border: 1px solid var(--color-textArea-danger);
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


export const TxtArea = styled.textarea`
    width: 300px;
    height: ${({height}) => height};
    background-color: var(--color-textArea-grey97);
    border: 1px solid var(--color-textArea-grey90);
    padding-left: 10px;
    padding-top: 10px;
    color: var(--color-textArea-black);
    `;

export const Title = styled.span`
     font-weight: bold;
`;

export const MsjError = styled.p`
    color: var(--color-textArea-danger); 
    visibility: hidden;
`;