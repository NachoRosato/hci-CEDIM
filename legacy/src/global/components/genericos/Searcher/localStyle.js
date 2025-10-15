import styled from "styled-components";

export const Container = styled.div`
    position: relative;
    width: 100%;
    height: 88px;
    ${
        ({active, property}) => {
            if(active){
                return(
                    `
                    .background-click {
                        position: fixed;
                        width: 100vw; 
                        height: 100vh; 
                        top: 0;
                        left: 0;
                        z-index: -1;
                        }
                        #viewSearch-1${property} {
                            display: flex;
                            
                        }
                        `
                        )
                    }
                }
    }
  
  `;

export const Input = styled.input`
    width: 100%;
    height: 50px;
    background-color: var(--color-searcher-grey97);
    border: 1px solid var(--color-searcher-grey90);
    ${({error}) => error ? `border: 1px solid var(--color-searcher-danger);`: ""}
    padding-left: 10px;
    &::placeholder {
        color: var(--color-searcher-grey45);
    }
    color: var(--color-searcher-black);

    `;

export const Title = styled.span`
      font-weight: bold;
      `;

export const ViewSearch = styled.div`
    max-height: 200px;
    overflow-x: scroll;
    display: none;
    &:hover {
        p {
            background-color: var(--color-searcher-grey97);
            color: var(--color-searcher-black);
        }
       
    }
    background-color: var(--color-searcher-grey97);
    border: 1px solid var(--color-searcher-grey90);
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 100% !important;
`;

export const Item = styled.p`
    position: relative;
    z-index: 5;
    width: 100%;
    height: 30px;
    ${({active}) => {
        if(active){
        return `
            background-color: var(--color-searcher-latex30); 
            color: var(--color-searcher-white);
           
        `}
    }}
    cursor: pointer;
    &:hover {
        background-color: var(--color-searcher-latex30) !important;
        color: var(--color-searcher-white) !important;
    }
    padding: 0;
    margin: 0;
`;

export const MsjError = styled.span`
    color: var(--color-searcher-danger);
`