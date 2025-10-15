import styled from "styled-components"; 


export const ContainerCalendar = styled.div`
    position: fixed;
    width: max-content;
    height: max-content;
    background-color: white;
    border: 1px solid black;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 8px;
`;

export const DiasContainer = styled.div`
    width: 350px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ColumnDia = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    /* gap: 1px; */
    /* margin-top: 10px; */
     .bold {
        font-weight: bold;
     }
     .dayTitle {
        padding-bottom: 5px;
        font-size: 18px;
        font-weight: 500;
    }
`;

export const ItemDia = styled.span`
    width: 38px;
    height: 38px;
    text-align: center;
    text-justify: center;
    margin: 2px 5px;
    cursor: pointer;
    background-color:#f2f2f2; 
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid transparent;
    border-radius: 4px;
    &:hover {
        color: var(--color-datePicker-latex30);
        border:  2px solid var(--color-datePicker-latex30);
    }
    background-color: ${({select})=> select ? "var(--color-datePicker-latex10)":"#f2f2f2"};
    color: ${({select})=> select ? "#fff":"#000"};
    ${({select}) => {
        if(select){
            return `
            &:hover {
                color: #fff;
                border:  2px solid  transparent;
            }
            
            `
        }
    }}
    ${({finished}) => finished ? `
        color: white; 
        background-color: transparent; 
        cursor: default;
        &:hover {
        color: #fff;
        border:  2px solid  transparent;
    }
    `: ""}
    ${({franja, select, finished, buttonHidden}) => (
        franja && !select && !finished? `
        background-color: ${buttonHidden ? "var(--color-primary)":"var(--color-datePicker-latex30)"}; 
        color: #fff; 
        &:hover {
            color: #fff;
            border:  2px solid  transparent;
        }
        `: ""
        )}

    

`


export const DropDownContainer = styled.div`
    width: 350px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    .dropdown {
        width: 225px;
    }
   
    background-color: var(--color-datePicker-latex30);
    padding: 20px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
`;


export const ContainerBtn = styled.div`
    width: 350px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    padding-bottom: 20px;
    button {
        width: 140px;
        height: 40px; 
        border-radius: 8px;
        border: none; 
        background-color: var(--color-datePicker-primary);
        font-weight: 500;
        font-size: 18px;
        line-height: 150%;
        cursor: pointer;
        color: var(--color-white);
    }
    .cancel {
        background-color: #f2f2f2;
        color: var(--color-datePicker-latex10);
    }
`; 