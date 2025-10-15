import styled from "styled-components"; 


export const Container = styled.div`
    width: 100%;  
    height: 88px;
    cursor: pointer;
    ${
        ({active, error}) => {
            if(active){
                return(
                    `
                        .select-dropdown { 
                            visibility: visible;
                        }
                        .background-click {
                            position: fixed;
                            width: 100vw; 
                            height: 100vh; 
                            top: 0;
                            left: 0;
                            z-index: 4;
                        }
                    `
                )
            }
            if(error){
                return `.viewValue
                            {
                                border: 1px solid var(--color-dropdasfaidsr)
                            }
                        `
            }
        }
    }
`;


export const SelectDropdown = styled.div`
    position: relative;
    width: 100%;
    max-height: 250px; 
    visibility: hidden;
    overflow-x: scroll;
    z-index: 5;
    background-color: var(--color-dropdownAdm-grey97);
    border: 1px solid var(--color-dropdownAdm-grey90);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    &:hover {
        span {
            background-color:  var(--color-dropdownAdm-grey97);
            color: var(--color-dropdownAdm-black);
        }
    }
`;
export const ViewValue = styled.div`
    width: 100%; 
    position: relative;
    height: 50px;
    padding-left: 10px;
    cursor: pointer;  
    display: flex;
    justify-content: space-between;
    align-items: center;
    .active {
        transform: rotate(180deg);
    }
    background-color: var( --color-dropdownAdm-grey97);
    border: 1px solid var(--color-dropdownAdm-grey90);
  
`;


export const Item = styled.span`
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    ${
        ({selected}) => {
            if(selected){
                return (
                    `
                        background: var(--color-dropdownAdm-latex30);
                        color: var(--color-dropdownAdm-white);
                       
                    `
                );
            }
        }
    }
    &:hover{
        background: var(--color-dropdownAdm-latex30) !important;
        color: var(--color-dropdownAdm-white) !important;
    }
`;


export const Title = styled.span`
    font-weight: bold;
`;


export const Placeholder = styled.span`
    color: var(--color-dropdownAdm-grey45);
`; 


export const MsjError = styled.span`
    color: var(--color-dropdownAdm-danger);
`;