import styled from "styled-components"; 


export const DataTableContainer = styled.div`
    position: relative;
    height: 80%;
    width: 90%;
    border: 2px solid var(--color-latex30);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
   
    /* box-shadow: -10px 0px 0px 0px  var(--color-latex30);  */
    @media (max-height: 900px){ // provisorio
        height: 450px;
    }

`;
export const Item = styled.div`
    height: 57px;
    display: flex;
    justify-content: space-around;
    align-items:center;
    text-align: center;
    border: 1px solid var(--color-latex30);
    span {
        width: 280px;
    }
`; 

export const Body = styled.div`
    position: relative;
    width: 100%;

    height: calc( 100% - 57px);
    /* overflow-y: scroll; */
    /* border-left: 10px var(--color-latex30) solid; */
   
    .item-body {
        border: 1px solid var(--color-latex30);
        cursor: pointer;
    }
    overflow-y: auto;


    &::-webkit-scrollbar {
         width: 5px;
         border: none;
    }
    &::-webkit-scrollbar-track {
        background-color: transparent;
    }     

    &::-webkit-scrollbar-thumb {
        background-color: var(--color-latex30); 
        border-radius: 8px;
    }
    
`;
export const Top = styled.div`
    position: sticky;
    top: 0;
    left: 0;
    height: 57px;
    width:100%;
    background: var(--color-latex30);
    color: var(--color-white);
    font-weight: bold;
    z-index: 2;
`;
